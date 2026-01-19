'use client'

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteProject } from './actions';
import { useTransition } from 'react';

export default function ProjectCardActions({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project?')) {
            startTransition(async () => {
                await deleteProject(id);
            });
        }
    };

    return (
        <div className="flex items-center space-x-1 mt-4 pt-4 border-t border-slate-50 justify-end">
            <Link href={`/dashboard/projects/${id}/edit`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" aria-label="Edit Project">
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
                aria-label="Delete Project"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
