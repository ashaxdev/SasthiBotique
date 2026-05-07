'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store';
import { GiFleurDeLys } from 'react-icons/gi';
import Link from 'next/link';
import { FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const demoProducts: Record<string, any> = {
  '1': { _id: '1', name: 'Kanjivaram Silk Saree', slug: 'kanjivaram-silk-saree', price: 8999, originalPrice: 12999, images: ['https://placehold.co/400x520/1A3A2A/C9A84C?text=Kanjivaram'], category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Red'], rating: 4.8, newArrival: true, bestseller: false },
  '2': { _id: '2', name: 'Bridal Lehenga Choli', slug: 'bridal-lehenga-choli', price: 24999, originalPrice: 35000, images: ['https://placehold.co/400x520/5C0000/E8C872?text=Lehenga'], category: 'Lehengas', sizes: ['M'], colors: ['Crimson'], rating: 4.9, newArrival: true, bestseller: true },
};

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCartStore();
  const wishedProducts = wishlist.map(id => demoProducts[id]).filter(Boolean);

  return (
    <>
      <Navbar />
      <main>
        <div className="py-12 px-4 text-center" style={{ background: 'linear-gradient(135deg, var(--crimson-dark), var(--forest-dark))' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>MY COLLECTION</p>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="font-cinzel text-4xl font-bold" style={{ color: 'var(--ivory)' }}>My Wishlist</h1>
          <p className="font-cormorant text-lg mt-1" style={{ color: 'rgba(250,246,239,0.7)' }}>{wishlist.length} saved piece{wishlist.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {wishedProducts.length === 0 ? (
            <div className="text-center py-20">
              <FiHeart size={48} className="mx-auto mb-6" style={{ color: 'var(--gold)' }} />
              <h2 className="font-cinzel text-2xl mb-4" style={{ color: 'var(--forest)' }}>Your wishlist is empty</h2>
              <p className="font-cormorant text-lg mb-8" style={{ color: 'var(--charcoal)' }}>Save pieces you love and come back to them anytime.</p>
              <Link href="/shop" className="btn-luxury px-10 py-4 text-sm">Explore Collection</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishedProducts.map(product => (
                <div key={product._id} className="product-card">
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <button onClick={() => { toggleWishlist(product._id); toast.success('Removed from wishlist'); }}
                      className="w-8 h-8 flex items-center justify-center rounded-full"
                      style={{ background: 'var(--crimson)', color: 'white' }}>
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                  <Link href={`/shop/${product.slug}`}>
                    <div className="img-zoom-wrapper" style={{ paddingBottom: '130%', position: 'relative' }}>
                      <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-cinzel text-xs tracking-widest mb-1" style={{ color: 'var(--forest)', fontSize: '0.65rem' }}>{product.category}</p>
                      <h3 className="font-cormorant text-base font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="price-tag">₹{product.price.toLocaleString('en-IN')}</span>
                        <button onClick={e => {
                          e.preventDefault();
                          addItem({ id: product._id, name: product.name, price: product.price, image: product.images[0], size: product.sizes[0], color: product.colors[0], quantity: 1, slug: product.slug });
                          toast.success('Added to cart!');
                        }} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'var(--crimson)', color: 'var(--gold-light)' }}>
                          <FiShoppingBag size={14} />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
