'use client'

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteCategory } from './actions';
import { useTransition } from 'react';

export default function CategoryCardActions({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this category? CAUTION: This might affect linked expenses/incomes.')) {
            startTransition(async () => {
                await deleteCategory(id);
            });
        }
    };

    return (
        <div className="flex items-center space-x-1 pl-4 border-l border-slate-50 ml-4">
            <Link href={`/dashboard/categories/${id}/edit`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" aria-label="Edit Category">
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
                aria-label="Delete Category"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
