"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login attempt:", { email, password });
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 relative overflow-hidden flex items-center justify-center">
            {/* Decorative background elements matching home page */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-[#5A54F3]/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="mb-8 text-center">
                    <Link href="/" className="text-3xl font-bold text-[#5A54F3] inline-block mb-4">
                        Expenso
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-600 mt-2">Sign in to continue to your dashboard</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#5A54F3] focus:ring focus:ring-[#5A54F3]/20 focus:outline-none transition-all bg-slate-50"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-[#5A54F3] hover:text-[#4842c3]"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#5A54F3] focus:ring focus:ring-[#5A54F3]/20 focus:outline-none transition-all bg-slate-50"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#5A54F3] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98] hover:bg-[#4842c3]"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                            <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M13.653 1.333C13.653 1.333 13.653 1.333 13.653 1.333C13.911 1.258 14.226 1.488 14.288 1.77C14.288 1.77 14.288 1.77 14.288 1.77C14.288 1.77 14.288 1.77 14.288 1.77C14.498 2.723 14.625 3.755 14.625 4.832C14.625 10.867 10.239 15.932 4.496 17.514C4.496 17.514 4.496 17.514 4.496 17.514C4.195 17.597 3.901 17.377 3.864 17.067C3.864 17.067 3.864 17.067 3.864 17.067C3.864 17.067 3.864 17.067 3.864 17.067C3.993 16.155 4.092 15.19 4.092 14.175C4.092 8.14 8.477 3.076 14.221 1.493C14.221 1.493 14.221 1.493 14.221 1.493C14.221 1.493 14.221 1.493 14.221 1.493Z" />
                                <path d="M7.788 0.698C7.788 0.698 7.788 0.698 7.788 0.698C8.038 0.589 8.32 0.768 8.406 1.03C8.406 1.03 8.406 1.03 8.406 1.03C8.406 1.03 8.406 1.03 8.406 1.03C8.832 2.33 9.07 3.744 9.07 5.215C9.07 13.085 2.651 19.466 2.651 19.466C2.651 19.466 2.651 19.466 2.651 19.466C2.478 19.645 2.184 19.61 2.053 19.393C2.053 19.393 2.053 19.393 2.053 19.393C2.053 19.393 2.053 19.393 2.053 19.393C1.696 18.799 1.402 18.158 1.183 17.476C1.183 17.476 1.183 17.476 1.183 17.476C5.074 13.254 7.632 7.794 7.788 1.838C7.788 1.838 7.788 1.838 7.788 1.838Z" />
                                <path d="M18.846 6.004C18.846 6.004 18.846 6.004 18.846 6.004C19.062 6.136 19.141 6.42 19.019 6.638C19.019 6.638 19.019 6.638 19.019 6.638C19.019 6.638 19.019 6.638 19.019 6.638C18.599 7.391 18.113 8.09 17.57 8.729C17.57 8.729 17.57 8.729 17.57 8.729C13.447 13.578 7.323 16.65 0.536 16.65C0.297 16.65 0.059 16.647 0.536 16.65C0.323 16.65 0.15 16.477 0.15 16.264C0.15 16.264 0.15 16.264 0.15 16.264C0.15 16.264 0.15 16.264 0.15 16.264C0.15 16.264 0.15 16.264 0.15 16.264C0.15 10.609 3.018 5.437 7.55 2.144C7.55 2.144 7.55 2.144 7.55 2.144C11.516 -0.738 16.619 1.954 18.846 6.004Z" />
                            </svg>
                            Apple
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-bold text-[#5A54F3] hover:text-[#4842c3] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
