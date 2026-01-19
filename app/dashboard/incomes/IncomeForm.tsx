'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Props = {
    categories: { CategoryID: number; CategoryName: number | string }[];
    subCategories: { SubCategoryID: number; SubCategoryName: string; CategoryID: number }[];
    peoples: { PeopleID: number; PeopleName: string }[];
    projects: { ProjectID: number; ProjectName: string }[];
    initialData?: {
        Amount: number;
        IncomeDate: Date;
        CategoryID: number | null;
        SubCategoryID: number | null;
        PeopleID: number;
        ProjectID: number | null;
        Description: string | null;
    };
    action: (formData: FormData) => Promise<void>;
    submitLabel?: string;
    title?: string;
}

export default function IncomeForm({
    categories,
    subCategories,
    peoples,
    projects,
    initialData,
    action,
    submitLabel = "Save Income",
    title = "Add New Income"
}: Props) {
    // State for controlled inputs
    const [selectedCategory, setSelectedCategory] = useState<number | string>(initialData?.CategoryID || "");
    const [filteredSubCategories, setFilteredSubCategories] = useState<{ SubCategoryID: number; SubCategoryName: string; CategoryID: number }[]>([]);

    // Update filtered subcategories when selectedCategory changes
    useEffect(() => {
        if (selectedCategory) {
            const filtered = subCategories.filter(sc => sc.CategoryID === Number(selectedCategory));
            setFilteredSubCategories(filtered);
        } else {
            setFilteredSubCategories([]);
        }
    }, [selectedCategory, subCategories]);

    // Construct default date string for datetime-local
    const defaultDate = initialData?.IncomeDate
        ? new Date(initialData.IncomeDate.getTime() - initialData.IncomeDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
        : '';

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/incomes" className="text-slate-500 hover:text-slate-800 flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Incomes
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                <p className="text-slate-500">Record revenue details.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form action={action} className="space-y-6">

                    {/* Amount & Date Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-slate-400">$</span>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    step="0.01"
                                    required
                                    defaultValue={initialData?.Amount}
                                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                required
                                defaultValue={defaultDate}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Category & SubCategory */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.CategoryID} value={c.CategoryID}>{c.CategoryName}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="subCategoryId" className="block text-sm font-medium text-slate-700 mb-1">SubCategory</label>
                            <select
                                id="subCategoryId"
                                name="subCategoryId"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white disabled:bg-slate-50 disabled:text-slate-400"
                                disabled={!selectedCategory || filteredSubCategories.length === 0}
                                defaultValue={initialData?.SubCategoryID || ""}
                                key={selectedCategory}
                            >
                                <option value="">Select SubCategory</option>
                                {filteredSubCategories.map((sc) => (
                                    <option key={sc.SubCategoryID} value={sc.SubCategoryID}>{sc.SubCategoryName}</option>
                                ))}
                            </select>
                            {selectedCategory && filteredSubCategories.length === 0 && (
                                <p className="text-xs text-slate-400 mt-1">No subcategories found for this category.</p>
                            )}
                        </div>
                    </div>

                    {/* People & Project */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="peopleId" className="block text-sm font-medium text-slate-700 mb-1">From Person / Client</label>
                            <select
                                id="peopleId"
                                name="peopleId"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                required
                                defaultValue={initialData?.PeopleID || ""}
                            >
                                <option value="">Select Person</option>
                                {peoples.map((p) => (
                                    <option key={p.PeopleID} value={p.PeopleID}>{p.PeopleName}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="projectId" className="block text-sm font-medium text-slate-700 mb-1">Project (Optional)</label>
                            <select
                                id="projectId"
                                name="projectId"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                defaultValue={initialData?.ProjectID || ""}
                            >
                                <option value="">No Project</option>
                                {projects.map((p) => (
                                    <option key={p.ProjectID} value={p.ProjectID}>{p.ProjectName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="What was this income from?"
                            defaultValue={initialData?.Description || ""}
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Link
                            href="/dashboard/incomes"
                            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            {submitLabel}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
