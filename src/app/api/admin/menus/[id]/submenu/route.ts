import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const menuPath = path.join(process.cwd(), 'src', 'app', 'api', 'menu.json');

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const menuContent = await fs.readFile(menuPath, 'utf-8');
    let menu = JSON.parse(menuContent);

    // Find parent menu and add submenu item
    menu = menu.map((item: any) => {
      if (item.href === `/services/${params.id}`) {
        return {
          ...item,
          submenu: [...(item.submenu || []), data]
        };
      }
      return item;
    });

    await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
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
    const { submenuHref } = await request.json();
    const menuContent = await fs.readFile(menuPath, 'utf-8');
    let menu = JSON.parse(menuContent);

    // Find parent menu and remove submenu item
    menu = menu.map((item: any) => {
      if (item.href === `/services/${params.id}`) {
        return {
          ...item,
          submenu: item.submenu.filter((sub: any) => sub.href !== submenuHref)
        };
      }
      return item;
    });

    await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
    return NextResponse.json({ message: 'Submenu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting submenu item:', error);
    return NextResponse.json(
      { message: 'Failed to delete submenu item' },
      { status: 500 }
    );
  }
}