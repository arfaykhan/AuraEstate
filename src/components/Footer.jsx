import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative border-t border-slate-300 bg-white pt-16 pb-12 text-black">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#0052ff] !text-white flex items-center justify-center shadow-md hover:scale-110 transition-all cursor-pointer"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={18} className="!text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="inline-block transition-transform hover:scale-[1.02]">
              <img
                src={logoImg}
                alt="Aura Estates Logo"
                className="h-12 sm:h-16 w-auto max-w-[240px] sm:max-w-[280px] object-contain drop-shadow-sm"
              />
            </a>
            <p className="text-xs text-black font-semibold max-w-sm leading-relaxed">
              Global luxury real estate advisory specializing in trophy penthouses, oceanfront compounds, and off-market architectural masterpieces.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-black font-mono font-bold">
              <span>BEVERLY HILLS</span> • <span>NEW YORK</span> • <span>MIAMI</span> • <span>ASPEN</span> • <span>LONDON</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black text-black uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs font-bold text-black">
              <li><a href="#hero" className="hover:text-[#0052ff] transition-colors">Home</a></li>
              <li><a href="#properties" className="hover:text-[#0052ff] transition-colors">Luxury Listings</a></li>
              <li><a href="#services" className="hover:text-[#0052ff] transition-colors">Client Services</a></li>
              <li><a href="#track-record" className="hover:text-[#0052ff] transition-colors">Track Record</a></li>
              <li><a href="#contact" className="hover:text-[#0052ff] transition-colors">Private Tour Request</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-black uppercase tracking-wider mb-4">Estate Portfolios</h4>
            <ul className="space-y-2 text-xs font-bold text-black">
              <li><a href="#properties" className="hover:text-[#0052ff] transition-colors">Architectural Mansions</a></li>
              <li><a href="#properties" className="hover:text-[#0052ff] transition-colors">Sky Penthouses</a></li>
              <li><a href="#properties" className="hover:text-[#0052ff] transition-colors">Deep-Water Compounds</a></li>
              <li><a href="#properties" className="hover:text-[#0052ff] transition-colors">Alpine Mountain Lodges</a></li>
              <li><a href="#properties" className="hover:text-[#0052ff] transition-colors">Off-Market Inventory</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-black uppercase tracking-wider mb-4">Private Journal</h4>
            <p className="text-xs text-black font-semibold mb-3">
              Receive confidential off-market real estate reports monthly.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-black font-bold outline-none focus:border-[#0052ff]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                {subscribed ? 'Subscribed!' : 'Join Private Journal'}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-black">
          <p>© {new Date().getFullYear()} Aura Estates Luxury Realty. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#0052ff] transition-colors cursor-pointer">Equal Housing Opportunity</span>
            <span>•</span>
            <span className="hover:text-[#0052ff] transition-colors cursor-pointer">Privacy & NDA Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
