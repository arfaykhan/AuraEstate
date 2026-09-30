import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, CheckCircle, Loader2, Calendar, Phone, Mail, Building2 } from 'lucide-react';
import { submitInquiry } from '../utils/api';
import { propertiesData } from '../data/properties';

const SUBMISSION_METHOD = 'php-backend';

export default function ContactForm({ selectedPropertyForInquiry, selectedServiceForInquiry }) {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    tourDate: '',
    tourTime: 'Morning (9 AM - 12 PM)',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (selectedPropertyForInquiry) {
      setForm((prev) => ({
        ...prev,
        propertyId: String(selectedPropertyForInquiry.id),
        message: `I would like to schedule a private viewing for "${selectedPropertyForInquiry.title}" located at ${selectedPropertyForInquiry.location}.`,
      }));
    } else if (selectedServiceForInquiry) {
      setForm((prev) => ({
        ...prev,
        message: `I would like to request a confidential consultation regarding your "${selectedServiceForInquiry.name}" service.`,
      }));
    }
  }, [selectedPropertyForInquiry, selectedServiceForInquiry]);

  const validateField = (name, value) => {
    if (name === 'name') {
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email is required.';
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!pattern.test(value)) return 'Please enter a valid email address.';
    }
    if (name === 'phone') {
      if (!value.trim()) return 'Phone number is required for viewing confirmation.';
    }
    if (name === 'message') {
      if (!value.trim()) return 'Please include notes or questions.';
      if (value.trim().length < 10) return 'Message must be at least 10 characters.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      phone: validateField('phone', form.phone),
      message: validateField('message', form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateAll()) return;

    setStatus('sending');

    try {
      if (SUBMISSION_METHOD === 'php-backend') {
        const selectedEstate = propertiesData.find(
          (p) => String(p.id) === String(form.propertyId)
        );
        await submitInquiry({
          name: form.name,
          email: form.email,
          phone: form.phone,
          property_title: selectedEstate ? selectedEstate.title : 'General Consultation',
          tour_date: form.tourDate,
          tour_time: form.tourTime,
          message: form.message,
        });
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        propertyId: '',
        tourDate: '',
        tourTime: 'Morning (9 AM - 12 PM)',
        message: '',
      });
      setTouched({});
      setErrors({});

      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'Unable to submit inquiry. Please try again or call our hotline.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const inputClass =
    'w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-black font-bold outline-none transition-all duration-200 focus:border-[#0052ff]';

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[#0052ff] font-black text-xs tracking-widest uppercase">
              Private Tour & Inquiry
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-black mt-2 mb-3">
              Schedule a Private Viewing
            </h2>
            <p className="text-black font-semibold text-sm leading-relaxed">
              Connect with our senior partners to arrange a confidential viewing or explore off-market luxury acquisitions.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052ff] flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <p className="text-xs text-black font-bold">Direct Beverly Hills Hotline</p>
                <p className="text-base font-black text-black">+1 (310) 555-0199</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052ff] flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <p className="text-xs text-black font-bold">Private Concierge Email</p>
                <p className="text-base font-black text-black">concierge@auraestates.com</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-xs text-black font-bold">Flagship Headquarters</p>
                <p className="text-sm font-black text-black">9600 Wilshire Blvd, Beverly Hills, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-300 shadow-xl space-y-6"
          >
            {selectedPropertyForInquiry && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPropertyForInquiry.image}
                    alt={selectedPropertyForInquiry.title}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] text-[#0052ff] font-black uppercase block">Selected Estate</span>
                    <h4 className="text-xs font-black text-black">{selectedPropertyForInquiry.title}</h4>
                  </div>
                </div>
                <span className="text-xs font-black text-[#0052ff]">{selectedPropertyForInquiry.price}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-black text-black mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Harrison Sterling"
                  className={inputClass}
                />
                {errors.name && touched.name && (
                  <p className="flex items-center gap-1 mt-1 text-[11px] text-rose-600 font-bold">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-black text-black mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="sterling@investment.com"
                  className={inputClass}
                />
                {errors.email && touched.email && (
                  <p className="flex items-center gap-1 mt-1 text-[11px] text-rose-600 font-bold">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-black text-black mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+1 (310) 000-0000"
                  className={inputClass}
                />
                {errors.phone && touched.phone && (
                  <p className="flex items-center gap-1 mt-1 text-[11px] text-rose-600 font-bold">
                    <AlertCircle size={12} />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="propertyId" className="block text-xs font-black text-black mb-2">
                  Estate of Interest
                </label>
                <select
                  id="propertyId"
                  name="propertyId"
                  value={form.propertyId}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">General Consultation / Off-Market</option>
                  {propertiesData.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tourDate" className="block text-xs font-black text-black mb-2">
                  Preferred Tour Date
                </label>
                <input
                  id="tourDate"
                  name="tourDate"
                  type="date"
                  value={form.tourDate}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                />
              </div>

              <div>
                <label htmlFor="tourTime" className="block text-xs font-black text-black mb-2">
                  Preferred Window
                </label>
                <select
                  id="tourTime"
                  name="tourTime"
                  value={form.tourTime}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (1 PM - 4 PM)</option>
                  <option>Sunset Private Tour (5 PM - 7 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-black text-black mb-2">
                Notes or Special Requirements *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Include any confidentiality requests, helicopter transfer arrangements, or financing specs..."
                className={`${inputClass} resize-none`}
              />
              {errors.message && touched.message && (
                <p className="flex items-center gap-1 mt-1 text-[11px] text-rose-600 font-bold">
                  <AlertCircle size={12} />
                  {errors.message}
                </p>
              )}
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                <AlertCircle size={16} />
                {serverError}
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <CheckCircle size={16} />
                Tour Request Received! Our senior concierge will confirm your schedule within 2 hours.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin !text-white" />
                  Transmitting Request...
                </>
              ) : (
                <>
                  <Calendar size={16} className="!text-white" />
                  Confirm Viewing Reservation
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
