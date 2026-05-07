'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { GiFleurDeLys } from 'react-icons/gi';

const slides = [
  {
    title: 'Eternal Elegance',
    subtitle: 'New Silk Saree Collection',
    description: 'Handwoven with centuries of tradition. Each piece tells a story of artistry and grace.',
    cta: 'Explore Sarees',
    href: '/shop?category=sarees',
    bg: 'linear-gradient(135deg, #0D1F15 0%, #1A3A2A 50%, #2D0000 100%)',
    accent: '#C9A84C',
  },
  {
    title: 'Royal Bridal',
    subtitle: 'Lehenga Choli Collection',
    description: 'For the most special day of your life. Luxurious fabrics, intricate embroidery.',
    cta: 'View Lehengas',
    href: '/shop?category=lehengas',
    bg: 'linear-gradient(135deg, #2D0000 0%, #5C0000 50%, #0D1F15 100%)',
    accent: '#E8C872',
  },
  {
    title: 'Festive Splendour',
    subtitle: 'Salwar Kameez & Suits',
    description: 'Celebrate every occasion with our festive collection crafted for modern women.',
    cta: 'Shop Collection',
    href: '/shop?category=salwar',
    bg: 'linear-gradient(135deg, #1A3A2A 0%, #0D1F15 50%, #3D0000 100%)',
    accent: '#C9A84C',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: slide.bg, transition: 'background 1s ease' }}>
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 50px)`,
        backgroundSize: '70px 70px',
      }} />

      {/* Ornamental Circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10 animate-float" style={{ border: '2px solid var(--gold)' }} />
      <div className="absolute top-32 right-32 w-48 h-48 rounded-full opacity-10 animate-float" style={{ border: '1px solid var(--gold)', animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full opacity-10" style={{ border: '1px solid var(--gold)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          {/* Decorative Top */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16" style={{ background: 'var(--gold)' }} />
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>SASTHI BOUTIQUE</span>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <div className="h-px flex-1 max-w-16" style={{ background: 'var(--gold)' }} />
          </div>

          <p className="font-cormorant italic text-xl mb-3 animate-glow" style={{ color: slide.accent }}>{slide.subtitle}</p>

          <h1 className="font-cinzel text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: 'white' }}>
            {slide.title.split(' ').map((word, i) => (
              <span key={i} className={`block ${i === 1 ? 'ml-0 md:ml-16' : ''}`}
                style={{ color: i % 2 === 1 ? slide.accent : 'white' }}>
                {word}
              </span>
            ))}
          </h1>

          <p className="font-cormorant text-lg mb-8 max-w-xl leading-relaxed" style={{ color: 'rgba(250,246,239,0.85)' }}>
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={slide.href} className="btn-luxury px-10 py-4 text-sm inline-flex items-center justify-center">
              {slide.cta}
            </Link>
            <a href={`https://wa.me/919876543210?text=Hello! I'm interested in your ${slide.subtitle}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-forest px-10 py-4 text-sm inline-flex items-center justify-center gap-2">
              <FaWhatsapp size={18} /> Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Slide Dots */}
        <div className="flex gap-3 mt-12">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{ width: i === current ? '32px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? 'var(--gold)' : 'rgba(201,168,76,0.3)' }} />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-cinzel text-xs tracking-widest" style={{ color: 'rgba(201,168,76,0.7)' }}>SCROLL</span>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>
    </section>
  );
}
