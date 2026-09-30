import { useState } from 'react';
import { Search, MapPin, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { agencyStats } from '../data/properties';

export default function HeroSection({ onSearchFilter }) {
  const [searchStatus, setSearchStatus] = useState('All');
  const [searchCity, setSearchCity] = useState('All');
  const [searchCategory, setSearchCategory] = useState('All');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    onSearchFilter({
      status: searchStatus,
      city: searchCity,
      category: searchCategory,
    });

    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-[#f8fafc] pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Hero Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Black Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-4xl sm:text-6xl font-black text-black leading-tight tracking-tight">
              Find Your Sanctuary of <span className="text-[#0052ff]">Luxury Living</span>
            </h1>

            <p className="text-base sm:text-lg text-black font-medium max-w-xl leading-relaxed">
              Aura Estates curates the world’s most prestigious luxury properties, sky penthouses, and private waterfront compounds for discerning clients.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#properties"
                className="px-7 py-3.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                Browse All Estates
                <ArrowRight size={16} className="!text-white" />
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-[#0052ff] text-black hover:text-white border border-slate-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Schedule Private Tour
              </a>
            </div>
          </div>

          {/* Right Column: Full-Width Hero Image Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 rounded-3xl border border-slate-300 shadow-xl overflow-hidden group">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
                  alt="Bel Air Crest Sanctuary"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0052ff] !text-white text-xs font-black shadow-md">
                    $18,500,000
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200">
                  <h4 className="text-sm font-black text-black">The Bel Air Crest Sanctuary</h4>
                  <p className="text-xs text-black font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#0052ff]" /> Bel Air, Los Angeles, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Property Search Filter Widget */}
        <div className="bg-white rounded-3xl p-6 border border-slate-300 shadow-xl max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            {['All', 'Buy', 'Rent'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSearchStatus(st)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  searchStatus === st
                    ? 'bg-[#0052ff] !text-white shadow-md'
                    : 'bg-white text-black hover:bg-[#0052ff] hover:text-white border border-slate-300'
                }`}
              >
                {st === 'All' ? 'All Estates' : st === 'Buy' ? 'For Sale' : 'For Lease'}
              </button>
            ))}
          </div>

          <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Location Selector */}
            <div className="bg-white border border-slate-300 rounded-2xl p-3 flex items-center gap-3">
              <MapPin size={18} className="text-[#0052ff] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] uppercase font-black text-black">Location</label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent text-black text-xs font-black outline-none cursor-pointer"
                >
                  <option value="All">All Locations</option>
                  <option value="Los Angeles">Los Angeles / Bel Air</option>
                  <option value="New York">New York / Tribeca</option>
                  <option value="Miami">Miami Beach / Star Island</option>
                  <option value="Aspen">Aspen / Red Mountain</option>
                  <option value="Malibu">Malibu / Carbon Beach</option>
                  <option value="Chicago">Chicago / Downtown</option>
                </select>
              </div>
            </div>

            {/* Architecture Selector */}
            <div className="bg-white border border-slate-300 rounded-2xl p-3 flex items-center gap-3">
              <Building2 size={18} className="text-[#0052ff] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] uppercase font-black text-black">Architecture</label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full bg-transparent text-black text-xs font-black outline-none cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Villas">Villas & Mansions</option>
                  <option value="Penthouses">Penthouses & Sky Res.</option>
                  <option value="Waterfront">Waterfront Estates</option>
                </select>
              </div>
            </div>

            {/* Title Clearance */}
            <div className="bg-white border border-slate-300 rounded-2xl p-3 hidden sm:flex items-center gap-3">
              <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] uppercase font-black text-black">Title Clearance</span>
                <span className="text-xs font-black text-emerald-700">100% Title Verified</span>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
            >
              <Search size={16} className="!text-white" />
              Explore Listings
            </button>
          </form>
        </div>

        {/* Agency Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
          {agencyStats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-300 text-center shadow-sm">
              <p className="text-2xl sm:text-3xl font-black text-black">{stat.value}</p>
              <p className="text-[11px] text-black uppercase tracking-wider font-extrabold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
