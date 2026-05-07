// 'use client';
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { FiSave } from 'react-icons/fi';

// export default function AdminSettingsPage() {
//   const [form, setForm] = useState({
//     siteName: 'Sasthi Boutique',
//     whatsapp: '919876543210',
//     email: 'info@sasthiboutique.com',
//     address: '123 Fashion Street, Chennai, Tamil Nadu 600001',
//     instagram: 'https://instagram.com/sasthiboutique',
//     facebook: 'https://facebook.com/sasthiboutique',
//     shippingFee: '80',
//     freeShippingAbove: '2000',
//     currency: 'INR',
//     gst: '5',
//   });

//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success('Settings saved successfully!');
//   };

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="font-cinzel text-2xl font-bold" style={{ color: 'var(--crimson-dark)' }}>Settings</h1>
//         <p className="text-sm mt-1" style={{ color: 'var(--forest)' }}>Manage your store configuration</p>
//       </div>

//       <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
//         {/* General */}
//         <div className="bg-white rounded-lg border p-6 space-y-4" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
//           <h2 className="font-cinzel font-bold text-lg" style={{ color: 'var(--forest-dark)' }}>General</h2>
//           {[
//             { label: 'Site Name', key: 'siteName' },
//             { label: 'WhatsApp Number (with country code)', key: 'whatsapp' },
//             { label: 'Email', key: 'email' },
//             { label: 'Address', key: 'address' },
//           ].map(field => (
//             <div key={field.key}>
//               <label className="block font-cinzel text-xs mb-1" style={{ color: 'var(--gold-dark)', letterSpacing: '0.1em' }}>{field.label.toUpperCase()}</label>
//               <input value={(form as any)[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
//                 className="w-full px-4 py-2 border outline-none text-sm" style={{ borderColor: 'rgba(201,168,76,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }} />
//             </div>
//           ))}
//         </div>

//         {/* Social */}
//         <div className="bg-white rounded-lg border p-6 space-y-4" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
//           <h2 className="font-cinzel font-bold text-lg" style={{ color: 'var(--forest-dark)' }}>Social Media</h2>
//           {[
//             { label: 'Instagram URL', key: 'instagram' },
//             { label: 'Facebook URL', key: 'facebook' },
//           ].map(field => (
//             <div key={field.key}>
//               <label className="block font-cinzel text-xs mb-1" style={{ color: 'var(--gold-dark)', letterSpacing: '0.1em' }}>{field.label.toUpperCase()}</label>
//               <input value={(form as any)[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
//                 className="w-full px-4 py-2 border outline-none text-sm" style={{ borderColor: 'rgba(201,168,76,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }} />
//             </div>
//           ))}
//         </div>

//         {/* Shipping */}
//         <div className="bg-white rounded-lg border p-6 space-y-4" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
//           <h2 className="font-cinzel font-bold text-lg" style={{ color: 'var(--forest-dark)' }}>Shipping & Pricing</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               { label: 'Shipping Fee (₹)', key: 'shippingFee' },
//               { label: 'Free Shipping Above (₹)', key: 'freeShippingAbove' },
//               { label: 'Currency', key: 'currency' },
//               { label: 'GST %', key: 'gst' },
//             ].map(field => (
//               <div key={field.key}>
//                 <label className="block font-cinzel text-xs mb-1" style={{ color: 'var(--gold-dark)', letterSpacing: '0.1em' }}>{field.label.toUpperCase()}</label>
//                 <input value={(form as any)[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
//                   className="w-full px-4 py-2 border outline-none text-sm" style={{ borderColor: 'rgba(201,168,76,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="btn-luxury px-8 py-3 text-xs flex items-center gap-2">
//           <FiSave size={14} /> Save Settings
//         </button>
//       </form>
//     </div>
//   );
// }
