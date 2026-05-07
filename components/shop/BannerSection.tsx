'use client';
import { FaWhatsapp } from 'react-icons/fa';

export default function BannerSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 40%, var(--forest) 100%)' }}>
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 40px)`, backgroundSize: '56px 56px' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="font-cinzel text-xs tracking-widest mb-4" style={{ color: 'var(--gold)' }}>✦ EXCLUSIVE OFFER ✦</p>
        <h2 className="font-cinzel text-3xl md:text-5xl font-bold mb-4" style={{ color: 'white' }}>
          Get <span style={{ color: 'var(--gold-light)' }}>20% OFF</span> Your First Order
        </h2>
        <p className="font-cormorant text-xl mb-8" style={{ color: 'rgba(250,246,239,0.85)' }}>
          Order via WhatsApp and receive exclusive discounts, personalised styling advice, and priority service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/919876543210?text=Hello! I'd like to place my first order and claim the 20% discount!" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 font-cinzel text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{ background: '#25D366', color: 'white', letterSpacing: '0.1em', boxShadow: '0 8px 30px rgba(37,211,102,0.4)' }}>
            <FaWhatsapp size={20} /> Order on WhatsApp
          </a>
          <a href="/shop" className="btn-luxury px-10 py-4 text-sm inline-block">Browse Collection</a>
        </div>
      </div>
    </section>
  );
}
