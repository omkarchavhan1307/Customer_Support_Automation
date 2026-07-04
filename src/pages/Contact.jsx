import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { restaurants } from '../data/mockData';

export default function Contact() {
  const { selectedRestaurantId } = useOrder();
  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurantId) || restaurants[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in required fields.');
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter text-left space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-textDark">Get In Touch</h1>
        <p className="text-sm text-textMuted max-w-xl font-light">
          Have questions about the automated prototype, feedback on the project, or business inquiries? Write us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details & Interactive Map Block */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium space-y-5">
            <h3 className="font-poppins font-bold text-lg text-textDark pb-3 border-b border-gray-100">Restaurant Info</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2.5 bg-orange-100 rounded-xl text-primary shrink-0 h-fit">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-textMuted uppercase tracking-wider block font-semibold">Address</span>
                  <p className="text-sm text-textDark mt-0.5">{currentRestaurant.location}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-orange-100 rounded-xl text-primary shrink-0 h-fit">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-textMuted uppercase tracking-wider block font-semibold">Phone Support</span>
                  <p className="text-sm text-textDark mt-0.5">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-orange-100 rounded-xl text-primary shrink-0 h-fit">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-textMuted uppercase tracking-wider block font-semibold">Email</span>
                  <p className="text-sm text-textDark mt-0.5">support@bitecraft.ai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Styled SVG Map Placeholder */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden h-64 relative flex items-center justify-center bg-slate-50">
            {/* Custom vector representation of a grid city map */}
            <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="1.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M 0 100 Q 150 120 400 60 T 800 120" fill="none" stroke="#E2E8F0" strokeWidth="24" />
              <path d="M 120 0 L 120 400" fill="none" stroke="#E2E8F0" strokeWidth="18" />
              <path d="M 320 0 L 320 400" fill="none" stroke="#E2E8F0" strokeWidth="18" />
            </svg>

            {/* Glowing Map Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-orange-400 opacity-60 -left-1.5 -top-1.5"></span>
                <div className="p-2.5 bg-primary rounded-full text-white shadow-lg relative">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
              <span className="mt-2 text-xs font-bold bg-white text-textDark px-3 py-1.5 rounded-lg border border-gray-100 shadow-md font-poppins">
                {currentRestaurant.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-premium">
          {submitted ? (
            <div className="py-16 text-center space-y-3">
              <span className="p-3 bg-emerald-100 text-emerald-600 rounded-full inline-block">✔</span>
              <h3 className="font-poppins font-bold text-lg text-textDark">Message Sent!</h3>
              <p className="text-xs text-textMuted font-light">
                Thank you for getting in touch. We will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-primary font-semibold hover:underline font-poppins pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-poppins font-bold text-lg text-textDark pb-3 border-b border-gray-100">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-textMuted font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Aarav Mehta"
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-textMuted font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="aarav@gmail.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-textMuted font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Question about order tracker API"
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-textMuted font-medium">Message Details *</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Write your details here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-sm py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/10"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
