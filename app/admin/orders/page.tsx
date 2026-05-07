// 'use client';
// import { useState, useEffect } from 'react';
// import { FiRefreshCw, FiEye, FiSearch } from 'react-icons/fi';
// import { FaWhatsapp } from 'react-icons/fa';
// import toast from 'react-hot-toast';

// const statusColors: Record<string, string> = {
//   pending: 'status-pending',
//   confirmed: 'status-confirmed',
//   processing: 'status-processing',
//   shipped: 'status-shipped',
//   delivered: 'status-delivered',
//   cancelled: 'status-cancelled',
// };

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selected, setSelected] = useState<any>(null);

//   const fetchOrders = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('admin-token');
//     const res = await fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } });
//     const data = await res.json();
//     setOrders(data.orders || []);
//     setLoading(false);
//   };

//   useEffect(() => { fetchOrders(); }, []);

//   const updateStatus = async (id: string, status: string) => {
//     const token = localStorage.getItem('admin-token');
//     await fetch(`/api/orders/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ status }),
//     });
//     toast.success('Order status updated!');
//     fetchOrders();
//     if (selected?._id === id) setSelected({ ...selected, status });
//   };

//   const sendWhatsApp = (order: any) => {
//     const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
//     const items = order.items.map((i: any) => `• ${i.name} (${i.size}/${i.color}) x${i.quantity} = ₹${i.price * i.quantity}`).join('\n');
//     const msg = `🛍️ *Order ${order.orderNumber}*\n\n👤 ${order.customerName}\n📞 ${order.customerPhone}\n📍 ${order.customerAddress}\n\n${items}\n\n💰 *Total: ₹${order.total}*`;
//     window.open(`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
//   };

//   const filtered = orders.filter(o => {
//     const matchStatus = statusFilter === 'all' || o.status === statusFilter;
//     const matchSearch = !search || o.orderNumber?.toLowerCase().includes(search.toLowerCase()) || o.customerName?.toLowerCase().includes(search.toLowerCase()) || o.customerPhone?.includes(search);
//     return matchStatus && matchSearch;
//   });

//   return (
//     <div>
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="font-cinzel text-2xl font-bold" style={{ color: 'var(--crimson-dark)' }}>Orders</h1>
//           <p className="text-sm mt-1" style={{ color: 'var(--forest)' }}>{orders.length} total orders</p>
//         </div>
//         <button onClick={fetchOrders} className="btn-luxury px-4 py-2 text-xs flex items-center gap-2">
//           <FiRefreshCw size={14} /> Refresh
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gold)' }} />
//           <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order no, name, phone..."
//             className="w-full pl-10 pr-4 py-2 border outline-none text-sm" style={{ borderColor: 'var(--gold)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }} />
//         </div>
//         <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
//           className="px-4 py-2 border outline-none text-sm" style={{ borderColor: 'var(--gold)', minWidth: '160px' }}>
//           <option value="all">All Status</option>
//           {['pending','confirmed','processing','shipped','delivered','cancelled'].map(s => (
//             <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--gold)' }}>
//         <table className="luxury-table w-full text-sm">
//           <thead>
//             <tr>
//               {['Order #','Customer','Phone','Items','Total','Status','Date','Actions'].map(h => (
//                 <th key={h} className="px-4 py-3 text-left">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan={8} className="text-center py-12"><FiRefreshCw className="animate-spin mx-auto" size={24} style={{ color: 'var(--crimson)' }} /></td></tr>
//             ) : filtered.length === 0 ? (
//               <tr><td colSpan={8} className="text-center py-12 font-cormorant text-xl" style={{ color: 'var(--forest)' }}>No orders found</td></tr>
//             ) : filtered.map(order => (
//               <tr key={order._id} className="border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
//                 <td className="px-4 py-3 font-cinzel text-xs font-bold" style={{ color: 'var(--crimson)' }}>{order.orderNumber}</td>
//                 <td className="px-4 py-3">{order.customerName}</td>
//                 <td className="px-4 py-3">{order.customerPhone}</td>
//                 <td className="px-4 py-3">{order.items?.length || 0} items</td>
//                 <td className="px-4 py-3 font-bold" style={{ color: 'var(--forest-dark)' }}>₹{order.total?.toLocaleString()}</td>
//                 <td className="px-4 py-3">
//                   <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}
//                     className={`text-xs px-2 py-1 rounded font-cinzel border-0 ${statusColors[order.status] || ''}`} style={{ cursor: 'pointer' }}>
//                     {['pending','confirmed','processing','shipped','delivered','cancelled'].map(s => (
//                       <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
//                     ))}
//                   </select>
//                 </td>
//                 <td className="px-4 py-3 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
//                 <td className="px-4 py-3">
//                   <div className="flex gap-2">
//                     <button onClick={() => setSelected(order)} className="p-1 rounded hover:scale-110 transition-transform" style={{ color: 'var(--crimson)' }} title="View">
//                       <FiEye size={16} />
//                     </button>
//                     <button onClick={() => sendWhatsApp(order)} className="p-1 rounded hover:scale-110 transition-transform" style={{ color: '#25D366' }} title="WhatsApp">
//                       <FaWhatsapp size={16} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Order Detail Modal */}
//       {selected && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSelected(null)}>
//           <div className="bg-white max-w-lg w-full rounded-lg overflow-hidden animate-scaleIn" onClick={e => e.stopPropagation()}>
//             <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--crimson-dark)' }}>
//               <h2 className="font-cinzel text-white font-bold">Order {selected.orderNumber}</h2>
//               <button onClick={() => setSelected(null)} className="text-white text-xl">&times;</button>
//             </div>
//             <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div><p className="font-cinzel text-xs" style={{ color: 'var(--gold-dark)' }}>CUSTOMER</p><p className="font-bold">{selected.customerName}</p></div>
//                 <div><p className="font-cinzel text-xs" style={{ color: 'var(--gold-dark)' }}>PHONE</p><p>{selected.customerPhone}</p></div>
//                 <div className="col-span-2"><p className="font-cinzel text-xs" style={{ color: 'var(--gold-dark)' }}>ADDRESS</p><p>{selected.customerAddress}</p></div>
//               </div>
//               <hr style={{ borderColor: 'var(--gold)' }} />
//               <div className="space-y-2">
//                 {selected.items?.map((item: any, i: number) => (
//                   <div key={i} className="flex justify-between text-sm py-2 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-xs text-gray-500">{item.size} / {item.color} × {item.quantity}</p>
//                     </div>
//                     <p className="font-bold" style={{ color: 'var(--crimson)' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-between font-cinzel font-bold text-lg pt-2" style={{ color: 'var(--crimson-dark)' }}>
//                 <span>TOTAL</span><span>₹{selected.total?.toLocaleString()}</span>
//               </div>
//               {selected.notes && <p className="text-sm italic text-gray-500">Note: {selected.notes}</p>}
//               <button onClick={() => sendWhatsApp(selected)} className="btn-forest w-full py-3 text-xs rounded flex items-center justify-center gap-2">
//                 <FaWhatsapp size={16} /> Send WhatsApp Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
