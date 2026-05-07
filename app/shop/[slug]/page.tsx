'use client';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store';
import { FiHeart, FiShoppingBag, FiMinus, FiPlus, FiZoomIn } from 'react-icons/fi';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import { GiFleurDeLys } from 'react-icons/gi';
import toast from 'react-hot-toast';
import Link from 'next/link';

const demoProduct = {
  _id: '1', name: 'Kanjivaram Silk Saree', slug: 'kanjivaram-silk-saree', price: 8999, originalPrice: 12999,
  images: [
    'https://placehold.co/600x780/1A3A2A/C9A84C?text=Kanjivaram+Front',
    'https://placehold.co/600x780/2D5A3D/E8C872?text=Kanjivaram+Detail',
    'https://placehold.co/600x780/5C0000/C9A84C?text=Kanjivaram+Drape',
    'https://placehold.co/600x780/8B0000/E8C872?text=Kanjivaram+Pallu',
  ],
  category: 'Silk Sarees', sizes: ['Free Size'], colors: ['Deep Red', 'Royal Green', 'Midnight Blue'],
  stock: 12, featured: true, newArrival: true, bestseller: true, rating: 4.8, reviews: 124,
  description: 'A masterpiece of South Indian silk weaving, this Kanjivaram saree is crafted from pure mulberry silk with real gold zari work. The intricate temple border design and rich pallu make it perfect for weddings, festivals, and grand celebrations.',
  fabric: 'Pure Mulberry Silk with Gold Zari', care: 'Dry Clean Only. Store in a cool, dry place.',
  tags: ['silk', 'saree', 'wedding', 'bridal', 'south-indian'],
};

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(demoProduct);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);
  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const wished = isInWishlist(product._id);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a colour'); return; }
    addItem({ id: product._id, name: product.name, price: product.price, image: product.images[0], size: selectedSize, color: selectedColor, quantity, slug: product.slug });
    toast.success('Added to cart!');
  };

  const handleWhatsAppOrder = () => {
    const msg = `Hello! I'd like to order:\n\n*${product.name}*\nSize: ${selectedSize}\nColour: ${selectedColor}\nQty: ${quantity}\nPrice: ₹${(product.price * quantity).toLocaleString('en-IN')}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-cinzel" style={{ color: 'var(--forest)' }}>
          <Link href="/" style={{ color: 'var(--gold)' }}>Home</Link> <span>/</span>
          <Link href="/shop" style={{ color: 'var(--gold)' }}>Shop</Link> <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="flex flex-col gap-4">
            {/* Main Image with Zoom */}
            <div ref={imgRef}
              className="relative overflow-hidden cursor-zoom-in"
              style={{ paddingBottom: '130%', border: '1px solid rgba(201,168,76,0.2)' }}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleMouseMove}>
              <img src={product.images[activeImg]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transform: zoomed ? 'scale(2.5)' : 'scale(1)' }} />
              <div className="absolute top-3 right-3 bg-white/80 rounded-full p-2">
                <FiZoomIn size={16} style={{ color: 'var(--crimson)' }} />
              </div>
              {zoomed && (
                <div className="absolute bottom-3 left-3 text-xs px-2 py-1 font-cinzel" style={{ background: 'rgba(13,31,21,0.8)', color: 'var(--gold-light)' }}>
                  Zoom Active
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden transition-all"
                  style={{ paddingBottom: '130%', border: i === activeImg ? '2px solid var(--gold)' : '1px solid rgba(201,168,76,0.2)' }}>
                  <img src={img} alt={`View ${i+1}`} className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.newArrival && <span className="luxury-badge">New Arrival</span>}
              {product.bestseller && <span className="luxury-badge" style={{ background: 'linear-gradient(135deg, var(--forest), var(--forest-dark))' }}>Bestseller</span>}
              {discount > 0 && <span className="luxury-badge" style={{ background: 'linear-gradient(135deg, var(--crimson), var(--crimson-dark))' }}>{discount}% Off</span>}
            </div>

            <p className="font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--gold)' }}>{product.category.toUpperCase()}</p>
            <h1 className="font-cormorant text-3xl md:text-4xl font-semibold mb-3" style={{ color: 'var(--charcoal)' }}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{[...Array(5)].map((_, i) => <FaStar key={i} size={14} style={{ color: i < Math.floor(product.rating) ? 'var(--gold)' : '#ddd' }} />)}</div>
              <span className="font-cinzel text-xs" style={{ color: 'var(--charcoal)' }}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="gold-divider" />

            {/* Price */}
            <div className="mb-6">
              <span className="font-cormorant text-4xl font-bold" style={{ color: 'var(--crimson)' }}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="ml-3 font-lato text-lg line-through" style={{ color: '#999' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <p className="text-sm mt-1" style={{ color: 'var(--forest)', fontFamily: "'Lato', sans-serif" }}>Inclusive of all taxes · Free shipping above ₹2000</p>
            </div>

            {/* Color Select */}
            <div className="mb-6">
              <p className="font-cinzel text-xs tracking-widest mb-3" style={{ color: 'var(--charcoal)' }}>COLOUR: <span style={{ color: 'var(--crimson)' }}>{selectedColor}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className="px-4 py-2 font-cinzel text-xs transition-all"
                    style={{ border: `2px solid ${selectedColor === color ? 'var(--crimson)' : 'rgba(201,168,76,0.3)'}`, color: selectedColor === color ? 'var(--crimson)' : 'var(--charcoal)', background: selectedColor === color ? 'rgba(139,0,0,0.05)' : 'transparent' }}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Select */}
            <div className="mb-6">
              <p className="font-cinzel text-xs tracking-widest mb-3" style={{ color: 'var(--charcoal)' }}>SIZE: <span style={{ color: 'var(--crimson)' }}>{selectedSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className="w-16 py-2 font-cinzel text-xs transition-all"
                    style={{ border: `2px solid ${selectedSize === size ? 'var(--crimson)' : 'rgba(201,168,76,0.3)'}`, color: selectedSize === size ? 'var(--crimson)' : 'var(--charcoal)', background: selectedSize === size ? 'rgba(139,0,0,0.05)' : 'transparent' }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6 flex items-center gap-4">
              <p className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--charcoal)' }}>QUANTITY:</p>
              <div className="flex items-center" style={{ border: '1px solid rgba(201,168,76,0.4)' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-10 h-10 flex items-center justify-center transition-all hover:bg-red-50">
                  <FiMinus size={14} style={{ color: 'var(--crimson)' }} />
                </button>
                <span className="w-12 text-center font-cinzel text-sm">{quantity}</span>
                <button onClick={() => setQuantity(q => q+1)} className="w-10 h-10 flex items-center justify-center transition-all hover:bg-red-50">
                  <FiPlus size={14} style={{ color: 'var(--crimson)' }} />
                </button>
              </div>
              <span className="text-xs" style={{ color: 'var(--forest)', fontFamily: "'Lato', sans-serif" }}>{product.stock} in stock</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-8">
              <button onClick={handleWhatsAppOrder}
                className="flex items-center justify-center gap-3 w-full py-4 font-cinzel text-sm tracking-widest uppercase transition-all hover:scale-[1.02]"
                style={{ background: '#25D366', color: 'white', boxShadow: '0 8px 30px rgba(37,211,102,0.3)' }}>
                <FaWhatsapp size={20} /> Order via WhatsApp
              </button>
              <button onClick={handleAddToCart} className="btn-luxury flex items-center justify-center gap-3 w-full py-4 text-sm">
                <FiShoppingBag size={18} /> Add to Cart
              </button>
              <button onClick={() => { toggleWishlist(product._id); toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist ♡'); }}
                className="flex items-center justify-center gap-3 w-full py-3 font-cinzel text-xs tracking-widest uppercase transition-all hover:scale-[1.01]"
                style={{ border: `1px solid ${wished ? 'var(--crimson)' : 'rgba(201,168,76,0.4)'}`, color: wished ? 'var(--crimson)' : 'var(--charcoal)' }}>
                <FiHeart size={16} fill={wished ? 'currentColor' : 'none'} /> {wished ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Product Details */}
            <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '20px' }}>
              <h3 className="font-cinzel text-xs tracking-widest mb-4" style={{ color: 'var(--gold)' }}>PRODUCT DETAILS</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--charcoal)', fontFamily: "'Lato', sans-serif" }}>{product.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
                <div><span className="font-bold" style={{ color: 'var(--forest)' }}>Fabric:</span> <span>{product.fabric}</span></div>
                <div><span className="font-bold" style={{ color: 'var(--forest)' }}>Care:</span> <span>{product.care}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
