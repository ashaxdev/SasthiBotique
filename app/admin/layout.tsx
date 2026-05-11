'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { GiFleurDeLys } from 'react-icons/gi';
import { FiHome, FiPackage, FiShoppingBag, FiSettings, FiLogOut, FiMenu, FiX, FiTag } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';


const navItems = [
  { label: 'Dashboard', href: '/admin', icon: FiHome },
  { label: 'Products', href: '/admin/products', icon: FiPackage },
  { label: 'Orders', href: '/admin/orders', icon: FiShoppingBag },
  { label: 'Categories', href: '/admin/categories', icon: FiTag },
  { label: 'Settings', href: '/admin/settings', icon: FiSettings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    if (pathname === '/login' || pathname === '/(auth)/login') return;
    const token = localStorage.getItem('admin-token');
    if (!token && !pathname.includes('login')) {
      router.push('/login');
    }
    const name = localStorage.getItem('admin-name');
    if (name) setAdminName(name);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-name');
    router.push('/login');
  };

  if (pathname?.includes('login')) return <>{children}</>;

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Lato', sans-serif" }}>
        <div className="flex min-h-screen" style={{ background: '#f8f4ef' }}>
          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 z-50 w-64 admin-sidebar transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Logo */}
            <div className="p-6 border-b" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
              <div className="flex items-center gap-2">
                <GiFleurDeLys style={{ color: 'var(--gold)' }} size={20} />
                <div>
                  <h1 className="font-cinzel font-bold text-base tracking-widest" style={{ color: 'var(--ivory)' }}>SASTHI</h1>
                  <p className="font-cinzel text-xs" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>ADMIN PANEL</p>
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: 'var(--crimson)' }}>
                <span className="font-cinzel text-sm font-bold" style={{ color: 'var(--gold-light)' }}>{adminName[0]}</span>
              </div>
              <p className="font-cinzel text-xs" style={{ color: 'var(--gold-light)' }}>{adminName}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(250,246,239,0.5)', fontFamily: "'Lato', sans-serif" }}>Super Admin</p>
            </div>

            {/* Nav */}
            <nav className="p-4 flex-1">
              {navItems.map(({ label, href, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 mb-1 transition-all"
                    style={{ background: active ? 'rgba(201,168,76,0.15)' : 'transparent', borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent', color: active ? 'var(--gold-light)' : 'rgba(250,246,239,0.7)' }}>
                    <Icon size={18} />
                    <span className="font-cinzel text-xs tracking-wide">{label.toUpperCase()}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full transition-all hover:opacity-80"
                style={{ color: 'rgba(250,246,239,0.6)' }}>
                <FiLogOut size={18} />
                <span className="font-cinzel text-xs tracking-wide">LOGOUT</span>
              </button>
            </div>
          </aside>

          {/* Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Main */}
          <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3" style={{ background: 'white', borderBottom: '2px solid var(--gold)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2" style={{ color: 'var(--crimson)' }}>
                <FiMenu size={22} />
              </button>
              <div className="flex-1 ml-2 md:ml-0">
                <h2 className="font-cinzel text-sm" style={{ color: 'var(--forest-dark)' }}>
                  {navItems.find(n => n.href === pathname)?.label || 'Admin Panel'}
                </h2>
              </div>
              <Link href="/" target="_blank" className="font-cinzel text-xs px-4 py-2 btn-forest" style={{ fontSize: '0.7rem' }}>
                View Site →
              </Link>
            </header>

            <main className="flex-1 p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster position="top-center" toastOptions={{ style: { background: '#0D1F15', color: '#E8C872', border: '1px solid #C9A84C', fontFamily: "'Cinzel', serif", fontSize: '0.8rem' } }} />
      </body>
    </html>
  );
}
