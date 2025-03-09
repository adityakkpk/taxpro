import { NextResponse } from 'next/server';
import connectDB from "@/src/lib/mongodb";
import { Menu } from '@/src/app/models/Menu';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    
    const menu = await Menu.findOneAndUpdate(
      { href: `/services/${params.id}` },
      { $push: { submenu: data } },
      { new: true }
    );

    if (!menu) {
      return NextResponse.json(
        { message: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Submenu item added successfully' });
  } catch (error) {
    console.error('Error adding submenu item:', error);
    return NextResponse.json(
      { message: 'Failed to add submenu item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { submenuHref } = await request.json();
    
    const menu = await Menu.findOneAndUpdate(
      { href: `/services/${params.id}` },
      { $pull: { submenu: { href: submenuHref } } },
      { new: true }
    );

    if (!menu) {
      return NextResponse.json(
        { message: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Submenu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting submenu item:', error);
    return NextResponse.json(
      { message: 'Failed to delete submenu item' },
      { status: 500 }
    );
  }
}