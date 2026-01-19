'use server'

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createSubCategory(formData: FormData) {
    const name = formData.get('name');
    const categoryId = formData.get('categoryId');
    const description = formData.get('description');

    const userId = 1; // Hardcoded

    if (!name || !categoryId) {
        throw new Error("Missing required fields");
    }

    // Fetch parent category to inherit type flags
    const parentCategory = await prisma.category.findUnique({
        where: { CategoryID: Number(categoryId) }
    });

    if (!parentCategory) {
        throw new Error("Invalid Category");
    }

    try {
        await prisma.subCategory.create({
            data: {
                SubCategoryName: name as string,
                CategoryID: Number(categoryId),
                IsExpense: parentCategory.IsExpense,
                IsIncome: parentCategory.IsIncome,
                Description: description as string,
                UserID: userId
            }
        });
    } catch (error) {
        console.error("Failed to create subcategory:", error);
        throw new Error('Failed to create subcategory');
    }

    redirect('/dashboard/subcategories');
}

export async function updateSubCategory(id: number, formData: FormData) {
    const name = formData.get('name');
    const categoryId = formData.get('categoryId');
    const description = formData.get('description');

    if (!name || !categoryId) {
        throw new Error("Missing required fields");
    }

    const parentCategory = await prisma.category.findUnique({
        where: { CategoryID: Number(categoryId) }
    });

    if (!parentCategory) {
        throw new Error("Invalid Category");
    }

    try {
        await prisma.subCategory.update({
            where: { SubCategoryID: id },
            data: {
                SubCategoryName: name as string,
                CategoryID: Number(categoryId),
                IsExpense: parentCategory.IsExpense,
                IsIncome: parentCategory.IsIncome,
                Description: description as string,
            }
        });
    } catch (error) {
        console.error("Failed to update subcategory:", error);
        throw new Error('Failed to update subcategory');
    }

    redirect('/dashboard/subcategories');
}

export async function deleteSubCategory(id: number) {
    try {
        await prisma.subCategory.delete({
            where: { SubCategoryID: id }
        });
    } catch (error) {
        console.error("Failed to delete subcategory:", error);
        throw new Error('Failed to delete subcategory');
    }

    redirect('/dashboard/subcategories');
}
