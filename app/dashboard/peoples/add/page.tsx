
import { createPeople } from '../actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddPeoplePage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/peoples" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to People
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Add Person</h2>
                <p className="text-slate-500">Add a new beneficiary or payer.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={createPeople} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Full Name"
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description / Notes</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Additional details..."
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Link
                            href="/dashboard/peoples"
                            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-900 shadow-lg shadow-slate-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Add Person
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
