import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, UserPlus, ShieldCheck } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Simulate signup success
    navigate('/login');
  };

  return (
    <div class="max-w-5xl mx-auto px-4 py-12 md:py-20 font-inter">
      <div class="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[500px]">
        {/* Left Column (Illustration/Intro) */}
        <div class="hidden md:flex md:col-span-5 bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white flex-col justify-between text-left relative overflow-hidden">
          <div class="absolute right-0 bottom-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div class="space-y-4 relative z-10">
            <span class="text-xs uppercase bg-white/20 border border-white/20 px-3 py-1 rounded-full font-semibold font-poppins">
              FlavorFlow Client Portal
            </span>
            <h2 class="font-poppins font-extrabold text-2xl leading-tight">
              Join BiteCraft AI Kitchen
            </h2>
            <p class="text-xs text-white/80 font-light leading-relaxed">
              Create an account to save favorite items, receive customized recipe suggestions, view order statistics, and claim coupons.
            </p>
          </div>

          <div class="space-y-2.5 border-t border-white/20 pt-6 mt-6 relative z-10">
            <div class="flex items-center gap-2 text-xs">
              <ShieldCheck class="h-4 w-4 text-emerald-300 fill-emerald-300/10" />
              <span>Secure Registration Sandbox</span>
            </div>
            <p class="text-[10px] text-white/60 font-light">
              This is a client-facing design prototype. Sign up is mock only.
            </p>
          </div>
        </div>

        {/* Right Column (Signup Form) */}
        <div class="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center text-left">
          <div class="space-y-2 mb-6">
            <h1 class="font-poppins font-bold text-2xl sm:text-3xl text-textDark">Create Account</h1>
            <p class="text-xs text-textMuted font-light">Join us to enjoy smart dining support</p>
          </div>

          <form onSubmit={handleSignup} class="space-y-3.5">
            <div class="space-y-1">
              <label class="text-[10px] text-textMuted font-semibold">Full Name</label>
              <div class="relative">
                <User class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aarav Mehta"
                  class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-[10px] text-textMuted font-semibold">Email Address</label>
              <div class="relative">
                <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="aarav@gmail.com"
                  class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-[10px] text-textMuted font-semibold">Phone Number</label>
              <div class="relative">
                <Phone class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 00123"
                  class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-[10px] text-textMuted font-semibold">Password</label>
                <div class="relative">
                  <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label class="text-[10px] text-textMuted font-semibold">Confirm Password</label>
                <div class="relative">
                  <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-orange-500/10 mt-2"
            >
              Create Account
              <UserPlus class="h-4 w-4" />
            </button>
          </form>

          <p class="text-xs text-textMuted text-center font-light pt-6 mt-4 border-t border-gray-150">
            Already have an account?{' '}
            <Link to="/login" class="text-primary hover:underline font-semibold font-poppins">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
