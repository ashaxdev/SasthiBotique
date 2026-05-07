'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';
import { GiFleurDeLys } from 'react-icons/gi';

const categories = ['All', 'Silk Sarees', 'Banarasi Sarees', 'Lehengas', 'Salwar Kameez', 'Anarkali', 'Dupattas', 'Bridal'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
  { label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 – ₹30,000', min: 15000, max: 30000 },
  { label: 'Above ₹30,000', min: 30000, max: Infinity },
];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Bestselling', 'Rating'];

const demoProducts = [
  { _id: '1', name: 'Kanjivaram Silk Saree', slug: 'kanjivaram-silk-saree', price: 8999, originalPrice: 12999, images: [`https://placehold.co/400x520/1A3A2A/C9A84C?text=Kanjivaram`], category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Red'], rating: 4.8, newArrival: true, bestseller: false },
  { _id: '2', name: 'Bridal Lehenga Choli', slug: 'bridal-lehenga-choli', price: 24999, originalPrice: 35000, images: [`https://placehold.co/400x520/5C0000/E8C872?text=Lehenga`], category: 'Lehengas', sizes: ['S','M','L'], colors: ['Crimson'], rating: 4.9, newArrival: true, bestseller: true },
  { _id: '3', name: 'Banarasi Silk Saree', slug: 'banarasi-silk-saree', price: 6499, originalPrice: 9000, images: [`https://placehold.co/400x520/2D0000/C9A84C?text=Banarasi`], category: 'Banarasi Sarees', sizes: ['Free Size'], colors: ['Green'], rating: 4.7, newArrival: false, bestseller: true },
  { _id: '4', name: 'Anarkali Festive Suit', slug: 'anarkali-festive-suit', price: 4999, originalPrice: 7500, images: [`https://placehold.co/400x520/0D1F15/C9A84C?text=Anarkali`], category: 'Anarkali', sizes: ['S','M','L','XL'], colors: ['Green'], rating: 4.6, newArrival: true, bestseller: false },
  { _id: '5', name: 'Chanderi Salwar Kameez', slug: 'chanderi-salwar-kameez', price: 3499, originalPrice: 5000, images: [`https://placehold.co/400x520/1A3A2A/E8C872?text=Salwar`], category: 'Salwar Kameez', sizes: ['S','M','L','XL'], colors: ['Ivory'], rating: 4.5, newArrival: false, bestseller: true },
  { _id: '6', name: 'Raw Silk Dupatta', slug: 'raw-silk-dupatta', price: 1299, originalPrice: 2000, images: [`https://placehold.co/400x520/8B0000/E8C872?text=Dupatta`], category: 'Dupattas', sizes: ['Free Size'], colors: ['Red'], rating: 4.4, newArrival: true, bestseller: false },
  { _id: '7', name: 'Tussar Silk Saree', slug: 'tussar-silk-saree', price: 5999, originalPrice: 8500, images: [`https://placehold.co/400x520/2D5A3D/C9A84C?text=Tussar`], category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Natural'], rating: 4.7, newArrival: false, bestseller: true },
  { _id: '8', name: 'Designer Lehenga Set', slug: 'designer-lehenga-set', price: 15999, originalPrice: 22000, images: [`https://placehold.co/400x520/5C0000/C9A84C?text=Designer`], category: 'Lehengas', sizes: ['S','M','L','XL'], colors: ['Crimson'], rating: 4.8, newArrival: true, bestseller: true },
  { _id: '9', name: 'Patola Silk Saree', slug: 'patola-silk-saree', price: 11999, originalPrice: 16000, images: [`https://placehold.co/400x520/1A3A2A/C9A84C?text=Patola`], category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Multi'], rating: 4.9, newArrival: false, bestseller: true },
  { _id: '10', name: 'Bandhani Dupatta', slug: 'bandhani-dupatta', price: 899, originalPrice: 1500, images: [`https://placehold.co/400x520/8B0000/C9A84C?text=Bandhani`], category: 'Dupattas', sizes: ['Free Size'], colors: ['Pink'], rating: 4.3, newArrival: true, bestseller: false },
  { _id: '11', name: 'Georgette Anarkali', slug: 'georgette-anarkali', price: 3999, originalPrice: 6000, images: [`https://placehold.co/400x520/0D1F15/E8C872?text=Georgette`], category: 'Anarkali', sizes: ['S','M','L','XL','XXL'], colors: ['Navy'], rating: 4.6, newArrival: false, bestseller: true },
  { _id: '12', name: 'Bridal Banarasi Saree', slug: 'bridal-banarasi-saree', price: 18999, originalPrice: 28000, images: [`https://placehold.co/400x520/2D0000/E8C872?text=Bridal+Banarasi`], category: 'Bridal', sizes: ['Free Size'], colors: ['Red','Gold'], rating: 5.0, newArrival: true, bestseller: true },
];

function ShopPageInner() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(demoProducts);
  const [filtered, setFiltered] = useState(demoProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [sortBy, setSortBy] = useState('Newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    let result = [...products];
    if (category && category !== 'all') {
      setSelectedCategory(categories.find(c => c.toLowerCase().replace(' ', '-') === category) || 'All');
    }
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    applyFilters(result);
  }, [searchParams]);

  const applyFilters = (base = products) => {
    let result = [...base];
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    const range = priceRanges[selectedPrice];
    result = result.filter(p => p.price >= range.min && p.price <= range.max);
    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'Rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'Bestselling') result = result.filter(p => p.bestseller).concat(result.filter(p => !p.bestseller));
    setFiltered(result);
  };

  useEffect(() => { applyFilters(); }, [selectedCategory, selectedPrice, sortBy]);

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, var(--forest-dark) 0%, var(--forest) 100%)' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
            <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold)' }}>OUR COLLECTION</p>
            <GiFleurDeLys style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="section-title text-4xl md:text-5xl font-bold" style={{ color: 'var(--ivory)' }}>Shop All</h1>
          <p className="font-cormorant text-lg mt-2" style={{ color: 'rgba(250,246,239,0.7)' }}>{filtered.length} curated pieces</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-4" style={{ background: 'var(--pearl)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 md:hidden btn-forest px-4 py-2 text-xs">
              <FiFilter /> Filters
            </button>
            {/* Category */}
            <div className="flex gap-2 flex-wrap hidden md:flex">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className="px-4 py-1.5 font-cinzel text-xs tracking-wide transition-all"
                  style={{ background: selectedCategory === cat ? 'var(--crimson)' : 'transparent', color: selectedCategory === cat ? 'var(--gold-light)' : 'var(--charcoal)', border: '1px solid', borderColor: selectedCategory === cat ? 'var(--crimson)' : 'rgba(201,168,76,0.3)' }}>
                  {cat}
                </button>
              ))}
            </div>
            {/* Sort */}
            <div className="ml-auto">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 font-cinzel text-xs outline-none"
                style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'white', color: 'var(--charcoal)' }}>
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Mobile filter drawer */}
          {filterOpen && (
            <div className="md:hidden mb-4 p-4 animate-slideDown" style={{ background: 'var(--pearl)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-cinzel text-sm" style={{ color: 'var(--crimson)' }}>FILTERS</h3>
                <button onClick={() => setFilterOpen(false)}><FiX /></button>
              </div>
              <p className="font-cinzel text-xs mb-2" style={{ color: 'var(--gold)' }}>CATEGORY</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); setFilterOpen(false); }}
                    className="px-3 py-1 font-cinzel text-xs"
                    style={{ background: selectedCategory === cat ? 'var(--crimson)' : 'transparent', color: selectedCategory === cat ? 'white' : 'var(--charcoal)', border: '1px solid rgba(201,168,76,0.3)' }}>
                    {cat}
                  </button>
                ))}
              </div>
              <p className="font-cinzel text-xs mb-2" style={{ color: 'var(--gold)' }}>PRICE</p>
              <div className="flex flex-col gap-1">
                {priceRanges.map((range, i) => (
                  <button key={i} onClick={() => { setSelectedPrice(i); setFilterOpen(false); }}
                    className="text-left px-3 py-1.5 text-xs transition-all"
                    style={{ color: selectedPrice === i ? 'var(--crimson)' : 'var(--charcoal)', fontWeight: selectedPrice === i ? 700 : 400, fontFamily: "'Cinzel', serif" }}>
                    {selectedPrice === i ? '✓ ' : ''}{range.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Filter - Desktop */}
          <div className="hidden md:flex gap-2 mb-6 flex-wrap">
            {priceRanges.map((range, i) => (
              <button key={i} onClick={() => setSelectedPrice(i)}
                className="px-4 py-1.5 font-cinzel text-xs transition-all"
                style={{ background: selectedPrice === i ? 'var(--forest)' : 'transparent', color: selectedPrice === i ? 'var(--gold-light)' : 'var(--charcoal)', border: '1px solid', borderColor: selectedPrice === i ? 'var(--forest)' : 'rgba(201,168,76,0.3)' }}>
                {range.label}
              </button>
            ))}
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-cormorant text-2xl" style={{ color: 'var(--forest)' }}>No products found</p>
              <button onClick={() => { setSelectedCategory('All'); setSelectedPrice(0); }} className="btn-luxury mt-4 px-8 py-3 text-xs">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <div key={product._id} className="animate-fadeInUp" style={{ animationDelay: `${(i % 8) * 0.07}s` }}>
                  <ProductCard product={product} />
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 rounded-full border-4" style={{borderColor:'var(--gold)',borderTopColor:'transparent'}}></div></div>}>
      <ShopPageInner />
    </Suspense>
  );
}
