
import prisma from '@/lib/prisma';
import { updateProject } from '../../actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProject(id: number) {
    const project = await prisma.project.findUnique({
        where: { ProjectID: id }
    });
    return project;
}

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const projectId = parseInt(params.id);
    if (isNaN(projectId)) {
        return notFound();
    }

    const project = await getProject(projectId);

    if (!project) {
        return notFound();
    }

    const updateAction = updateProject.bind(null, project.ProjectID);

    // Format dates for date input (YYYY-MM-DD)
    const startDateStr = project.ProjectStartDate
        ? new Date(project.ProjectStartDate).toISOString().split('T')[0]
        : '';
    const endDateStr = project.ProjectEndDate
        ? new Date(project.ProjectEndDate).toISOString().split('T')[0]
        : '';

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/projects" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Edit Project</h2>
                <p className="text-slate-500">Update project details.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={updateAction} className="space-y-6">

                    {/* Project Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={project.ProjectName}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Home Renovation, Europe Trip"
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                defaultValue={startDateStr}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                defaultValue={endDateStr}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={project.Description || ''}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Brief details about the project"
                        ></textarea>
                    </div>

                    {/* Is Active Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="isActive"
                            name="isActive"
                            type="checkbox"
                            defaultChecked={project.IsActive ?? true}
                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-slate-900">
                            Is Active
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Link
                            href="/dashboard/projects"
                            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Update Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
