import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Folder, Plus } from 'lucide-react';
import ProjectCardActions from './ProjectCardActions';

async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            where: {
                // UserID: 1
            },
            orderBy: {
                ProjectName: 'asc'
            }
        });
        return projects;
    } catch (error) {
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Projects</h2>
                    <p className="text-slate-500 mt-1">Track expenses by project.</p>
                </div>
                <Link
                    href="/dashboard/projects/add"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Project</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.ProjectID} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <Folder className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{project.ProjectName}</h3>
                                    <p className="text-sm text-slate-500">{project.Description}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.IsActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                {project.IsActive ? 'Active' : 'Archived'}
                            </span>
                        </div>
                        <ProjectCardActions id={project.ProjectID} />
                    </div>
                ))}
            </div>
        </div>
    );
}
