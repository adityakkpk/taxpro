"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/src/app/components/ui/button";
import { Menu, X, Calculator, CircleUser } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
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
            <Link
              href="/services"
              className="text-gray-700 hover:text-blue-600"
            >
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
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center focus:outline-none"
                >
                  {session.user.image ? (
                    <img
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
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
              <div className="flex">
                <Link href="/auth/signin">
                  <Button variant="default" className="ml-4">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="default" className="ml-4">
                    Sign Up
                  </Button>
                </Link>
              </div>
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
              <>
                <Link
                  href="/auth/signin"
                  className="block"
                  onClick={toggleMenu}
                >
                  <Button variant="default" className="w-full mt-4">
                    Log In
                  </Button>
                </Link>
                <Link
                  href="/auth/signup"
                  className="block"
                  onClick={toggleMenu}
                >
                  <Button variant="default" className="w-full mt-4">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
