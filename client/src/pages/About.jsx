import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.13,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const floatIn = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="flex items-center justify-center min-h-[70vh] px-4 sm:px-10 lg:px-20"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="
          flex flex-col md:flex-row 
          items-center justify-center 
          gap-10 md:gap-30 w-full max-w-5xl
        "
      >
        <motion.div variants={floatIn} className="flex-shrink-0 mb-8 md:mb-0">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px 0px #eaaa3c55",
                "0 0 24px 8px #eaaa3c99",
                "0 0 0px 0px #eaaa3c55",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-44 h-44 md:w-60 md:h-60 rounded-full flex items-center justify-center ring-4 ring-[#eaaa3c]/60"
          >
            <img
              src="/assets/icons/profile.png"
              alt="Profile"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg bg-white"
            />
          </motion.div>
        </motion.div>
        {/* Content */}
        <div className="md:w-3/5 w-full text-center md:text-left flex flex-col items-center md:items-start">
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[28px] md:text-[52px] font-extrabold mb-4 leading-tight text-gray-900"
          >
            I’m a Web Developer
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base md:text-lg text-gray-700 mb-8 max-w-xl"
          >
            I’m a Junior Web Developer who’s truly passionate about crafting
            beautiful, user-focused websites and breathing life into designs
            through code.
            <br />I built this website to document various programming
            techniques.
          </motion.p>
          <motion.a
            variants={fadeUp}
            custom={3}
            href="https://bd-portfolio-real.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-amber-300 hover:bg-[#eaaa3c] transition-colors duration-300 px-7 py-3 rounded-3xl font-bold text-white text-lg shadow-md hover:scale-105 active:scale-95">
              Portfolio
            </button>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
