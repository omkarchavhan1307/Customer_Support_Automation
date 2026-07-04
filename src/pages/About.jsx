import React, { useState } from 'react';
import { HelpCircle, Star, ShieldCheck, Award, Info, Heart } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { restaurants } from '../data/mockData';

export default function About() {
  const { selectedRestaurantId } = useOrder();
  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurantId) || restaurants[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReserve = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      alert('Please fill out all reservation fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-inter text-left space-y-16">
      {/* 1. Academic Showcase & Purpose */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-orange-100/80 border border-orange-200/50 px-3 py-1 rounded-full text-xs font-semibold text-primary font-poppins">
            <Info className="h-4 w-4" />
            Project Presentation
          </div>
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-textDark">
            BiteCraft AI Support Ecosystem
          </h1>
          <p className="text-textMuted text-sm leading-relaxed font-light">
            BiteCraft AI is a collegiate capstone prototype exploring the integration of conversational artificial intelligence and advanced queue scheduling algorithms within local restaurants. Our goal is to reduce dining wait friction, improve delivery tracking transparency, and automate customer support queries.
          </p>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-premium flex gap-4 text-slate-700">
          <div className="p-3.5 bg-primary/10 rounded-2xl text-primary shrink-0 h-fit">
            <Award className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-poppins font-semibold text-sm text-textDark">Academic Prototype</h4>
            <p className="text-xs text-textMuted font-light leading-relaxed">
              Designed as a final-year UI/UX engineering showcase. Features modular React components, in-memory status syncing, and interactive mock chat responses.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Problem vs Solution Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
        {/* Problem Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-premium space-y-4 text-left">
          <h3 className="font-poppins font-bold text-lg text-rose-700 flex items-center gap-2">
            <span className="p-1 bg-rose-100 rounded-lg text-rose-600">✖</span>
            The Problem Statement
          </h3>
          <p className="text-xs text-textMuted leading-relaxed font-light">
            Traditional local restaurants experience massive bottlenecks during rush hours. Wait times are calculated as static guesses, phone lines are constantly busy with customers checking order delivery status, and answering repetitious FAQs (hours, menu details, table booking) diverts valuable kitchen staff energy.
          </p>
        </div>

        {/* Proposed Solution Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-premium space-y-4 text-left">
          <h3 className="font-poppins font-bold text-lg text-emerald-700 flex items-center gap-2">
            <span className="p-1 bg-emerald-100 rounded-lg text-emerald-600">✔</span>
            Our Proposed Solution
          </h3>
          <p className="text-xs text-textMuted leading-relaxed font-light">
            We introduce an end-to-end automated queue manager combined with a conversational chatbot. Orders placed are automatically assigned to chefs, generating live queue-wait calculations. The chatbot reads from active order memory to resolve status inquiries instantly without human intervention.
          </p>
        </div>
      </section>

      {/* 3. Technologies & Key Benefits */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Wait-time Optimization',
            desc: 'Calculates preparation time dynamically depending on the queue size and selected dishes.',
            icon: HelpCircle
          },
          {
            title: 'Conversational Support',
            desc: 'Mock FAQ keyword engine parses customer requests and details active orders instantly.',
            icon: ShieldCheck
          },
          {
            title: 'Unified Admin Controls',
            desc: 'Provides kitchen administrators with status adjustment boards that sync with the customer tracking view.',
            icon: Heart
          }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-slate-50 border border-gray-100 rounded-2xl p-6 text-left space-y-3">
              <div className="p-2.5 bg-orange-100 rounded-xl text-primary w-fit">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-poppins font-bold text-sm text-textDark">{item.title}</h4>
              <p className="text-xs text-textMuted font-light leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </section>

      {/* 4. Table Reservation Form Section */}
      <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4 text-left">
          <h2 className="font-poppins font-bold text-2xl text-textDark">Book a Table at {currentRestaurant.name.replace('BiteCraft ', '')}</h2>
          <p className="text-xs text-textMuted leading-relaxed font-light">
            Planning to dine in? Skip the queue and reserve a cozy table in advance. BiteCraft AI registers your reservation and estimates peak seating capacity.
          </p>
          <div className="text-xs text-textMuted space-y-1 font-light">
            <p><strong>Note:</strong> Tables are held for a maximum of 15 minutes.</p>
            <p><strong>Support Phone:</strong> +91 98765 43210</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-3">
              <span className="p-2 bg-emerald-100 text-emerald-600 rounded-full inline-block">✔</span>
              <h4 className="font-poppins font-bold text-base text-emerald-950">Reservation Confirmed!</h4>
              <p className="text-xs text-emerald-700 font-light">
                Table reserved for {formData.name} ({formData.guests}) on {formData.date} at {formData.time}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] text-textMuted font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Aarav Mehta"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] text-textMuted font-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 00123"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] text-textMuted font-semibold">Number of Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] text-textMuted font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1 text-left sm:col-span-2">
                <label className="text-[10px] text-textMuted font-semibold">Preferred Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="sm:col-span-2 w-full bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-sm py-3 rounded-xl transition-colors shadow-sm"
              >
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
