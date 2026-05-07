'use client';
import Link from 'next/link';
import { GiFleurDeLys } from 'react-icons/gi';
import { FaInstagram, FaFacebook, FaWhatsapp, FaPinterest } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--forest-dark)', borderTop: '2px solid var(--gold)' }}>
      {/* Newsletter */}
      <div className="py-10 px-4" style={{ background: 'linear-gradient(135deg, var(--crimson-dark), var(--forest-dark))', borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--gold)' }}>✦ JOIN OUR WORLD ✦</p>
          <h3 className="font-cormorant text-3xl font-semibold mb-4" style={{ color: 'var(--ivory)' }}>Subscribe for Exclusive Offers</h3>
          <div className="flex gap-2">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 outline-none font-cormorant text-base" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--gold)', color: 'var(--ivory)' }} />
            <button className="btn-luxury px-6 py-3 text-xs">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} size={20} />
            <h2 className="font-cinzel font-bold text-xl tracking-widest" style={{ color: 'var(--ivory)' }}>SASTHI</h2>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} size={20} />
          </div>
          <p className="font-cormorant italic text-sm mb-4" style={{ color: 'var(--gold-light)', letterSpacing: '0.2em' }}>BOUTIQUE</p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(250,246,239,0.7)', fontFamily: "'Lato', sans-serif" }}>
            Crafting timeless elegance with every thread. Our collection celebrates the rich heritage of Indian textile artistry.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: FaInstagram, href: '#' },
              { Icon: FaFacebook, href: '#' },
              { Icon: FaWhatsapp, href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}` },
              { Icon: FaPinterest, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all hover:scale-110"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: '50%' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--forest-dark)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest mb-4" style={{ color: 'var(--gold)' }}>QUICK LINKS</h4>
          <div className="h-px mb-4" style={{ background: 'rgba(201,168,76,0.3)' }} />
          {['Home', 'Shop All', 'New Arrivals', 'Bestsellers', 'About Us', 'Contact'].map(link => (
            <Link key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
              className="block text-sm py-1.5 transition-all hover:pl-2"
              style={{ color: 'rgba(250,246,239,0.7)', fontFamily: "'Lato', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,246,239,0.7)')}
            >
              → {link}
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest mb-4" style={{ color: 'var(--gold)' }}>COLLECTIONS</h4>
          <div className="h-px mb-4" style={{ background: 'rgba(201,168,76,0.3)' }} />
          {['Silk Sarees', 'Banarasi Sarees', 'Lehengas', 'Salwar Kameez', 'Anarkali Suits', 'Dupattas'].map(cat => (
            <Link key={cat} href={`/shop?category=${cat.toLowerCase().replace(' ', '-')}`}
              className="block text-sm py-1.5 transition-all hover:pl-2"
              style={{ color: 'rgba(250,246,239,0.7)', fontFamily: "'Lato', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,246,239,0.7)')}
            >
              → {cat}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest mb-4" style={{ color: 'var(--gold)' }}>CONTACT US</h4>
          <div className="h-px mb-4" style={{ background: 'rgba(201,168,76,0.3)' }} />
          <div className="space-y-3 text-sm" style={{ color: 'rgba(250,246,239,0.7)', fontFamily: "'Lato', sans-serif" }}>
            <p>📍 123 Silk Street, Puducherry, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ hello@sasthiboutique.com</p>
            <p>🕐 Mon–Sat: 10AM – 8PM</p>
          </div>
          <a href={`https://wa.me/919876543210?text=Hello! I'd like to place an order.`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 btn-forest px-4 py-2 text-xs rounded">
            <FaWhatsapp size={16} /> Order on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 px-4" style={{ borderTop: '1px solid rgba(201,168,76,0.2)', color: 'rgba(250,246,239,0.5)', fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.1em' }}>
        © {new Date().getFullYear()} SASTHI BOUTIQUE. ALL RIGHTS RESERVED. CRAFTED WITH ❤️ IN INDIA
      </div>
    </footer>
  );
}
