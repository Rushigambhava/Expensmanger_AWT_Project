import Link from 'next/link';
import { Home, CreditCard, DollarSign, Users, Folder, Layers, PieChart, Settings, LogOut, ListTree } from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Expenses', icon: CreditCard, href: '/dashboard/expenses' },
    { name: 'Incomes', icon: DollarSign, href: '/dashboard/incomes' },
    { name: 'Projects', icon: Folder, href: '/dashboard/projects' },
    { name: 'People', icon: Users, href: '/dashboard/peoples' },
    { name: 'Categories', icon: Layers, href: '/dashboard/categories' },
    { name: 'SubCategories', icon: ListTree, href: '/dashboard/subcategories' },
    { name: 'Reports', icon: PieChart, href: '/dashboard/reports' },
];

export default function Sidebar() {
    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Expenso
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 group"
                    >
                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        <span className="font-medium text-slate-300 group-hover:text-white">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
