"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import { login } from "@/app/server/login/actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-background to-pink-50 dark:from-slate-950 dark:via-background dark:to-background flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-xl p-8 space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-brand-700 to-pink-600 dark:from-brand-900 dark:via-brand-400 dark:to-brand-500">
            Sign In
          </h1>
          <p className="text-muted-foreground">
            Welcome back to Stylist
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              defaultValue="admin@example.com"
              className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 focus:border-transparent transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 focus:border-transparent transition-all placeholder:text-muted-foreground"
            />
          </div>

          <Button
            type="submit"
            isDisabled={pending}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg h-12 hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer text */}
        <p className="text-center text-sm text-muted-foreground">
          No credit card required. Start creating instantly.
        </p>
      </div>
    </div>
  );
}
