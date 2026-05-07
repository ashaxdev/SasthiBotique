// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { GiFleurDeLys } from 'react-icons/gi';
// import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch('/api/auth', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('admin-token', data.token);
//         localStorage.setItem('admin-name', data.admin.name);
//         toast.success(`Welcome back, ${data.admin.name}!`);
//         router.push('/admin');
//       } else {
//         toast.error(data.error || 'Login failed');
//       }
//     } catch {
//       toast.error('Connection failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4"
//       style={{ background: 'linear-gradient(135deg, var(--forest-dark) 0%, var(--forest) 50%, var(--crimson-dark) 100%)' }}>
//       {/* Decorative Elements */}
//       <div className="absolute top-10 left-10 opacity-20 animate-float"><GiFleurDeLys size={48} style={{ color: 'var(--gold)' }} /></div>
//       <div className="absolute bottom-10 right-10 opacity-20 animate-float" style={{ animationDelay: '1s' }}><GiFleurDeLys size={48} style={{ color: 'var(--gold)' }} /></div>

//       <div className="w-full max-w-md animate-scaleIn" style={{ background: 'white', border: '2px solid rgba(201,168,76,0.4)', padding: '2.5rem', boxShadow: '0 25px 80px rgba(0,0,0,0.4)' }}>
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-2">
//             <GiFleurDeLys style={{ color: 'var(--gold)' }} size={24} />
//             <h1 className="font-cinzel font-bold text-2xl tracking-widest" style={{ color: 'var(--crimson-dark)' }}>SASTHI</h1>
//             <GiFleurDeLys style={{ color: 'var(--gold)' }} size={24} />
//           </div>
//           <p className="font-cormorant italic text-sm tracking-widest" style={{ color: 'var(--forest)', letterSpacing: '0.3em' }}>BOUTIQUE ADMIN</p>
//           <div className="gold-divider mt-4" />
//         </div>

//         <h2 className="font-cinzel text-lg text-center mb-6" style={{ color: 'var(--charcoal)' }}>SIGN IN</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--charcoal)' }}>EMAIL ADDRESS</label>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gold)' }} size={16} />
//               <input type="email" required
//                 value={form.email}
//                 onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
//                 placeholder="admin@sasthiboutique.com"
//                 className="w-full pl-10 pr-4 py-3 outline-none font-cormorant text-base"
//                 style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'var(--cream)' }} />
//             </div>
//           </div>

//           <div>
//             <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--charcoal)' }}>PASSWORD</label>
//             <div className="relative">
//               <FiLock className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gold)' }} size={16} />
//               <input type={showPass ? 'text' : 'password'} required
//                 value={form.password}
//                 onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
//                 placeholder="••••••••"
//                 className="w-full pl-10 pr-10 py-3 outline-none font-cormorant text-base"
//                 style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'var(--cream)' }} />
//               <button type="button" onClick={() => setShowPass(!showPass)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--forest)' }}>
//                 {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={loading} className="btn-luxury w-full py-4 text-sm mt-2 disabled:opacity-60">
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>

//         <p className="text-center text-xs mt-6 font-cinzel" style={{ color: 'var(--gold)' }}>
//           Default: admin@sasthiboutique.com / Admin@123
//         </p>
//       </div>
//     </div>
//   );
// }
