"use client";

import { Card } from "@heroui/react";
import Image from "next/image";

const galleryItems = [
  {
    title: "Casual to Elegant",
    before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1556821552-5f63b1016170?w=300&h=400&fit=crop",
  },
  {
    title: "Summer Vibes",
    before: "https://images.unsplash.com/photo-1539571696357-5a69c006ae0d?w=300&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1515562141207-6811bcdd56f3?w=300&h=400&fit=crop",
  },
  {
    title: "Office Ready",
    before: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
  },
  {
    title: "Night Out",
    before: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1595546029834-e3953deac535?w=300&h=400&fit=crop",
  },
  {
    title: "Sporty Chic",
    before: "https://images.unsplash.com/photo-1544568100-847a948585b0?w=300&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1538636525873-d8d8e4ff0f4f?w=300&h=400&fit=crop",
  },
  {
    title: "Minimalist Look",
    before: "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1552062407-c551eeda4d16?w=300&h=400&fit=crop",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-indigo-900 dark:text-white">
            See the Magic in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real transformations from our users trying different outfits
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 border-pink-100 dark:border-slate-700 hover:shadow-xl transition-shadow group"
            >
              <div className="space-y-3 p-0">
                {/* Before Image */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-slate-800">
                  <Image
                    src={item.before}
                    alt={`${item.title} - before`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Before
                  </div>
                </div>

                {/* After Image */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-slate-800">
                  <Image
                    src={item.after}
                    alt={`${item.title} - after`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    After
                  </div>
                </div>

                {/* Title */}
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-bold text-indigo-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
