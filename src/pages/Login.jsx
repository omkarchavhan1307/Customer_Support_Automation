import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { restaurants } from '../data/mockData';

// Admin credentials mapped to restaurantId
const ADMIN_CREDENTIALS = {
  'pizza@bitecraft.com': { restaurantId: 'r1', name: 'Sourdough Pizza & Grill Admin' },
  'asian@bitecraft.com': { restaurantId: 'r2', name: 'Sichuan Wok & Dim Sum Admin' },
  'dosa@bitecraft.com': { restaurantId: 'r3', name: 'Ghee Roast Dosa Cafe Admin' }
};

export default function Login() {
  const [email, setEmail] = useState('pizza@bitecraft.com');
  const [password, setPassword] = useState('bitecraft123');
  const [loginMode, setLoginMode] = useState('admin'); // 'admin' or 'customer'
  const { setAdminRestaurantId } = useOrder();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginMode === 'admin') {
      const adminConfig = ADMIN_CREDENTIALS[email.toLowerCase().trim()];
      if (adminConfig && password.length >= 6) {
        setAdminRestaurantId(adminConfig.restaurantId);
        navigate('/admin');
      } else {
        alert('Invalid admin credentials. Try:\npizza@bitecraft.com\nasian@bitecraft.com\ndosa@bitecraft.com\n\nPassword: bitecraft123');
      }
    } else {
      // Customer login – just navigate home
      navigate('/');
    }
  };

  const handleGuestLogin = () => navigate('/menu');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 font-inter">
      <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[520px]">
        {/* Left Panel */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white flex-col justify-between text-left relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="space-y-4 relative z-10">
            <span className="text-xs uppercase bg-white/20 border border-white/20 px-3 py-1 rounded-full font-semibold font-poppins">BiteCraft Portal</span>
            <h2 className="font-poppins font-extrabold text-2xl leading-tight">Welcome to BiteCraft</h2>
            <p className="text-xs text-white/80 font-light leading-relaxed">
              Restaurant owners can log in to manage their restaurant queue, orders, and analytics. Customers can access their order history.
            </p>
            <div className="space-y-2 pt-4">
              <p className="text-xs text-white/80 font-semibold uppercase tracking-wider">Admin Credentials:</p>
              {Object.entries(ADMIN_CREDENTIALS).map(([email, config]) => {
                const restaurant = restaurants.find(r => r.id === config.restaurantId);
                return (
                  <button key={email} onClick={() => { setEmail(email); setPassword('bitecraft123'); setLoginMode('admin'); }}
                    className="w-full text-left text-[11px] bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl px-3 py-2 transition-colors">
                    <span className="font-bold block">{email}</span>
                    <span className="text-white/70">{restaurant?.name.replace('BiteCraft ', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative z-10 border-t border-white/20 pt-4">
            <div className="flex items-center gap-2 text-xs"><ShieldCheck className="h-4 w-4 text-emerald-300" /><span>Secure Admin Authentication</span></div>
            <p className="text-[10px] text-white/60 font-light mt-1">All credentials are mock data for prototype demonstration.</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center text-left">
          <div className="space-y-2 mb-6">
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-textDark">Sign In to BiteCraft</h1>
            <p className="text-xs text-textMuted font-light">Log in as a restaurant admin or a customer</p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => { setLoginMode('admin'); setEmail('pizza@bitecraft.com'); setPassword('bitecraft123'); }}
              className={`flex-1 py-2 text-xs font-semibold font-poppins rounded-lg transition-all ${loginMode === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-textMuted hover:text-textDark'}`}>
              Restaurant Admin
            </button>
            <button onClick={() => { setLoginMode('customer'); setEmail(''); setPassword(''); }}
              className={`flex-1 py-2 text-xs font-semibold font-poppins rounded-lg transition-all ${loginMode === 'customer' ? 'bg-white text-primary shadow-sm' : 'text-textMuted hover:text-textDark'}`}>
              Customer
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-textMuted font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-textMuted font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-textMuted">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary h-3.5 w-3.5" /> Remember me
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline font-semibold font-poppins">Forgot password?</a>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-orange-500/10">
              {loginMode === 'admin' ? 'Sign In as Admin' : 'Sign In'}
              <LogIn className="h-4 w-4" />
            </button>
          </form>

          <div className="space-y-4 mt-6">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-150"></div>
              <span className="flex-shrink mx-4 text-[10px] text-textMuted uppercase">Or</span>
              <div className="flex-grow border-t border-gray-150"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-slate-50 py-2.5 rounded-xl text-xs font-semibold font-poppins text-textDark transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google Sign In
              </button>
              <button onClick={handleGuestLogin} className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-slate-50 py-2.5 rounded-xl text-xs font-semibold font-poppins text-textDark transition-colors">
                Continue as Guest
              </button>
            </div>
            <p className="text-xs text-textMuted text-center font-light pt-2">
              Don't have an account? <Link to="/signup" className="text-primary hover:underline font-semibold font-poppins">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
