"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 dark:bg-black text-gray-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">✨</span>
              </div>
              <span className="font-bold text-white text-lg">Stylist</span>
            </div>
            <p className="text-sm leading-relaxed">
              Transform how you shop for clothes with AI-powered virtual try-ons.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Stylist. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              <Link
                href="#"
                aria-label="Twitter"
                className="text-gray-500 hover:text-pink-400 transition-colors text-lg"
              >
                𝕏
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-gray-500 hover:text-pink-400 transition-colors text-lg"
              >
                📷
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-pink-400 transition-colors text-lg"
              >
                💼
              </Link>
              <Link
                href="#"
                aria-label="TikTok"
                className="text-gray-500 hover:text-pink-400 transition-colors text-lg"
              >
                🎵
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
