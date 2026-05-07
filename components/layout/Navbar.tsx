'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { GiFleurDeLys } from 'react-icons/gi';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/shop?category=all' },
  { label: 'Sarees', href: '/shop?category=sarees' },
  { label: 'Lehengas', href: '/shop?category=lehengas' },
  { label: 'Salwar', href: '/shop?category=salwar' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore(s => s.getTotalItems());
  const wishlist = useCartStore(s => s.wishlist);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="hero-gradient text-center py-2 px-4 marquee-wrapper">
        <div className="marquee-inner">
          {['✦ Free shipping on orders above ₹2000', '✦ New Collection Arrived', '✦ Premium Handcrafted Ethnic Wear', '✦ Order via WhatsApp for Special Discounts', '✦ Free shipping on orders above ₹2000', '✦ New Collection Arrived', '✦ Premium Handcrafted Ethnic Wear', '✦ Order via WhatsApp for Special Discounts'].map((text, i) => (
            <span key={i} className="font-cinzel text-xs mr-12" style={{ color: 'var(--gold-light)', letterSpacing: '0.1em' }}>{text}</span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'shadow-2xl' : ''}`}
        style={{ background: scrolled ? 'rgba(253,248,243,0.97)' : 'white', backdropFilter: 'blur(10px)', borderBottom: '2px solid var(--gold)' }}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" style={{ color: 'var(--crimson)' }}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center group">
              <div className="flex items-center gap-2">
                <GiFleurDeLys className="text-lg animate-float" style={{ color: 'var(--gold)' }} />
                <h1 className="font-cinzel font-bold text-xl md:text-2xl tracking-widest" style={{ color: 'var(--crimson-dark)' }}>
                  SASTHI
                </h1>
                <GiFleurDeLys className="text-lg animate-float" style={{ color: 'var(--gold)', animationDelay: '0.5s' }} />
              </div>
              <p className="font-cormorant italic text-xs tracking-widest" style={{ color: 'var(--forest)', letterSpacing: '0.3em' }}>BOUTIQUE</p>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.slice(0, 6).map(link => (
                <Link key={link.href} href={link.href}
                  className="font-cinzel text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{ color: 'var(--forest)', letterSpacing: '0.1em' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--crimson)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--forest)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 transition-transform hover:scale-110" style={{ color: 'var(--crimson)' }}>
                <FiSearch size={20} />
              </button>

              <Link href="/wishlist" className="relative p-2 transition-transform hover:scale-110" style={{ color: 'var(--crimson)' }}>
                <FiHeart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{ background: 'var(--crimson)', fontSize: '10px' }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative p-2 transition-transform hover:scale-110" style={{ color: 'var(--crimson)' }}>
                <FiShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center animate-scaleIn" style={{ background: 'var(--crimson)', fontSize: '10px' }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-slideDown">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search sarees, lehengas, salwar..."
                  className="flex-1 px-4 py-2 border outline-none font-cormorant text-base"
                  style={{ borderColor: 'var(--gold)', fontFamily: "'Cormorant Garamond', serif" }}
                  autoFocus
                />
                <button type="submit" className="btn-luxury px-6 py-2 text-xs">Search</button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t animate-slideDown" style={{ borderColor: 'var(--gold)', background: 'var(--cream)' }}>
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-cinzel text-sm py-3 px-4 border-b transition-all hover:pl-8"
                  style={{ color: 'var(--forest)', borderColor: 'rgba(201,168,76,0.2)', letterSpacing: '0.1em' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
