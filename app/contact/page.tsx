'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GiFleurDeLys } from 'react-icons/gi';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello! I'm contacting from your website.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage: ${form.message}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="py-20 px-4 text-center" style={{ background: 'linear-gradient(135deg, var(--forest-dark), var(--forest))' }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>GET IN TOUCH</p>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="font-cinzel text-5xl font-bold mb-3" style={{ color: 'var(--ivory)' }}>Contact Us</h1>
          <p className="font-cormorant text-xl" style={{ color: 'rgba(250,246,239,0.8)' }}>We'd love to hear from you</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-cinzel text-2xl font-bold mb-8" style={{ color: 'var(--crimson)' }}>Visit Our Boutique</h2>
            <div className="space-y-6">
              {[
                { Icon: FiMapPin, label: 'Address', value: '123 Silk Street, White Town, Puducherry — 605 001, India' },
                { Icon: FiPhone, label: 'Phone', value: '+91 98765 43210' },
                { Icon: FiMail, label: 'Email', value: 'hello@sasthiboutique.com' },
                { Icon: FiClock, label: 'Hours', value: 'Monday – Saturday: 10:00 AM – 8:00 PM\nSunday: 11:00 AM – 6:00 PM' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full" style={{ background: 'rgba(139,0,0,0.1)', border: '1px solid rgba(139,0,0,0.2)' }}>
                    <Icon size={18} style={{ color: 'var(--crimson)' }} />
                  </div>
                  <div>
                    <p className="font-cinzel text-xs tracking-widest mb-1" style={{ color: 'var(--gold)' }}>{label.toUpperCase()}</p>
                    <p className="font-cormorant text-base whitespace-pre-line" style={{ color: 'var(--charcoal)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10 p-6" style={{ background: 'linear-gradient(135deg, #1a4731, #0d2a1e)', border: '1px solid var(--gold)' }}>
              <p className="font-cinzel text-sm tracking-widest mb-2" style={{ color: 'var(--gold)' }}>FASTEST RESPONSE</p>
              <p className="font-cormorant text-2xl mb-4" style={{ color: 'var(--ivory)' }}>Chat with us on WhatsApp for instant replies!</p>
              <a href="https://wa.me/919876543210?text=Hello! I'd like to enquire about your collection."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 font-cinzel text-sm transition-all hover:scale-105"
                style={{ background: '#25D366', color: 'white' }}>
                <FaWhatsapp size={20} /> Chat Now
              </a>
            </div>

            {/* Social */}
            <div className="mt-8">
              <p className="font-cinzel text-xs tracking-widest mb-4" style={{ color: 'var(--gold)' }}>FOLLOW US</p>
              <div className="flex gap-4">
                {[FaInstagram, FaFacebook, FaWhatsapp].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
                    style={{ border: '1px solid rgba(201,168,76,0.4)', color: 'var(--crimson)' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-cinzel text-2xl font-bold mb-8" style={{ color: 'var(--crimson)' }}>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { key: 'name', label: 'Full Name', type: 'text', required: true },
                { key: 'email', label: 'Email Address', type: 'email', required: true },
                { key: 'phone', label: 'Phone Number', type: 'tel', required: false },
              ].map(f => (
                <div key={f.key}>
                  <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--charcoal)' }}>{f.label.toUpperCase()}{f.required && ' *'}</label>
                  <input type={f.type} required={f.required}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 outline-none font-cormorant text-base transition-all focus:border-crimson"
                    style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'white' }} />
                </div>
              ))}
              <div>
                <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--charcoal)' }}>MESSAGE *</label>
                <textarea required rows={5}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 outline-none font-cormorant text-base resize-none"
                  style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'white' }} />
              </div>
              <button type="submit" className="btn-luxury w-full py-4 text-sm">Send Message via WhatsApp</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
