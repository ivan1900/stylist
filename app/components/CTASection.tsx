"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-indigo-900 via-indigo-800 to-pink-600 dark:from-slate-900 dark:via-slate-800 dark:to-pink-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
          Ready to Transform Your Fashion Game?
        </h2>

        <p className="text-xl md:text-2xl text-indigo-50 max-w-2xl mx-auto leading-relaxed">
          Join thousands of fashion enthusiasts who are already discovering their perfect look with Stylist.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <Link href="/dashboard">
            <Button
              className="w-full md:w-auto bg-white text-indigo-900 font-bold text-lg px-8 hover:shadow-2xl transition-all hover:scale-105"
            >
              Get Started Free
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full md:w-auto text-white font-bold text-lg px-8 hover:bg-white/10 transition-colors"
          >
            Watch Demo
          </Button>
        </div>

        <p className="text-indigo-100 text-sm pt-4">
          No credit card required. No account setup needed. Start creating instantly.
        </p>
      </div>
    </section>
  );
}
