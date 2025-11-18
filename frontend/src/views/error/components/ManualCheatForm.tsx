import React, { useState } from 'react';
import Spinner from './Spinner';

interface ManualCheatFormProps {
    onCheatSubmit: (cheatCode: string) => void;
    isLoading: boolean;
}

const ManualCheatForm: React.FC<ManualCheatFormProps> = ({ onCheatSubmit, isLoading }) => {
    const [cheat, setCheat] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cheat.trim()) {
            onCheatSubmit(cheat.trim().toUpperCase());
            setCheat('');
        }
    };

    return (
        <form className="mb-6 flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input
                type="text"
                name="cheat"
                placeholder="Or type cheat code manually..."
                required
                autoComplete="off"
                value={cheat}
                onChange={(e) => setCheat(e.target.value)}
                className="grow min-w-[200px] uppercase p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="relative w-full sm:w-auto flex justify-center items-center px-4 py-3 border-none rounded-md bg-blue-600 text-white font-bold cursor-pointer transition-colors hover:bg-blue-700 disabled:bg-blue-300"
            >
                {isLoading ? <Spinner /> : <span>Send Manually</span>}
            </button>
        </form>
    );
};

export default ManualCheatForm;