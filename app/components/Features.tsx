"use client";

import { Card } from "@heroui/react";

const features = [
  {
    icon: "⚡",
    title: "Instant Results",
    description:
      "Get photorealistic previews in seconds. No waiting, no complicated settings. Just upload and see.",
  },
  {
    icon: "🛍️",
    title: "Unlimited Combinations",
    description:
      "Try as many outfits as you want. Mix and match without limits. Discover new style possibilities.",
  },
  {
    icon: "🔒",
    title: "Your Privacy Matters",
    description:
      "Your photos are encrypted and never shared. We respect your privacy and keep your data secure.",
  },
  {
    icon: "💡",
    title: "Make Confident Choices",
    description:
      "See exactly how clothes look before you buy. Reduce returns and make smarter fashion decisions.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-indigo-900 dark:text-white">
            Why Choose Stylist?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The features that make fashion shopping smarter, faster, and more confident
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-slate-900 border-pink-100 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-500 hover:shadow-xl transition-all group"
            >
              <Card.Content className="p-8 space-y-4">
                {/* Icon */}
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-indigo-900 dark:text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-transparent rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-2xl" />
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
