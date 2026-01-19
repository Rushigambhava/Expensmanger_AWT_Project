"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        mobileNo: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic here
        console.log("Signup attempt:", formData);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 relative overflow-hidden flex items-center justify-center py-12">
            {/* Decorative background elements matching home page */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-[#5A54F3]/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-lg p-6 relative z-10">
                <div className="mb-8 text-center">
                    <Link href="/" className="text-3xl font-bold text-[#5A54F3] inline-block mb-4">
                        Expenso
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                    <p className="text-slate-600 mt-2">Join us to manage your expenses effectively</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* User Name */}
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                required
                                value={formData.userName}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#5A54F3] focus:ring focus:ring-[#5A54F3]/20 focus:outline-none transition-all bg-slate-50"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#5A54F3] focus:ring focus:ring-[#5A54F3]/20 focus:outline-none transition-all bg-slate-50"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Mobile No */}
                        <div>
                            <label htmlFor="mobileNo" className="block text-sm font-medium text-slate-700 mb-2">
                                Mobile Number
                            </label>
                            <input
                                id="mobileNo"
                                name="mobileNo"
                                type="tel"
                                required
                                value={formData.mobileNo}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#5A54F3] focus:ring focus:ring-[#5A54F3]/20 focus:outline-none transition-all bg-slate-50"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#5A54F3] focus:ring focus:ring-[#5A54F3]/20 focus:outline-none transition-all bg-slate-50"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#5A54F3] focus:ring focus:ring-[#5A54F3]/20 focus:outline-none transition-all bg-slate-50"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#5A54F3] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98] hover:bg-[#4842c3] mt-2"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold text-[#5A54F3] hover:text-[#4842c3] transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
