import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Car,
  CheckCircle,
  Calendar,
  Phone,
  Heart,
  Calculator,
  ShieldCheck,
} from 'lucide-react';

export default function PropertyModal({ property, onClose, isFavorite, onToggleFavorite, onSelectForInquiry }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  const [homePrice, setHomePrice] = useState(property?.rawPrice || 10000000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  useEffect(() => {
    if (property) {
      setHomePrice(property.rawPrice);
      setSelectedImage(0);
    }
  }, [property]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const downPaymentAmount = (homePrice * downPaymentPct) / 100;
  const principalAmount = homePrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPrincipalInterest = 0;
  if (monthlyInterestRate > 0) {
    monthlyPrincipalInterest =
      (principalAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  } else {
    monthlyPrincipalInterest = principalAmount / numberOfPayments;
  }

  const estimatedTax = (homePrice * 0.012) / 12;
  const estimatedInsurance = (homePrice * 0.0035) / 12;
  const totalMonthlyPayment = Math.round(
    monthlyPrincipalInterest + estimatedTax + estimatedInsurance
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Soft frosted light backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-white border border-slate-300 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto text-black"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-black uppercase rounded-full bg-blue-100 text-[#0052ff]">
                {property.badge || property.category}
              </span>
              <span className="text-xs text-black font-mono font-bold">ID #{property.id}8209</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(property.id)}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${isFavorite ? 'text-rose-600 bg-rose-50 border-rose-300' : 'text-black border-slate-300 hover:text-rose-600'
                  }`}
                title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white hover:bg-[#0052ff] hover:text-white hover:border-[#0052ff] text-black border border-slate-300 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-3">
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden  border border-slate-200">
                  <img
                    src={property.gallery?.[selectedImage] || property.image}
                    alt={property.title}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 rounded-full bg-[#0052ff] !text-white font-black text-sm shadow-md">
                      {property.price} {property.pricePeriod}
                    </span>
                  </div>
                </div>

                {property.gallery && property.gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {property.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${selectedImage === idx
                          ? 'border-[#0052ff] scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                      >
                        <img src={img} alt={`View ${idx}`} decoding="async" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-black mb-2">
                    {property.title}
                  </h2>
                  <p className="flex items-center gap-1.5 text-black font-bold text-sm mb-4">
                    <MapPin size={16} className="text-[#0052ff] shrink-0" />
                    {property.location}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                      <Bed size={20} className="text-[#0052ff]" />
                      <div>
                        <p className="text-xs text-black font-bold">Bedrooms</p>
                        <p className="text-sm font-black text-black">{property.beds} Beds</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                      <Bath size={20} className="text-[#0052ff]" />
                      <div>
                        <p className="text-xs text-black font-bold">Bathrooms</p>
                        <p className="text-sm font-black text-black">{property.baths} Baths</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                      <Maximize2 size={20} className="text-[#0052ff]" />
                      <div>
                        <p className="text-xs text-black font-bold">Living Area</p>
                        <p className="text-sm font-black text-black">{property.sqft.toLocaleString()} sq ft</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                      <Car size={20} className="text-[#0052ff]" />
                      <div>
                        <p className="text-xs text-black font-bold">Garage</p>
                        <p className="text-sm font-black text-black">{property.garage} Cars</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-300 bg-slate-50 space-y-3">
                  <p className="text-xs font-black uppercase tracking-wider text-[#0052ff]">
                    Listing Agent
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0052ff]"
                    />
                    <div>
                      <h4 className="text-black font-black text-sm">{property.agent.name}</h4>
                      <p className="text-xs text-black font-bold">{property.agent.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectForInquiry(property);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Calendar size={14} className="!text-white" />
                      Book Viewing
                    </button>
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-[#0052ff] text-black hover:text-white border border-slate-300 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm group/call"
                    >
                      <Phone size={14} className="text-[#0052ff] group-hover/call:text-white transition-colors" />
                      Call Agent
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex border-b border-slate-300 gap-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-sm font-black transition-colors relative cursor-pointer ${activeTab === 'details' ? 'text-[#0052ff]' : 'text-black hover:text-[#0052ff]'
                  }`}
              >
                Property Overview & Amenities
                {activeTab === 'details' && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052ff]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`pb-3 text-sm font-black flex items-center gap-2 transition-colors relative cursor-pointer ${activeTab === 'calculator' ? 'text-[#0052ff]' : 'text-black hover:text-[#0052ff]'
                  }`}
              >
                <Calculator size={16} />
                Mortgage & Financing Estimator
                {activeTab === 'calculator' && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052ff]" />
                )}
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-black text-black mb-3">Architectural Description</h3>
                  <p className="text-black font-semibold text-sm leading-relaxed">{property.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-black text-black mb-4">Key Luxury Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {property.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-black text-xs font-bold"
                      >
                        <CheckCircle size={16} className="text-[#0052ff] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-black mb-4">Property Financials & Specs</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-black font-bold mb-1">Year Built</p>
                      <p className="text-base font-black text-black">{property.yearBuilt}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-black font-bold mb-1">Lot Size</p>
                      <p className="text-base font-black text-black">{property.lotSize}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-black font-bold mb-1">HOA Dues</p>
                      <p className="text-base font-black text-black">{property.hoa}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-black font-bold mb-1">Verification</p>
                      <p className="text-base font-black text-emerald-700 flex items-center gap-1">
                        <ShieldCheck size={14} /> Verified Title
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-300 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <h3 className="text-xl font-black text-black">Estimated Monthly Payment</h3>
                    <p className="text-xs text-black font-bold">Based on Principal, Interest, Tax & Insurance</p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="text-3xl md:text-4xl font-black text-[#0052ff]">
                      ${totalMonthlyPayment.toLocaleString()}
                    </span>
                    <span className="text-xs text-black font-bold"> / month</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-black font-black">
                      <span>Down Payment ({downPaymentPct}%)</span>
                      <span className="text-[#0052ff]">${downPaymentAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={downPaymentPct}
                      onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                      className="w-full accent-[#0052ff] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-black font-black">
                      <span>Interest Rate</span>
                      <span className="text-[#0052ff]">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="3.0"
                      max="10.0"
                      step="0.25"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#0052ff] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-black font-black">
                      <span>Loan Term</span>
                      <span className="text-[#0052ff]">{loanTermYears} Years</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[15, 20, 30].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTermYears(term)}
                          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${loanTermYears === term
                            ? 'bg-[#0052ff] !text-white'
                            : 'bg-white text-black border border-slate-300'
                            }`}
                        >
                          {term} Yrs
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-black font-bold block mb-1">Principal & Interest</span>
                    <span className="text-base font-black text-black">
                      ${Math.round(monthlyPrincipalInterest).toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-black font-bold block mb-1">Property Tax (Est.)</span>
                    <span className="text-base font-black text-black">
                      ${Math.round(estimatedTax).toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-black font-bold block mb-1">Homeowners Insurance</span>
                    <span className="text-base font-black text-black">
                      ${Math.round(estimatedInsurance).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
