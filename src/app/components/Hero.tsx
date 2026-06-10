"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ShieldCheck, Cpu, Radio, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Target: June 21, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-06-21T00:00:00").getTime();

    const calculateTime = () => {
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

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen relative font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* GLOBAL CINEMATIC BACKDROP GLOWS (Updated to tally with logo) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#D500F9]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950/40 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* 1. REPLACED LOGO with your cinematic image */}
          <Image
            src="/LOVEWORLD_MUSIC_LOGO-removebg-preview.jpg" // Assumes you placed image_9.png here and renamed
            alt="LoveWorld Music Week Logo"
            width={240} // Scaled to look premium in header
            height={80} // Scaled to look premium in header
            className="h-16 w-auto object-contain z-10"
            priority
          />

          <nav className="flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#achievements" className="hover:text-white transition-colors">Vision</a>
            <Link href="/give" className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-full transition-all text-xs tracking-wider uppercase shadow-lg shadow-amber-500/10">
              Give
            </Link>
          </nav>
        </div>
      </header>

      {/* SECTION 1: ELEVATED HERO VIEW */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-24 relative">
        <div className="text-center max-w-4xl space-y-6 z-10 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-xs font-semibold tracking-widest text-amber-400 uppercase backdrop-blur-sm animate-fade-in">
            <Sparkles size={12} /> A Global Celebration of Sound & Spirit
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none py-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">LoveWorld</span>
            <br />
            {/* 3. TAILORED COLORS: Title gradient gold/magenta/sapphire, drop shadow sapphire */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#D500F9] to-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Music Week
            </span>
          </h1>

          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed font-normal">
            Empowering global ministries with standard-setting resources, divine orchestration, and pristine digital assets. Get fully synchronized with the global flow.
          </p>

          {/* DYNAMIC COUNTDOWN BOX */}
          <div className="pt-6 w-full max-w-2xl">
            <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex justify-around items-center text-center">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-20">
                  <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 font-mono tracking-tight">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500/70 mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ANCHOR CTA ACTION CONTROLS */}
          <div className="pt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#about" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all font-semibold flex items-center justify-center gap-2 group text-sm">
              Explore Vision <ChevronDown size={16} className="text-neutral-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase">Scroll to Discover</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* SECTION 2: WHAT IT'S ALL ABOUT */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto relative z-20 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            {/* 3. TAILORED COLOR: context text to Magenta */}
            <p className="text-xs uppercase font-bold tracking-widest text-[#D500F9]">The Context</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              An Alignment of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Sound & Purpose</span>
            </h2>
          </div>
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-xl space-y-6 text-neutral-300 leading-relaxed text-base md:text-lg">
            <p>
              LoveWorld Music Week is a divinely inspired by our Man of God, Rev.Dr Chris Oyakhilome Dsc.Dsc.DD to standardize, elevate, and align spiritual music production with ultimate excellence. It isn’t merely an assembly of creators—it is an active spiritual laboratory where divine blueprints meet state-of-the-art technological systems.
            </p>
            <p className="border-l-2 border-amber-500/40 pl-6 italic text-neutral-400 text-sm md:text-base">
              "We are deploying pristine digital assets and structured administrative architectures to ensure the gospel’s message maintains unmatched global broadcasting authority."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT IT PLANS TO ACHIEVE */}
      <section id="achievements" className="py-32 bg-neutral-900/30 border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-xs uppercase font-bold tracking-widest text-amber-500">Core Objectives</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Strategic Milestones</h2>
            <p className="text-neutral-400 text-sm">Deploying three specific, highly integrated digital frameworks during this cycle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PILLAR 1 - Sapphire Blue (Globe) */}
            <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 p-8 rounded-2xl flex flex-col space-y-4 hover:border-blue-500/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Radio size={22} />
              </div>
              <h3 className="text-xl font-bold tracking-wide">Global Synchronization</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Unifying administrative models across all regional chapters, anchoring them to a synchronized release schedule for absolute distribution impact.
              </p>
            </div>

            {/* PILLAR 2 - Magenta (Staff) */}
            <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 p-8 rounded-2xl flex flex-col space-y-4 hover:border-[#D500F9]/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#D500F9]/10 border border-[#D500F9]/20 flex items-center justify-center text-[#D500F9] group-hover:scale-110 transition-transform">
                <Cpu size={22} />
              </div>
              <h3 className="text-xl font-bold tracking-wide">Pristine Asset Infrastructure</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Constructing secure, lightning-fast technical repositories to give administrators instant access to lossless audio stems and unified metadata masteries.
              </p>
            </div>

            {/* PILLAR 3 - Gold (Text/Metal) */}
            <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 p-8 rounded-2xl flex flex-col space-y-4 hover:border-amber-500/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-bold tracking-wide">Ecosystem Security</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Embedding automated verification logic and secure transactional parameters to maintain absolute operational integrity across digital touchpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ACTIONS AND CALL TO ENGAGEMENT */}
      <section className="py-32 px-6 max-w-5xl mx-auto relative z-20 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">Access Channels</h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto">
            Choose your deployment vector below to synchronize with ongoing preparations or Partner with the LMM/LFAD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* LINK A */}
          {/* 3. TAILORED COLOR: subtle sapphire glow to balance with gold */}
          <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between items-start space-y-6 shadow-2xl shadow-blue-500/5">
            <div className="space-y-2">
              <h4 className="text-lg font-bold">Resource Center</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Download pristine audio elements, media kits, and official administrative blueprints for regional deployment.
              </p>
            </div>
            {/* 2. FIXED: access button now leads to the resource center route */}
            <Link href="/resources" className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all font-bold flex items-center justify-center gap-2 text-sm group">
              Access Resource Center <ArrowUpRight size={16} className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>

          {/* LINK B - Financial Partnership (Already Gold) */}
          <div className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between items-start space-y-6 shadow-xl shadow-amber-500/5">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-amber-400">Partner with Us</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Sow transactional partnership seeds securely routed through the Espees Gateway to fuel global expansion infrastructures.
              </p>
            </div>
            <Link href="/give" className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-xl shadow-amber-500/10">
              Partner with LMM/LFAD <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* COMPACT FOOTER */}
      <footer className="py-8 border-t border-white/5 text-center text-xs text-neutral-600 tracking-wider uppercase relative z-20">
        © 2026 LoveWorld Music Ministry. All Rights Reserved.
      </footer>
    </div>
  );
}
