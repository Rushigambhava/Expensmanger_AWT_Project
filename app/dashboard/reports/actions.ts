'use server'

import prisma from '@/lib/prisma';

export async function getCategoryExpenses() {
    const expenses = await prisma.expense.findMany({
        include: {
            category: true
        }
    });

    const categoryMap = new Map<string, number>();

    expenses.forEach(expense => {
        const categoryName = expense.category?.CategoryName || 'Uncategorized';
        const amount = Number(expense.Amount);
        categoryMap.set(categoryName, (categoryMap.get(categoryName) || 0) + amount);
    });

    return Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));
}

export async function getProjectExpenses() {
    const expenses = await prisma.expense.findMany({
        include: {
            project: true
        }
    });

    const projectMap = new Map<string, number>();

    expenses.forEach(expense => {
        const projectName = expense.project?.ProjectName || 'No Project';
        const amount = Number(expense.Amount);
        projectMap.set(projectName, (projectMap.get(projectName) || 0) + amount);
    });

    return Array.from(projectMap.entries()).map(([name, value]) => ({ name, value }));
}

export async function getMonthlyStats() {
    const expenses = await prisma.expense.findMany();
    const incomes = await prisma.income.findMany();

    const monthlyMap = new Map<string, { income: number; expense: number }>();

    expenses.forEach(expense => {
        const date = new Date(expense.ExpenseDate);
        const key = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Jan 2024"
        const current = monthlyMap.get(key) || { income: 0, expense: 0 };
        current.expense += Number(expense.Amount);
        monthlyMap.set(key, current);
    });

    incomes.forEach(income => {
        const date = new Date(income.IncomeDate);
        const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        const current = monthlyMap.get(key) || { income: 0, expense: 0 };
        current.income += Number(income.Amount);
        monthlyMap.set(key, current);
    });

    // Sort by date would be better, but for now simple iteration
    // To sort, we might need a better key, but let's just return as is and let UI handle or sort simple
    // Actually, sorting is important for line charts.

    // Let's optimize: use YYYY-MM sortable key
    const statsMap = new Map<string, { income: number; expense: number; label: string }>();

    expenses.forEach(expense => {
        const date = new Date(expense.ExpenseDate);
        const sortKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleString('default', { month: 'short', year: 'numeric' });

        const current = statsMap.get(sortKey) || { income: 0, expense: 0, label };
        current.expense += Number(expense.Amount);
        statsMap.set(sortKey, current);
    });

    incomes.forEach(income => {
        const date = new Date(income.IncomeDate);
        const sortKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleString('default', { month: 'short', year: 'numeric' });

        const current = statsMap.get(sortKey) || { income: 0, expense: 0, label };
        current.income += Number(income.Amount);
        statsMap.set(sortKey, current);
    });

    return Array.from(statsMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([_, val]) => ({
            name: val.label,
            income: val.income,
            expense: val.expense
        }));
}

export async function getRecentExpenses() {
    const expenses = await prisma.expense.findMany({
        take: 5,
        orderBy: {
            ExpenseDate: 'desc'
        },
        include: {
            category: true,
            people: true,
            project: true,
            subCategory: true
        }
    });

    return expenses.map(e => ({
        id: e.ExpenseID,
        description: e.Description || e.ExpenseDetail || 'No Description',
        amount: Number(e.Amount),
        date: e.ExpenseDate,
        category: e.category?.CategoryName || 'Uncategorized',
        person: e.people?.PeopleName || 'Unknown',
        project: e.project?.ProjectName
    }));
}
