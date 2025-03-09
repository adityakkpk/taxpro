import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const menuPath = path.join(process.cwd(), 'src', 'app', 'api', 'menu.json');

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const menuContent = await fs.readFile(menuPath, 'utf-8');
    let menu = JSON.parse(menuContent);

    // Find and update menu item
    menu = menu.map((item: any) => {
      if (item.href === `/services/${params.id}`) {
        return { ...item, ...data };
      }
      return item;
    });

    await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
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
    const menuContent = await fs.readFile(menuPath, 'utf-8');
    let menu = JSON.parse(menuContent);

    // Filter out the menu item
    menu = menu.filter((item: any) => 
      item.href !== `/services/${params.id}`
    );

    await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { message: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}