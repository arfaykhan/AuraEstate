import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyListings from './components/ProjectsFilter';
import AgencyServices from './components/PricingCards';
import AgencyTimeline from './components/ExperienceTimeline';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PropertyModal from './components/PropertyModal';
import WishlistDrawer from './components/WishlistDrawer';
import { propertiesData } from './data/properties';

export default function App() {
  // Wishlist state (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_favorites');
      return saved ? JSON.parse(saved) : [1, 3]; // default 2 favorites for demo richness
    } catch (e) {
      return [1, 3];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedPropertyModal, setSelectedPropertyModal] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null);
  const [selectedPropertyForInquiry, setSelectedPropertyForInquiry] = useState(null);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('aura_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookViewing = (property) => {
    setSelectedPropertyForInquiry(property);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (service) => {
    setSelectedServiceForInquiry(service);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const favoriteProperties = propertiesData.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#0052ff] selection:text-white">
      {/* Header Navigation */}
      <Navbar
        favoriteCount={favorites.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenViewingModal={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Banner with Integrated Search */}
        <HeroSection onSearchFilter={setSearchFilters} />

        {/* Featured Property Listings Grid */}
        <PropertyListings
          searchFilters={searchFilters}
          onResetSearchFilters={() => setSearchFilters(null)}
          onSelectProperty={setSelectedPropertyModal}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onBookViewing={handleBookViewing}
        />

        {/* Bespoke Agency Services */}
        <AgencyServices onSelectService={handleSelectService} />

        {/* Agency Track Record & Leadership */}
        <AgencyTimeline />

        {/* High-Net-Worth Client Reviews */}
        <TestimonialsCarousel />

        {/* Tour Booking & Inquiry Form */}
        <ContactForm
          selectedPropertyForInquiry={selectedPropertyForInquiry}
          selectedServiceForInquiry={selectedServiceForInquiry}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Property Detail Modal */}
      {selectedPropertyModal && (
        <PropertyModal
          property={selectedPropertyModal}
          onClose={() => setSelectedPropertyModal(null)}
          isFavorite={favorites.includes(selectedPropertyModal.id)}
          onToggleFavorite={handleToggleFavorite}
          onSelectForInquiry={handleBookViewing}
        />
      )}

      {/* Saved Properties Wishlist Slide-Over */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favoriteProperties={favoriteProperties}
        onSelectProperty={(prop) => {
          setIsWishlistOpen(false);
          setSelectedPropertyModal(prop);
        }}
        onRemoveFavorite={handleToggleFavorite}
        onBookViewing={handleBookViewing}
      />
    </div>
  );
}
