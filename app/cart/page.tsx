'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { GiFleurDeLys } from 'react-icons/gi';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [showOrder, setShowOrder] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' });

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleWhatsAppOrder = () => {
    const lines = items.map(i => `• ${i.name} (${i.size}, ${i.color}) x${i.quantity} — ₹${(i.price * i.quantity).toLocaleString('en-IN')}`).join('\n');
    const msg = `🛍️ *New Order — Sasthi Boutique*\n\n*Customer:* ${form.name || 'Customer'}\n*Phone:* ${form.phone || 'N/A'}\n*Address:* ${form.address || 'N/A'}\n\n*Items:*\n${lines}\n\n*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n*Shipping:* ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n*Total:* ₹${total.toLocaleString('en-IN')}\n\n${form.notes ? `*Notes:* ${form.notes}` : ''}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
    toast.success('Redirecting to WhatsApp...');
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
          <GiFleurDeLys size={48} style={{ color: 'var(--gold)' }} className="mb-6" />
          <h2 className="font-cinzel text-3xl mb-4" style={{ color: 'var(--forest)' }}>Your Cart is Empty</h2>
          <p className="font-cormorant text-lg mb-8" style={{ color: 'var(--charcoal)' }}>Discover our exquisite collection and add something special.</p>
          <Link href="/shop" className="btn-luxury px-10 py-4 text-sm">Continue Shopping</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="py-12 px-4 text-center" style={{ background: 'linear-gradient(135deg, var(--forest-dark), var(--forest))' }}>
          <h1 className="font-cinzel text-4xl font-bold" style={{ color: 'var(--ivory)' }}>Your Cart</h1>
          <p className="font-cormorant text-lg mt-1" style={{ color: 'var(--gold-light)' }}>{items.length} item{items.length > 1 ? 's' : ''}</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4"
                style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)' }}>
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover flex-shrink-0" style={{ border: '1px solid rgba(201,168,76,0.2)' }} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-cormorant text-lg font-semibold mb-1 truncate">{item.name}</h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--forest)', fontFamily: "'Cinzel', serif" }}>Size: {item.size} · Colour: {item.color}</p>
                  <p className="font-cormorant text-xl font-bold" style={{ color: 'var(--crimson)' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-red-50">
                        <FiMinus size={12} style={{ color: 'var(--crimson)' }} />
                      </button>
                      <span className="w-8 text-center font-cinzel text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-red-50">
                        <FiPlus size={12} style={{ color: 'var(--crimson)' }} />
                      </button>
                    </div>
                    <button onClick={() => { removeItem(item.id, item.size, item.color); toast.success('Item removed'); }}
                      className="p-2 transition-all hover:scale-110" style={{ color: 'var(--crimson)' }}>
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="p-6 sticky top-24" style={{ background: 'white', border: '1px solid rgba(201,168,76,0.3)' }}>
              <h3 className="font-cinzel text-sm tracking-widest mb-4" style={{ color: 'var(--charcoal)' }}>ORDER SUMMARY</h3>
              <div className="gold-divider" />
              <div className="space-y-3 text-sm mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span style={{ color: shipping === 0 ? 'var(--forest)' : 'inherit' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                {shipping > 0 && <p className="text-xs" style={{ color: 'var(--forest)' }}>Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more for free shipping</p>}
              </div>
              <div className="gold-divider" />
              <div className="flex justify-between font-bold mb-6">
                <span className="font-cinzel text-sm">Total</span>
                <span className="font-cormorant text-2xl" style={{ color: 'var(--crimson)' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>

              {/* Order Form */}
              {showOrder ? (
                <div className="space-y-3 mb-4">
                  {[
                    { key: 'name', placeholder: 'Your Name *', type: 'text' },
                    { key: 'phone', placeholder: 'Phone Number *', type: 'tel' },
                    { key: 'email', placeholder: 'Email (optional)', type: 'email' },
                    { key: 'address', placeholder: 'Delivery Address *', type: 'text' },
                    { key: 'notes', placeholder: 'Special Instructions', type: 'text' },
                  ].map(f => (
                    <input key={f.key} type={f.type} placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full px-3 py-2 text-sm outline-none font-cormorant"
                      style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'var(--cream)' }} />
                  ))}
                  <button onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-2 py-4 font-cinzel text-sm tracking-wide transition-all hover:scale-[1.02]"
                    style={{ background: '#25D366', color: 'white' }}>
                    <FaWhatsapp size={18} /> Confirm on WhatsApp
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowOrder(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 mb-3 font-cinzel text-sm tracking-wide"
                  style={{ background: '#25D366', color: 'white', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}>
                  <FaWhatsapp size={18} /> Order via WhatsApp
                </button>
              )}
              <Link href="/shop" className="block text-center font-cinzel text-xs tracking-widest py-2" style={{ color: 'var(--forest)' }}>← Continue Shopping</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
