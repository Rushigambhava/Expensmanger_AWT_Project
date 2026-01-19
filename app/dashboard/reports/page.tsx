import { getCategoryExpenses, getProjectExpenses, getMonthlyStats, getRecentExpenses } from './actions';
import ReportsCharts from './ReportsCharts';

export const metadata = {
    title: 'Financial Reports | Expenso',
    description: 'Detailed financial reports and analytics',
};

export default async function ReportsPage() {
    const categoryData = await getCategoryExpenses();
    const projectData = await getProjectExpenses();
    const monthlyData = await getMonthlyStats();
    const recentExpenses = await getRecentExpenses();

    // Calculate totals for summary cards
    const totalExpenses = categoryData.reduce((acc, curr) => acc + curr.value, 0);
    const totalIncome = monthlyData.reduce((acc, curr) => acc + curr.income, 0);
    const netSavings = totalIncome - totalExpenses;

    const summaryCards = [
        { label: 'Total Income', value: totalIncome, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Total Expenses', value: totalExpenses, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Net Savings', value: netSavings, color: netSavings >= 0 ? 'text-blue-600' : 'text-red-600', bg: netSavings >= 0 ? 'bg-blue-50' : 'bg-red-50' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
                    <p className="text-slate-500">Comprehensive analysis of your income and expenses</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        Export PDF
                    </button>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        Download CSV
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryCards.map((card, index) => (
                    <div key={index} className={`p-6 rounded-2xl border border-slate-100 shadow-sm ${card.bg}`}>
                        <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
                        <p className={`text-2xl font-bold ${card.color}`}>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(card.value)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <ReportsCharts
                categoryData={categoryData}
                projectData={projectData}
                monthlyData={monthlyData}
            />

            {/* Recent Large Transactions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                    <a href="/dashboard/expenses" className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Description</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Project</th>
                                <th className="px-6 py-4 font-semibold">Person</th>
                                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentExpenses.length > 0 ? (
                                recentExpenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(expense.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {expense.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {expense.project || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {expense.person}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-red-600">
                                            -{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expense.amount)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                        No recent transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
