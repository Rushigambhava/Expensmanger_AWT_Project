
import prisma from '@/lib/prisma';
import { updateIncome } from '../../actions';
import IncomeForm from '../../IncomeForm';
import { notFound } from 'next/navigation';

async function getOptions() {
    try {
        const categories = await prisma.category.findMany({
            where: { IsIncome: true, IsActive: true },
            select: { CategoryID: true, CategoryName: true }
        });

        const subCategories = await prisma.subCategory.findMany({
            where: { IsIncome: true, IsActive: true },
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

async function getIncome(id: number) {
    const income = await prisma.income.findUnique({
        where: { IncomeID: id }
    });
    return income;
}

export default async function EditIncomePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const incomeId = parseInt(params.id);
    if (isNaN(incomeId)) {
        return notFound();
    }

    const [options, income] = await Promise.all([
        getOptions(),
        getIncome(incomeId)
    ]);

    if (!income) {
        return notFound();
    }

    const { categories, subCategories, peoples, projects } = options;
    const updateAction = updateIncome.bind(null, income.IncomeID);

    return (
        <IncomeForm
            categories={categories}
            subCategories={subCategories}
            peoples={peoples}
            projects={projects}
            initialData={{
                Amount: Number(income.Amount),
                IncomeDate: income.IncomeDate,
                CategoryID: income.CategoryID,
                SubCategoryID: income.SubCategoryID,
                PeopleID: income.PeopleID,
                ProjectID: income.ProjectID,
                Description: income.Description
            }}
            action={updateAction}
            title="Edit Income"
            submitLabel="Update Income"
        />
    );
}
