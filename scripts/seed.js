// Run: node scripts/seed.js
// Seeds the database with sample products, categories, and admin user

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('Set MONGODB_URI in .env.local'); process.exit(1); }

const categories = [
  { name: 'Sarees', slug: 'sarees', description: 'Elegant sarees for every occasion', featured: true, order: 1 },
  { name: 'Lehengas', slug: 'lehengas', description: 'Bridal and festive lehengas', featured: true, order: 2 },
  { name: 'Salwar Kameez', slug: 'salwar', description: 'Classic salwar suits', featured: true, order: 3 },
  { name: 'Kurtis', slug: 'kurtis', description: 'Everyday ethnic kurtis', featured: true, order: 4 },
  { name: 'Accessories', slug: 'accessories', description: 'Jewelry and accessories', featured: false, order: 5 },
];

const products = [
  {
    name: 'Royal Banarasi Silk Saree', slug: 'royal-banarasi-silk-saree',
    description: 'Exquisite handwoven Banarasi silk saree with intricate zari work and traditional motifs. Perfect for weddings and grand celebrations.',
    price: 8500, originalPrice: 12000,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800','https://images.unsplash.com/photo-1583391733981-8498a78a2f3a?w=800'],
    category: 'sarees', sizes: ['Free Size'], colors: ['Red', 'Maroon', 'Gold'],
    stock: 15, featured: true, newArrival: true, bestseller: false,
    tags: ['banarasi', 'silk', 'wedding', 'saree'], fabric: 'Pure Banarasi Silk', care: 'Dry clean only', rating: 4.8, reviews: 42,
  },
  {
    name: 'Kanjeevaram Silk Saree', slug: 'kanjeevaram-silk-saree',
    description: 'Authentic Kanjeevaram silk saree with traditional temple border and rich pallu. A timeless piece of South Indian heritage.',
    price: 11000, originalPrice: 15000,
    images: ['https://images.unsplash.com/photo-1583391733981-8498a78a2f3a?w=800','https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'],
    category: 'sarees', sizes: ['Free Size'], colors: ['Green', 'Purple', 'Blue'],
    stock: 8, featured: true, newArrival: false, bestseller: true,
    tags: ['kanjeevaram', 'silk', 'traditional'], fabric: 'Pure Silk', care: 'Dry clean only', rating: 4.9, reviews: 67,
  },
  {
    name: 'Bridal Lehenga Choli', slug: 'bridal-lehenga-choli',
    description: 'Opulent bridal lehenga with heavy embroidery, sequin work and matching dupatta. The perfect outfit for your special day.',
    price: 22000, originalPrice: 35000,
    images: ['https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800'],
    category: 'lehengas', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Red', 'Pink', 'Ivory'],
    stock: 5, featured: true, newArrival: true, bestseller: true,
    tags: ['bridal', 'lehenga', 'wedding'], fabric: 'Net & Velvet', care: 'Dry clean only', rating: 4.9, reviews: 28,
  },
  {
    name: 'Anarkali Salwar Suit', slug: 'anarkali-salwar-suit',
    description: 'Flowing Anarkali suit in premium georgette fabric with intricate embroidery on yoke and hemline.',
    price: 4500, originalPrice: 6500,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    category: 'salwar', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['Navy Blue', 'Emerald Green', 'Maroon'],
    stock: 20, featured: false, newArrival: true, bestseller: false,
    tags: ['anarkali', 'salwar', 'georgette'], fabric: 'Georgette', care: 'Gentle hand wash', rating: 4.6, reviews: 31,
  },
  {
    name: 'Designer Silk Kurti', slug: 'designer-silk-kurti',
    description: 'Elegant A-line silk kurti with block print and embroidered neckline. Pairs beautifully with palazzos or jeans.',
    price: 1800, originalPrice: 2500,
    images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800'],
    category: 'kurtis', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Yellow', 'Orange', 'Pink'],
    stock: 30, featured: false, newArrival: false, bestseller: true,
    tags: ['kurti', 'silk', 'printed'], fabric: 'Art Silk', care: 'Machine wash cold', rating: 4.5, reviews: 89,
  },
  {
    name: 'Chanderi Silk Saree', slug: 'chanderi-silk-saree',
    description: 'Lightweight Chanderi silk saree with delicate woven motifs. Ideal for daytime events and formal occasions.',
    price: 5500, originalPrice: 7000,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'],
    category: 'sarees', sizes: ['Free Size'], colors: ['Pastel Pink', 'Mint Green', 'Lavender'],
    stock: 12, featured: true, newArrival: false, bestseller: false,
    tags: ['chanderi', 'silk', 'lightweight'], fabric: 'Chanderi Silk', care: 'Dry clean recommended', rating: 4.7, reviews: 23,
  },
  {
    name: 'Palazzo Suit Set', slug: 'palazzo-suit-set',
    description: 'Breezy palazzo suit set in cotton linen. Perfect for summer weddings and festive brunches.',
    price: 2800, originalPrice: 3800,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    category: 'salwar', sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Cream', 'Sky Blue'],
    stock: 25, featured: false, newArrival: true, bestseller: false,
    tags: ['palazzo', 'cotton', 'summer'], fabric: 'Cotton Linen', care: 'Machine wash gentle', rating: 4.4, reviews: 45,
  },
  {
    name: 'Embroidered Lehenga', slug: 'embroidered-lehenga',
    description: 'Semi-bridal lehenga with intricate thread embroidery on flared skirt. Perfect for sangeet and mehendi ceremonies.',
    price: 12500, originalPrice: 18000,
    images: ['https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800'],
    category: 'lehengas', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Peach', 'Yellow', 'Coral'],
    stock: 8, featured: true, newArrival: false, bestseller: true,
    tags: ['lehenga', 'embroidered', 'sangeet'], fabric: 'Georgette', care: 'Dry clean only', rating: 4.8, reviews: 19,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Drop existing
    await mongoose.connection.dropCollection('categories').catch(() => {});
    await mongoose.connection.dropCollection('products').catch(() => {});
    await mongoose.connection.dropCollection('admins').catch(() => {});

    // Categories
    const CategorySchema = new mongoose.Schema({ name:String, slug:{type:String,unique:true}, description:String, featured:Boolean, order:Number, image:String });
    const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
    await Category.insertMany(categories);
    console.log(`✅ Seeded ${categories.length} categories`);

    // Products
    const ProductSchema = new mongoose.Schema({ name:String, slug:{type:String,unique:true}, description:String, price:Number, originalPrice:Number,
      images:[String], category:String, subcategory:String, sizes:[String], colors:[String], stock:Number,
      featured:Boolean, newArrival:Boolean, bestseller:Boolean, tags:[String], fabric:String, care:String, rating:Number, reviews:Number }, { timestamps: true });
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    // Admin user
    const bcrypt = require('bcryptjs');
    const AdminSchema = new mongoose.Schema({ email:{type:String,unique:true}, password:String, name:String, role:String }, { timestamps:true });
    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
    await Admin.create({ email: process.env.ADMIN_EMAIL || 'admin@sasthiboutique.com', password: hashed, name: 'Admin', role: 'admin' });
    console.log('✅ Created admin user');
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@sasthiboutique.com'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
