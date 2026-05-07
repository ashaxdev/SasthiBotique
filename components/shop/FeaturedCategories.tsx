'use client';
import Link from 'next/link';
import { GiFleurDeLys } from 'react-icons/gi';

const categories = [
  { name: 'Silk Sarees', slug: 'silk-sarees', count: '120+ Styles', emoji: '🥻', color: 'var(--crimson)' },
  { name: 'Lehengas', slug: 'lehengas', count: '80+ Styles', emoji: '👗', color: 'var(--forest)' },
  { name: 'Salwar Kameez', slug: 'salwar', count: '150+ Styles', emoji: '👘', color: 'var(--crimson-dark)' },
  { name: 'Anarkali Suits', slug: 'anarkali', count: '60+ Styles', emoji: '✨', color: 'var(--forest-dark)' },
  { name: 'Dupattas', slug: 'dupattas', count: '200+ Styles', emoji: '🌸', color: 'var(--crimson)' },
  { name: 'Bridal Wear', slug: 'bridal', count: '40+ Styles', emoji: '💍', color: 'var(--forest)' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--pearl)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>OUR WORLD</p>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-3">Shop by Category</h2>
          <div className="gold-divider max-w-xs mx-auto"><span className="ornament">◆</span></div>
          <p className="font-cormorant text-lg" style={{ color: 'var(--forest)' }}>Explore our curated collections of Indian ethnic wear</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center p-6 text-center product-card rounded-none transition-all"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-3xl transition-all group-hover:scale-110"
                style={{ background: `${cat.color}15`, border: `2px solid ${cat.color}30` }}>
                {cat.emoji}
              </div>
              <h3 className="font-cinzel text-xs font-semibold tracking-wide mb-1" style={{ color: 'var(--charcoal)' }}>{cat.name}</h3>
              <p className="text-xs" style={{ color: 'var(--gold-dark)', fontFamily: "'Lato', sans-serif" }}>{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
