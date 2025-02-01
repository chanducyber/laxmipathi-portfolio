"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    useTransform
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);

    const backgroundColorOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5],
        [0, 0.6, 0.8]
    );
    
    // Added text contrast transformation
    const textOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5],
        [0.7, 1, 1]
    );

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            setVisible(current > 0.05);
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 1, y: -100 }}
                animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                    backgroundColor: `rgba(23, 23, 23, ${backgroundColorOpacity})`,
                    backdropFilter: `blur(12px) saturate(160%)`,
                    WebkitBackdropFilter: `blur(12px) saturate(160%)`,
                }}
                className={cn(
                    "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/10 rounded-full",
                    "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02)]",
                    "z-[5000] px-10 py-3 items-center justify-center space-x-4",
                    className
                )}
            >
                {navItems.map((navItem, idx) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative flex items-center space-x-2",
                            "text-neutral-50 hover:text-blue-200 transition-colors" // Changed text colors
                        )}
                    >
                        <motion.span 
                            className="block sm:hidden"
                            style={{ opacity: textOpacity }}
                        >
                            {navItem.icon}
                        </motion.span>
                        <motion.span 
                            className="text-sm font-medium !cursor-pointer"
                            style={{ 
                                opacity: textOpacity,
                                textShadow: "0 2px 4px rgba(0,0,0,0.2)" 
                            }}
                        >
                            {navItem.name}
                        </motion.span>
                    </Link>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};