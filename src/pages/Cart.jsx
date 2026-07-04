import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Percent, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getTotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState({ text: '', isError: false });
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponMessage({ text: result.message, isError: false });
      setCouponInput('');
    } else {
      setCouponMessage({ text: result.message, isError: true });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMessage({ text: 'Coupon removed.', isError: false });
  };

  const tax = Math.round(getSubtotal() * 0.05);

  if (cartItems.length === 0) {
    return (
      <div class="max-w-md mx-auto px-4 py-20 text-center space-y-6 font-inter">
        <div class="inline-flex p-5 bg-orange-50 rounded-full text-primary">
          <ShoppingBag class="h-12 w-12" />
        </div>
        <div class="space-y-2">
          <h1 class="font-poppins font-bold text-2xl text-textDark">Your Cart is Empty</h1>
          <p class="text-sm text-textMuted font-light">
            Looks like you haven't added anything to your cart yet. Explore our delicious menu!
          </p>
        </div>
        <Link
          to="/menu"
          class="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
        >
          <ArrowLeft class="h-4 w-4" />
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter text-left">
      <h1 class="font-poppins font-bold text-3xl sm:text-4xl text-textDark mb-8">Shopping Cart</h1>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div class="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-premium flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              {/* Product Info */}
              <div class="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  class="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover ring-1 ring-gray-100 shrink-0"
                />
                <div class="space-y-1 text-left">
                  <h3 class="font-poppins font-bold text-sm sm:text-base text-textDark leading-tight">
                    {item.name}
                  </h3>
                  <div class="flex items-center gap-2">
                    <span
                      class={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-poppins border ${
                        item.isVeg
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}
                    >
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    <span class="text-xs text-textMuted font-light">₹{item.price} each</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div class="flex items-center gap-3 bg-slate-50 border border-gray-150 px-2 py-1.5 rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    class="p-1 hover:bg-white rounded-lg text-textMuted hover:text-primary transition-colors focus:outline-none"
                  >
                    <Minus class="h-3.5 w-3.5" />
                  </button>
                  <span class="text-xs font-bold w-6 text-center font-poppins">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    class="p-1 hover:bg-white rounded-lg text-textMuted hover:text-primary transition-colors focus:outline-none"
                  >
                    <Plus class="h-3.5 w-3.5" />
                  </button>
                </div>

                <div class="flex items-center gap-4">
                  <span class="font-poppins font-extrabold text-base text-textDark min-w-[70px] text-right">
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    class="p-2 text-textMuted hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors focus:outline-none"
                    title="Remove item"
                  >
                    <Trash2 class="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Back Link */}
          <Link
            to="/menu"
            class="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline font-poppins pt-2"
          >
            <ArrowLeft class="h-3.5 w-3.5" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary & Coupon Panel */}
        <div class="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-premium space-y-6">
          <h2 class="font-poppins font-bold text-lg text-textDark pb-3 border-b border-gray-100">Order Summary</h2>

          {/* Coupon Code Input */}
          <div class="space-y-2">
            <span class="text-xs text-textMuted">Have a coupon code?</span>
            {!couponCode ? (
              <form onSubmit={handleApplyCoupon} class="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponMessage({ text: '', isError: false });
                  }}
                  placeholder="e.g. AICRAFT15"
                  class="flex-grow px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white uppercase"
                />
                <button
                  type="submit"
                  class="bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-xs font-semibold font-poppins transition-colors shadow-sm"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div class="flex items-center justify-between p-2.5 bg-orange-50/50 border border-orange-100 rounded-xl">
                <div class="flex items-center gap-2 text-primary">
                  <Percent class="h-4.5 w-4.5" />
                  <div class="text-left">
                    <p class="text-xs font-bold font-poppins leading-none">{couponCode}</p>
                    <span class="text-[9px] text-orange-400 font-light">{discountPercent}% discount active</span>
                  </div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  class="text-[10px] text-rose-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
            
            {couponMessage.text && (
              <p
                class={`text-[10px] font-medium ${
                  couponMessage.isError ? 'text-rose-500' : 'text-emerald-600'
                }`}
              >
                {couponMessage.text}
              </p>
            )}
            <p class="text-[10px] text-textMuted font-light italic">
              Try applying code <span class="font-bold text-primary">AICRAFT15</span> for 15% off!
            </p>
          </div>

          {/* Pricing Calculations */}
          <div class="space-y-3.5 pt-3 border-t border-gray-150 text-sm">
            <div class="flex justify-between font-light">
              <span class="text-textMuted">Subtotal</span>
              <span class="font-poppins font-medium text-textDark">₹{getSubtotal()}</span>
            </div>

            {discountPercent > 0 && (
              <div class="flex justify-between font-light text-emerald-600">
                <span>Discount ({discountPercent}%)</span>
                <span class="font-poppins font-medium">-₹{getDiscountAmount()}</span>
              </div>
            )}

            <div class="flex justify-between font-light">
              <span class="text-textMuted flex items-center gap-1">
                Taxes & Packaging
                <span class="text-[10px] bg-slate-100 text-textMuted px-1 py-0.5 rounded">5%</span>
              </span>
              <span class="font-poppins font-medium text-textDark">₹{tax}</span>
            </div>

            <div class="flex justify-between items-baseline pt-4 border-t border-gray-150">
              <span class="font-poppins font-bold text-base text-textDark">Total Amount</span>
              <span class="font-poppins font-extrabold text-2xl text-primary">
                ₹{getTotal()}
              </span>
            </div>
          </div>

          {/* Checkout Action Button */}
          <button
            onClick={() => navigate('/checkout')}
            class="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-sm py-4 rounded-2xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all"
          >
            Proceed to Checkout
            <ArrowRight class="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
