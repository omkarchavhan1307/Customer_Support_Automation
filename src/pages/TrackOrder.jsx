import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { Search, Clock, Users, User, CheckCircle2, Play, Link } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const STATUS_STEPS = ['Order Received', 'Preparing', 'Cooking', 'Packing', 'Ready'];

function getStepIndex(status) {
  const idx = STATUS_STEPS.indexOf(status);
  if (idx !== -1) return idx;
  if (status === 'Completed') return 4;
  return -1;
}

export default function TrackOrder() {
  const { orders, activeOrderIds, selectedRestaurantId } = useOrder();
  const [searchInput, setSearchInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-load the active order for this restaurant on mount or when it changes
  useEffect(() => {
    const activeId = activeOrderIds[selectedRestaurantId];
    if (activeId) {
      const found = orders.find(o => o.id === activeId && o.restaurantId === selectedRestaurantId);
      if (found) {
        setTrackedOrder(found);
        setSearchInput(activeId);
        setErrorMessage('');
        return;
      }
    }
    // Fallback: show first order for this restaurant
    const firstOrder = orders.find(o => o.restaurantId === selectedRestaurantId);
    if (firstOrder) {
      setTrackedOrder(firstOrder);
      setSearchInput(firstOrder.id);
    }
  }, [orders, activeOrderIds, selectedRestaurantId]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Sanitize: strip leading # and whitespace
    const sanitized = searchInput.trim().replace(/^#/, '');
    if (!sanitized) return;

    const matched = orders.find(o => o.id === sanitized && o.restaurantId === selectedRestaurantId);
    if (matched) {
      setTrackedOrder(matched);
      setErrorMessage('');
    } else {
      setTrackedOrder(null);
      setErrorMessage(`No order found with ID #${sanitized} at this restaurant.`);
    }
  };

  const currentStepIndex = trackedOrder ? getStepIndex(trackedOrder.status) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-inter text-left space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-textDark">Track Your Order</h1>
          <p className="text-sm text-textMuted max-w-xl font-light">Monitor your meal's progress live. BiteCraft updates the status in real-time as the chef completes each stage.</p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Order ID (e.g. 1054)"
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-poppins font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-md shadow-orange-500/10">
            Track
          </button>
        </form>
        {errorMessage && <p className="text-xs text-rose-500 font-medium">{errorMessage}</p>}
      </div>

      {trackedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-premium space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold font-poppins uppercase text-textMuted">Order #{trackedOrder.id}</span>
                <p className="text-sm text-textMuted font-light">{trackedOrder.customer.name} · {trackedOrder.customer.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-poppins ${
                trackedOrder.status === 'Cancelled' ? 'bg-rose-50 text-rose-600 border border-rose-100'
                : trackedOrder.status === 'Ready' || trackedOrder.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-orange-50 text-primary border border-orange-100'
              }`}>
                {trackedOrder.status}
              </span>
            </div>

            {trackedOrder.status === 'Cancelled' ? (
              <div className="p-6 bg-rose-50/50 border border-rose-100 rounded-2xl text-center space-y-2">
                <p className="font-poppins font-bold text-rose-900 text-sm">Order Cancelled</p>
                <p className="text-xs text-rose-700 font-light">Contact support@bitecraft.ai if you believe this is an error.</p>
              </div>
            ) : (
              <div className="relative pl-6 sm:pl-10 space-y-8">
                <div className="absolute left-[13px] sm:left-[17px] top-2 bottom-2 w-[2px] bg-slate-100"></div>
                {STATUS_STEPS.map((step, idx) => {
                  const isCompleted = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div key={step} className="relative flex gap-4 text-left items-start">
                      <div className="relative z-10 shrink-0">
                        {isCompleted ? (
                          <div className="h-7 w-7 sm:h-9 sm:w-9 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        ) : isCurrent ? (
                          <div className="h-7 w-7 sm:h-9 sm:w-9 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white shadow-md animate-pulse">
                            <Play className="h-3 w-3 fill-white" />
                          </div>
                        ) : (
                          <div className="h-7 w-7 sm:h-9 sm:w-9 bg-slate-100 rounded-full border-4 border-white flex items-center justify-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-slate-300"></div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5 mt-0.5">
                        <h3 className={`font-poppins font-bold text-sm ${isCompleted ? 'text-emerald-700' : isCurrent ? 'text-primary' : 'text-textMuted'}`}>{step}</h3>
                        <p className="text-xs text-textMuted font-light">
                          {idx === 0 && 'We have received your order request'}
                          {idx === 1 && 'Chef is gathering fresh ingredients'}
                          {idx === 2 && 'Food is sizzling in the kitchen'}
                          {idx === 3 && 'Securing freshness in eco containers'}
                          {idx === 4 && 'Ready for pickup or delivery handoff'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Metrics Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium space-y-4 text-left">
              <h3 className="font-poppins font-bold text-sm text-textDark uppercase tracking-wider">Live Metrics</h3>
              {[
                { icon: Clock, label: 'Est. Waiting Time', value: trackedOrder.estPrepTime > 0 ? `${trackedOrder.estPrepTime} minutes` : 'Ready!' },
                { icon: Users, label: 'Queue Position', value: trackedOrder.queuePosition > 0 ? `#${trackedOrder.queuePosition} in line` : 'At Counter' },
                { icon: User, label: 'Chef Assigned', value: trackedOrder.chef }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 bg-slate-50 border border-gray-100 rounded-2xl">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-primary shrink-0"><Icon className="h-5 w-5" /></div>
                  <div>
                    <span className="text-[10px] text-textMuted block leading-none">{label}</span>
                    <p className="font-poppins font-bold text-sm text-textDark mt-1">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 text-[11px] text-orange-800 leading-relaxed">
              <strong>Tip:</strong> Visit the <NavLink to="/admin" className="underline font-bold text-orange-950">Admin Panel</NavLink>, find Order #{trackedOrder.id}, update its status, and watch this page reflect changes instantly!
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 bg-white rounded-3xl border border-gray-100 shadow-premium text-center">
          <p className="text-textMuted font-light">Enter your Order ID above to track your order status.</p>
        </div>
      )}
    </div>
  );
}
