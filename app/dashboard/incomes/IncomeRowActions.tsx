'use client'

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteIncome } from './actions';
import { useTransition } from 'react';

export default function IncomeRowActions({ incomeId }: { incomeId: number }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this income?')) {
            startTransition(async () => {
                await deleteIncome(incomeId);
            });
        }
    };

    return (
        <div className="flex items-center space-x-2 justify-end">
            <Link href={`/dashboard/incomes/${incomeId}/edit`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" aria-label="Edit Income">
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
                aria-label="Delete Income"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
