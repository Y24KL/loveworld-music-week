"use client";

import { useState, useEffect } from "react";
import { motion as motionClient } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  // ✅ FIXED DATE TARGET: June 21, 2026
  const targetDate = new Date("2026-06-21T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const countdownUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full min-h-screen bg-brand-dark overflow-hidden flex items-center justify-center pt-24">
      
      {/* Cinematic Ambient Swirls (Mirroring image light trails) */}
      {/* 1. Electric Blue Top-Left Swirl */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-blue/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      
      {/* 2. Vibrant Magenta Bottom-Right Swirl (New color integration) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-brand-magenta/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      
      {/* Overlay Mesh Pattern (Retained for texture) */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Subtle Gold Subtitle Badge (Refined gold color) */}
        <motionClient.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-brand-gold uppercase tracking-[0.25em] text-xs md:text-sm font-semibold border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 rounded-full mb-6"
        >
          A Global Celebration of Sound & Spirit
        </motionClient.p>

        {/* Cinematic Main Heading - Split colors mirroring Image (Blue + Gold) */}
        <motionClient.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight leading-[1.1] mb-6"
        >
          {/* Mirroring LMW in Blue */}
          <span className="text-brand-blue drop-shadow-[0_4px_15px_rgba(10,132,255,0.3)]">LoveWorld Music</span>
          <br className="sm:hidden" />
          {/* Mirroring WEEK in Gold */}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-gold-light via-brand-gold to-brand-gold-dark drop-shadow-[0_2px_10px_rgba(239,193,79,0.15)]">
            Week
          </span>
        </motionClient.h1>

        {/* Event Narrative Description (Clean text) */}
        <motionClient.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Empowering global ministries with standard-setting resources, divine orchestration, and pristine digital assets. Get fully synchronized with the global flow.
        </motionClient.p>

        {/* Electric Premium Countdown Module (Vibrant Blue/Magenta accent) */}
        {isMounted && (
          <motionClient.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-4 gap-3 sm:gap-6 bg-white/[0.015] backdrop-blur-md border border-brand-blue/20 p-4 sm:p-8 rounded-2xl sm:rounded-3xl max-w-2xl w-full mb-12 shadow-[0_10px_50px_rgba(10,132,255,0.15)]"
          >
            {countdownUnits.map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-1 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  {String(unit.value).padStart(2, "0")}
                </span>
                {/* Labels are vibrant gold like the image notes */}
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-gold font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </motionClient.div>
        )}

        {/* Direct Action Navigation Buttons (Classic Golden Opportunity maintained) */}
        <motionClient.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link 
            href="/resources" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-black font-bold rounded-full shadow-[0_4px_20px_rgba(239,193,79,0.3)] hover:shadow-[0_4px_30px_rgba(239,193,79,0.5)] hover:-translate-y-0.5 transition-all duration-200 group text-sm md:text-base"
          >
            Access Resource Center 
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/give" 
            className="w-full sm:w-auto px-8 py-4 bg-white/[0.03] border border-white/10 hover:border-brand-magenta text-white font-medium rounded-full hover:bg-brand-magenta/15 transition-all duration-200 text-sm md:text-base"
          >
            Partner with LMM/LFAD
          </Link>
        </motionClient.div>
      </div>
    </section>
  );
}