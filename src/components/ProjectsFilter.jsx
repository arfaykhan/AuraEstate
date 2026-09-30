import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Car,
  Heart,
  Eye,
  Calendar,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { propertiesData } from '../data/properties';

const categories = ['All', 'Buy', 'Rent', 'Villas', 'Penthouses', 'Waterfront'];

export default function PropertyListings({
  searchFilters,
  onResetSearchFilters,
  onSelectProperty,
  favorites,
  onToggleFavorite,
  onBookViewing,
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const handleResetAllFilters = () => {
    setActiveCategory('All');
    if (onResetSearchFilters) {
      onResetSearchFilters();
    }
  };

  const hasActiveFilters =
    activeCategory !== 'All' ||
    (searchFilters &&
      (searchFilters.status !== 'All' ||
        searchFilters.city !== 'All' ||
        searchFilters.category !== 'All'));

  const filteredProperties = useMemo(() => {
    return propertiesData.filter((item) => {
      if (activeCategory === 'Buy' && item.status !== 'Buy') return false;
      if (activeCategory === 'Rent' && item.status !== 'Rent') return false;
      if (
        ['Villas', 'Penthouses', 'Waterfront'].includes(activeCategory) &&
        item.category !== activeCategory
      ) {
        return false;
      }

      if (searchFilters) {
        if (searchFilters.status && searchFilters.status !== 'All') {
          if (item.status !== searchFilters.status) return false;
        }
        if (searchFilters.city && searchFilters.city !== 'All') {
          if (!item.location.toLowerCase().includes(searchFilters.city.toLowerCase())) {
            return false;
          }
        }
        if (searchFilters.category && searchFilters.category !== 'All') {
          if (item.category !== searchFilters.category) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.rawPrice - a.rawPrice;
      if (sortBy === 'price-asc') return a.rawPrice - b.rawPrice;
      if (sortBy === 'sqft') return b.sqft - a.sqft;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, searchFilters, sortBy]);

  return (
    <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-black">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[#0052ff] font-black text-xs tracking-widest uppercase">
          Featured Estate Collection
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-black mt-2 mb-3">
          Exclusive Luxury Listings
        </h2>
        <p className="text-black font-semibold max-w-xl mx-auto text-sm sm:text-base">
          Browse our handpicked portfolio of trophy properties, architectural villas, and skyline penthouses.
        </p>
      </div>

      {/* Filter Tabs & Sort Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-300">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0052ff] !text-white shadow-md'
                  : 'bg-white text-black hover:bg-[#0052ff] hover:text-white border border-slate-300'
              }`}
            >
              {cat === 'Buy' ? 'For Sale' : cat === 'Rent' ? 'For Lease' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#0052ff] shrink-0" />
          <span className="text-xs text-black font-black">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-black font-bold outline-none cursor-pointer shadow-sm"
          >
            <option value="featured">Featured First</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="sqft">Living Area (Sq Ft)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-black font-extrabold mb-6">
        <span>
          Showing <strong className="text-black font-black">{filteredProperties.length}</strong> luxury estate{filteredProperties.length === 1 ? '' : 's'}
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleResetAllFilters}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 text-xs font-black hover:bg-rose-100 transition-all cursor-pointer"
          >
            <X size={14} />
            Reset All Filters
          </button>
        )}
      </div>

      {/* Property Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProperties.map((property) => {
            const isFav = favorites.includes(property.id);

            return (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#0052ff] flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={property.image}
                      alt={property.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3.5 py-1 rounded-full bg-[#0052ff] !text-white text-xs font-black uppercase tracking-wider shadow-md">
                        {property.badge || property.category}
                      </span>
                      <button
                        onClick={() => onToggleFavorite(property.id)}
                        className={`w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center transition-all cursor-pointer ${
                          isFav ? 'text-rose-600 bg-rose-50 border-rose-300' : 'text-black hover:text-rose-600'
                        }`}
                        title={isFav ? 'Saved' : 'Save to Wishlist'}
                      >
                        <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-xl font-black text-black">
                          {property.price}
                        </span>
                        {property.pricePeriod && (
                          <span className="text-xs text-black font-bold ml-1">
                            {property.pricePeriod}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-blue-100 text-[#0052ff]">
                        {property.status === 'Buy' ? 'For Sale' : 'For Lease'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3
                        onClick={() => onSelectProperty(property)}
                        className="text-lg font-black text-black mb-1.5 hover:text-[#0052ff] transition-colors cursor-pointer"
                      >
                        {property.title}
                      </h3>
                      <p className="flex items-center gap-1.5 text-xs text-black font-bold">
                        <MapPin size={14} className="text-[#0052ff] shrink-0" />
                        {property.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-200 text-center text-black">
                      <div>
                        <Bed size={16} className="mx-auto text-black mb-0.5" />
                        <span className="text-xs font-black">{property.beds} Beds</span>
                      </div>
                      <div>
                        <Bath size={16} className="mx-auto text-black mb-0.5" />
                        <span className="text-xs font-black">{property.baths} Baths</span>
                      </div>
                      <div>
                        <Maximize2 size={16} className="mx-auto text-black mb-0.5" />
                        <span className="text-xs font-black">{property.sqft.toLocaleString()} sqft</span>
                      </div>
                      <div>
                        <Car size={16} className="mx-auto text-black mb-0.5" />
                        <span className="text-xs font-black">{property.garage} Car</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onSelectProperty(property)}
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0052ff] text-black hover:text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer group/btn"
                      >
                        <Eye size={14} className="text-[#0052ff] group-hover/btn:text-white transition-colors" />
                        View Estate
                      </button>
                      <button
                        onClick={() => onBookViewing(property)}
                        className="w-full py-2.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <Calendar size={14} className="!text-white" />
                        Book Tour
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-300 max-w-xl mx-auto my-8 space-y-4 shadow-sm">
          <p className="text-lg font-black text-black">No properties match your active filter</p>
          <button
            onClick={handleResetAllFilters}
            className="px-6 py-2.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
}
