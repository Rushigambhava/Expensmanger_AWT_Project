
import prisma from '@/lib/prisma';
import { updateExpense } from '../../actions';
import ExpenseForm from '../../ExpenseForm';
import { notFound } from 'next/navigation';

async function getOptions() {
    try {
        const categories = await prisma.category.findMany({
            where: { IsExpense: true, IsActive: true },
            select: { CategoryID: true, CategoryName: true }
        });

        const subCategories = await prisma.subCategory.findMany({
            where: { IsExpense: true, IsActive: true },
            select: { SubCategoryID: true, SubCategoryName: true, CategoryID: true }
        });

        const peoples = await prisma.people.findMany({
            where: { IsActive: true },
            select: { PeopleID: true, PeopleName: true }
        });

        const projects = await prisma.project.findMany({
            where: { IsActive: true },
            select: { ProjectID: true, ProjectName: true }
        });

        return { categories, subCategories, peoples, projects };
    } catch (error) {
        console.error("Error fetching options", error);
        return { categories: [], subCategories: [], peoples: [], projects: [] };
    }
}

async function getExpense(id: number) {
    const expense = await prisma.expense.findUnique({
        where: { ExpenseID: id }
    });
    return expense;
}

export default async function EditExpensePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const expenseId = parseInt(params.id);
    if (isNaN(expenseId)) {
        return notFound();
    }

    const [options, expense] = await Promise.all([
        getOptions(),
        getExpense(expenseId)
    ]);

    if (!expense) {
        return notFound();
    }

    const { categories, subCategories, peoples, projects } = options;
    const updateAction = updateExpense.bind(null, expense.ExpenseID);

    return (
        <ExpenseForm
            categories={categories}
            subCategories={subCategories}
            peoples={peoples}
            projects={projects}
            initialData={{
                Amount: Number(expense.Amount),
                ExpenseDate: expense.ExpenseDate,
                CategoryID: expense.CategoryID,
                SubCategoryID: expense.SubCategoryID,
                PeopleID: expense.PeopleID,
                ProjectID: expense.ProjectID,
                Description: expense.Description
            }}
            action={updateAction}
            title="Edit Expense"
            submitLabel="Update Expense"
        />
    );
}
