import prisma from '@/lib/prisma';

import Link from 'next/link';
import { Users, Mail, Plus } from 'lucide-react';
import PeopleCardActions from './PeopleCardActions';

async function getPeoples() {
    try {
        const peoples = await prisma.people.findMany({
            where: {
                // UserID: 1
            },
            orderBy: {
                PeopleName: 'asc'
            }
        });
        return peoples;
    } catch (error) {
        return [];
    }
}

export default async function PeoplesPage() {
    const peoples = await getPeoples();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">People</h2>
                    <p className="text-slate-500 mt-1">Manage beneficiaries and payers.</p>
                </div>
                <Link
                    href="/dashboard/peoples/add"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Person</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {peoples.map((person) => (
                    <div key={person.PeopleID} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{person.PeopleName}</h3>
                                <p className="text-sm text-slate-500">{person.MobileNo || 'No Mobile'}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-50 flex items-center text-slate-500 text-sm">
                            <Mail className="w-4 h-4 mr-2" />
                            {person.Email || 'No Email'}
                            <PeopleCardActions id={person.PeopleID} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
