"use client";

import { Card } from "@heroui/react";

const steps = [
  {
    icon: "📸",
    number: "1",
    title: "Upload Your Photo",
    description:
      "Take a selfie or upload an existing photo of yourself. We support all common image formats.",
  },
  {
    icon: "👕",
    number: "2",
    title: "Choose Your Outfit",
    description:
      "Browse and select from any clothing images. Mix and match different styles, colors, and pieces.",
  },
  {
    icon: "✨",
    number: "3",
    title: "See Instant Results",
    description:
      "Get a photorealistic preview of how the clothes look on you in seconds. No photoshop skills needed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-indigo-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three simple steps to transform how you shop for clothes
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Card */}
              <Card className="bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 border-2 border-pink-100 dark:border-slate-700 hover:shadow-lg transition-shadow h-full">
                <Card.Content className="p-8 space-y-4">
                  {/* Step Number Badge */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="text-6xl">{step.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-indigo-900 dark:text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </Card.Content>
              </Card>

              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-pink-400 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
