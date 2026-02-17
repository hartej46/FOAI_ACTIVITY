"use client";

import { motion } from "framer-motion";
import { carData } from "@/data/carData";
import { Shield, Zap, Wind, Gauge } from "lucide-react";

export function SpecsGrid() {
    return (
        <section id="specs" className="py-32 px-10 md:px-20 bg-pagani-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pagani-gold/20 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <span className="text-pagani-gold font-orbitron text-[10px] tracking-[0.5em] mb-4 block">TECHNICAL SPECIFICATIONS</span>
                        <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase leading-none">The Metrics of Mastery</h2>
                    </div>
                    <div className="w-24 h-[1px] bg-pagani-gold mb-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                    {carData.specsGrid.map((spec, index) => (
                        <motion.div
                            key={spec.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.02] border border-white/5 p-10 hover:bg-white/[0.04] transition-colors duration-500 group"
                        >
                            <span className="text-[10px] font-rajdhani text-white/40 tracking-[0.3em] block mb-2">{spec.label}</span>
                            <span className="text-3xl font-orbitron font-bold text-white group-hover:text-pagani-gold transition-colors duration-500">
                                {spec.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Features() {
    const features = [
        { icon: <Zap className="w-8 h-8" />, title: "Electric Boost", desc: "The HY-KERS system ensures instant torque and unprecedented acceleration response." },
        { icon: <Wind className="w-8 h-8" />, title: "Active Aero", desc: "Dynamic flaps and diffusers adjust in real-time to optimize downforce and reduce drag." },
        { icon: <Shield className="w-8 h-8" />, title: "Carbon Soul", desc: "Extensive use of T800 and T1000 carbon fiber for maximum rigidity and safety." },
        { icon: <Gauge className="w-8 h-8" />, title: "F1 Heritage", desc: "Direct technology transfer from Scuderia Ferrari's racing department." },
    ];

    return (
        <section className="py-32 px-10 md:px-20 bg-pagani-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-8 group"
                    >
                        <div className="text-pagani-gold opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                            {f.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-orbitron font-bold mb-4">{f.title}</h3>
                            <p className="text-white/40 font-rajdhani text-sm leading-relaxed tracking-wide">
                                {f.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="py-20 px-10 md:px-20 bg-[#151515] border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-pagani-gold font-orbitron text-2xl font-black italic tracking-tighter mb-2">FERRARI</span>
                    <span className="text-[10px] font-rajdhani text-white/20 tracking-[0.5em]">© 2026 FERRARI S.P.A | ALL RIGHTS RESERVED</span>
                </div>

                <div className="flex items-center gap-12 font-rajdhani text-[10px] tracking-widest text-white/40">
                    <a href="#" className="hover:text-pagani-gold transition-colors">PRIVACY POLICY</a>
                    <a href="#" className="hover:text-pagani-gold transition-colors">LEGAL NOTICE</a>
                    <a href="#" className="hover:text-pagani-gold transition-colors">CONTACT</a>
                </div>
            </div>
        </footer>
    );
}
