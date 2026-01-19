'use server'

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createExpense(formData: FormData) {
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
        await prisma.expense.create({
            data: {
                Amount: Number(amount),
                ExpenseDate: new Date(date as string),
                CategoryID: categoryId ? Number(categoryId) : null,
                SubCategoryID: subCategoryId ? Number(subCategoryId) : null,
                PeopleID: Number(peopleId),
                ProjectID: projectId ? Number(projectId) : null,
                Description: description as string,
                UserID: userId
            }
        });

    } catch (error) {
        console.error("Failed to create expense:", error);
        throw new Error('Failed to create expense');
    }

    redirect('/dashboard/expenses');
}

export async function deleteExpense(expenseId: number) {
    try {
        await prisma.expense.delete({
            where: {
                ExpenseID: expenseId
            }
        });
    } catch (error) {
        console.error("Failed to delete expense:", error);
        throw new Error('Failed to delete expense');
    }

    redirect('/dashboard/expenses');
}

export async function updateExpense(expenseId: number, formData: FormData) {
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
        await prisma.expense.update({
            where: {
                ExpenseID: expenseId
            },
            data: {
                Amount: Number(amount),
                ExpenseDate: new Date(date as string),
                CategoryID: categoryId ? Number(categoryId) : null,
                SubCategoryID: subCategoryId ? Number(subCategoryId) : null,
                PeopleID: Number(peopleId),
                ProjectID: projectId ? Number(projectId) : null,
                Description: description as string,
            }
        });

    } catch (error) {
        console.error("Failed to update expense:", error);
        throw new Error('Failed to update expense');
    }

    redirect('/dashboard/expenses');
}
