import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShoppingBag, Landmark, ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

export default function Checkout() {
  const { cartItems, getTotal, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Aarav Mehta',
    email: 'aarav@gmail.com',
    phone: '+91 98765 00123',
    address: 'Flat 402, Oakwood Apartments, Tech District, Bengaluru',
    type: 'Delivery', // Delivery or Pickup
    timeSlot: 'ASAP (approx. 20-30 mins)',
    paymentMethod: 'UPI' // UPI, Card, Cash
  });

  const [errors, setErrors] = useState({});

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 font-inter">
        <div className="inline-flex p-5 bg-orange-50 rounded-full text-primary">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="font-poppins font-bold text-xl text-textDark">No items to checkout</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-primary text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-hover transition-colors"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.type === 'Delivery' && !formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit order using OrderContext
    placeOrder(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.type === 'Delivery' ? formData.address : 'Table 4 (Dine-in/Pickup)',
        type: formData.type
      },
      cartItems,
      getTotal()
    );

    // Clear cart and navigate
    clearCart();
    navigate('/order-confirmation');
  };

  const timeSlots = [
    'ASAP (approx. 20-30 mins)',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '06:30 PM',
    '07:00 PM',
    '07:30 PM',
    '08:00 PM',
    '08:30 PM'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter text-left">
      {/* Back to Cart */}
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center gap-1.5 text-xs text-textMuted hover:text-textDark font-poppins font-semibold mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Cart
      </button>

      <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-textDark mb-8">Checkout Details</h1>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Fulfillment Type */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium space-y-4">
            <h2 className="font-poppins font-bold text-lg text-textDark flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              1. Fulfillment Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.type === 'Delivery'
                    ? 'border-primary bg-orange-50/20 shadow-sm'
                    : 'border-gray-150 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Delivery"
                  checked={formData.type === 'Delivery'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Truck className={`h-6 w-6 ${formData.type === 'Delivery' ? 'text-primary' : 'text-slate-400'}`} />
                <span className="font-poppins font-semibold text-xs text-textDark">Delivery</span>
              </label>

              <label
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.type === 'Pickup'
                    ? 'border-primary bg-orange-50/20 shadow-sm'
                    : 'border-gray-150 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Pickup"
                  checked={formData.type === 'Pickup'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <ShoppingBag className={`h-6 w-6 ${formData.type === 'Pickup' ? 'text-primary' : 'text-slate-400'}`} />
                <span className="font-poppins font-semibold text-xs text-textDark">Store Pickup</span>
              </label>
            </div>
          </div>

          {/* 2. Customer Information */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium space-y-4">
            <h2 className="font-poppins font-bold text-lg text-textDark flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              2. Delivery & Customer Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs text-textMuted font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aarav Mehta"
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
                {errors.name && <p className="text-[10px] text-rose-500 font-medium">{errors.name}</p>}
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs text-textMuted font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 98765 00123"
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
                {errors.phone && <p className="text-[10px] text-rose-500 font-medium">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs text-textMuted font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. aarav@gmail.com"
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
              {errors.email && <p className="text-[10px] text-rose-500 font-medium">{errors.email}</p>}
            </div>

            {formData.type === 'Delivery' && (
              <div className="space-y-1.5 text-left">
                <label className="text-xs text-textMuted font-medium">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Flat No, Street, Landmark, Area..."
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                ></textarea>
                {errors.address && <p className="text-[10px] text-rose-500 font-medium">{errors.address}</p>}
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-xs text-textMuted font-medium">Fulfillment Time</label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium space-y-4">
            <h2 className="font-poppins font-bold text-lg text-textDark flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              3. Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'UPI', label: 'UPI (GPay/PhonePe)', icon: Landmark },
                { id: 'Card', label: 'Credit/Debit Card', icon: CreditCard },
                { id: 'COD', label: 'Cash on Delivery', icon: Truck }
              ].map((method) => {
                const IconComponent = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-primary bg-orange-50/20 shadow-sm'
                        : 'border-gray-150 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <IconComponent className={`h-5 w-5 ${formData.paymentMethod === method.id ? 'text-primary' : 'text-slate-400'}`} />
                    <span className="font-poppins font-semibold text-xs text-textDark leading-none">{method.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary Panel */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-premium space-y-6">
          <h2 className="font-poppins font-bold text-lg text-textDark pb-3 border-b border-gray-100">Review Summary</h2>

          {/* Cart items list preview */}
          <div className="space-y-3 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="text-left">
                  <p className="font-semibold text-textDark">{item.name}</p>
                  <span className="text-textMuted text-[10px] font-light">Qty: {item.quantity}</span>
                </div>
                <span className="font-poppins font-bold text-textDark">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Checkout pricing details */}
          <div className="space-y-3 pt-4 border-t border-gray-150 text-sm">
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-poppins font-bold text-sm text-textDark">Final Total</span>
              <span className="font-poppins font-extrabold text-xl text-primary">₹{getTotal()}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-sm py-4 rounded-2xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all"
          >
            Place Order
            <ShieldCheck className="h-4.5 w-4.5" />
          </button>

          <p className="text-[10px] text-textMuted text-center font-light leading-relaxed">
            By clicking place order, you authorize BiteCraft to schedule this order immediately into the kitchen queue.
          </p>
        </div>
      </form>
    </div>
  );
}
