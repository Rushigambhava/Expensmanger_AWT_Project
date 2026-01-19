'use server'

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createIncome(formData: FormData) {
    const amount = formData.get('amount');
    const date = formData.get('date');
    const categoryId = formData.get('categoryId');
    const subCategoryId = formData.get('subCategoryId');
    const peopleId = formData.get('peopleId');
    const projectId = formData.get('projectId');
    const description = formData.get('description');

    // Hardcoded UserID for now
    const userId = 1;

    if (!amount || !date || !peopleId) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.income.create({
            data: {
                Amount: Number(amount),
                IncomeDate: new Date(date as string),
                CategoryID: categoryId ? Number(categoryId) : null,
                SubCategoryID: subCategoryId ? Number(subCategoryId) : null,
                PeopleID: Number(peopleId),
                ProjectID: projectId ? Number(projectId) : null,
                Description: description as string,
                UserID: userId
            }
        });

    } catch (error) {
        console.error("Failed to create income:", error);
        throw new Error('Failed to create income');
    }

    redirect('/dashboard/incomes');
}

export async function deleteIncome(incomeId: number) {
    try {
        await prisma.income.delete({
            where: {
                IncomeID: incomeId
            }
        });
    } catch (error) {
        console.error("Failed to delete income:", error);
        throw new Error('Failed to delete income');
    }

    redirect('/dashboard/incomes');
}

export async function updateIncome(incomeId: number, formData: FormData) {
    const amount = formData.get('amount');
    const date = formData.get('date');
    const categoryId = formData.get('categoryId');
    const subCategoryId = formData.get('subCategoryId');
    const peopleId = formData.get('peopleId');
    const projectId = formData.get('projectId');
    const description = formData.get('description');

    if (!amount || !date || !peopleId) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.income.update({
            where: {
                IncomeID: incomeId
            },
            data: {
                Amount: Number(amount),
                IncomeDate: new Date(date as string),
                CategoryID: categoryId ? Number(categoryId) : null,
                SubCategoryID: subCategoryId ? Number(subCategoryId) : null,
                PeopleID: Number(peopleId),
                ProjectID: projectId ? Number(projectId) : null,
                Description: description as string,
            }
        });

    } catch (error) {
        console.error("Failed to update income:", error);
        throw new Error('Failed to update income');
    }

    redirect('/dashboard/incomes');
}
