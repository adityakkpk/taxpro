"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/src/app/components/ui/button";
import {
  Menu,
  X,
  Calculator,
  CircleUser,
  LucideCreativeCommons,
  ChevronDown,
  CircleChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [servicesMenu, setServicesMenu] = useState<any>([])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const fetchMenus = async () => {
    // Fetch menus from an API endpoint
    const response = await fetch("/api/admin/menus");
    return await response.json();
  }

  useEffect(() => {
    const getMenus = async () => {
      const menus = await fetchMenus();
      setServicesMenu(menus.data);
    }
    getMenus();
  },[]);

  interface ServiceItemProps {
    title: string;
    description?: string;
    href: string;
    isNew?: boolean;
  }

  const ServiceItem = ({ title, href, isNew }: ServiceItemProps) => {

    return (
      <Link
        href={href}
        className="block p-2 hover:bg-gray-50 transition-colors rounded"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="font-medium text-[#3c5473] text-sm">
                {title}
              </span>
              {isNew && (
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>
          </div>
          <LucideCreativeCommons className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
      </Link>
    );
  };

  // ServicesDropdown Component
  const ServicesDropdown = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      dropdownRef.current?.classList.remove("hidden");
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        dropdownRef.current?.classList.add("hidden");
      }, 500);
    };

    return (
      <div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center gap-1 text-black hover:text-black/60 transition py-2">
          <Link
            href="/services"
            className="text-gray-700 hover:text-blue-600 flex items-center justify-center"
          >
            Services <ChevronDown className="h-4 w-4 ml-1" />
          </Link>
        </button>

        <div
          ref={dropdownRef}
          className="hidden absolute top-full left-0 w-64 lg:w-72 bg-white border border-black rounded-lg shadow-lg mt-1 z-50"
        >
          <div className="py-2">
            {servicesMenu.length > 0 && servicesMenu?.map((menu: { title: string; href: string; submenu: { title: string; href: string }[] }) => (
              <div
              key={menu.title}
              className="relative group/submenu px-4 py-2 hover:bg-gray-100"
              onClick={handleMouseLeave}
              >
              <div
                className="w-full text-left flex items-center cursor-pointer justify-between text-black"
              >
                <span className="text-sm font-medium">{menu.title}</span>
                <CircleChevronRight className="h-4 w-4" />
              </div>
              <div className="hidden group-hover/submenu:block absolute top-0 left-full w-[300px] md:w-[450px] bg-white border border-black rounded-lg shadow-lg ml-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {menu.submenu?.map((item: { title: string; href: string }) => (
                  <div key={item.title} onClick={handleMouseLeave}>
                  <ServiceItem
                    title={item.title}
                    href={item.href}
                  />
                  </div>
                ))}
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // NavLink Component
  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    return (
      <Link
        href={href}
        className="text-gray-700 hover:text-gray-700/90 transition"
      >
        {children}
      </Link>
    );
  };

  const MobileServiceMenu = () => {
    return (
      <div className="space-y-2">
        {servicesMenu.length > 0 && servicesMenu?.map((menu: { title: string; href: string; submenu: { title: string; href: string }[] }) => (
          <div key={menu.title} className="px-3">
            <button
              className="flex items-center justify-between w-full text-base font-medium text-gray-700 py-2"
              onClick={() => setExpandedMenu(expandedMenu === menu.title ? null : menu.title)}
            >
              <span>{menu.title}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expandedMenu === menu.title ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedMenu === menu.title && (
              <div className="pl-4 space-y-2 mt-2 border-l-2 border-gray-200">
                {menu.submenu.map((item) => (
                  <div
                    key={item.title}
                    className="py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      setExpandedMenu(null);
                    }}
                  >
                    <div
                      className="block text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  AAR TAX INDIA
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-between space-x-4 lg:space-x-8">
              <div className="flex items-center space-x-4 lg:space-x-6">
                <NavLink href="/">Home</NavLink>
                <ServicesDropdown />
                <NavLink href="/about">About Us</NavLink>
                <NavLink href="/enquiry">Enquiry</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>

            {/* Auth Buttons / Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {session ? (
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center focus:outline-none"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="user"
                        className="w-7 h-7 rounded-full cursor-pointer"
                      />
                    ) : (
                      <CircleUser
                        color="#1960d2"
                        className="w-7 h-7 cursor-pointer"
                      />
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 truncate">
                        {session.user.name || session.user.email}
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link href="/auth/signin">
                    <Button variant="default" size="sm" className="text-sm">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="default" size="sm" className="text-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[73px] bg-white z-50 overflow-y-auto">
            <div className="px-4 pt-2 pb-3 space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={toggleMenu}
              >
                Home
              </Link>

              <MobileServiceMenu />

              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                href="/enquiry"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={toggleMenu}
              >
                Enquiry
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={toggleMenu}
              >
                Contact
              </Link>

              {!session && (
                <div className="mt-4 space-y-2">
                  <Link href="/auth/signin" onClick={toggleMenu}>
                    <Button variant="default" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
