import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react';
import { clientReviews } from '../data/properties';

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % clientReviews.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + clientReviews.length) % clientReviews.length
    );
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(goNext, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, goNext]);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-black">
      <div className="text-center mb-16">
        <span className="text-[#0052ff] font-black text-xs tracking-widest uppercase">
          Client Endorsements
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-black mt-2 mb-3">
          What High-Net-Worth Clients Say
        </h2>
        <p className="text-black font-semibold max-w-xl mx-auto text-sm sm:text-base">
          Read genuine experiences from homebuyers, estate sellers, and real estate investors.
        </p>
      </div>

      <div className="relative min-h-[340px] sm:min-h-[280px] flex items-center justify-center">
        {clientReviews.map((review, i) => {
          const isActive = i === activeIndex;

          return (
            <div
              key={review.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 translate-x-0'
                  : 'opacity-0 scale-95 translate-x-8 pointer-events-none'
              }`}
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 max-w-3xl w-full border border-slate-300 relative overflow-hidden shadow-xl">
                <Quote size={36} className="text-[#0052ff] mb-4" />
                <blockquote className="text-base sm:text-xl text-black font-bold leading-relaxed mb-8 italic">
                  "{review.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-[#0052ff] flex items-center justify-center text-white font-black text-base shadow-md"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="text-black font-black text-base">{review.author}</h4>
                    <p className="text-black text-xs font-bold">{review.title}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-full bg-white border border-slate-300 flex items-center justify-center text-black hover:bg-[#0052ff] hover:text-white hover:border-[#0052ff] transition-all cursor-pointer shadow-sm"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {clientReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'w-8 bg-[#0052ff]'
                  : 'w-2 bg-slate-300 hover:bg-[#0052ff]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full bg-white border border-slate-300 flex items-center justify-center text-black hover:bg-[#0052ff] hover:text-white hover:border-[#0052ff] transition-all cursor-pointer shadow-sm"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white border border-slate-300 flex items-center justify-center text-black hover:bg-[#0052ff] hover:text-white hover:border-[#0052ff] transition-all cursor-pointer ml-2 shadow-sm"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </section>
  );
}
