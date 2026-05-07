'use client';
import { useState, useEffect } from 'react';
import { GiFleurDeLys } from 'react-icons/gi';
import ProductCard from './ProductCard';

// Demo products for when DB is empty
const demoProducts = [
  { _id: '1', name: 'Kanjivaram Silk Saree', slug: 'kanjivaram-silk-saree', price: 8999, originalPrice: 12999, images: [`https://placehold.co/400x520/1A3A2A/C9A84C?text=Kanjivaram+Saree`], category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Red', 'Gold'], rating: 4.8, newArrival: true, bestseller: false },
  { _id: '2', name: 'Bridal Lehenga Choli', slug: 'bridal-lehenga-choli', price: 24999, originalPrice: 35000, images: [`https://placehold.co/400x520/5C0000/E8C872?text=Bridal+Lehenga`], category: 'Lehengas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Crimson', 'Gold'], rating: 4.9, newArrival: true, bestseller: true },
  { _id: '3', name: 'Banarasi Silk Saree', slug: 'banarasi-silk-saree', price: 6499, originalPrice: 9000, images: [`https://placehold.co/400x520/2D0000/C9A84C?text=Banarasi+Saree`], category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Green', 'Gold'], rating: 4.7, newArrival: false, bestseller: true },
  { _id: '4', name: 'Anarkali Festive Suit', slug: 'anarkali-festive-suit', price: 4999, originalPrice: 7500, images: [`https://placehold.co/400x520/0D1F15/C9A84C?text=Anarkali+Suit`], category: 'Anarkali', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Forest Green'], rating: 4.6, newArrival: true, bestseller: false },
  { _id: '5', name: 'Chanderi Salwar Kameez', slug: 'chanderi-salwar-kameez', price: 3499, originalPrice: 5000, images: [`https://placehold.co/400x520/1A3A2A/E8C872?text=Chanderi+Salwar`], category: 'Salwar Kameez', sizes: ['S', 'M', 'L', 'XL'], colors: ['Ivory', 'Gold'], rating: 4.5, newArrival: false, bestseller: true },
  { _id: '6', name: 'Raw Silk Dupatta', slug: 'raw-silk-dupatta', price: 1299, originalPrice: 2000, images: [`https://placehold.co/400x520/8B0000/E8C872?text=Silk+Dupatta`], category: 'Dupattas', sizes: ['Free Size'], colors: ['Red', 'Maroon'], rating: 4.4, newArrival: true, bestseller: false },
  { _id: '7', name: 'Tussar Silk Saree', slug: 'tussar-silk-saree', price: 5999, originalPrice: 8500, images: [`https://placehold.co/400x520/2D5A3D/C9A84C?text=Tussar+Saree`], category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Natural', 'Gold'], rating: 4.7, newArrival: false, bestseller: true },
  { _id: '8', name: 'Designer Lehenga Set', slug: 'designer-lehenga-set', price: 15999, originalPrice: 22000, images: [`https://placehold.co/400x520/5C0000/C9A84C?text=Designer+Lehenga`], category: 'Lehengas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Crimson', 'Green'], rating: 4.8, newArrival: true, bestseller: true },
];

interface Props {
  title: string;
  filter: 'newArrival' | 'bestseller' | 'featured';
}

export default function FeaturedProducts({ title, filter }: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?${filter}=true&limit=8`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products?.length ? data.products : demoProducts.filter(p => p[filter as keyof typeof p]));
        } else {
          setProducts(demoProducts.filter(p => p[filter as keyof typeof p]));
        }
      } catch {
        setProducts(demoProducts.filter(p => p[filter as keyof typeof p]));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <section className="py-20 px-4" style={{ background: filter === 'bestseller' ? 'var(--pearl)' : 'white' }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>
              {filter === 'newArrival' ? 'JUST ARRIVED' : 'TOP PICKS'}
            </p>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          <div className="gold-divider max-w-xs mx-auto"><span className="ornament">◆</span></div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton" style={{ paddingBottom: '150%', borderRadius: '2px' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <div key={product._id} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-10">
          <a href={`/shop?${filter}=true`} className="btn-luxury px-10 py-3 text-xs inline-block">View All {title}</a>
        </div>
      </div>
    </section>
  );
}
