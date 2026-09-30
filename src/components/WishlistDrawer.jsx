import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Calendar, MapPin } from 'lucide-react';

export default function WishlistDrawer({ isOpen, onClose, favoriteProperties, onSelectProperty, onRemoveFavorite, onBookViewing }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden text-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-10"
        >
          <div className="w-screen max-w-md bg-white border-l border-slate-300 flex flex-col shadow-2xl">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-xl font-black text-black">Saved Properties</h3>
                <p className="text-xs text-black font-bold">
                  {favoriteProperties.length} luxury estate{favoriteProperties.length === 1 ? '' : 's'} bookmarked
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white border border-slate-300 text-black hover:bg-[#0052ff] hover:text-white hover:border-[#0052ff] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {favoriteProperties.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-black">
                    <Trash2 size={28} />
                  </div>
                  <p className="text-black font-black">Your wishlist is empty</p>
                  <p className="text-xs text-black font-semibold max-w-xs mx-auto">
                    Click the heart icon on any property listing to save it here for private viewing.
                  </p>
                </div>
              ) : (
                favoriteProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white rounded-2xl p-4 flex gap-4 border border-slate-300 shadow-sm hover:border-[#0052ff] transition-all"
                  >
                    <img
                      src={prop.image}
                      alt={prop.title}
                      loading="lazy"
                      decoding="async"
                      className="w-24 h-24 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => onSelectProperty(prop)}
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => onSelectProperty(prop)}
                            className="text-sm font-black text-black truncate cursor-pointer hover:text-[#0052ff] transition-colors"
                          >
                            {prop.title}
                          </h4>
                          <button
                            onClick={() => onRemoveFavorite(prop.id)}
                            className="text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-black font-bold truncate flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-[#0052ff]" />
                          {prop.location}
                        </p>
                        <p className="text-sm font-black text-[#0052ff] mt-1">{prop.price}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-black font-black">
                          <span>{prop.beds}b</span> • <span>{prop.baths}ba</span>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onBookViewing(prop);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#0052ff] !text-white text-xs font-black flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                        >
                          <Calendar size={12} className="!text-white" />
                          Tour
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {favoriteProperties.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    onBookViewing(favoriteProperties[0]);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#0052ff] hover:bg-[#0042cc] !text-white font-black text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Calendar size={16} className="!text-white" />
                  Book Private Tour For Saved Estates
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
