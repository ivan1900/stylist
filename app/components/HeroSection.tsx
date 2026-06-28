'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 pt-20 pb-16 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Left Content */}
        <div className='space-y-6 md:space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-700 to-pink-600 dark:from-white dark:via-pink-300 dark:to-pink-400 leading-tight'>
              See How Clothes Look On You
            </h1>
            <p className='text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-md'>
              Upload your photo, choose any outfit, and instantly see how they
              look on you—no guessing, no returns, no hassle.
            </p>
          </div>

          <div className='space-y-3 text-gray-600 dark:text-gray-400'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>✨</span>
              <span className='text-lg'>
                Transform your fashion decisions in seconds
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>🛍️</span>
              <span className='text-lg'>
                Try unlimited combinations instantly
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>🔒</span>
              <span className='text-lg'>
                Your photos stay completely private
              </span>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-4 pt-4'>
            <Link href='/dashboard'>
              <Button className='w-full md:w-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg px-8 hover:shadow-2xl transition-all hover:scale-105'>
                Try Now - It's Free
              </Button>
            </Link>
            <Button
              variant='outline'
              className='w-full md:w-auto border-indigo-600 dark:border-pink-400 text-indigo-600 dark:text-pink-400 font-bold text-lg px-8 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors'>
              Learn More
            </Button>
          </div>

          <p className='text-sm text-gray-500 dark:text-gray-400 pt-4'>
            No credit card required. Start creating instantly.
          </p>
        </div>

        {/* Right Hero Image */}
        <div className='hidden md:block relative h-96 md:h-full'>
          <div className='absolute inset-0 rounded-3xl overflow-hidden shadow-2xl'>
            <Image
              src='https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop'
              alt='Woman trying on virtual clothes'
              fill
              sizes='(max-width: 768px) 0px, 50vw'
              className='object-cover'
              priority
            />
          </div>

          {/* Decorative gradient overlay */}
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-t from-pink-500/30 to-transparent pointer-events-none' />

          {/* Decorative elements */}
          <div className='absolute -top-6 -right-6 w-32 h-32 bg-amber-300 rounded-full opacity-20 blur-3xl' />
          <div className='absolute -bottom-6 -left-6 w-32 h-32 bg-pink-400 rounded-full opacity-20 blur-3xl' />
        </div>
      </div>
    </section>
  );
}
