'use server'

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createPeople(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const mobile = formData.get('mobile');
    const description = formData.get('description');

    const userId = 1; // Hardcoded

    if (!name) {
        throw new Error("People Name is required");
    }

    try {
        await prisma.people.create({
            data: {
                PeopleName: name as string,
                Email: email as string,
                MobileNo: mobile as string,
                Description: description as string,
                UserID: userId,
                IsActive: true
            }
        });
    } catch (error) {
        console.error("Failed to create person:", error);
        throw new Error('Failed to create person');
    }

    redirect('/dashboard/peoples');
}

export async function updatePeople(id: number, formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const mobile = formData.get('mobile');
    const description = formData.get('description');
    const isActive = formData.get('isActive') === 'on';

    if (!name) {
        throw new Error("People Name is required");
    }

    try {
        await prisma.people.update({
            where: { PeopleID: id },
            data: {
                PeopleName: name as string,
                Email: email as string,
                MobileNo: mobile as string,
                Description: description as string,
                IsActive: isActive
            }
        });
    } catch (error) {
        console.error("Failed to update person:", error);
        throw new Error('Failed to update person');
    }

    redirect('/dashboard/peoples');
}

export async function deletePeople(id: number) {
    try {
        await prisma.people.delete({
            where: { PeopleID: id }
        });
    } catch (error) {
        console.error("Failed to delete person:", error);
        throw new Error('Failed to delete person');
    }

    redirect('/dashboard/peoples');
}
