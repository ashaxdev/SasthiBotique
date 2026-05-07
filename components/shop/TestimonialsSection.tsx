'use client';
import { GiFleurDeLys } from 'react-icons/gi';

const testimonials = [
  { name: 'Priya Sharma', location: 'Chennai', review: 'The Kanjivaram saree I ordered was absolutely breathtaking. The quality exceeded my expectations — pure silk, vibrant colours, and the zari work is exquisite!', rating: 5, product: 'Kanjivaram Silk Saree' },
  { name: 'Meena Krishnan', location: 'Bangalore', review: 'Ordered my bridal lehenga from Sasthi Boutique and I was blown away. The embroidery is so intricate and detailed. Everyone at my wedding complimented it!', rating: 5, product: 'Bridal Lehenga' },
  { name: 'Raji Venkatesh', location: 'Puducherry', review: 'The WhatsApp ordering experience was seamless. Quick responses, personalised recommendations, and the Banarasi saree arrived perfectly packed. 10/10!', rating: 5, product: 'Banarasi Saree' },
  { name: 'Deepa Nair', location: 'Coimbatore', review: 'I\'ve been a loyal customer for 2 years. The quality is consistently superb and the new collections keep getting better. Truly a luxury boutique experience!', rating: 5, product: 'Multiple Purchases' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--forest-dark)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>TESTIMONIALS</p>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
          </div>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--ivory)' }}>What Our Customers Say</h2>
          <div className="gold-divider max-w-xs mx-auto"><span className="ornament">◆</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 animate-fadeInUp" style={{ background: 'rgba(250,246,239,0.05)', border: '1px solid rgba(201,168,76,0.3)', animationDelay: `${i * 0.15}s` }}>
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: 'var(--gold)' }}>★</span>)}
              </div>
              <p className="font-cormorant text-base italic mb-4 leading-relaxed" style={{ color: 'rgba(250,246,239,0.85)' }}>
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="h-px mb-4" style={{ background: 'rgba(201,168,76,0.3)' }} />
              <p className="font-cinzel text-xs font-semibold" style={{ color: 'var(--gold-light)' }}>{t.name}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(250,246,239,0.5)', fontFamily: "'Lato', sans-serif" }}>{t.location} · {t.product}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
