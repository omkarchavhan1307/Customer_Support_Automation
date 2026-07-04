import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { restaurants } from '../../data/mockData';
import {
  Grid, BarChart2, ArrowLeft, ChevronRight, Bot, Database, TrendingUp
} from 'lucide-react';

export default function AdminDashboard() {
  const { orders, updateOrderStatus, chatMessages, adminRestaurantId } = useOrder();
  const navigate = useNavigate();

  // Filter orders for this admin's restaurant only
  const myOrders = orders.filter(o => o.restaurantId === adminRestaurantId);
  const myRestaurant = restaurants.find(r => r.id === adminRestaurantId);

  const todayOrders = myOrders.length;
  const pendingOrders = myOrders.filter(o => o.status === 'Order Received').length;
  const activePrepCount = myOrders.filter(o => ['Preparing', 'Cooking', 'Packing'].includes(o.status)).length;
  const readyOrders = myOrders.filter(o => o.status === 'Ready').length;
  const completedOrders = myOrders.filter(o => o.status === 'Completed').length;
  const cancelledOrders = myOrders.filter(o => o.status === 'Cancelled').length;

  // All chatMessages are for the currently selected restaurant (from context)
  const recentQueries = chatMessages.filter(m => m.sender === 'customer').slice(-5).reverse();

  // Orders per day mock data (dynamic based on total orders count)
  const ordersPerDay = [
    { day: 'Mon', val: Math.max(5, todayOrders + 28), pct: 32 },
    { day: 'Tue', val: Math.max(5, todayOrders + 41), pct: 45 },
    { day: 'Wed', val: Math.max(5, todayOrders + 52), pct: 58 },
    { day: 'Thu', val: Math.max(5, todayOrders + 74), pct: 74 },
    { day: 'Fri', val: Math.max(5, todayOrders + 91), pct: 91 },
    { day: 'Sat', val: Math.max(5, todayOrders + 115), pct: 100 },
    { day: 'Sun', val: Math.max(5, todayOrders + 83), pct: 83 },
  ];

  // Revenue per hour mock
  const revenuePerHour = [
    { hour: '12 PM', val: 18, pct: 43 },
    { hour: '2 PM', val: 24, pct: 57 },
    { hour: '4 PM', val: 15, pct: 36 },
    { hour: '6 PM', val: 38, pct: 90 },
    { hour: '8 PM', val: 42, pct: 100 },
    { hour: '10 PM', val: 28, pct: 67 },
  ];

  // Popular foods
  const popularFoods = [
    { name: myRestaurant?.todaySpecial?.name?.split(' ').slice(0, 3).join(' ') || 'Truffle Pizza', share: 34, color: 'bg-orange-500' },
    { name: 'Crispy Burger', share: 28, color: 'bg-blue-500' },
    { name: 'Noodles / Dosa', share: 22, color: 'bg-emerald-500' },
    { name: 'Beverages', share: 16, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-inter text-textDark">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl text-white"><Database className="h-5 w-5" /></div>
            <div className="text-left">
              <span className="font-poppins font-bold text-base text-textDark block">BiteCraft</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Admin Portal</span>
            </div>
          </div>

          {/* Current restaurant info */}
          {myRestaurant && (
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-left">
              <p className="text-[10px] text-textMuted font-semibold uppercase tracking-wider">Logged in as</p>
              <p className="text-xs font-bold text-textDark mt-0.5 leading-tight">{myRestaurant.name}</p>
            </div>
          )}

          <nav className="space-y-1">
            <Link to="/admin" className="w-full flex items-center gap-3 px-4 py-2.5 bg-orange-50 text-primary rounded-xl text-sm font-semibold font-poppins">
              <Grid className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/admin/analytics" className="w-full flex items-center gap-3 px-4 py-2.5 text-textMuted hover:text-textDark hover:bg-slate-50 rounded-xl text-sm font-medium font-poppins transition-colors">
              <BarChart2 className="h-4 w-4" /> Analytics
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t border-slate-100 space-y-3">
          <Link to="/" className="flex items-center gap-2 text-xs text-textMuted hover:text-primary font-poppins font-semibold transition-colors">
            <ArrowLeft className="h-4 w-4" /> Return to Storefront
          </Link>
          <Link to="/login" className="flex items-center gap-2 text-xs text-rose-500 hover:text-rose-700 font-poppins font-semibold transition-colors">
            Switch Restaurant
          </Link>
          <p className="text-[10px] text-textMuted font-light">BiteCraft Admin v2.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
          <div>
            <h1 className="font-poppins font-bold text-3xl text-textDark">Kitchen Dashboard</h1>
            <p className="text-xs text-textMuted mt-1">{myRestaurant?.name} · Real-time queue management</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-textMuted flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live sync active
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { label: "Today's Orders", val: todayOrders, color: 'text-slate-800', bg: 'bg-white' },
            { label: 'Pending', val: pendingOrders, color: 'text-blue-600', bg: 'bg-blue-50/50 border border-blue-100' },
            { label: 'Preparing/Cooking', val: activePrepCount, color: 'text-orange-600', bg: 'bg-orange-50/50 border border-orange-100' },
            { label: 'Ready', val: readyOrders, color: 'text-emerald-600', bg: 'bg-emerald-50/50 border border-emerald-100' },
            { label: 'Completed', val: completedOrders, color: 'text-slate-500', bg: 'bg-white' },
            { label: 'Cancelled', val: cancelledOrders, color: 'text-rose-600', bg: 'bg-rose-50/50 border border-rose-100' },
          ].map((card, idx) => (
            <div key={idx} className={`p-4 rounded-2xl shadow-sm text-left ${card.bg}`}>
              <span className="text-[10px] text-textMuted block uppercase font-semibold leading-none">{card.label}</span>
              <p className={`font-poppins font-extrabold text-2xl mt-2 ${card.color}`}>{card.val}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders per Day Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left space-y-6">
            <div>
              <h3 className="font-poppins font-bold text-base text-textDark flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Orders Per Day
              </h3>
              <p className="text-[10px] text-textMuted mt-0.5">Weekly kitchen orders snapshot</p>
            </div>
            <div className="flex items-end justify-between h-44 border-b border-slate-100 px-2">
              {ordersPerDay.map((bar) => (
                <div key={bar.day} className="flex flex-col items-center gap-1.5 group cursor-pointer flex-1 px-1">
                  <span className="text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}</span>
                  <div
                    className="w-full bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-lg transition-all duration-500 group-hover:from-orange-500 group-hover:to-orange-600"
                    style={{ height: `${bar.pct}%` }}
                  ></div>
                  <span className="text-[10px] text-textMuted font-medium font-poppins">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Analytics Line-style Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left space-y-6">
            <div>
              <h3 className="font-poppins font-bold text-base text-textDark flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-emerald-500" /> Revenue Analytics
              </h3>
              <p className="text-[10px] text-textMuted mt-0.5">Hourly revenue (₹ thousands)</p>
            </div>
            <div className="flex items-end justify-between h-44 border-b border-slate-100 px-2 gap-2">
              {revenuePerHour.map((bar) => (
                <div key={bar.hour} className="flex flex-col items-center gap-1.5 group cursor-pointer flex-1">
                  <span className="text-[9px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">₹{bar.val}k</span>
                  <div
                    className="w-full bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t-lg transition-all duration-500 group-hover:from-emerald-500 group-hover:to-emerald-600"
                    style={{ height: `${bar.pct}%` }}
                  ></div>
                  <span className="text-[10px] text-textMuted font-medium font-poppins">{bar.hour}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table + Recent Queries */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Orders Table */}
          <div className="xl:col-span-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-poppins font-bold text-lg text-textDark text-left">Live Order Queue</h3>
              <span className="text-[10px] bg-slate-100 text-textMuted px-2 py-1 rounded font-medium">{myOrders.length} orders</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-semibold text-textMuted uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3.5 px-5">ID</th>
                    <th className="py-3.5 px-5">Customer</th>
                    <th className="py-3.5 px-5">Items</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Queue</th>
                    <th className="py-3.5 px-5">Est.</th>
                    <th className="py-3.5 px-5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 font-poppins font-bold text-textDark">#{order.id}</td>
                      <td className="py-4 px-5">
                        <p className="text-xs font-semibold text-textDark leading-none">{order.customer.name}</p>
                        <span className="text-[10px] text-textMuted font-light">{order.customer.type}</span>
                      </td>
                      <td className="py-4 px-5 max-w-[160px] truncate text-xs text-textMuted font-light">
                        {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </td>
                      <td className="py-4 px-5">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold focus:outline-none border ${
                            order.status === 'Order Received' ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : ['Preparing', 'Cooking', 'Packing'].includes(order.status) ? 'bg-orange-50 text-primary border-orange-200'
                            : order.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : order.status === 'Completed' ? 'bg-slate-50 text-slate-500 border-slate-200'
                            : 'bg-rose-50 text-rose-600 border-rose-200'
                          }`}
                        >
                          {['Order Received', 'Preparing', 'Cooking', 'Packing', 'Ready', 'Completed', 'Cancelled'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-5 text-xs font-bold font-poppins">
                        {order.queuePosition > 0 ? `#${order.queuePosition}` : '–'}
                      </td>
                      <td className="py-4 px-5 text-xs font-semibold font-poppins">
                        {order.estPrepTime > 0 ? `${order.estPrepTime}m` : 'Ready'}
                      </td>
                      <td className="py-4 px-5">
                        <Link to={`/admin/order/${order.id}`} className="text-xs text-primary font-semibold hover:underline font-poppins flex items-center gap-0.5">
                          Details <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {myOrders.length === 0 && (
                    <tr><td colSpan="7" className="py-10 text-center text-textMuted font-light text-sm">No orders for this restaurant yet. Place one in the client view!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Queries Sidebar */}
          <div className="xl:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-poppins font-bold text-base text-textDark">Recent Customer Queries</h3>
            </div>
            <div className="space-y-3">
              {recentQueries.map((msg, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs text-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-textDark">Customer</span>
                    <span className="text-[9px] text-textMuted">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="font-light italic">"{msg.text}"</p>
                </div>
              ))}
              {recentQueries.length === 0 && (
                <p className="text-xs text-textMuted font-light text-center py-6">No customer queries logged yet for this restaurant.</p>
              )}
            </div>
          </div>
        </div>

        {/* Popular Foods bar indicators */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left space-y-6">
          <div>
            <h4 className="font-poppins font-bold text-base text-textDark">Popular Foods Share</h4>
            <p className="text-[10px] text-textMuted mt-0.5">Top performing items based on client orders at {myRestaurant?.name}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularFoods.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-textDark truncate">{item.name}</span>
                  <span className="text-textMuted ml-2">{item.share}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.share}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
