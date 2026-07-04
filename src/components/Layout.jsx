import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Bot, LogIn, UserPlus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { restaurants } from '../data/mockData';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { selectedRestaurantId } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isAdminPath = location.pathname.startsWith('/admin');
  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurantId);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'AI Assistant', path: '/chatbot' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  if (isAdminPath) {
    return <div className="min-h-screen bg-bgLight">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-inter text-textDark">
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2.5 bg-primary rounded-xl text-white group-hover:scale-105 transition-transform shadow-md shadow-orange-500/20">
                <Bot className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl tracking-tight leading-none text-textDark group-hover:text-primary transition-colors flex items-center gap-1.5">
                  BiteCraft <span className="text-xs bg-orange-100 text-primary px-1.5 py-0.5 rounded-full font-medium">AI</span>
                </span>
                {currentRestaurant && (
                  <span className="text-[10px] text-textMuted mt-0.5 max-w-[180px] truncate">{currentRestaurant.name}</span>
                )}
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-poppins text-sm font-medium transition-all relative py-2 ${
                      isActive
                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
                        : 'text-textMuted hover:text-textDark'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/cart"
                className="relative p-2.5 text-textDark hover:text-primary transition-colors hover:bg-orange-50 rounded-xl"
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-primary rounded-full ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link to="/login" className="font-poppins text-sm font-semibold text-textMuted hover:text-textDark px-3 py-2 transition-colors flex items-center gap-1.5">
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link to="/signup" className="font-poppins text-sm font-semibold text-white bg-primary hover:bg-primary-hover px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center gap-1.5">
                <UserPlus className="h-4 w-4" /> Sign Up
              </Link>
              <Link to="/admin" className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium font-poppins transition-colors">
                Admin Panel
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center md:hidden gap-3">
              <Link to="/cart" className="relative p-2 text-textDark hover:text-primary">
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-primary rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-textDark hover:text-primary">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-xl text-sm font-medium font-poppins ${
                    isActive ? 'bg-orange-50 text-primary' : 'text-textMuted hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center border border-gray-200 text-textDark py-2 rounded-xl text-sm font-semibold font-poppins">Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="flex-1 text-center bg-primary text-white py-2 rounded-xl text-sm font-semibold font-poppins">Sign Up</Link>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full text-center bg-slate-100 text-slate-700 py-2 rounded-xl text-xs font-medium font-poppins">Admin Portal</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow w-full">{children}</main>

      {/* Footer */}
      <footer className="w-full bg-[#1E293B] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary rounded-xl"><Bot className="h-5 w-5" /></div>
                <span className="font-poppins font-bold text-lg">BiteCraft <span className="text-xs bg-orange-500/20 text-primary px-1.5 py-0.5 rounded-full">AI</span></span>
              </div>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                A multi-restaurant AI-powered customer support and kitchen automation SaaS platform.
              </p>
            </div>
            <div>
              <h3 className="font-poppins text-sm font-semibold text-slate-200 uppercase mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}><Link to={link.path} className="text-sm text-slate-400 hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-sm font-semibold text-slate-200 uppercase mb-4">Restaurants</h3>
              <ul className="space-y-2">
                {restaurants.map(r => (
                  <li key={r.id} className="text-sm text-slate-400">{r.name.replace('BiteCraft ', '')}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-sm font-semibold text-slate-200 uppercase mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Bangalore, India</li>
                <li>+91 98765 43210</li>
                <li>support@bitecraft.ai</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} BiteCraft AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
