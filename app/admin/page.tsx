// 'use client';
// import { useState, useEffect } from 'react';
// import { FiShoppingBag, FiPackage, FiTrendingUp, FiUsers } from 'react-icons/fi';
// import { GiFleurDeLys } from 'react-icons/gi';

// const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

// const demoStats = {
//   totalOrders: 142,
//   totalRevenue: 1289750,
//   totalProducts: 87,
//   pendingOrders: 12,
//   recentOrders: [
//     { _id: '1', orderNumber: 'SB01001', customerName: 'Priya Sharma', total: 8999, status: 'confirmed', createdAt: new Date().toISOString() },
//     { _id: '2', orderNumber: 'SB01002', customerName: 'Meena Krishnan', total: 24999, status: 'pending', createdAt: new Date().toISOString() },
//     { _id: '3', orderNumber: 'SB01003', customerName: 'Raji Venkatesh', total: 3499, status: 'shipped', createdAt: new Date().toISOString() },
//     { _id: '4', orderNumber: 'SB01004', customerName: 'Deepa Nair', total: 6499, status: 'delivered', createdAt: new Date().toISOString() },
//     { _id: '5', orderNumber: 'SB01005', customerName: 'Lakshmi Iyer', total: 15999, status: 'processing', createdAt: new Date().toISOString() },
//   ],
// };

// export default function AdminDashboard() {
//   const [stats, setStats] = useState(demoStats);

//   const statCards = [
//     { label: 'Total Orders', value: stats.totalOrders, icon: FiShoppingBag, color: 'var(--crimson)', bg: 'rgba(139,0,0,0.08)' },
//     { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: FiTrendingUp, color: 'var(--forest)', bg: 'rgba(26,58,42,0.08)' },
//     { label: 'Products', value: stats.totalProducts, icon: FiPackage, color: 'var(--gold-dark)', bg: 'rgba(201,168,76,0.1)' },
//     { label: 'Pending Orders', value: stats.pendingOrders, icon: FiUsers, color: 'var(--crimson-light)', bg: 'rgba(196,30,58,0.08)' },
//   ];

//   return (
//     <div>
//       {/* Welcome */}
//       <div className="mb-6 p-6" style={{ background: 'linear-gradient(135deg, var(--forest-dark), var(--crimson-dark))', border: '1px solid rgba(201,168,76,0.3)' }}>
//         <div className="flex items-center gap-3">
//           <GiFleurDeLys style={{ color: 'var(--gold)' }} size={24} />
//           <div>
//             <h1 className="font-cinzel text-2xl font-bold" style={{ color: 'var(--ivory)' }}>Welcome Back</h1>
//             <p className="font-cormorant text-base" style={{ color: 'rgba(250,246,239,0.7)' }}>Here's what's happening at Sasthi Boutique today</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {statCards.map(card => (
//           <div key={card.label} className="p-5" style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 2px 15px rgba(0,0,0,0.04)' }}>
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="font-cinzel text-xs tracking-wide mb-1" style={{ color: '#888' }}>{card.label.toUpperCase()}</p>
//                 <p className="font-cormorant text-2xl md:text-3xl font-bold" style={{ color: card.color }}>{card.value}</p>
//               </div>
//               <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: card.bg }}>
//                 <card.icon size={20} style={{ color: card.color }} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Orders */}
//       <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)' }}>
//         <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
//           <h2 className="font-cinzel text-sm tracking-widest" style={{ color: 'var(--charcoal)' }}>RECENT ORDERS</h2>
//           <a href="/admin/orders" className="font-cinzel text-xs" style={{ color: 'var(--gold)' }}>View All →</a>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full luxury-table">
//             <thead>
//               <tr>
//                 {['Order #', 'Customer', 'Amount', 'Status', 'Date'].map(h => (
//                   <th key={h} className="px-4 py-3 text-left">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {stats.recentOrders.map(order => (
//                 <tr key={order._id}>
//                   <td className="px-4 py-3 font-cinzel text-xs" style={{ color: 'var(--crimson)' }}>{order.orderNumber}</td>
//                   <td className="px-4 py-3 font-cormorant text-base">{order.customerName}</td>
//                   <td className="px-4 py-3 font-cormorant text-base font-semibold" style={{ color: 'var(--forest)' }}>₹{order.total.toLocaleString('en-IN')}</td>
//                   <td className="px-4 py-3">
//                     <span className={`px-3 py-1 rounded-full text-xs font-cinzel status-${order.status}`}>
//                       {order.status.toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-xs" style={{ color: '#888', fontFamily: "'Lato', sans-serif" }}>
//                     {new Date(order.createdAt).toLocaleDateString('en-IN')}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
