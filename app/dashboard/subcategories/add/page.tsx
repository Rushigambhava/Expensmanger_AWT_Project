import prisma from '@/lib/prisma';
import { createSubCategory } from '../actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            where: { IsActive: true },
            select: { CategoryID: true, CategoryName: true, IsExpense: true, IsIncome: true },
            orderBy: { CategoryName: 'asc' }
        });
        return categories;
    } catch (error) {
        return [];
    }
}

export default async function AddSubCategoryPage() {
    const categories = await getCategories();

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/subcategories" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to SubCategories
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Add SubCategory</h2>
                <p className="text-slate-500">Create a new sub-classification.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={createSubCategory} className="space-y-6">

                    {/* Parent Category */}
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 mb-1">Parent Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c.CategoryID} value={c.CategoryID}>
                                    {c.CategoryName} ({c.IsExpense ? 'Expense' : 'Income'})
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-1">
                            The subcategory will inherit the Type (Expense/Income) from the parent category.
                        </p>
                    </div>

                    {/* SubCategory Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">SubCategory Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Grocery, Rent, Salary"
                        />
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
                            href="/dashboard/subcategories"
                            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-900 shadow-lg shadow-slate-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Create SubCategory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
