
import prisma from '@/lib/prisma';
import { updateCategory } from '../../actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getCategory(id: number) {
    const category = await prisma.category.findUnique({
        where: { CategoryID: id }
    });
    return category;
}

export default async function EditCategoryPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const categoryId = parseInt(params.id);
    if (isNaN(categoryId)) {
        return notFound();
    }

    const category = await getCategory(categoryId);

    if (!category) {
        return notFound();
    }

    const updateAction = updateCategory.bind(null, category.CategoryID);

    // Determine type radio initial state
    // A category can be both, but simplifying to one for radio UX or checking both checks if applicable. 
    // Assuming mutually exclusive primary use case in UI for now, but respecting data.
    // If both are true, default to Expense for radio, but maybe show checkboxes?
    // The create form used radios. Let's stick to radios for simplicity if that matches typical logic, 
    // OR create checkboxes to allow both. 
    // Looking at schema: IsExpense Boolean, IsIncome Boolean.
    // Let's use checkboxes to allow a category to be both if desired (e.g. "Refunds").
    // Re-reading create form: I implemented radios. Let's stick to radios there for "Primary Type" 
    // but here let's actually just set the one that is true. 
    // Since create form forces one, user likely picks one.

    const typeValue = category.IsIncome ? 'income' : 'expense';

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/categories" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Categories
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Edit Category</h2>
                <p className="text-slate-500">Update category details.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={updateAction} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Category Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={category.CategoryName}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Food, Salary"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <span className="block text-sm font-medium text-slate-700 mb-2">Type</span>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="type"
                                    value="expense"
                                    defaultChecked={category.IsExpense}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-slate-700">Expense</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="type"
                                    value="income"
                                    defaultChecked={category.IsIncome && !category.IsExpense}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
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
                            defaultValue={category.Description || ''}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Optional description"
                        ></textarea>
                    </div>

                    {/* Is Active Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="isActive"
                            name="isActive"
                            type="checkbox"
                            defaultChecked={category.IsActive ?? true}
                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-slate-900">
                            Is Active
                        </label>
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
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
