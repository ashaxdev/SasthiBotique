// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/db';
// import Order from '@/models/Order';
// import { isAdmin } from '@/lib/auth';

// type Params = { params: Promise<{ id: string }> };

// export async function GET(req: NextRequest, { params }: Params) {
//   try {
//     const { id } = await params;
//     await dbConnect();
//     const order = await Order.findById(id).lean();
//     if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//     return NextResponse.json(order);
//   } catch {
//     return NextResponse.json({ error: 'Failed' }, { status: 500 });
//   }
// }

// export async function PATCH(req: NextRequest, { params }: Params) {
//   try {
//     const { id } = await params;
//     await dbConnect();
//     const body = await req.json();
//     const order = await Order.findByIdAndUpdate(id, body, { new: true });
//     if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//     return NextResponse.json(order);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// export async function PUT(req: NextRequest, { params }: Params) {
//   try {
//     const { id } = await params;
//     await dbConnect();
//     const body = await req.json();
//     const order = await Order.findByIdAndUpdate(id, body, { new: true });
//     if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//     return NextResponse.json(order);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// export async function DELETE(req: NextRequest, { params }: Params) {
//   try {
//     const { id } = await params;
//     if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     await dbConnect();
//     await Order.findByIdAndDelete(id);
//     return NextResponse.json({ message: 'Deleted' });
//   } catch {
//     return NextResponse.json({ error: 'Failed' }, { status: 500 });
//   }
// }
