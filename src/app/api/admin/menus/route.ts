import { NextResponse } from 'next/server';
import connectDB from "@/src/lib/mongodb";
import { Menu } from '@/src/app/models/Menu';

export async function GET() {
  try {
    await connectDB();
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: menus });
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      { message: 'Failed to fetch menus' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { title, href, parentMenu } = await request.json();

    const newMenuItem = {
      title,
      href,
      submenu: []
    };

    if (parentMenu) {
      // Add as submenu item
      const parentItem = await Menu.findOne({ title: parentMenu });
      
      if (!parentItem) {
        return NextResponse.json(
          { message: 'Parent menu not found' },
          { status: 404 }
        );
      }

      await Menu.findByIdAndUpdate(
        parentItem._id,
        { $push: { submenu: newMenuItem } },
        { new: true }
      );
    } else {
      // Add as main menu item
      await Menu.create(newMenuItem);
    }

    return NextResponse.json({ message: 'Menu item added successfully' });
  } catch (error) {
    console.error('Error adding menu item:', error);
    return NextResponse.json(
      { message: 'Failed to add menu item' },
      { status: 500 }
    );
  }
}