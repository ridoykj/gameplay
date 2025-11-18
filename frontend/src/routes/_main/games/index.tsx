import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/games/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    return <>
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <header className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">Popular PC Games</h1>
                <p className="text-gray-600">Select a game to explore available tools and cheats.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* GTA San Andreas Card */}
                <div role='button' tabIndex={0} className='bg-purple-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-purple-700 transition-colors cursor-pointer'
                    onClick={() => {
                        navigate({ to: '/games/gta/san-andreas', search: { filter: 'active' } })
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && navigate({ to: '/games/gta/san-andreas', search: { filter: 'active' } })}>
                    <h2 className="text-2xl font-bold mb-2">GTA: San Andreas</h2>
                    <p className="text-purple-100">Cheats, trainers, and more.</p>
                </div>

                {/* Minecraft Card */}
                <div role='button' tabIndex={0} className='bg-lime-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-lime-700 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Minecraft</h2>
                    <p className="text-lime-100">Mods, texture packs, and utilities.</p>
                </div>

                {/* Cyberpunk 2077 Card */}
                <div role='button' tabIndex={0} className='bg-pink-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-pink-700 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Cyberpunk 2077</h2>
                    <p className="text-pink-100">Mods and trainers for Night City.</p>
                </div>

                {/* Baldur's Gate 3 Card */}
                <div role='button' tabIndex={0} className='bg-indigo-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-indigo-700 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Baldur's Gate 3</h2>
                    <p className="text-indigo-100">Companions, builds, and guides.</p>
                </div>

                {/* Elden Ring Card */}
                <div role='button' tabIndex={0} className='bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-yellow-600 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Elden Ring</h2>
                    <p className="text-yellow-100">Become the Elden Lord.</p>
                </div>

                {/* Red Dead Redemption 2 Card */}
                <div role='button' tabIndex={0} className='bg-red-800 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-red-900 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Red Dead Redemption 2</h2>
                    <p className="text-red-100">Explore the Wild West.</p>
                </div>

                {/* The Witcher 3 Card */}
                <div role='button' tabIndex={0} className='bg-gray-700 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-gray-800 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">The Witcher 3</h2>
                    <p className="text-gray-100">Hunt monsters and make choices.</p>
                </div>

                {/* Valorant Card */}
                <div role='button' tabIndex={0} className='bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-red-600 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Valorant</h2>
                    <p className="text-red-100">Agents, abilities, and aim training.</p>
                </div>

                {/* League of Legends Card */}
                <div role='button' tabIndex={0} className='bg-blue-700 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-blue-800 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">League of Legends</h2>
                    <p className="text-blue-100">Champions, runes, and strategies.</p>
                </div>

                {/* Counter-Strike 2 Card */}
                <div role='button' tabIndex={0} className='bg-orange-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-orange-600 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Counter-Strike 2</h2>
                    <p className="text-orange-100">Smokes, strats, and settings.</p>
                </div>

                {/* Fortnite Card */}
                <div role='button' tabIndex={0} className='bg-teal-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-teal-600 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Fortnite</h2>
                    <p className="text-teal-100">Building, strategies, and events.</p>
                </div>

                {/* Apex Legends Card */}
                <div role='button' tabIndex={0} className='bg-red-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-red-700 transition-colors cursor-pointer'>
                    <h2 className="text-2xl font-bold mb-2">Apex Legends</h2>
                    <p className="text-red-100">Legends, loadouts, and tactics.</p>
                </div>
            </div>
        </div>
    </>
}