"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Try Now", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-pink-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">✨</span>
            </div>
            <Link href="/" className="font-bold text-xl text-indigo-900 dark:text-white">
              Stylist
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors font-medium"
            >
              How It Works
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-indigo-600 dark:text-pink-400 font-medium"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-shadow"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-indigo-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-3 space-y-2">
              <Link href="/login" className="block w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-indigo-600 dark:text-pink-400 font-medium"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/login" className="block w-full">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
