'use client'

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteSubCategory } from './actions';
import { useTransition } from 'react';

export default function SubCategoryRowActions({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            startTransition(async () => {
                await deleteSubCategory(id);
            });
        }
    };

    return (
        <div className="flex items-center space-x-2 justify-end">
            <Link href={`/dashboard/subcategories/${id}/edit`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" aria-label="Edit Subcategory">
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
                aria-label="Delete Subcategory"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
