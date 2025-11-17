import React from 'react';
import type { CheatCategory } from '../../../types';

interface CheatListProps {
    categories: CheatCategory[];
    onSendCheat: (cheatCode: string) => void;
}

const CheatList: React.FC<CheatListProps> = ({ categories, onSendCheat }) => {
    if (categories.length === 0) {
        return (
            <div className="text-center text-gray-500 p-8 italic">
                No cheats found matching your search.
            </div>
        );
    }

    return (
        <main>
            {categories.map((category) => (
                <div key={category.header} className="cheat-category mb-10">
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
                        {category.header}
                    </h2>

                    {/* This is the responsive table structure */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse mt-4">
                            <thead className="hidden md:table-header-group">
                                <tr className="bg-gray-50">
                                    <th className="p-3 text-left font-semibold border-b border-gray-200">Effect</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-200">Cheat Code</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.data.map((cheat) => (
                                    <tr
                                        key={cheat.cheatCode}
                                        className="block mb-4 p-2 border rounded-md md:table-row md:mb-0 md:p-0 md:border-none"
                                    >
                                        {/* Effect Cell */}
                                        <td className="flex justify-between items-center p-2 border-b md:table-cell md:border-b-gray-200">
                                            <span className="font-bold md:hidden">Effect</span>
                                            <span>{cheat.effect}</span>
                                        </td>

                                        {/* Code Cell */}
                                        <td className="flex justify-between items-center p-2 border-b md:table-cell md:border-b-gray-200 font-mono font-bold text-red-600">
                                            <span className="font-bold text-gray-800 md:hidden">Code</span>
                                            <span>{cheat.cheatCode}</span>
                                        </td>

                                        {/* Action Cell */}
                                        <td className="flex justify-between items-center p-2 md:table-cell md:border-b-gray-200">
                                            <span className="font-bold md:hidden">Action</span>
                                            <button
                                                onClick={() => onSendCheat(cheat.cheatCode)}
                                                className="w-full md:w-auto bg-green-600 text-white font-bold py-2 px-3 rounded-md transition-colors hover:bg-green-700 text-sm"
                                            >
                                                Send
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </main>
    );
};

export default CheatList;