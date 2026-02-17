"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { carData } from "@/data/carData";
import { MoveRight, Info, Zap, ShieldCheck } from "lucide-react";

interface ZondaExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
    // Hero Phase (0 - 0.33)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.33], [1, 1, 0, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.33], [1, 1.1]);

    // Design Phase (0.33 - 0.66)
    const designOpacity = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [0, 1, 1, 0]);
    const designX = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [50, 0, 0, -50]);

    // Engine Phase (0.66 - 1.0)
    const engineOpacity = useTransform(scrollYProgress, [0.66, 0.73, 1], [0, 1, 1]);
    const engineX = useTransform(scrollYProgress, [0.66, 0.73, 1], [-50, 0, 0]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-8 md:p-20 overflow-hidden">
            {/* Decorative HUD Elements */}
            <div className="absolute inset-0 border-[1px] border-white/5 m-4 pointer-events-none" />
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-pagani-gold/30" />
            <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-pagani-gold/30" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-pagani-gold/30" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-pagani-gold/30" />

            {/* HERO PHASE */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="flex flex-col items-center text-center max-w-4xl"
            >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-pagani-gold font-orbitron text-xs tracking-[0.5em] mb-4"
                >
                    {carData.hero.subtitle}
                </motion.span>
                <motion.h1
                    className="text-6xl md:text-9xl font-orbitron font-black tracking-tighter mb-8"
                >
                    {carData.hero.title}
                </motion.h1>
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-[10px] text-white/40 tracking-widest font-rajdhani">STARTING FROM</span>
                        <span className="text-2xl font-orbitron text-white">{carData.hero.price}*</span>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-sm backdrop-blur-md pointer-events-auto cursor-pointer"
                    >
                        <span className="font-orbitron text-[10px] tracking-widest">{carData.hero.cta}</span>
                        <MoveRight className="w-4 h-4 text-pagani-gold" />
                    </motion.div>
                </div>
            </motion.div>

            {/* DESIGN PHASE */}
            <motion.div
                style={{ opacity: designOpacity, x: designX }}
                className="absolute left-8 md:left-40 max-w-md flex flex-col items-start"
            >
                <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 text-pagani-gold" />
                    <span className="text-pagani-gold font-orbitron text-[10px] tracking-[0.3em]">AERODYNAMICS</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6 leading-none">
                    {carData.design.title}
                </h2>
                <p className="text-sm font-rajdhani text-white/60 leading-relaxed tracking-wider border-l-2 border-pagani-gold pl-6">
                    {carData.design.description}
                </p>
            </motion.div>

            {/* ENGINE PHASE */}
            <motion.div
                style={{ opacity: engineOpacity, x: engineX }}
                className="absolute right-8 md:right-40 max-w-md flex flex-col items-end text-right"
            >
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-pagani-gold font-orbitron text-[10px] tracking-[0.3em]">PROPULSION</span>
                    <Zap className="w-5 h-5 text-pagani-gold" />
                </div>
                <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 leading-none italic">
                    {carData.engine.title}
                </h2>
                <div className="grid grid-cols-1 gap-8 w-full">
                    {carData.engine.specs.map((spec) => (
                        <div key={spec.label} className="flex flex-col items-end">
                            <span className="text-[10px] text-white/40 tracking-widest font-rajdhani">{spec.label}</span>
                            <span className="text-2xl md:text-3xl font-orbitron text-white font-bold tracking-tight">
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* FOOTER HUD */}
            <div className="absolute bottom-10 left-10 md:left-20 flex items-center gap-8 font-rajdhani text-[10px] tracking-widest text-white/20">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pagani-gold animate-pulse" />
                    SYSTEMS ACTIVE
                </div>
                <div className="hidden md:block">
                    LAT: 44.5367° N | LONG: 10.8617° E
                </div>
            </div>

            <div className="absolute bottom-10 right-10 md:right-20 flex items-center gap-4">
                <div className="font-orbitron text-[10px] tracking-[0.2em] text-white/40">SCROLL TO DISCOVER</div>
                <div className="w-12 h-[1px] bg-white/20" />
            </div>
        </div>
    );
}
