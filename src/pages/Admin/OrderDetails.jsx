import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { ArrowLeft, User, ClipboardList, Clock, CheckCircle2, XCircle, Timer, Database } from 'lucide-react';
import { restaurants } from '../../data/mockData';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const { orders, updateOrderStatus, adminRestaurantId } = useOrder();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const myRestaurant = restaurants.find(r => r.id === adminRestaurantId);

  useEffect(() => {
    const matched = orders.find(o => o.id === id && o.restaurantId === adminRestaurantId);
    if (matched) setOrder(matched);
  }, [orders, id, adminRestaurantId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <p className="text-textMuted font-light">Order #{id} not found or doesn't belong to your restaurant.</p>
          <Link to="/admin" className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-semibold inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (status) => updateOrderStatus(order.id, status);
  const handleCompleteOrder = () => { updateOrderStatus(order.id, 'Completed'); navigate('/admin'); };
  const handleCancelOrder = () => { updateOrderStatus(order.id, 'Cancelled'); navigate('/admin'); };
  const friendlyTime = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-inter text-textDark text-left">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl text-white"><Database className="h-5 w-5" /></div>
            <div className="text-left">
              <span className="font-poppins font-bold text-base text-textDark block">BiteCraft</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider font-poppins">Admin Portal</span>
            </div>
          </div>
          {myRestaurant && (
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-left">
              <p className="text-[10px] text-textMuted font-semibold uppercase tracking-wider">Logged in as</p>
              <p className="text-xs font-bold text-textDark mt-0.5 leading-tight">{myRestaurant.name}</p>
            </div>
          )}
          <nav className="space-y-1">
            <Link to="/admin" className="w-full flex items-center gap-3 px-4 py-2.5 text-textMuted hover:text-textDark hover:bg-slate-50 rounded-xl text-sm font-medium font-poppins transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </nav>
        </div>
        <p className="text-[10px] text-textMuted font-light">BiteCraft Admin v2.0</p>
      </aside>

      {/* Main */}
      <main className="flex-grow p-6 sm:p-10 space-y-6 overflow-y-auto">
        <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-textMuted hover:text-textDark font-poppins font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-poppins font-bold text-3xl text-textDark">Order #{order.id} Details</h1>
            <span className="text-xs text-textMuted">Created today at {friendlyTime}</span>
          </div>
          <div className="flex gap-3">
            {order.status !== 'Completed' && order.status !== 'Cancelled' && (
              <button onClick={handleCancelOrder} className="flex items-center gap-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 font-poppins font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors">
                <XCircle className="h-4 w-4" /> Cancel Order
              </button>
            )}
            {order.status !== 'Completed' && order.status !== 'Cancelled' && (
              <button onClick={handleCompleteOrder} className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/10">
                <CheckCircle2 className="h-4 w-4" /> Complete Order
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Detail Card */}
          <div className="lg:col-span-8 space-y-6">
            {/* Customer Info */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-poppins font-bold text-sm text-textDark uppercase tracking-wider flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" /> Customer Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-textMuted leading-relaxed">
                <div className="space-y-2">
                  <p><strong className="text-textDark">Name:</strong> {order.customer.name}</p>
                  <p><strong className="text-textDark">Email:</strong> {order.customer.email}</p>
                  <p><strong className="text-textDark">Phone:</strong> {order.customer.phone}</p>
                </div>
                <div className="space-y-2">
                  <p><strong className="text-textDark">Type:</strong> <span className="text-primary font-semibold">{order.customer.type}</span></p>
                  {order.customer.type === 'Delivery' && (
                    <p><strong className="text-textDark">Address:</strong> <span className="block mt-1 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1">{order.customer.address}</span></p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-poppins font-bold text-sm text-textDark uppercase tracking-wider flex items-center gap-1.5">
                <ClipboardList className="h-4 w-4 text-primary" /> Ordered Items
              </h3>
              <div className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                    <span className="text-textDark font-medium">
                      {item.name} <span className="text-[10px] font-bold text-primary bg-orange-50 px-1.5 py-0.5 rounded ml-1">x{item.quantity}</span>
                    </span>
                    <span className="font-poppins font-bold text-textDark">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-4 flex justify-between font-bold text-sm text-textDark">
                  <span>Total (incl. Tax & Packaging)</span>
                  <span className="text-primary font-extrabold text-base">₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stage Controls */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="font-poppins font-bold text-sm text-textDark uppercase tracking-wider">Kitchen Stage Controls</h3>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-1.5">
              <span className="text-[10px] text-textMuted block uppercase font-semibold">Current Status</span>
              <p className="font-poppins font-extrabold text-lg text-primary">{order.status}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-textMuted font-semibold block uppercase">Quick Transitions</span>
              <div className="grid grid-cols-1 gap-2">
                {['Preparing', 'Cooking', 'Packing', 'Ready'].map((stage) => (
                  <button key={stage} disabled={order.status === stage} onClick={() => handleStatusUpdate(stage)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold font-poppins transition-all border ${
                      order.status === stage
                        ? 'bg-primary border-primary text-white shadow-sm'
                        : 'bg-white border-slate-200 text-textMuted hover:border-primary hover:text-primary'
                    }`}>
                    {stage} {order.status === stage && '✓'}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="p-2.5 bg-orange-100 rounded-xl text-primary shrink-0"><Clock className="h-5 w-5" /></div>
              <div>
                <span className="text-[10px] text-textMuted block uppercase font-semibold">Est. Prep Time</span>
                <p className="font-poppins font-bold text-sm text-textDark mt-1">
                  {order.estPrepTime > 0 ? `${order.estPrepTime} minutes left` : 'Ready for handoff'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
