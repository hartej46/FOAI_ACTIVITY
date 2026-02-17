"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { carData } from "@/data/carData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const { scrollY } = useScroll();
    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(26, 26, 26, 0)", "rgba(26, 26, 26, 0.8)"]
    );
    const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
    const borderBottom = useTransform(
        scrollY,
        [0, 100],
        ["1px solid rgba(212, 175, 55, 0)", "1px solid rgba(212, 175, 55, 0.2)"]
    );

    return (
        <motion.nav
            style={{ backgroundColor, backdropBlur, borderBottom }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
            >
                <span className="font-orbitron text-xl font-bold tracking-tighter text-pagani-gold italic">
                    FERRARI
                </span>
                <span className="h-4 w-[1px] bg-white/20" />
                <span className="font-rajdhani text-sm font-medium tracking-[0.2em] text-white/60">
                    LAFERRARI
                </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8 font-rajdhani text-xs tracking-[0.2em]">
                {["HERO", "DESIGN", "ENGINE", "SPECS"].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-pagani-gold transition-colors duration-300"
                    >
                        {item}
                    </a>
                ))}
            </div>

            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-transparent border border-pagani-gold text-pagani-gold font-orbitron text-[10px] tracking-[0.2em] hover:bg-pagani-gold hover:text-black transition-all duration-300 rounded-sm"
            >
                INQUIRE
            </motion.button>
        </motion.nav>
    );
}
