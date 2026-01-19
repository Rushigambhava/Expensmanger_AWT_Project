import prisma from '@/lib/prisma';
import { updateSubCategory } from '../../actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

async function getSubCategory(id: number) {
    const subCategory = await prisma.subCategory.findUnique({
        where: { SubCategoryID: id }
    });
    return subCategory;
}

export default async function EditSubCategoryPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const subCategoryId = parseInt(params.id);
    if (isNaN(subCategoryId)) {
        return notFound();
    }

    const [categories, subCategory] = await Promise.all([
        getCategories(),
        getSubCategory(subCategoryId)
    ]);

    if (!subCategory) {
        return notFound();
    }

    const updateAction = updateSubCategory.bind(null, subCategory.SubCategoryID);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/subcategories" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to SubCategories
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Edit SubCategory</h2>
                <p className="text-slate-500">Update sub-classification details.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={updateAction} className="space-y-6">

                    {/* Parent Category */}
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 mb-1">Parent Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            defaultValue={subCategory.CategoryID}
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
                            Changing category will update the Type (Expense/Income) accordingly.
                        </p>
                    </div>

                    {/* SubCategory Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">SubCategory Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={subCategory.SubCategoryName}
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
                            defaultValue={subCategory.Description || ''}
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
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Update SubCategory
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
