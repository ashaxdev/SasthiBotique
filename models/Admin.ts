// import mongoose, { Document, Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';

// export interface IAdmin extends Document {
//   email: string;
//   password: string;
//   name: string;
//   role: string;
//   comparePassword(password: string): Promise<boolean>;
// }

// const AdminSchema = new Schema<IAdmin>({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
//   role: { type: String, default: 'admin' },
// }, { timestamps: true });

// AdminSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   this.set('password', await bcrypt.hash(this.get('password'), 12));
// });

// AdminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
//   return bcrypt.compare(password, this.password);
// };

// export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
