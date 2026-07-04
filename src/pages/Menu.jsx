import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Clock, AlertTriangle } from 'lucide-react';
import { menuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

export default function Menu() {
  const { addToCart } = useCart();
  const { selectedRestaurantId } = useOrder();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bitecraft_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const restaurantItems = menuItems.filter(item => item.restaurantId === selectedRestaurantId);
  const categories = ['All', ...new Set(restaurantItems.map(item => item.category))];

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('bitecraft_favorites', JSON.stringify(updated));
  };

  const filteredItems = restaurantItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDiet = selectedDiet === 'All' || (selectedDiet === 'Veg' && item.isVeg) || (selectedDiet === 'Non-Veg' && !item.isVeg);
    return matchesSearch && matchesCategory && matchesDiet;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left font-inter">
      <div className="space-y-2">
        <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-textDark">BiteCraft Menu</h1>
        <p className="text-sm text-textMuted max-w-xl font-light">Order fresh dishes and see live kitchen cooking wait-times calculated by the BiteCraft queue scheduler.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textMuted" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="md:col-span-6 flex gap-2 justify-start md:justify-end">
          {['All', 'Veg', 'Non-Veg'].map((diet) => (
            <button key={diet} onClick={() => setSelectedDiet(diet)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-poppins transition-all border ${selectedDiet === diet ? 'bg-primary border-primary text-white shadow-sm' : 'bg-white border-gray-200 text-textMuted hover:border-gray-300'}`}>
              {diet}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold font-poppins transition-all whitespace-nowrap ${selectedCategory === category ? 'bg-primary text-white shadow-md shadow-orange-500/10' : 'bg-white border border-gray-100 hover:border-gray-200 text-textMuted hover:text-textDark shadow-premium'}`}>
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={item.id}
              className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-premium flex flex-col group relative ${!item.available ? 'opacity-70' : ''}`}>
              <div className="relative h-44 overflow-hidden bg-slate-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider font-poppins border shadow-sm ${item.isVeg ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                  {item.isPopular && (
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-accent border border-blue-200 text-[9px] font-bold uppercase tracking-wider font-poppins">Popular</span>
                  )}
                </div>
                <button onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white rounded-full shadow-sm text-textMuted hover:text-rose-500 transition-colors">
                  <Heart className={`h-4 w-4 ${favorites.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                </button>
                <div className="absolute bottom-3 right-3 bg-white/95 px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 shadow-sm">
                  <Clock className="h-3 w-3 text-primary" />{item.prepTime} min
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-4">
                <div>
                  <h3 className="font-poppins font-bold text-base text-textDark leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-xs text-textMuted line-clamp-3 font-light leading-relaxed mt-1">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
                  <span className="font-poppins font-extrabold text-lg text-textDark">₹{item.price}</span>
                  {item.available ? (
                    <button onClick={() => addToCart(item)} className="bg-orange-50 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-xl text-xs font-semibold font-poppins transition-all border border-orange-100 hover:border-primary shadow-sm">
                      Add to Cart
                    </button>
                  ) : (
                    <span className="text-[10px] font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1.5 rounded-xl flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" /> Sold Out
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center space-y-3 bg-white rounded-3xl border border-gray-100 shadow-premium">
            <p className="text-textMuted font-light">No items found matching your filters.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDiet('All'); }} className="text-xs text-primary font-semibold font-poppins hover:underline">Reset Filters</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
