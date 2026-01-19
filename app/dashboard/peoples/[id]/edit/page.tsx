
import prisma from '@/lib/prisma';
import { updatePeople } from '../../actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPerson(id: number) {
    const person = await prisma.people.findUnique({
        where: { PeopleID: id }
    });
    return person;
}

export default async function EditPeoplePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const peopleId = parseInt(params.id);
    if (isNaN(peopleId)) {
        return notFound();
    }

    const person = await getPerson(peopleId);

    if (!person) {
        return notFound();
    }

    const updateAction = updatePeople.bind(null, person.PeopleID);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/peoples" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to People
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Edit Person</h2>
                <p className="text-slate-500">Update person details.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={updateAction} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={person.PeopleName}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Full Name"
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={person.Email || ''}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                defaultValue={person.MobileNo || ''}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description / Notes</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={person.Description || ''}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Additional details..."
                        ></textarea>
                    </div>

                    {/* Is Active Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="isActive"
                            name="isActive"
                            type="checkbox"
                            defaultChecked={person.IsActive ?? true}
                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-slate-900">
                            Is Active
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Link
                            href="/dashboard/peoples"
                            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Update Person
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
