import { MapPin, CheckCircle, Phone, Mail } from 'lucide-react';
import { agencyTimeline } from '../data/properties';

const agentsList = [
  {
    name: 'Victoria Sterling',
    role: 'Principal Luxury Specialist',
    location: 'Los Angeles / Bel Air',
    sales: '$1.1B+',
    phone: '+1 (310) 555-0199',
    email: 'v.sterling@auraestates.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    specialty: 'High-Secured Estates & Bel Air Mansions',
  },
  {
    name: 'Julian Thorne',
    role: 'Manhattan Portfolio Director',
    location: 'New York / Tribeca',
    sales: '$850M+',
    phone: '+1 (212) 555-0144',
    email: 'j.thorne@auraestates.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    specialty: 'Penthouses & Historic Townhouses',
  },
  {
    name: 'Sophia Alvares',
    role: 'Coastal & Island Specialist',
    location: 'Miami / Star Island',
    sales: '$920M+',
    phone: '+1 (305) 555-0177',
    email: 's.alvares@auraestates.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    specialty: 'Deep-Water Oceanfront Compounds',
  },
];

export default function AgencyTimeline() {
  return (
    <section id="track-record" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24 text-black">
      <div>
        <div className="text-center mb-16">
          <span className="text-[#0052ff] font-black text-xs tracking-widest uppercase">
            Agency History & Benchmarks
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-black mt-2 mb-3">
            Track Record of Excellence
          </h2>
          <p className="text-black font-semibold max-w-xl mx-auto text-sm sm:text-base">
            Over a decade of defining luxury real estate representation through record-setting transactions.
          </p>
        </div>

        <div className="relative pl-6 md:pl-10 space-y-12 before:absolute before:left-[11px] md:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-[#0052ff]">
          {agencyTimeline.map((item) => (
            <div key={item.id} className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0052ff] border-4 border-[#f8fafc] z-10 flex items-center justify-center shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-300 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0052ff] text-xs font-mono font-black border border-blue-200">
                      {item.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-black">{item.title}</h3>
                  </div>
                  <span className="text-xs text-black font-bold flex items-center gap-1">
                    <MapPin size={14} className="text-[#0052ff]" />
                    {item.location}
                  </span>
                </div>

                <p className="text-sm text-black font-semibold leading-relaxed mb-4">{item.description}</p>

                <div className="space-y-2">
                  {item.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-black font-bold">
                      <CheckCircle size={14} className="text-[#0052ff] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-12 border-t border-slate-300">
        <div className="text-center mb-16">
          <span className="text-[#0052ff] font-black text-xs tracking-widest uppercase">
            Leadership & Advisory
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-black mt-2 mb-3">
            Meet Our Senior Partners
          </h2>
          <p className="text-black font-semibold max-w-xl mx-auto text-sm">
            Trusted advisors with decades of combined experience in high-net-worth real estate acquisitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agentsList.map((agent, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-300 shadow-md text-center flex flex-col items-center justify-between space-y-6"
            >
              <div>
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  loading="lazy"
                  decoding="async"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#0052ff]/30 shadow-md mb-4"
                />
                <h4 className="text-lg font-black text-black">{agent.name}</h4>
                <p className="text-xs text-[#0052ff] font-black mb-1">{agent.role}</p>
                <p className="text-[11px] text-black font-mono font-bold">{agent.location}</p>
              </div>

              <div className="w-full bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
                <p className="text-black font-bold">
                  Total Career Sales: <strong className="text-[#0052ff] font-black">{agent.sales}</strong>
                </p>
                <p className="text-black font-semibold truncate">
                  Specialty: <span className="text-black font-black">{agent.specialty}</span>
                </p>
              </div>

              <div className="w-full grid grid-cols-2 gap-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-[#0052ff] text-black hover:text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer group/agentcall"
                >
                  <Phone size={14} className="text-[#0052ff] group-hover/agentcall:text-white transition-colors" />
                  Call
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="py-2.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Mail size={14} className="!text-white" />
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
