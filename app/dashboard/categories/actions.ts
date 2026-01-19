'use server'

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createCategory(formData: FormData) {
    const name = formData.get('name');
    const type = formData.get('type'); // 'expense' or 'income'
    const description = formData.get('description');

    const userId = 1; // Hardcoded

    if (!name || !type) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.category.create({
            data: {
                CategoryName: name as string,
                IsExpense: type === 'expense',
                IsIncome: type === 'income',
                Description: description as string,
                UserID: userId,
                IsActive: true
            }
        });
    } catch (error) {
        console.error("Failed to create category:", error);
        throw new Error('Failed to create category');
    }

    redirect('/dashboard/categories');
}

export async function updateCategory(id: number, formData: FormData) {
    const name = formData.get('name');
    const type = formData.get('type');
    const description = formData.get('description');
    const isActive = formData.get('isActive') === 'on';

    if (!name || !type) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.category.update({
            where: { CategoryID: id },
            data: {
                CategoryName: name as string,
                IsExpense: type === 'expense',
                IsIncome: type === 'income',
                Description: description as string,
                IsActive: isActive
            }
        });
    } catch (error) {
        console.error("Failed to update category:", error);
        throw new Error('Failed to update category');
    }

    redirect('/dashboard/categories');
}

export async function deleteCategory(id: number) {
    try {
        await prisma.category.delete({
            where: { CategoryID: id }
        });
    } catch (error) {
        console.error("Failed to delete category:", error);
        throw new Error('Failed to delete category');
    }

    redirect('/dashboard/categories');
}
