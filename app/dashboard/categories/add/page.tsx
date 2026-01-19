
import { createCategory } from '../actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddCategoryPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/categories" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Categories
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Add Category</h2>
                <p className="text-slate-500">Create a new classification for your transactions.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={createCategory} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Category Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Food, Salary, Transport"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <span className="block text-sm font-medium text-slate-700 mb-2">Type</span>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="type" value="expense" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" defaultChecked />
                                <span className="text-slate-700">Expense</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="type" value="income" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                                <span className="text-slate-700">Income</span>
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Optional description"
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Link
                            href="/dashboard/categories"
                            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-900 shadow-lg shadow-slate-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
