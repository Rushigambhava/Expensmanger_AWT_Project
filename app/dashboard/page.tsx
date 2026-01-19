
import prisma from '@/lib/prisma';
import { CreditCard, DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import DashboardCharts from './DashboardCharts';
import Link from 'next/link';

async function getData() {
    try {
        const userId = 1; // Auto-TODO: Dynamic User ID

        // 1. Total Summary
        const expensesSum = await prisma.expense.aggregate({
            _sum: { Amount: true },
            where: { UserID: userId }
        });

        const incomesSum = await prisma.income.aggregate({
            _sum: { Amount: true },
            where: { UserID: userId }
        });

        const totalExpense = Number(expensesSum._sum.Amount) || 0;
        const totalIncome = Number(incomesSum._sum.Amount) || 0;
        const balance = totalIncome - totalExpense;


        // 2. Recent Incomes (Last 5)
        const recentIncomes = await prisma.income.findMany({
            where: { UserID: userId },
            orderBy: { IncomeDate: 'desc' },
            take: 5,
            include: {
                category: true
            }
        });

        // 3. Chart Data (Last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1); // Start of that month

        const expenses = await prisma.expense.findMany({
            where: {
                UserID: userId,
                ExpenseDate: { gte: sixMonthsAgo }
            },
            select: { Amount: true, ExpenseDate: true }
        });

        const incomes = await prisma.income.findMany({
            where: {
                UserID: userId,
                IncomeDate: { gte: sixMonthsAgo }
            },
            select: { Amount: true, IncomeDate: true }
        });

        // Process data for charts
        const chartDataMap = new Map<string, { income: number; expense: number }>();

        // Initialize last 6 months
        for (let i = 0; i < 6; i++) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = d.toLocaleString('default', { month: 'short' }); // e.g., "Jan"
            // Note: using unshift logic later or just reverse the map keys if needed. 
            // Ideally we want chronological order.
        }

        // Let's create an array of keys in chronological order
        const monthKeys: string[] = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = d.toLocaleString('default', { month: 'short' });
            monthKeys.push(key);
            chartDataMap.set(key, { income: 0, expense: 0 });
        }

        expenses.forEach(e => {
            const key = new Date(e.ExpenseDate).toLocaleString('default', { month: 'short' });
            if (chartDataMap.has(key)) {
                chartDataMap.get(key)!.expense += Number(e.Amount);
            }
        });

        incomes.forEach(i => {
            const key = new Date(i.IncomeDate).toLocaleString('default', { month: 'short' });
            if (chartDataMap.has(key)) {
                chartDataMap.get(key)!.income += Number(i.Amount);
            }
        });

        const chartData = monthKeys.map(key => ({
            name: key,
            income: chartDataMap.get(key)!.income,
            expense: chartDataMap.get(key)!.expense
        }));


        return { totalExpense, totalIncome, balance, recentIncomes, chartData };
    } catch (error) {
        console.error("Dashboard Data Error:", error);
        return {
            totalExpense: 0,
            totalIncome: 0,
            balance: 0,
            recentIncomes: [],
            chartData: []
        };
    }
}

export default async function DashboardPage() {
    const { totalExpense, totalIncome, balance, recentIncomes, chartData } = await getData();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
                <p className="text-slate-500 mt-2">Welcome back to your financial overview.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Income</p>
                        <h3 className="text-2xl font-bold text-slate-800">${totalIncome.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-full text-red-600">
                        <TrendingDown className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Expense</p>
                        <h3 className="text-2xl font-bold text-slate-800">${totalExpense.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Balance</p>
                        <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-slate-800' : 'text-red-600'}`}>
                            ${balance.toLocaleString()}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div>
                <DashboardCharts data={chartData} />
            </div>

            {/* Recent Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Recent Incomes</h3>
                    <Link href="/dashboard/incomes" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
                        View All <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Description</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentIncomes.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-400">
                                        No recent incomes.
                                    </td>
                                </tr>
                            ) : (
                                recentIncomes.map((income) => (
                                    <tr key={income.IncomeID} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-slate-600 text-sm">
                                            {new Date(income.IncomeDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-medium text-slate-800 text-sm">
                                            {income.Description}
                                        </td>
                                        <td className="p-4 text-sm">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                {income.category?.CategoryName || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-green-600 text-sm">
                                            +${Number(income.Amount).toFixed(2)}
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
