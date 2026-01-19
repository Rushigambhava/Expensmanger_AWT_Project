'use server'

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');

    const userId = 1; // Hardcoded

    if (!name) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.project.create({
            data: {
                ProjectName: name as string,
                Description: description as string,
                ProjectStartDate: startDate ? new Date(startDate as string) : null,
                ProjectEndDate: endDate ? new Date(endDate as string) : null,
                UserID: userId,
                IsActive: true
            }
        });
    } catch (error) {
        console.error("Failed to create project:", error);
        throw new Error('Failed to create project');
    }

    redirect('/dashboard/projects');
}

export async function updateProject(id: number, formData: FormData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const isActive = formData.get('isActive') === 'on';

    if (!name) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.project.update({
            where: { ProjectID: id },
            data: {
                ProjectName: name as string,
                Description: description as string,
                ProjectStartDate: startDate ? new Date(startDate as string) : null,
                ProjectEndDate: endDate ? new Date(endDate as string) : null,
                IsActive: isActive
            }
        });
    } catch (error) {
        console.error("Failed to update project:", error);
        throw new Error('Failed to update project');
    }

    redirect('/dashboard/projects');
}

export async function deleteProject(id: number) {
    try {
        await prisma.project.delete({
            where: { ProjectID: id }
        });
    } catch (error) {
        console.error("Failed to delete project:", error);
        throw new Error('Failed to delete project');
    }

    redirect('/dashboard/projects');
}
