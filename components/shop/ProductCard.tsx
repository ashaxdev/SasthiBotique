'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const { toggleWishlist, isInWishlist, addItem } = useCartStore();
  const wished = isInWishlist(product._id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.jpg',
      size: product.sizes?.[0] || 'Free Size',
      color: product.colors?.[0] || 'Default',
      quantity: 1,
      slug: product.slug,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product._id);
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist ♡');
  };

  return (
    <div
      className="product-card group cursor-pointer"
      onMouseEnter={() => { setHovered(true); setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.newArrival && <span className="luxury-badge">New</span>}
        {product.bestseller && <span className="luxury-badge" style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-dark) 100%)' }}>Bestseller</span>}
        {discount > 0 && <span className="luxury-badge" style={{ background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dark) 100%)' }}>-{discount}%</span>}
      </div>

      {/* Wishlist */}
      <button onClick={handleWishlist} className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110"
        style={{ background: wished ? 'var(--crimson)' : 'rgba(255,255,255,0.9)', color: wished ? 'white' : 'var(--crimson)', border: '1px solid rgba(201,168,76,0.3)', backdropFilter: 'blur(4px)' }}>
        <FiHeart size={16} fill={wished ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <Link href={`/shop/${product.slug}`}>
        <div className="img-zoom-wrapper relative overflow-hidden" style={{ paddingBottom: '130%' }}>
          <img
            src={product.images[imgIdx] || product.images[0] || `https://placehold.co/400x520/1A3A2A/C9A84C?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          />
          {/* Quick View Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'rgba(13,31,21,0.3)' }}>
            <Link href={`/shop/${product.slug}`}
              className="flex items-center gap-2 btn-luxury px-5 py-2 text-xs"
              style={{ transform: hovered ? 'translateY(0)' : 'translateY(20px)', transition: 'transform 0.3s ease' }}>
              <FiEye size={14} /> Quick View
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-cinzel text-xs tracking-widest mb-1 uppercase" style={{ color: 'var(--forest)', fontSize: '0.65rem' }}>{product.category}</p>
          <h3 className="font-cormorant text-base font-semibold mb-2 line-clamp-2" style={{ color: 'var(--charcoal)' }}>{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: i < Math.floor(product.rating) ? 'var(--gold)' : '#ddd', fontSize: '12px' }}>★</span>
            ))}
            <span className="text-xs ml-1" style={{ color: '#999' }}>({product.rating})</span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="price-tag">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="price-original ml-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <button onClick={handleAddToCart}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ background: 'var(--crimson)', color: 'var(--gold-light)' }}>
              <FiShoppingBag size={15} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
