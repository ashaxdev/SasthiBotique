import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  tags: string[];
  fabric: string;
  care: string;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  subcategory: { type: String },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  tags: [{ type: String }],
  fabric: { type: String },
  care: { type: String },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
}, { timestamps: true });

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
