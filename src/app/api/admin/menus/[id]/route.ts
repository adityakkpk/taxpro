import { NextResponse } from 'next/server';
import connectDB from "@/src/lib/mongodb";
import { Menu } from '@/src/app/models/Menu';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    
    const menu = await Menu.findOneAndUpdate(
      { href: `/services/${params.id}` },
      { $set: data },
      { new: true }
    );

    if (!menu) {
      return NextResponse.json(
        { message: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Menu item updated successfully' });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { message: 'Failed to update menu item' },
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
    
    const menu = await Menu.findOneAndDelete({
      href: `/services/${params.id}`
    });

    if (!menu) {
      return NextResponse.json(
        { message: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { message: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}