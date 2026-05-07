// import mongoose, { Document, Schema } from 'mongoose';

// export interface IOrderItem {
//   productId: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   size: string;
//   color: string;
// }

// export interface IOrder extends Document {
//   orderNumber: string;
//   customerName: string;
//   customerPhone: string;
//   customerEmail: string;
//   customerAddress: string;
//   items: IOrderItem[];
//   subtotal: number;
//   discount: number;
//   total: number;
//   status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
//   paymentMethod: 'whatsapp' | 'cod';
//   notes: string;
//   whatsappSent: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const OrderItemSchema = new Schema({
//   productId: String,
//   name: String,
//   image: String,
//   price: Number,
//   quantity: Number,
//   size: String,
//   color: String,
// });

// const OrderSchema = new Schema<IOrder>({
//   orderNumber: { type: String, unique: true },
//   customerName: { type: String, required: true },
//   customerPhone: { type: String, required: true },
//   customerEmail: String,
//   customerAddress: { type: String, required: true },
//   items: [OrderItemSchema],
//   subtotal: Number,
//   discount: { type: Number, default: 0 },
//   total: Number,
//   status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
//   paymentMethod: { type: String, default: 'whatsapp' },
//   notes: String,
//   whatsappSent: { type: Boolean, default: false },
// }, { timestamps: true });

// OrderSchema.pre('save', async function () {
//   if (!this.orderNumber) {
//     const count = await mongoose.model('Order').countDocuments();
//     this.orderNumber = `SB${String(count + 1001).padStart(5, '0')}`;
//   }
// });

// export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
