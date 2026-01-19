import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Layers } from 'lucide-react';
import SubCategoryRowActions from './SubCategoryRowActions';

async function getSubCategories() {
    try {
        const subCategories = await prisma.subCategory.findMany({
            where: {
                UserID: 1 // TODO: Dynamic User ID
            },
            include: {
                category: true
            },
            orderBy: {
                category: {
                    CategoryName: 'asc'
                }
            }
        });
        return subCategories;
    } catch (error) {
        console.error("Failed to fetch subcategories:", error);
        return [];
    }
}

export default async function SubCategoriesPage() {
    const subCategories = await getSubCategories();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">SubCategories</h2>
                    <p className="text-slate-500 mt-1">Manage sub-classifications for your expenses and incomes.</p>
                </div>
                <Link
                    href="/dashboard/subcategories/add"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add SubCategory</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                                <th className="p-4 font-medium">SubCategory Name</th>
                                <th className="p-4 font-medium">Parent Category</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Description</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {subCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400">
                                        No subcategories found.
                                    </td>
                                </tr>
                            ) : (
                                subCategories.map((sub) => (
                                    <tr key={sub.SubCategoryID} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-medium text-slate-800">
                                            <div className="flex items-center space-x-2">
                                                <Layers className="w-4 h-4 text-slate-400" />
                                                <span>{sub.SubCategoryName}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            {sub.category?.CategoryName}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.IsExpense ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                {sub.IsExpense ? 'Expense' : 'Income'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-sm">{sub.Description || '-'}</td>
                                        <td className="p-4 text-right">
                                            <SubCategoryRowActions id={sub.SubCategoryID} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
