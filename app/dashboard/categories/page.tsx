import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Layers, Plus } from 'lucide-react';
import CategoryCardActions from './CategoryCardActions';

async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            where: {
                // UserID: 1 
            },
            orderBy: {
                CategoryName: 'asc'
            }
        });
        return categories;
    } catch (error) {
        return [];
    }
}

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Categories</h2>
                    <p className="text-slate-500 mt-1">Manage expense and income categories.</p>
                </div>
                <Link
                    href="/dashboard/categories/add"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Category</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div key={cat.CategoryID} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-lg ${cat.IsExpense ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                                <Layers className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{cat.CategoryName}</h3>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                    {cat.IsExpense ? 'Expense' : 'Income'}
                                </p>
                            </div>
                        </div>
                        <CategoryCardActions id={cat.CategoryID} />
                    </div>
                ))}
            </div>
        </div>
    );
}
