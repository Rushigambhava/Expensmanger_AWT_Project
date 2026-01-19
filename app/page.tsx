"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      quote: "It was hard to discipline myself in the past. Expenso definitely helped me achieve my savings goals by giving me a clear view of my spending habits.",
      author: "Sarah",
      location: "New York"
    },
    {
      id: 2,
      quote: "I never realized how much all those small subscriptions added up. This app made it so easy to cut unnecessary costs and save for my vacation.",
      author: "Mark",
      location: "London"
    },
    {
      id: 3,
      quote: "The visual breakdown of my expenses is exactly what I needed. I can finally see where every dollar goes. Highly recommend it for everyone!",
      author: "Emily",
      location: "Toronto"
    },
    {
      id: 4,
      quote: "Managing finances was always a headache for me until I found Expenso. The recurring transactions feature saves me so much time.",
      author: "David",
      location: "Austin"
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth; // Scroll by one view width

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 ring-1 ring-slate-900/10 rounded-2xl md:rounded-full mt-4 bg-white/50 backdrop-blur-md sticky top-4 z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold text-[#5A54F3]">
            Expenso
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/" className="hover:text-[#5A54F3] transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-[#5A54F3] transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="hover:text-[#5A54F3] transition-colors">
            About Us
          </Link>
        </div>
        <Link
          href="/login"
          className="rounded-full bg-[#5A54F3] px-6 py-2.5 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto mt-8 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#5A54F3] px-6 py-24 text-center text-white shadow-2xl sm:px-16 md:py-32">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
              Take control of your <br className="hidden sm:block" />
              finances with ease
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg text-blue-100 sm:text-xl">
              Track your spending, set budgets, and achieve your financial goals effectively with Expenso.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full bg-white px-8 py-4 font-bold text-[#5A54F3] transition-transform hover:bg-gray-50 hover:scale-105 active:scale-95"
              >
                Get Started Now
              </Link>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#5A54F3] mb-3">
            How It Works
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What you can do with Expenso
          </h3>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-48 w-full items-center justify-center rounded-3xl bg-purple-50 p-6">
              <svg className="h-full w-full drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#E0C3FC" opacity="0.5" />
                <rect x="50" y="60" width="100" height="80" rx="4" fill="white" stroke="#5A54F3" strokeWidth="3" />
                <path d="M60 110 L80 90 L100 110 L120 70 L140 100" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="150" cy="150" r="20" fill="#FFD93D" />
                <path d="M50 160 H150" stroke="#5A54F3" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="mb-3 text-xl font-bold text-slate-900">Track your Expenses</h4>
            <p className="text-slate-600">
              Keep a close eye on where your money goes and build better spending habits.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-48 w-full items-center justify-center rounded-3xl bg-purple-50 p-6">
              <svg className="h-full w-full drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#E0C3FC" opacity="0.5" />
                <path d="M60 140 C60 140 70 80 100 80 C130 80 140 140 140 140" stroke="#5A54F3" strokeWidth="3" fill="white" />
                <circle cx="100" cy="60" r="15" fill="#5A54F3" />
                <rect x="85" y="110" width="30" height="40" fill="#FFD93D" stroke="#333" strokeWidth="2" />
                <path d="M130 140 H160 V100 H130 Z" fill="#4ECDC4" stroke="#333" strokeWidth="2" />
                <path d="M40 140 H70 V120 H40 Z" fill="#FF6B6B" stroke="#333" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="mb-3 text-xl font-bold text-slate-900">Accomplish your goals</h4>
            <p className="text-slate-600">
              Set realistic financial targets and track your progress towards them.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-48 w-full items-center justify-center rounded-3xl bg-purple-50 p-6">
              <svg className="h-full w-full drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#E0C3FC" opacity="0.5" />
                <rect x="60" y="60" width="80" height="50" rx="4" fill="white" stroke="#5A54F3" strokeWidth="3" />
                <path d="M60 75 H140" stroke="#5A54F3" strokeWidth="2" />
                <circle cx="100" cy="130" r="25" fill="#4ECDC4" />
                <path d="M90 130 L98 138 L115 120" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="mb-3 text-xl font-bold text-slate-900">Gain Insights</h4>
            <p className="text-slate-600">
              Visualize your financial health with detailed reports and analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#EBEAFF] py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#5A54F3]">
            What They Say
          </h2>
          <h3 className="mb-12 text-3xl font-bold text-slate-900">
            What our customers say about us?
          </h3>

          <div className="relative">
            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[85vw] md:min-w-[600px] snap-center rounded-3xl bg-white p-8 md:p-12 shadow-xl flex-shrink-0 flex flex-col items-center justify-center text-center mx-auto"
                >
                  <div className="text-6xl text-[#5A54F3] opacity-40 mb-6 leading-none font-serif">
                    &ldquo;
                  </div>
                  <p className="mb-8 text-lg md:text-xl font-medium leading-relaxed text-slate-700 max-w-prose break-words">
                    {item.quote}
                  </p>
                  <div className="font-bold text-slate-900">- {item.author} from {item.location}</div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => scroll("left")}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5A54F3] text-white transition-colors hover:bg-blue-700 shadow-md"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5A54F3] text-white transition-colors hover:bg-blue-700 shadow-md"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2.5rem] bg-[#A5A2F6] px-6 py-16 text-center text-white md:bg-[#B8B6FF]">
          <h2 className="mx-auto mb-8 max-w-2xl text-3xl font-bold md:text-5xl">
            Join our mission to empower everyone to save
          </h2>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-xl bg-black px-6 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              <span>Get Started</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Expenso. All rights reserved.
      </footer>
    </div>
  );
}
