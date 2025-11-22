import { X } from 'lucide-react';
import type { Cheat } from '../../../../../../types';

interface FavoritesListProps {
    favorites: Cheat[];
    onSendCheat: (cheatCode: string) => void;
    onToggleFavorite: (cheatCode: string) => void;
}

export default function FavoritesList({ favorites, onSendCheat, onToggleFavorite }: FavoritesListProps) {
    if (favorites.length === 0) {
        return null; // Don't render anything if there are no favorites
    }

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Favorites</h2>
            <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {favorites.map((cheat) => (
                    <li key={cheat.cheatCode} className="p-1 gap-2 bg-yellow-50 rounded-lg flex justify-between items-center shadow-sm">
                        <button
                            onClick={() => onSendCheat(cheat.cheatCode)}
                            className="w-full py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150"
                        >
                            <p className="font-mono text-sm text-gray-800">{cheat.cheatCode}</p>
                        </button>
                        <button
                            onClick={() => onToggleFavorite(cheat.cheatCode)}
                            className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150"
                        >
                            <X />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
