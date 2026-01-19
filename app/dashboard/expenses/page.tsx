import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Calendar, User } from 'lucide-react';


import ExpenseRowActions from './ExpenseRowActions';

async function getExpenses() {
    try {
        const expenses = await prisma.expense.findMany({
            where: {
                UserID: 1 // TODO: Dynamic UserID
            },
            include: {
                category: true,
                subCategory: true,
                people: true,
                project: true
            },
            orderBy: {
                ExpenseDate: 'desc'
            }
        });
        return expenses;
    } catch (error) {
        console.error("Failed tofetch expenses:", error);
        return [];
    }
}

export default async function ExpensesPage() {
    const expenses = await getExpenses();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Expenses</h2>
                    <p className="text-slate-500 mt-1">Manage and track your daily spending.</p>
                </div>
                <Link
                    href="/dashboard/expenses/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Expense</span>
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
                                <th className="p-4 font-medium">People</th>
                                <th className="p-4 font-medium">Project</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {expenses.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-400">
                                        No expenses found. Start by adding one!
                                    </td>
                                </tr>
                            ) : (
                                expenses.map((expense) => (
                                    <tr key={expense.ExpenseID} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-slate-600">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                <span>{new Date(expense.ExpenseDate).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-slate-800">{expense.Description}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                {expense.category?.CategoryName || 'Uncategorized'}
                                            </span>
                                            {expense.subCategory && (
                                                <div className="text-xs text-slate-500 mt-1 pl-1">
                                                    ↳ {expense.subCategory.SubCategoryName}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <span>{expense.people?.PeopleName || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600">{expense.project?.ProjectName || '-'}</td>
                                        <td className="p-4 text-right font-bold text-slate-800">
                                            ${Number(expense.Amount).toFixed(2)}
                                        </td>
                                        <td className="p-4 text-right">
                                            <ExpenseRowActions expenseId={expense.ExpenseID} />
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
