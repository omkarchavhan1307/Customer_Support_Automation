import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Download, Timer, User, Hash, ClipboardList, HelpCircle, ChevronRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function Confirmation() {
  const { orders, activeOrderIds, selectedRestaurantId } = useOrder();
  const navigate = useNavigate();

  // Find the active order for the selected restaurant
  const activeOrderId = activeOrderIds[selectedRestaurantId];
  const activeOrder = orders.find(o => o.id === activeOrderId && o.restaurantId === selectedRestaurantId) || orders.find(o => o.restaurantId === selectedRestaurantId);

  if (!activeOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 font-inter">
        <h2 className="font-poppins font-bold text-xl text-textDark">No orders found</h2>
        <Link to="/menu" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-block">
          Order Food
        </Link>
      </div>
    );
  }

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    alert(`Downloading receipt for Order #${activeOrder.id}...`);
  };

  // Convert creation date to friendly pickup/delivery time
  const creationTime = new Date(activeOrder.createdAt);
  const completionTime = new Date(creationTime.getTime() + (activeOrder.estPrepTime || 15) * 60 * 1000);
  const friendlyTime = completionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 font-inter text-left space-y-8">
      {/* Visual Success Accent */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full animate-bounce">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-1">
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-emerald-900">Order Placed Successfully!</h1>
          <p className="text-sm text-emerald-700 font-light">
            Thank you, <span className="font-semibold">{activeOrder.customer.name}</span>. Your order is now registered in our automated queue.
          </p>
        </div>
      </div>

      {/* Main Order Details Cards */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-premium p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            <div>
              <span className="text-[10px] text-textMuted leading-none block uppercase tracking-wider font-semibold">Order Number</span>
              <p className="font-poppins font-bold text-lg text-textDark">#{activeOrder.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <div>
              <span className="text-[10px] text-textMuted leading-none block uppercase tracking-wider font-semibold">Est. Preparation Time</span>
              <p className="font-poppins font-bold text-lg text-textDark">{activeOrder.estPrepTime > 0 ? `${activeOrder.estPrepTime} mins` : 'Ready'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <div>
              <span className="text-[10px] text-textMuted leading-none block uppercase tracking-wider font-semibold">Queue Position</span>
              <p className="font-poppins font-bold text-lg text-textDark">
                {activeOrder.queuePosition > 0 ? `#${activeOrder.queuePosition} in line` : 'Ready'}
              </p>
            </div>
          </div>
        </div>

        {/* Live Status Tracker Bar (Simple Visual representation) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-textDark">Fulfillment: {activeOrder.customer.type}</span>
            <span className="text-primary font-bold">{activeOrder.status}</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-full rounded-full transition-all duration-1000"
              style={{
                width:
                  activeOrder.status === 'Order Received'
                    ? '15%'
                    : activeOrder.status === 'Preparing'
                    ? '40%'
                    : activeOrder.status === 'Cooking'
                    ? '70%'
                    : activeOrder.status === 'Packing'
                    ? '90%'
                    : activeOrder.status === 'Ready' || activeOrder.status === 'Completed'
                    ? '100%'
                    : '0%'
              }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-textMuted pt-1 font-light">
            <span>Received</span>
            <span>Cooking</span>
            <span>Ready</span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-sm text-textDark uppercase tracking-wider">Fulfillment Details</h3>
            <ul className="space-y-2 text-xs text-textMuted">
              <li className="flex justify-between">
                <span>Customer:</span>
                <span className="font-medium text-textDark">{activeOrder.customer.name}</span>
              </li>
              <li className="flex justify-between">
                <span>Phone:</span>
                <span className="font-medium text-textDark">{activeOrder.customer.phone}</span>
              </li>
              <li className="flex justify-between">
                <span>Fulfillment Time:</span>
                <span className="font-medium text-primary">{friendlyTime}</span>
              </li>
              {activeOrder.customer.type === 'Delivery' && (
                <li className="flex justify-between flex-col text-left gap-1">
                  <span>Address:</span>
                  <span className="font-medium text-textDark bg-slate-50 p-2 rounded-lg border border-gray-100">{activeOrder.customer.address}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-sm text-textDark uppercase tracking-wider">Ordered Items</h3>
            <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar pr-1">
              {activeOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-textMuted">
                  <span>
                    {item.name} <span className="text-[10px] font-bold text-primary">x{item.quantity}</span>
                  </span>
                  <span className="font-medium text-textDark">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-bold text-textDark pt-3 border-t border-dashed border-gray-150">
              <span>Paid via {activeOrder.status === 'Completed' ? 'Cash/Card' : 'Selected Method'}</span>
              <span className="text-primary font-extrabold text-base">₹{activeOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Buttons Panel */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 hover:border-gray-300 text-textDark font-poppins font-semibold text-sm px-5 py-3 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Download className="h-4.5 w-4.5 text-textMuted" />
            Download Receipt
          </button>
          
          <Link
            to="/track-order"
            className="flex-grow flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
          >
            Track Order Live
            <ChevronRight className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-800 flex items-start gap-2.5">
        <HelpCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Tip:</strong> Need to add something else (like a cold drink) or make changes? Open the chatbot in the bottom right corner or visit our <Link to="/chatbot" className="underline font-bold text-blue-900">AI Assistant</Link> page, type your order ID <strong>#{activeOrder.id}</strong>, and get instant updates!
        </p>
      </div>
    </div>
  );
}
