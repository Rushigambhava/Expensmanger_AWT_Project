import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Calendar, User } from 'lucide-react';
import IncomeRowActions from './IncomeRowActions';

async function getIncomes() {
    try {
        const incomes = await prisma.income.findMany({
            where: {
                UserID: 1 // TODO: Dynamic User ID
            },
            include: {
                category: true,
                subCategory: true,
                people: true,
                project: true
            },
            orderBy: {
                IncomeDate: 'desc'
            }
        });
        return incomes;
    } catch (error) {
        console.error("Failed to fetch incomes:", error);
        return [];
    }
}

export default async function IncomesPage() {
    const incomes = await getIncomes();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Incomes</h2>
                    <p className="text-slate-500 mt-1">Track your earnings and revenue.</p>
                </div>
                <Link
                    href="/dashboard/incomes/add"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Income</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Description</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">From</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {incomes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400">
                                        No incomes found.
                                    </td>
                                </tr>
                            ) : (
                                incomes.map((income) => (
                                    <tr key={income.IncomeID} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-slate-600">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                <span>{new Date(income.IncomeDate).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-slate-800">{income.Description}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {income.category?.CategoryName || 'Uncategorized'}
                                            </span>
                                            {income.subCategory && (
                                                <div className="text-xs text-slate-500 mt-1 pl-1">
                                                    ↳ {income.subCategory.SubCategoryName}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <span>{income.people?.PeopleName || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right font-bold text-green-600">
                                            +${Number(income.Amount).toFixed(2)}
                                        </td>
                                        <td className="p-4 text-right">
                                            <IncomeRowActions incomeId={income.IncomeID} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
