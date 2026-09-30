import { useState } from 'react';
import { Check, Building2, Sparkles, TrendingUp, ArrowRight, Shield } from 'lucide-react';
import { agencyServices } from '../data/properties';

const iconMap = {
  Building2: Building2,
  Sparkles: Sparkles,
  TrendingUp: TrendingUp,
};

export default function AgencyServices({ onSelectService }) {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-black">
      <div className="text-center mb-16">
        <span className="text-[#0052ff] font-black text-xs tracking-widest uppercase">
          Bespoke Brokerage & Concierge
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-black mt-2 mb-3">
          Client Advisory & Services
        </h2>
        <p className="text-black font-semibold max-w-xl mx-auto text-sm sm:text-base">
          Tailored representation for ultra-high-net-worth buyers, sellers, and family offices across top tier luxury markets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {agencyServices.map((tier) => {
          const IconComp = iconMap[tier.icon] || Building2;

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 bg-white border border-slate-300 shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${tier.popular ? 'border-[#0052ff] ring-2 ring-[#0052ff]/20' : ''
                }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-[#0052ff] !text-white text-[10px] font-black tracking-wider uppercase shadow-md">
                    Most Requested Advisory
                  </span>
                </div>
              )}

              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-[#0052ff] border border-blue-200">
                  <IconComp size={26} />
                </div>

                <h3 className="text-xl font-black text-black mb-2">{tier.name}</h3>
                <p className="text-xs text-black font-semibold leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="mb-8 p-4 rounded-2xl border border-slate-200">
                  <span className="text-2xl font-black text-black">{tier.price}</span>
                  <span className="block text-[11px] text-black font-mono font-bold mt-0.5">
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-black font-bold">
                      <Check size={16} className="text-[#0052ff] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectService(tier)}
                className="w-full py-3.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>{tier.cta}</span>
                <ArrowRight size={14} className="!text-white" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-300 shadow-md max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-[#0052ff] shrink-0" />
          <div>
            <h4 className="text-sm font-black text-black">Absolute Client Discretion Guaranteed</h4>
            <p className="text-xs text-black font-semibold">All consultations and property viewings protected under binding NDAs.</p>
          </div>
        </div>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded-xl bg-[#0052ff] !text-white hover:bg-[#0042cc] text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shadow-sm"
        >
          Confidential Consult
        </a>
      </div>
    </section>
  );
}
