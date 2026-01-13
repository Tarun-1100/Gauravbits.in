import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { SiKaggle, SiMedium } from "react-icons/si";
import DataHero3D from "../components/DataHero3D";

const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { Icon: FaGithub, label: "GitHub", href: "#" },
  { Icon: SiKaggle, label: "Kaggle", href: "#" },
  { Icon: SiMedium, label: "Medium", href: "#" },
];

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => ["Data Engineer", "ML Engineer", "Data Architect"],
    []
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1500);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 30 : 70);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#16213e] to-[#0f3460]"
    >
      {/* Tech grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00d9ff 1px, transparent 1px),
              linear-gradient(to bottom, #00d9ff 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* 3D Background */}
      <DataHero3D />

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#00d9ff] opacity-50" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#ff6b35] opacity-50" />

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 flex items-center">
        <div className="w-full">
          {/* Status bar */}
          <motion.div
            className="mb-8 flex items-center gap-3 text-[#00d9ff] font-mono text-sm"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-2 h-2 bg-[#00d9ff] rounded-full animate-pulse" />
            <span>SYSTEM ONLINE</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00d9ff] to-transparent" />
          </motion.div>

          {/* Main content */}
          <div className="max-w-4xl">
            {/* Typing role */}
            <motion.div
              className="mb-4 font-mono text-2xl md:text-3xl lg:text-4xl text-[#ff6b35] min-h-[3rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              &gt; {roles[index].substring(0, subIndex)}
              <span className="animate-pulse">_</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="text-white">TARUN</span>
              <br />
              <span className="bg-gradient-to-r from-[#00d9ff] via-[#9d4edd] to-[#ff6b35] text-transparent bg-clip-text">
                KUMAR
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              className="space-y-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00d9ff] mt-2 rounded-full" />
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Building <span className="text-[#00d9ff] font-semibold">scalable data infrastructure</span> that processes terabytes of data daily
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#9d4edd] mt-2 rounded-full" />
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Designing <span className="text-[#9d4edd] font-semibold">ML pipelines</span> that turn raw data into predictive insights
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#ff6b35] mt-2 rounded-full" />
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Optimizing <span className="text-[#ff6b35] font-semibold">real-time analytics</span> for data-driven decision making
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#9d4edd] text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10">VIEW PROJECTS</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </a>
              <a
                href="/Resume.pdf"
                download
                className="px-8 py-4 border-2 border-[#00d9ff] text-[#00d9ff] font-bold rounded-lg hover:bg-[#00d9ff] hover:text-black transition-all"
              >
                DOWNLOAD CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00d9ff] hover:border-[#00d9ff] transition-all hover:scale-110"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d9ff] via-[#9d4edd] to-[#ff6b35]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.3, duration: 1.5 }}
      />
    </section>
  );
});

export default Home;
