"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValueEvent, MotionValue } from "framer-motion";

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function ZondaScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            // Filename pattern: ezgif-frame-001.jpg
            const frameIndex = i.toString().padStart(3, "0");
            img.src = `${imageFolderPath}/ezgif-frame-${frameIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    const drawImage = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];
        if (!img) return;

        // High-DPI Scaling
        const pixelRatio = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(pixelRatio, pixelRatio);
        ctx.clearRect(0, 0, width, height);

        // Object-fit: contain logic
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawWidth = width;
            drawHeight = width / imgRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        } else {
            drawWidth = height * imgRatio;
            drawHeight = height;
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial draw and redraw on resize
    useEffect(() => {
        if (isLoaded) {
            drawImage(0);
        }

        const handleResize = () => {
            const currentIndex = Math.floor(scrollYProgress.get() * (totalFrames - 1));
            drawImage(Math.max(0, Math.min(currentIndex, totalFrames - 1)));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded]);

    // Handle scroll progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const currentIndex = Math.floor(latest * (totalFrames - 1));
        drawImage(Math.max(0, Math.min(currentIndex, totalFrames - 1)));
    });

    return (
        <div className="relative w-full h-screen overflow-hidden bg-pagani-black">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-pagani-gold"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        <span className="font-orbitron font-bold text-[10px] tracking-[0.3em] text-pagani-gold">
                            INITIALIZING SYSTEMS...
                        </span>
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-contain pointer-events-none"
            />
        </div>
    );
}
