import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Smartphone,
  PieChart,
  Repeat,
  Lock,
  ChevronRight
} from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-neon rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(23,229,150,0.4)]">
          <Layers size={18} className="text-navy" />
        </div>
        <span className="text-xl font-bold tracking-tight">LUMINARY</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <a href="#" className="hover:text-neon transition-colors">Markets</a>
        <a href="#" className="hover:text-neon transition-colors">Features</a>
        <a href="#" className="hover:text-neon transition-colors">Security</a>
        <a href="#" className="hover:text-neon transition-colors">Company</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm font-medium hover:text-neon transition-colors">Sign In</button>
        <button className="bg-neon text-navy font-bold px-6 py-2.5 rounded-full text-sm hover:brightness-110 transition-all shadow-[0_0_20px_rgba(23,229,150,0.2)]">
          Get Started
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden">
    <div className="grid-lines absolute inset-0 -z-10" />
    <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10" />
    
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
          </span>
          Next Gen Trading
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
          Invest in the <br />
          <span className="neon-text">Future of Money</span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl leading-relaxed">
          The ultimate platform for modern investors. Manage your crypto portfolio with institutional-grade tools, real-time analytics, and unparalleled security.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-neon text-navy font-bold px-8 py-4 rounded-full flex items-center gap-2 group hover:scale-105 transition-transform shadow-[0_0_30px_rgba(23,229,150,0.3)]">
            Start Investing <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="glass px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
            Watch Demo
          </button>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-navy bg-navy-lighter flex items-center justify-center text-[10px] font-bold overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-white/50">
            <span className="text-white font-bold">168K+</span> users already joined
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="animate-float relative z-10">
          <div className="w-full max-w-[320px] aspect-[9/19] glass rounded-[3rem] border-white/20 p-4 shadow-2xl mx-auto overflow-hidden relative">
            {/* Mock Phone UI */}
            <div className="w-full h-full bg-navy-darker rounded-[2.2rem] overflow-hidden flex flex-col">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                  <div className="w-20 h-1 rounded-full bg-white/10" />
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-white/40">Total Balance</p>
                  <p className="text-2xl font-bold">$42,920.50</p>
                  <div className="inline-block px-2 py-0.5 rounded-md bg-neon/20 text-neon text-[10px] font-bold">+12.5%</div>
                </div>
                <div className="h-24 w-full bg-gradient-to-t from-neon/20 to-transparent rounded-xl border border-neon/20 relative flex items-end overflow-hidden">
                   <svg className="w-full h-12" viewBox="0 0 100 20">
                     <path d="M0 20 Q 25 5, 50 15 T 100 0" fill="none" stroke="#17e596" strokeWidth="2" />
                   </svg>
                </div>
                <div className="space-y-4">
                   {[
                    {name: 'Bitcoin', price: '$64,210', icon: '₿', color: 'orange'},
                    {name: 'Ethereum', price: '$3,410', icon: 'Ξ', color: 'blue'},
                    {name: 'Solana', price: '$145', icon: 'S', color: 'purple'}
                   ].map((coin) => (
                     <div key={coin.name} className="flex items-center justify-between glass p-3 rounded-2xl border-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs`}>{coin.icon}</div>
                          <div>
                            <p className="text-xs font-bold">{coin.name}</p>
                            <p className="text-[10px] text-white/40">Holding 0.23</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold">{coin.price}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
          {/* Floating Neon Rings */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-neon/30 animate-orbit -z-10" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full border border-neon/10 animate-orbit -z-10" style={{animationDirection: 'reverse'}} />
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 px-6 relative bg-navy-darker/50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-bold">Built for the <span className="neon-text">Modern Trader</span></h2>
        <p className="text-white/50 max-w-2xl mx-auto">Access professional tools usually reserved for hedge funds. Clean, powerful, and blazing fast.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon/10 group-hover:text-neon transition-colors">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4">Fort Knox Security</h3>
          <p className="text-white/50 text-sm leading-relaxed">Multi-sig wallets and cold storage systems to keep your digital assets safe from any threat.</p>
        </div>
        
        <div className="glass p-8 rounded-3xl border-neon/50 shadow-[0_0_40px_rgba(23,229,150,0.1)] hover:border-neon transition-all group relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-neon/10 blur-3xl" />
          <div className="w-12 h-12 rounded-2xl bg-neon flex items-center justify-center mb-6 text-navy">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4">Advanced Analytics</h3>
          <p className="text-white/70 text-sm leading-relaxed">Deep dive into market sentiment, on-chain data, and historical performance with one click.</p>
          <div className="mt-8 flex items-center gap-2 text-neon text-sm font-bold cursor-pointer hover:gap-3 transition-all">
            Learn More <ArrowRight size={16} />
          </div>
        </div>
        
        <div className="glass p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon/10 group-hover:text-neon transition-colors">
            <Smartphone size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4">Seamless Mobile</h3>
          <p className="text-white/50 text-sm leading-relaxed">A native mobile experience that matches the desktop power. Trade on the go without compromise.</p>
        </div>
      </div>
    </div>
  </section>
);

const ChartWidget = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="glass rounded-[3rem] p-12 border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none" />
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">Master your <br />Portfolio with <br />Live Insights</h2>
          <p className="text-white/50 mb-8 leading-relaxed">Our proprietary algorithms track the entire crypto ecosystem to give you the most accurate data possible.</p>
          <ul className="space-y-4">
            {[
              'Real-time price aggregation from 40+ exchanges',
              'Auto-compounding yield strategies',
              'Tax-loss harvesting automations'
            ].map(item => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-neon" size={20} />
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="relative glass p-6 rounded-2xl border-white/10">
          <div className="flex justify-between items-center mb-8">
             <div>
               <p className="text-sm text-white/40">LUMINARY INDEX (LMI)</p>
               <p className="text-3xl font-bold">$12,482.00</p>
             </div>
             <div className="flex gap-2">
               {['1D', '1W', '1M', '1Y', 'ALL'].map((t, i) => (
                 <button key={t} className={`px-3 py-1 rounded-md text-[10px] font-bold ${i === 2 ? 'bg-neon text-navy' : 'bg-white/5 text-white/40 hover:bg-white/10 transition-colors'}`}>
                   {t}
                 </button>
               ))}
             </div>
          </div>
          
          <div className="h-64 flex items-end gap-1">
            {[40, 55, 45, 60, 80, 70, 90, 85, 95, 100, 92, 110, 105, 120, 115, 130].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-neon/20 hover:bg-neon transition-all cursor-pointer rounded-t-sm relative group" 
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-[10px] pointer-events-none">
                  ${h*100}
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 space-y-4 hidden md:block">
            <div className="glass p-4 rounded-2xl border-white/10 animate-float shadow-xl">
              <p className="text-[10px] text-white/40 mb-1">Vol 24h</p>
              <p className="text-sm font-bold">$1.2B</p>
            </div>
            <div className="glass p-4 rounded-2xl border-white/10 animate-float shadow-xl" style={{animationDelay: '1s'}}>
              <p className="text-[10px] text-white/40 mb-1">Mkt Cap</p>
              <p className="text-sm font-bold">$42.8B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-20 border-y border-white/5 bg-navy-darker/30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
        <span className="text-2xl font-black tracking-tighter">COINBASE</span>
        <span className="text-2xl font-black tracking-tighter">BINANCE</span>
        <span className="text-2xl font-black tracking-tighter">REVOLUT</span>
        <span className="text-2xl font-black tracking-tighter">STRIPE</span>
      </div>
      <div className="mt-16 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#17e596" className="text-neon" />)}
        </div>
        <p className="text-sm text-white/50">Rated 4.9/5 by over <span className="text-white font-bold">12,000+ investors</span> worldwide</p>
      </div>
    </div>
  </section>
);

const Steps = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold mb-4">Start your Journey in <span className="neon-text">3 Minutes</span></h2>
      <p className="text-white/50">From zero to your first crypto investment in record time.</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-12 relative">
      <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {[
        { title: 'Create Account', desc: 'Secure your identity with military-grade encryption in seconds.', icon: <Lock /> },
        { title: 'Connect Bank', desc: 'Linking your assets is seamless with our direct bank integrations.', icon: <Repeat /> },
        { title: 'Automate Investing', desc: 'Set your strategy and watch your wealth grow with smart auto-buys.', icon: <Zap /> },
      ].map((step, i) => (
        <div key={i} className="text-center group">
          <div className="w-20 h-20 rounded-full glass border-white/10 mx-auto flex items-center justify-center mb-8 group-hover:neon-border transition-all relative">
            <div className="text-neon">{step.icon}</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy border border-white/10 flex items-center justify-center text-xs font-bold">{i+1}</div>
          </div>
          <h3 className="text-xl font-bold mb-4">{step.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const WhatsNew = () => (
  <section className="py-24 px-6 bg-navy-darker/80">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">What's <span className="neon-text">New?</span></h2>
          <p className="text-white/50">We ship updates every single week to stay ahead of the curve.</p>
        </div>
        
        <div className="space-y-8">
          {[
            { title: 'LuminAI Yield Prediction', desc: 'AI-driven forecasts for staking rewards across 20+ networks.', status: 'Beta' },
            { title: 'Cross-Chain Bridge 2.0', desc: 'Instant transfers between Ethereum, Solana, and Base with zero slippage.', status: 'New' },
            { title: 'Hardware Key Integration', desc: 'Use your physical security keys for an extra layer of protection.', status: 'Secure' }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 group cursor-pointer">
              <div className="w-12 h-12 rounded-full glass border-white/5 flex items-center justify-center shrink-0 group-hover:bg-neon transition-all">
                <CheckCircle2 size={24} className="text-neon group-hover:text-navy transition-colors" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold">{item.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-white/40">{item.status}</span>
                </div>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="flex items-center gap-2 font-bold text-neon hover:underline">
          View Changelog <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="relative aspect-square">
        <div className="absolute inset-0 rounded-full border border-white/5 animate-orbit" />
        <div className="absolute inset-20 rounded-full border border-neon/10 animate-orbit" style={{animationDirection: 'reverse'}} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass p-12 rounded-full border-white/10 shadow-[0_0_100px_rgba(23,229,150,0.1)]">
             <div className="w-32 h-32 rounded-3xl bg-neon flex items-center justify-center text-navy rotate-12">
                <PieChart size={64} strokeWidth={1.5} />
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-24 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon rounded-lg flex items-center justify-center">
              <Layers size={18} className="text-navy" />
            </div>
            <span className="text-xl font-bold tracking-tight uppercase">LUMINARY</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            The next generation of digital wealth management. Built for security, designed for clarity.
          </p>
          <div className="flex gap-4">
             {[Globe, Smartphone, ShieldCheck].map((Icon, i) => (
               <div key={i} className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center text-white/40 hover:text-neon hover:border-neon transition-all cursor-pointer">
                 <Icon size={18} />
               </div>
             ))}
          </div>
        </div>
        
        {[
          { title: 'Product', links: ['Markets', 'Trading', 'Analytics', 'Automations'] },
          { title: 'Resources', links: ['Documentation', 'API Reference', 'Blog', 'Changelog'] },
          { title: 'Company', links: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'] }
        ].map((col) => (
          <div key={col.title}>
            <h5 className="font-bold mb-6">{col.title}</h5>
            <ul className="space-y-4">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-neon transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-white/30">© 2024 Luminary Finance. All rights reserved.</p>
        <div className="flex gap-8 items-center">
          <p className="text-xs text-white/30 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_5px_#17e596]" /> Systems Operational
          </p>
          <p className="text-xs text-white/30">v2.4.1 (Stable)</p>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen bg-navy text-white selection:bg-neon selection:text-navy">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Features />
        <ChartWidget />
        <Steps />
        <WhatsNew />
      </main>
      <Footer />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
