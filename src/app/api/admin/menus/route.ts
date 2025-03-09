import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const menuPath = path.join(process.cwd(), 'src', 'app', 'api', 'menu.json');

export async function GET() {
  try {
    const menuContent = await fs.readFile(menuPath, 'utf-8');
    const menu = JSON.parse(menuContent);
    return NextResponse.json({ data: menu });
  } catch (error) {
    console.error('Error reading menu:', error);
    return NextResponse.json(
      { message: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, href, parentMenu } = await request.json();
    const menuContent = await fs.readFile(menuPath, 'utf-8');
    const menu = JSON.parse(menuContent);

    console.log(menu)

    const newMenuItem = {
      title,
      href,
      submenus: []
    };

    // If parentmenu is provided, add as submenu
    if (parentMenu) {
      const parentItem = menu.find((item: any) => item.title === parentMenu);
      if (!parentItem) {
        return NextResponse.json(
          { message: 'Parent menu not found' },
          { status: 404 }
        );
      }
      if (!parentItem.submenu) {
        parentItem.submenu = [];
      }
      parentItem.submenu.push(newMenuItem);
    } else {
      // Add as main menu item if no parent
      menu.push(newMenuItem);
    }

    await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
    return NextResponse.json({ message: 'Menu item added successfully' });
  } catch (error) {
    console.error('Error adding menu item:', error);
    return NextResponse.json(
      { message: 'Failed to add menu item' },
      { status: 500 }
    );
  }
}