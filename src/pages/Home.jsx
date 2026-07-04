import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight, Award, MessageSquare, ChevronRight, MapPin } from 'lucide-react';
import { restaurants, menuItems, customerReviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

export default function Home() {
  const { addToCart } = useCart();
  const { selectedRestaurantId, setSelectedRestaurantId } = useOrder();
  const navigate = useNavigate();

  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurantId);
  const popularItems = menuItems.filter(item => item.restaurantId === selectedRestaurantId && item.isPopular);
  const estimatedWaitTime = currentRestaurant.basePrepTime + (currentRestaurant.currentQueueCount * 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const handleSelectRestaurant = (id) => {
    setSelectedRestaurantId(id);
  };

  return (
    <div className="space-y-20 pb-20 font-inter">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary font-poppins">
              <span className="animate-spin inline-block" style={{animationDuration:'8s'}}>✦</span>
              BiteCraft Smart Dining Automation
            </div>
            <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-textDark leading-[1.1] tracking-tight">
              Experience Smarter Restaurant Support with <span className="text-primary">BiteCraft AI</span>
            </h1>
            <p className="text-textMuted text-lg font-light leading-relaxed">
              Order food, estimate waiting time, track your order, and chat with BiteCraft's AI assistant for instant customer support.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/menu" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-poppins font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5">
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/track-order" className="flex items-center gap-2 border border-gray-200 hover:border-gray-300 bg-white text-textDark font-poppins font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5">
                Track Order <Clock className="h-4 w-4 text-textMuted" />
              </Link>
              <Link to="/chatbot" className="flex items-center gap-2 bg-accent/10 border border-accent/20 hover:bg-accent/15 text-accent font-poppins font-semibold text-sm px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5">
                Chat with BiteCraft AI <MessageSquare className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="relative w-full max-w-[500px] h-[400px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <img src={currentRestaurant.image} alt="BiteCraft Restaurant" className="absolute inset-0 w-full h-full object-cover brightness-[0.85]" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 flex items-center gap-4">
                <div className="p-3 bg-primary rounded-xl text-white"><Bot /></div>
                <div className="text-left">
                  <h4 className="font-poppins font-semibold text-sm text-textDark">BiteCraft Assistant</h4>
                  <p className="text-xs text-textMuted mt-0.5">"Your order is currently being prepared. Estimated wait: 12 minutes."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 text-left">
          <div>
            <h2 className="font-poppins font-bold text-3xl text-textDark">Our Restaurants</h2>
            <p className="text-textMuted text-sm mt-1">Select a restaurant to explore their menu, queue, and AI support</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              whileHover={{ y: -4 }}
              onClick={() => handleSelectRestaurant(restaurant.id)}
              className={`bg-white rounded-2xl overflow-hidden border-2 shadow-premium cursor-pointer transition-all ${
                selectedRestaurantId === restaurant.id
                  ? 'border-primary shadow-card-hover'
                  : 'border-gray-100 hover:border-orange-200'
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                {selectedRestaurantId === restaurant.id && (
                  <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full font-poppins uppercase tracking-wider">
                    Active
                  </div>
                )}
              </div>
              <div className="p-5 text-left space-y-3">
                <div>
                  <h3 className="font-poppins font-bold text-base text-textDark">{restaurant.name}</h3>
                  <p className="text-xs text-textMuted mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" />{restaurant.location}</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="font-bold text-textDark">{restaurant.rating}</span>
                    <span className="text-textMuted">({restaurant.reviewsCount})</span>
                  </div>
                  <span className="text-textMuted flex items-center gap-1"><Clock className="h-3 w-3" />{restaurant.basePrepTime} min avg</span>
                </div>
                <div className="text-[11px] text-primary font-semibold font-poppins bg-orange-50 px-3 py-1.5 rounded-lg inline-block">
                  {restaurant.specialty}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleSelectRestaurant(restaurant.id); navigate('/menu'); }}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold font-poppins transition-all flex items-center justify-center gap-1.5 ${
                    selectedRestaurantId === restaurant.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-slate-50 border border-gray-200 text-textDark hover:border-primary hover:text-primary'
                  }`}
                >
                  {selectedRestaurantId === restaurant.id ? 'View Menu' : 'Select & Explore'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Current Restaurant Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-gray-100 shadow-premium text-left space-y-6">
            <h2 className="font-poppins font-bold text-2xl text-textDark">Selected Restaurant</h2>
            <div className="flex items-center gap-4">
              <img src={currentRestaurant.image} alt={currentRestaurant.name} className="h-16 w-16 rounded-2xl object-cover" />
              <div>
                <h3 className="font-poppins font-semibold text-base text-textDark">{currentRestaurant.name}</h3>
                <p className="text-xs text-textMuted mt-0.5">{currentRestaurant.location}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div><span className="text-xs text-textMuted">Opening Hours</span><p className="text-sm font-medium text-textDark">{currentRestaurant.openingHours}</p></div>
              <div><span className="text-xs text-textMuted">Rating</span><p className="text-sm font-medium text-textDark flex items-center gap-1"><Star className="h-4 w-4 text-amber-500 fill-amber-500" />{currentRestaurant.rating}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
              <div><span className="text-xs text-textMuted">Avg. Prep Time</span><p className="text-base font-bold text-primary font-poppins">{currentRestaurant.basePrepTime} mins</p></div>
              <div><span className="text-xs text-textMuted">Est. Wait Time</span><p className="text-base font-bold text-primary font-poppins">{estimatedWaitTime} mins</p></div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-left relative overflow-hidden shadow-lg">
            <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold font-poppins">
                <Award className="h-4 w-4" /> Today's Chef Special
              </div>
              <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl leading-tight">{currentRestaurant.todaySpecial.name}</h2>
              <p className="text-white/80 font-light text-sm leading-relaxed">{currentRestaurant.todaySpecial.description}</p>
              <p className="text-3xl font-extrabold font-poppins">₹{currentRestaurant.todaySpecial.price}</p>
            </div>
            <div className="mt-8">
              <Link to="/menu" className="bg-white hover:bg-orange-50 text-primary font-poppins font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-colors inline-block">
                Order Special
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Popular Menu Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 text-left">
          <div>
            <h2 className="font-poppins font-bold text-3xl text-textDark">Popular From {currentRestaurant.name.replace('BiteCraft ', '')}</h2>
            <p className="text-textMuted text-sm mt-1">Highly rated picks from this outlet</p>
          </div>
          <Link to="/menu" className="mt-4 sm:mt-0 flex items-center gap-1.5 text-primary hover:text-primary-dark font-poppins font-semibold text-sm group">
            Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.slice(0, 4).map((item) => (
            <motion.div key={item.id} whileHover={{ y: -6 }} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-premium hover:shadow-card-hover transition-all flex flex-col group">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider font-poppins border shadow-sm ${item.isVeg ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-semibold text-textDark flex items-center gap-1 shadow-sm">
                  <Clock className="h-3 w-3 text-primary" />{item.prepTime} min
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-4">
                <div>
                  <h3 className="font-poppins font-bold text-base text-textDark line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-xs text-textMuted line-clamp-2 font-light mt-1">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="font-poppins font-extrabold text-lg text-textDark">₹{item.price}</span>
                  <button onClick={() => addToCart(item)} className="bg-orange-50 hover:bg-primary text-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold font-poppins transition-all border border-orange-100 hover:border-primary">
                    Add +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-poppins font-bold text-3xl text-textDark">What Diners Are Saying</h2>
            <p className="text-textMuted text-sm max-w-lg mx-auto">Real opinions on BiteCraft food, delivery speed, and AI tracking.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-premium text-left space-y-4">
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-500' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-sm text-textDark font-light italic">"{review.comment}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-50" />
                  <div>
                    <h4 className="font-poppins font-semibold text-xs text-textDark">{review.name}</h4>
                    <span className="text-[10px] text-textMuted">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Bot() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V9a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2zM9 13h.01M15 13h.01M12 6V3m0 0H9m3 0h3" />
    </svg>
  );
}
