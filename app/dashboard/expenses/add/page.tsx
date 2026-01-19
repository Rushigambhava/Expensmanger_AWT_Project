import prisma from '@/lib/prisma';
import ExpenseForm from '../ExpenseForm';
import { createExpense } from '../actions';

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

export default async function AddExpensePage() {
    const { categories, subCategories, peoples, projects } = await getOptions();

    return (
        <ExpenseForm
            categories={categories}
            subCategories={subCategories}
            peoples={peoples}
            projects={projects}
            action={createExpense}
        />
    );
}
