import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Seed admin if not exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@sasthiboutique.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        name: 'Sasthi Admin',
        role: 'admin',
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const isValid = await admin.comparePassword(password);
    if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = signToken({ id: admin._id, email: admin.email, role: admin.role, name: admin.name });

    const response = NextResponse.json({ token, admin: { email: admin.email, name: admin.name, role: admin.role } });
    response.cookies.set('admin-token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('admin-token', '', { maxAge: 0 });
  return response;
}
