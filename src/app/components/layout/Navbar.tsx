"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/src/app/components/ui/button';
import { Menu, X, Calculator } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TaxPro</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About Us
            </Link>
            <Link href="/enquiry" className="text-gray-700 hover:text-blue-600">
              Enquiry
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            {session ? (
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="ml-4"
              >
                Logout
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button variant="default" className="ml-4">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/enquiry"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Enquiry
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            {session ? (
              <Button
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                variant="outline"
                className="w-full mt-4"
              >
                Logout
              </Button>
            ) : (
              <Link href="/auth/signin" className="block" onClick={toggleMenu}>
                <Button variant="default" className="w-full mt-4">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}