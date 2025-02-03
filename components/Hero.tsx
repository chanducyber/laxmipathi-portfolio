"use client";

import React, { useState } from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="pb-20 pt-36">
      {/* Decorative Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="blue"
        />
      </div>

      {/* Background Overlay */}
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Main Content */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Profile Container shifted further left */}
          <div className="relative md:-ml-20">
            {/* Glass Circle Border */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-lg"></div>
            {/* Flip Card Container */}
            <div
              className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden"
              style={{ perspective: 1000 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/profile.png"
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                {/* Back Side */}
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src="/altProfile.png"
                    alt="Alternate Profile Picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center md:items-start">
            <TextGenerateEffect
              className="text-center md:text-left text-[40px] md:text-5xl lg:text-6xl"
              words="Hi, I am Laxmipathi"
            />

            <p className="text-center md:text-left md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
              Bringing Innovative Game Concepts to Life.
            </p>

            <a href="#projects">
              <MagicButton
                title="Share my Work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
