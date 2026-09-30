import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import logoImg from '../assets/aura estate logo.png';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Properties', href: '#properties' },
  { label: 'Services', href: '#services' },
  { label: 'Track Record', href: '#track-record' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact & Tour', href: '#contact' },
];

export default function Navbar({ favoriteCount = 0, onOpenWishlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md py-4 shadow-md border-b border-slate-200' // Increased padding slightly on scroll
        : 'bg-[#f8fafc]/90 backdrop-blur-sm py-5' // Increased vertical padding for more breathing room
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Container */}
        <a
          href="#hero"
          className="flex items-center group transition-transform hover:scale-[1.02] h-16 w-48 sm:h-20 sm:w-64 relative overflow-visible"
        >
          <img
            src={logoImg}
            alt="Aura Estates Logo"
            /* 
              FIXES APPLIED BELOW:
              - Added 'scale-150' on mobile and 'sm:scale-[1.75]' on desktop to bypass transparent image cropping edges.
              - Added 'origin-left' so it expands outward to the right, staying aligned with your screen margins.
            */
            className="w-full h-full object-contain object-left scale-150 sm:scale-[1.75] origin-left drop-shadow-sm group-hover:scale-[1.8] transition-transform"
          />
        </a>

        {/* Desktop Links (Black Font Color) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-black uppercase tracking-wider text-black hover:text-[#0052ff] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#0052ff] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-black hover:text-[#0052ff] hover:border-[#0052ff]/40 transition-all cursor-pointer shadow-sm"
            aria-label="View saved properties"
            title="Saved Properties"
          >
            <Heart size={18} />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0052ff] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Schedule Viewing
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-black hover:text-[#0052ff] transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown (Black Font Color) */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white mx-4 mt-3 rounded-2xl p-6 space-y-4 border border-slate-200 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-black uppercase tracking-wider text-black hover:text-[#0052ff] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-5 py-3 rounded-xl bg-[#0052ff] text-white font-bold text-xs uppercase tracking-wider shadow-md mt-4"
          >
            Schedule Private Tour
          </a>
        </div>
      </div>
    </nav>
  );
}
