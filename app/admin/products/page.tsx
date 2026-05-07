// 'use client';
// import { useState } from 'react';
// import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// const demoProducts = [
//   { _id: '1', name: 'Kanjivaram Silk Saree', category: 'Silk Sarees', price: 8999, stock: 12, featured: true, newArrival: true, bestseller: false },
//   { _id: '2', name: 'Bridal Lehenga Choli', category: 'Lehengas', price: 24999, stock: 5, featured: true, newArrival: true, bestseller: true },
//   { _id: '3', name: 'Banarasi Silk Saree', category: 'Banarasi Sarees', price: 6499, stock: 20, featured: false, newArrival: false, bestseller: true },
//   { _id: '4', name: 'Anarkali Festive Suit', category: 'Anarkali', price: 4999, stock: 15, featured: false, newArrival: true, bestseller: false },
//   { _id: '5', name: 'Chanderi Salwar Kameez', category: 'Salwar Kameez', price: 3499, stock: 30, featured: false, newArrival: false, bestseller: true },
// ];

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState(demoProducts);
//   const [search, setSearch] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState<any>(null);
//   const [form, setForm] = useState({ name: '', category: '', price: '', originalPrice: '', stock: '', description: '', fabric: '', care: '', sizes: 'Free Size', colors: 'Red', featured: false, newArrival: false, bestseller: false });

//   const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

//   const handleSave = () => {
//     if (!form.name || !form.price) { toast.error('Name and price required'); return; }
//     if (editProduct) {
//       setProducts(prev => prev.map(p => p._id === editProduct._id ? { ...p, ...form, price: parseInt(form.price), stock: parseInt(form.stock || '0') } as typeof p : p));
//       toast.success('Product updated!');
//     } else {
//       setProducts(prev => [...prev, { _id: Date.now().toString(), ...form, price: parseInt(form.price), stock: parseInt(form.stock || '0') }]);
//       toast.success('Product added!');
//     }
//     setShowModal(false);
//     setEditProduct(null);
//     setForm({ name: '', category: '', price: '', originalPrice: '', stock: '', description: '', fabric: '', care: '', sizes: 'Free Size', colors: 'Red', featured: false, newArrival: false, bestseller: false });
//   };

//   const handleEdit = (product: any) => {
//     setEditProduct(product);
//     setForm({ ...product, price: String(product.price), stock: String(product.stock), originalPrice: '', description: '', fabric: '', care: '', sizes: 'Free Size', colors: 'Red' });
//     setShowModal(true);
//   };

//   const handleDelete = (id: string) => {
//     setProducts(prev => prev.filter(p => p._id !== id));
//     toast.success('Product deleted');
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
//         <h1 className="font-cinzel text-xl" style={{ color: 'var(--charcoal)' }}>PRODUCTS ({filtered.length})</h1>
//         <div className="flex gap-3 w-full md:w-auto">
//           <div className="relative flex-1 md:w-64">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gold)' }} size={16} />
//             <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 outline-none font-cormorant text-sm"
//               style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'white' }} />
//           </div>
//           <button onClick={() => setShowModal(true)} className="btn-luxury px-5 py-2 text-xs flex items-center gap-2 whitespace-nowrap">
//             <FiPlus /> Add Product
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)' }}>
//         <div className="overflow-x-auto">
//           <table className="w-full luxury-table">
//             <thead>
//               <tr>
//                 {['Product', 'Category', 'Price', 'Stock', 'Tags', 'Actions'].map(h => (
//                   <th key={h} className="px-4 py-3 text-left">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map(product => (
//                 <tr key={product._id}>
//                   <td className="px-4 py-3 font-cormorant text-base font-medium">{product.name}</td>
//                   <td className="px-4 py-3 text-sm font-cinzel text-xs" style={{ color: 'var(--forest)' }}>{product.category}</td>
//                   <td className="px-4 py-3 font-cormorant text-base font-bold" style={{ color: 'var(--crimson)' }}>₹{product.price.toLocaleString('en-IN')}</td>
//                   <td className="px-4 py-3 font-cinzel text-xs">{product.stock}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-1 flex-wrap">
//                       {product.featured && <span className="luxury-badge text-white">Featured</span>}
//                       {product.newArrival && <span className="luxury-badge" style={{ background: 'var(--forest)' }}>New</span>}
//                       {product.bestseller && <span className="luxury-badge" style={{ background: 'var(--crimson)' }}>Best</span>}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       <button onClick={() => handleEdit(product)} className="p-2 transition-all hover:scale-110" style={{ color: 'var(--forest)' }}><FiEdit2 size={15} /></button>
//                       <button onClick={() => handleDelete(product._id)} className="p-2 transition-all hover:scale-110" style={{ color: 'var(--crimson)' }}><FiTrash2 size={15} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
//           <div className="w-full max-w-2xl max-h-screen overflow-y-auto" style={{ background: 'white', border: '2px solid rgba(201,168,76,0.4)' }}>
//             <div className="p-6 border-b" style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'linear-gradient(135deg, var(--forest-dark), var(--crimson-dark))' }}>
//               <h2 className="font-cinzel text-base" style={{ color: 'var(--gold-light)' }}>{editProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h2>
//             </div>
//             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { key: 'name', label: 'Product Name *', type: 'text' },
//                 { key: 'category', label: 'Category *', type: 'text' },
//                 { key: 'price', label: 'Selling Price (₹) *', type: 'number' },
//                 { key: 'originalPrice', label: 'Original Price (₹)', type: 'number' },
//                 { key: 'stock', label: 'Stock Qty', type: 'number' },
//                 { key: 'fabric', label: 'Fabric', type: 'text' },
//                 { key: 'sizes', label: 'Sizes (comma separated)', type: 'text' },
//                 { key: 'colors', label: 'Colors (comma separated)', type: 'text' },
//               ].map(f => (
//                 <div key={f.key}>
//                   <label className="block font-cinzel text-xs tracking-wide mb-1" style={{ color: 'var(--charcoal)' }}>{f.label.toUpperCase()}</label>
//                   <input type={f.type} value={form[f.key as keyof typeof form] as string}
//                     onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
//                     className="w-full px-3 py-2 outline-none font-cormorant text-sm"
//                     style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'var(--cream)' }} />
//                 </div>
//               ))}
//               <div className="md:col-span-2">
//                 <label className="block font-cinzel text-xs tracking-wide mb-1" style={{ color: 'var(--charcoal)' }}>DESCRIPTION</label>
//                 <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
//                   className="w-full px-3 py-2 outline-none font-cormorant text-sm resize-none"
//                   style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'var(--cream)' }} />
//               </div>
//               <div className="md:col-span-2 flex gap-6">
//                 {[
//                   { key: 'featured', label: 'Featured' },
//                   { key: 'newArrival', label: 'New Arrival' },
//                   { key: 'bestseller', label: 'Bestseller' },
//                 ].map(f => (
//                   <label key={f.key} className="flex items-center gap-2 cursor-pointer">
//                     <input type="checkbox" checked={form[f.key as keyof typeof form] as boolean}
//                       onChange={e => setForm(p => ({ ...p, [f.key]: e.target.checked }))}
//                       className="w-4 h-4 cursor-pointer" style={{ accentColor: 'var(--crimson)' }} />
//                     <span className="font-cinzel text-xs" style={{ color: 'var(--charcoal)' }}>{f.label.toUpperCase()}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div className="p-6 border-t flex gap-3 justify-end" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
//               <button onClick={() => { setShowModal(false); setEditProduct(null); }} className="px-6 py-2 font-cinzel text-xs border" style={{ borderColor: 'rgba(201,168,76,0.4)', color: 'var(--charcoal)' }}>Cancel</button>
//               <button onClick={handleSave} className="btn-luxury px-8 py-2 text-xs">{editProduct ? 'Update' : 'Add Product'}</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
