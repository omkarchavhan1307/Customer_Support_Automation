import React from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { restaurants } from '../../data/mockData';
import { BarChart2, Grid, ArrowLeft, DollarSign, TrendingUp, Clock, Star, Database } from 'lucide-react';

export default function AdminAnalytics() {
  const { orders, adminRestaurantId } = useOrder();
  const myOrders = orders.filter(o => o.restaurantId === adminRestaurantId);
  const myRestaurant = restaurants.find(r => r.id === adminRestaurantId);

  const totalRevenue = myOrders.filter(o => o.status !== 'Cancelled').reduce((acc, o) => acc + o.total, 0);
  const averageWaitTime = myOrders.length > 0
    ? Math.round(myOrders.reduce((acc, o) => acc + (o.estPrepTime || 15), 0) / myOrders.length)
    : 15;

  // Weekly revenue per day (mock)
  const weeklyRevenue = [
    { day: 'Mon', val: 12400, pct: 38 },
    { day: 'Tue', val: 18600, pct: 57 },
    { day: 'Wed', val: 15200, pct: 46 },
    { day: 'Thu', val: 28900, pct: 88 },
    { day: 'Fri', val: 32700, pct: 100 },
    { day: 'Sat', val: 29500, pct: 90 },
    { day: 'Sun', val: 21100, pct: 65 },
  ];

  // Hourly orders (mock)
  const hourlyOrders = [
    { hour: '12 PM', val: 18, pct: 36 },
    { hour: '1 PM', val: 32, pct: 64 },
    { hour: '2 PM', val: 25, pct: 50 },
    { hour: '6 PM', val: 48, pct: 96 },
    { hour: '7 PM', val: 50, pct: 100 },
    { hour: '9 PM', val: 35, pct: 70 },
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
          {myRestaurant && (
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-left">
              <p className="text-[10px] text-textMuted font-semibold uppercase tracking-wider">Logged in as</p>
              <p className="text-xs font-bold text-textDark mt-0.5 leading-tight">{myRestaurant.name}</p>
            </div>
          )}
          <nav className="space-y-1">
            <Link to="/admin" className="w-full flex items-center gap-3 px-4 py-2.5 text-textMuted hover:text-textDark hover:bg-slate-50 rounded-xl text-sm font-medium font-poppins transition-colors">
              <Grid className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/admin/analytics" className="w-full flex items-center gap-3 px-4 py-2.5 bg-orange-50 text-primary rounded-xl text-sm font-semibold font-poppins">
              <BarChart2 className="h-4 w-4" /> Analytics
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t border-slate-100 space-y-3">
          <Link to="/" className="flex items-center gap-2 text-xs text-textMuted hover:text-primary font-poppins font-semibold transition-colors">
            <ArrowLeft className="h-4 w-4" /> Return to Storefront
          </Link>
          <Link to="/login" className="text-xs text-rose-500 hover:text-rose-700 font-poppins font-semibold">Switch Restaurant</Link>
          <p className="text-[10px] text-textMuted font-light">BiteCraft Admin v2.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
          <div>
            <h1 className="font-poppins font-bold text-3xl text-textDark">Analytics & Reports</h1>
            <p className="text-xs text-textMuted mt-1">{myRestaurant?.name} · Monthly Overview</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Gross Revenue', val: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50/30' },
            { label: 'Total Orders', val: myOrders.length, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50/30' },
            { label: 'Avg Wait Time', val: `${averageWaitTime} mins`, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50/30' },
            { label: 'Satisfaction', val: `${myRestaurant?.rating || 4.8} / 5.0`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50/30' },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left flex justify-between items-center">
                <div className="space-y-2">
                  <span className="text-xs text-textMuted uppercase font-semibold leading-none block">{card.label}</span>
                  <p className="font-poppins font-extrabold text-2xl text-textDark">{card.val}</p>
                </div>
                <div className={`p-3.5 rounded-2xl ${card.color} ${card.bg}`}><Icon className="h-6 w-6" /></div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Revenue Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left space-y-5">
            <div>
              <h3 className="font-poppins font-bold text-base text-textDark">Weekly Revenue</h3>
              <p className="text-[10px] text-textMuted mt-0.5">Daily revenue breakdown (₹)</p>
            </div>
            {/* Bar Chart with SVG grid lines */}
            <div className="relative">
              <div className="flex items-end justify-between gap-1 h-48 border-b border-slate-100 px-1">
                {weeklyRevenue.map((bar) => (
                  <div key={bar.day} className="flex flex-col items-center gap-1.5 group cursor-pointer flex-1">
                    <span className="text-[9px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ₹{(bar.val / 1000).toFixed(1)}k
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t-lg transition-all duration-700 group-hover:from-emerald-500 group-hover:to-emerald-600 relative overflow-hidden"
                      style={{ height: `${bar.pct}%` }}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-[10px] text-textMuted font-medium font-poppins">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hourly Orders Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left space-y-5">
            <div>
              <h3 className="font-poppins font-bold text-base text-textDark">Orders by Hour</h3>
              <p className="text-[10px] text-textMuted mt-0.5">Peak hours kitchen activity</p>
            </div>
            <div className="flex items-end justify-between gap-2 h-48 border-b border-slate-100 px-1">
              {hourlyOrders.map((bar) => (
                <div key={bar.hour} className="flex flex-col items-center gap-1.5 group cursor-pointer flex-1">
                  <span className="text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}</span>
                  <div
                    className="w-full bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-lg transition-all duration-700 group-hover:from-orange-500 group-hover:to-orange-600"
                    style={{ height: `${bar.pct}%` }}
                  ></div>
                  <span className="text-[10px] text-textMuted font-medium font-poppins">{bar.hour}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wait Time Performance Ring + Order Status Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SVG Ring */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left space-y-6">
            <div>
              <h3 className="font-poppins font-bold text-base text-textDark">Wait Time Performance</h3>
              <p className="text-[10px] text-textMuted mt-0.5">% of orders ready within estimated time</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="52" stroke="#E2E8F0" strokeWidth="10" fill="transparent" />
                  <circle cx="64" cy="64" r="52" stroke="#FF7A00" strokeWidth="10" fill="transparent"
                    strokeDasharray="326.73" strokeDashoffset="65.35" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold font-poppins text-textDark">80%</span>
                  <span className="text-[9px] uppercase tracking-wider text-textMuted font-bold">On Time</span>
                </div>
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { label: 'On Time', pct: '80%', color: 'bg-primary' },
                  { label: 'Slight Delay', pct: '14%', color: 'bg-amber-400' },
                  { label: 'Late', pct: '6%', color: 'bg-rose-400' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${item.color}`}></span>
                    <span className="text-textMuted">{item.label}</span>
                    <span className="font-bold text-textDark ml-auto">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left space-y-6">
            <div>
              <h3 className="font-poppins font-bold text-base text-textDark">Order Status Breakdown</h3>
              <p className="text-[10px] text-textMuted mt-0.5">All-time distribution for {myRestaurant?.name}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Completed', count: myOrders.filter(o => o.status === 'Completed').length, color: 'bg-emerald-500' },
                { label: 'Ready', count: myOrders.filter(o => o.status === 'Ready').length, color: 'bg-blue-500' },
                { label: 'In Progress', count: myOrders.filter(o => ['Order Received','Preparing','Cooking','Packing'].includes(o.status)).length, color: 'bg-orange-500' },
                { label: 'Cancelled', count: myOrders.filter(o => o.status === 'Cancelled').length, color: 'bg-rose-400' },
              ].map(item => {
                const pct = myOrders.length > 0 ? Math.round((item.count / myOrders.length) * 100) : 0;
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-textDark">{item.label}</span>
                      <span className="text-textMuted">{item.count} orders ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
