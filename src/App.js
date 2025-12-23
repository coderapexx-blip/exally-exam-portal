import React, { useState, useEffect } from 'react';

// --- 1. INTERNAL ICONS (No external setup needed) ---
// I replaced FontAwesome with SVGs so they never break.
const Icons = {
  Logo: () => <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
  Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  Check: () => <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>,
  Play: () => <svg className="w-5 h-5 text-violet-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>,
  Clock: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ArrowRight: () => <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  Layers: () => <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  Laptop: () => <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  ChartPie: () => <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
  Atom: () => <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  ChartLine: () => <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
  Landmark: () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>,
  GradCap: () => <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
};

// --- 2. COMPONENTS ---

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="bg-violet-100 p-1.5 rounded-lg"><Icons.Logo /></div>
            <span className="font-bold text-2xl tracking-tight text-violet-900">Exally</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-gray-600 hover:text-violet-600 font-medium transition">Features</a>
            <a href="#exams" className="text-gray-600 hover:text-violet-600 font-medium transition">Exams</a>
            <a href="#pricing" className="text-gray-600 hover:text-violet-600 font-medium transition">Pricing</a>
            <button className="text-gray-600 hover:text-violet-600 font-medium transition">Log in</button>
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full font-medium transition shadow-lg shadow-violet-500/30">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-violet-600 focus:outline-none p-2">
              <Icons.Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#features" className="block px-3 py-3 text-gray-600 font-medium hover:bg-violet-50 hover:text-violet-600 rounded-md">Features</a>
            <a href="#exams" className="block px-3 py-3 text-gray-600 font-medium hover:bg-violet-50 hover:text-violet-600 rounded-md">Exams</a>
            <a href="#pricing" className="block px-3 py-3 text-gray-600 font-medium hover:bg-violet-50 hover:text-violet-600 rounded-md">Pricing</a>
            <div className="border-t border-gray-100 my-2 pt-2">
              <button className="block w-full text-center px-3 py-3 text-gray-600 font-medium hover:text-violet-600">Log in</button>
              <button className="block w-full text-center px-3 py-3 mt-2 bg-violet-600 text-white rounded-lg font-medium shadow-md">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-50">
      {/* Background Blobs (Using Tailwind Colors) */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-200 rounded-full blur-[100px] opacity-50"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-80 h-80 bg-amber-100 rounded-full blur-[100px] opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-sm font-semibold mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
              New CUET 2025 Mocks Live!
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Stop Guessing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">Start Practicing.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Access curated Previous Year Questions (PYQs) and smart Mock Tests designed to mimic the real exam environment. Boost your CUET score with Exally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-500/40 transition transform hover:-translate-y-1">
                Start Free Mock Test
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 hover:border-violet-200 hover:bg-violet-50 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 group">
                <span className="text-violet-500 group-hover:scale-110 transition-transform"><Icons.Play /></span>
                How it Works
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm font-medium">
              <span className="flex items-center gap-2"><Icons.Check /> No Credit Card</span>
              <span className="flex items-center gap-2"><Icons.Check /> 14-Day Free Trial</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Main Card */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transform hover:-translate-y-2 transition duration-700">
                <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-auto text-xs font-mono text-gray-400">mock_test_01.exe</div>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-violet-100 text-violet-700 text-xs px-2 py-1 rounded font-bold">Question 14/50</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1"><Icons.Clock /> 45:20 left</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border rounded-lg hover:border-violet-500 cursor-pointer transition"><div className="h-2 bg-gray-200 rounded w-1/2"></div></div>
                    <div className="p-3 border border-violet-500 bg-violet-50 rounded-lg cursor-pointer transition relative">
                      <div className="h-2 bg-violet-200 rounded w-2/3"></div>
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">✓</div>
                    </div>
                    <div className="p-3 border rounded-lg hover:border-violet-500 cursor-pointer transition"><div className="h-2 bg-gray-200 rounded w-1/3"></div></div>
                    <div className="p-3 border rounded-lg hover:border-violet-500 cursor-pointer transition"><div className="h-2 bg-gray-200 rounded w-1/2"></div></div>
                  </div>
                  <button className="mt-auto w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800">Save & Next</button>
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -right-8 top-12 bg-white p-4 rounded-xl shadow-xl border border-gray-100 w-40 animate-bounce" style={{animationDuration: '3s'}}>
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">94</div>
                    <div>
                       <div className="text-[10px] text-gray-500">Accuracy</div>
                       <div className="text-sm font-bold text-gray-800">High</div>
                    </div>
                 </div>
                 <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[94%]"></div>
                 </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -left-8 bottom-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 w-44 animate-bounce" style={{animationDuration: '4s'}}>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                       <span className="text-lg">🏆</span>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-500">All India Rank</div>
                       <div className="text-sm font-bold text-gray-800">#420</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 bg-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-violet-600 font-semibold tracking-wide uppercase text-sm mb-2">Why Exally?</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Toolkit for Exam Success</h3>
                <p className="text-gray-600 text-lg">We don't just give you questions; we give you the analytics and environment to master them.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6"><Icons.Layers /></div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Topic-wise PYQs</h4>
                    <p className="text-gray-600">Access previous year questions sorted by chapter. Master concepts one by one.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-500 mb-6"><Icons.Laptop /></div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Real Exam Interface</h4>
                    <p className="text-gray-600">Our mock test interface mimics NTA platforms exactly. Get comfortable before exam day.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-500 mb-6"><Icons.ChartPie /></div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h4>
                    <p className="text-gray-600">Identify your weak areas with simple, actionable insights. Know exactly where to focus.</p>
                </div>
            </div>
        </div>
    </section>
  );
}

function Exams() {
  const cards = [
    { title: "CUET UG Science", sub: "PCM, PCB & General Test", color: "from-violet-600 to-indigo-500", icon: <Icons.Atom /> },
    { title: "CUET UG Commerce", sub: "Accts, BST, Econ & GT", color: "from-amber-500 to-orange-400", icon: <Icons.ChartLine /> },
    { title: "CUET UG Humanities", sub: "Hist, Pol Sci, Geog", color: "from-emerald-500 to-teal-400", icon: <Icons.Landmark /> },
    { title: "CUET PG", sub: "MBA, MA, MSc & More", color: "from-pink-500 to-rose-400", icon: <Icons.GradCap /> },
  ];

  return (
    <section id="exams" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div className="max-w-2xl">
                    <h3 class="text-3xl font-bold text-gray-900 mb-4">Exams We Cover</h3>
                    <p class="text-gray-600">Specialized content for CUET UG (All Streams) and CUET PG Entrance.</p>
                </div>
                <button className="hidden md:inline-flex items-center font-semibold text-violet-600 hover:text-violet-700 mt-4 md:mt-0">
                    View All Exams <Icons.ArrowRight />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                  <div key={idx} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-violet-500 transition cursor-pointer shadow-sm hover:shadow-md">
                      <div className={`h-24 bg-gradient-to-r ${card.color}`}></div>
                      <div className="p-6">
                          <div className="w-12 h-12 bg-white rounded-lg shadow-md -mt-12 mb-4 flex items-center justify-center border border-gray-100 text-violet-600">
                              {card.icon}
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h4>
                          <p className="text-sm text-gray-500 mb-4">{card.sub}</p>
                          <div className="flex items-center text-xs font-medium text-gray-500 gap-4">
                              <span>50+ Mocks</span>
                              <span>Topic PYQs</span>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Icons.Logo />
                        <span className="text-2xl font-bold">Exally</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        The focused preparation platform for CUET UG & PG. Smart mocks, detailed analytics, and relevant practice.
                    </p>
                </div>
                
                {['Platform', 'Company'].map((head) => (
                   <div key={head}>
                      <h4 className="text-lg font-semibold mb-6">{head}</h4>
                      <ul className="space-y-3 text-gray-400 text-sm">
                          {['Mock Tests', 'Pricing', 'About Us', 'Contact'].map(link => (
                             <li key={link}><a href="#" className="hover:text-white transition">{link}</a></li>
                          ))}
                      </ul>
                   </div>
                ))}

                <div>
                    <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
                    <form className="flex gap-2">
                        <input type="email" placeholder="Your email" className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-violet-500" />
                        <button className="bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-lg transition"><Icons.ArrowRight /></button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-500 text-sm">© 2025 Exally Inc. All rights reserved.</p>
                <div className="flex gap-6 text-gray-500 text-sm">
                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
  );
}

// --- MAIN APP CONTROLLER ---

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Exams />
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-violet-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to crush your goals?</h2>
                    <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">Join a growing community of serious aspirants. First mock test is on us.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg">Start Practicing Now</button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}