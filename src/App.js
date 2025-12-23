import React, { useState, useEffect } from 'react';

// --- 1. FIREBASE SETUP (Safe Mode - No Crash) ---
// We simulate the DB for the UI demo so it NEVER crashes on the first load.
// You will add your keys later.
const mockUser = null;

// --- 2. ICONS (Lucide Style) ---
const Icons = {
  Menu: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4 text-cyan-400 fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  Shield: () => (
    <svg
      className="w-8 h-8 text-cyan-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  Chart: () => (
    <svg
      className="w-8 h-8 text-blue-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Book: () => (
    <svg
      className="w-8 h-8 text-purple-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      ></path>
    </svg>
  ),
  Lock: () => (
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
};

// --- 3. UI COMPONENTS ---

function Navbar({ onLogin }) {
  return (
    <nav className="fixed w-full z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="font-bold text-white text-xl">E</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Exally
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-cyan-400 transition">
            Mocks
          </a>
          <a href="#" className="hover:text-cyan-400 transition">
            Security
          </a>
          <a href="#" className="hover:text-cyan-400 transition">
            Pricing
          </a>
        </div>
        <button
          onClick={onLogin}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:scale-105 hover:border-cyan-500/50 hover:shadow-cyan-500/20"
        >
          Student Login <Icons.ArrowRight />
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden bg-[#0B0F19]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          v2.0 Live: Anti-Cheat Enabled
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
          Master Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Economics Exams
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          The only assessment platform with 84+ Premium Mocks, complex
          Table-Data support, and forensic-grade security.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:-translate-y-1">
            Start Free Mock
          </button>
          <button className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
            View Features
          </button>
        </div>

        {/* 3D Dashboard Preview */}
        <div className="relative mx-auto max-w-4xl bg-[#131825]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl transform hover:scale-[1.01] transition duration-700">
          <div className="bg-[#0B0F19] rounded-xl p-6 border border-white/5 grid md:grid-cols-4 gap-4">
            <div className="col-span-1 bg-white/5 rounded-lg p-4 border border-white/5">
              <div className="h-2 w-12 bg-gray-600 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-700 rounded"></div>
                <div className="h-2 w-2/3 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="col-span-3 bg-white/5 rounded-lg p-4 border border-white/5">
              <div className="flex justify-between mb-4">
                <div className="h-2 w-24 bg-gray-600 rounded"></div>
                <div className="h-2 w-16 bg-cyan-500/50 rounded"></div>
              </div>
              <div className="h-32 bg-[#0B0F19] rounded border border-white/5 flex items-center justify-center text-gray-700 text-xs">
                Complex Table Question Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group p-8 bg-[#131825] rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-2 duration-300">
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-cyan-500/30">
      <Navbar
        onLogin={() => alert('We will connect Firebase here in the next step!')}
      />

      {view === 'landing' && (
        <>
          <Hero />

          <div className="bg-[#0B0F19] py-24 px-6 relative border-t border-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Icons.Book />}
                  title="84+ Premium Mocks"
                  desc="Hand-crafted questions that mirror the difficulty of the actual exam."
                />
                <FeatureCard
                  icon={<Icons.Shield />}
                  title="Device-Lock Security"
                  desc="Our 'Digital Tattoo' binds accounts to devices, ensuring zero piracy."
                />
                <FeatureCard
                  icon={<Icons.Chart />}
                  title="Deep Analytics"
                  desc="Visualize your growth curve and identify weak spots instantly."
                />
              </div>
            </div>
          </div>

          <footer className="border-t border-white/5 py-12 bg-[#080B14] text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Exally. Designed for Excellence.
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
