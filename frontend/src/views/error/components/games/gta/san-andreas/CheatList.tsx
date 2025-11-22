import React from 'react';
import type { CheatCategory } from '../../../../../../types';

interface CheatListProps {
    categories: CheatCategory[];
    favorites: string[];
    onToggleFavorite: (cheatCode: string) => void;
    onSendCheat: (cheatCode: string) => void;
}

const CheatList: React.FC<CheatListProps> = ({ categories, onSendCheat, favorites, onToggleFavorite }) => {
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
                                </tr>
                            </thead>
                            <tbody>
                                {category.data.map((cheat) => {

                                    const isFavorite = favorites.includes(cheat.cheatCode);
                                    return (
                                        <tr role='button'
                                            tabIndex={0}
                                            onClick={() => onSendCheat(cheat.cheatCode)}
                                            key={cheat.cheatCode}
                                            className="block mb-4 p-2 border rounded-md md:table-row md:mb-0 md:p-0 md:border-none cursor-pointer hover:bg-blue-400 hover:drop-shadow-lg active:bg-blue-400 active:drop-shadow-lg transition-colors md:justify-between md:items-center gap-2"
                                        >
                                            {/* Code Cell */}
                                            <td className="flex flex-row md:justify-between grow items-center md:table-cell font-mono font-bold text-red-600 border-b md:border-b-gray-200">
                                                {/* <span className="font-bold text-gray-800 md:hidden">Code</span> */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onToggleFavorite(cheat.cheatCode);
                                                    }}
                                                    className={`text-2xl ${isFavorite ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 transition-colors`}
                                                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                                >
                                                    ★
                                                </button>
                                                <span>{cheat.cheatCode}</span>
                                            </td>
                                            {/* Effect Cell */}
                                            <td className="flex justify-between items-center md:border-b md:table-cell md:border-b-gray-200">
                                                {/* <span className="font-bold md:hidden px-2">Effect</span> */}
                                                <span>{cheat.effect}</span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </main>
    );
};

export default CheatList;