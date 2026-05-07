import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GiFleurDeLys } from 'react-icons/gi';

export default function AboutPage() {
  const values = [
    { icon: '🧵', title: 'Artisan Craftsmanship', desc: 'Every piece is crafted by skilled artisans who have inherited the art of Indian textile weaving through generations.' },
    { icon: '💎', title: 'Premium Quality', desc: 'We source only the finest silks, zari, and embellishments to ensure every garment meets our exacting luxury standards.' },
    { icon: '🌿', title: 'Sustainable Heritage', desc: 'We work directly with weaver communities, supporting sustainable livelihoods while preserving ancient textile traditions.' },
    { icon: '💌', title: 'Personal Service', desc: 'Our WhatsApp-first approach ensures every customer receives personalised attention and styling recommendations.' },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="py-24 px-4 text-center" style={{ background: 'linear-gradient(135deg, var(--forest-dark), var(--crimson-dark))' }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>OUR STORY</p>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--ivory)' }}>About Sasthi</h1>
          <p className="font-cormorant text-xl max-w-2xl mx-auto" style={{ color: 'rgba(250,246,239,0.85)' }}>
            Born from a love of Indian textile heritage and a vision to make luxury ethnic wear accessible to every discerning woman.
          </p>
        </div>

        {/* Story */}
        <section className="py-20 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl font-bold mb-4">The Sasthi Story</h2>
            <div className="gold-divider max-w-xs mx-auto"><span className="ornament">◆</span></div>
          </div>
          <div className="space-y-6 font-cormorant text-lg leading-relaxed" style={{ color: 'var(--charcoal)' }}>
            <p>Sasthi Boutique was founded in Puducherry, a city where French colonial charm meets deep South Indian culture. Our founder, inspired by the rich tapestry of Indian textile artistry, set out to create a space where tradition meets luxury.</p>
            <p>We believe that every woman deserves to wear a piece of India's magnificent textile heritage — whether it's the iridescent sheen of Kanjivaram silk, the intricate gold work of Banarasi brocade, or the delicate craftsmanship of a hand-embroidered lehenga.</p>
            <p>Today, Sasthi works directly with master weavers across Tamil Nadu, Varanasi, Gujarat, and Rajasthan — ensuring authenticity, fair trade, and the preservation of centuries-old weaving traditions.</p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4" style={{ background: 'var(--pearl)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl font-bold mb-3">Our Values</h2>
              <div className="gold-divider max-w-xs mx-auto"><span className="ornament">◆</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="text-center p-6" style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-cinzel text-sm font-semibold mb-3" style={{ color: 'var(--crimson)' }}>{v.title}</h3>
                  <p className="font-cormorant text-base leading-relaxed" style={{ color: 'var(--charcoal)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, var(--crimson-dark), var(--forest-dark))' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '5000+', label: 'Happy Customers' },
              { num: '500+', label: 'Unique Designs' },
              { num: '50+', label: 'Artisan Partners' },
              { num: '8+', label: 'Years of Excellence' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-cinzel text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--gold-light)' }}>{stat.num}</p>
                <p className="font-cormorant text-lg" style={{ color: 'rgba(250,246,239,0.8)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
