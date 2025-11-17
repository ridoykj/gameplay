import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { fetchCheats, sendCheat } from '../../controller/cheats-api';
import type { ResponseData } from '../../types';
import CheatList from '../../views/error/components/CheatList';
import ManualCheatForm from '../../views/error/components/ManualCheatForm';
import ResponseMessage from '../../views/error/components/ResponseMessage';
import SearchBar from '../../views/error/components/SearchBar';

export const Route = createFileRoute('/_main/')({
  component: RouteComponent,
})

// function RouteComponent() {
//   return (
//     <>
//       <main className="h-svh text-center bg-background p-20">
//         {/* <img alt="Electron Logo" className="w-32 mx-auto mb-8 animate-pulse" src={electronLogo} /> */}
//         <h1 className="text-foreground/50 text-4xl font-bold mb-4">
//           Build an Electron app with <span className="text-primary font-semibold">React</span> and{' '}
//           <span className=" text-foreground font-semibold">TypeScript</span>
//         </h1>
//         <div className="bg-foreground/10 p-4 rounded-lg inline-block mb-8">
//           <p className="text-foreground/80">
//             Press <code className="bg-foreground/30 px-2 py-1 rounded">F12</code> to open DevTools
//           </p>
//         </div>
//         <div className="flex gap-4 justify-center items-center mb-12">
//           <a
//             href="https://electron-vite.org/"
//             target="_blank"
//             rel="noreferrer"
//             className="px-6 py-2 text-primary-foreground 
//             bg-primary hover:bg-secondary rounded-full transition-colors"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </>
//   )
// }
// const ALL_CHEAT_CATEGORIES: CheatCategory[] = [
//   {
//     header: 'Player Cheats',
//     data: [
//       { effect: 'Health, Armor, $250k', cheatCode: 'HESOYAM' },
//       { effect: 'Infinite Health', cheatCode: 'BAGUVIX' },
//       { effect: 'Infinite Oxygen', cheatCode: 'CVWKXAM' },
//       { effect: 'Adrenaline Mode', cheatCode: 'ANOSEONGLASS' },
//       { effect: 'Never Wanted', cheatCode: 'AEZAKMI' },
//       { effect: 'Six Star Wanted Level', cheatCode: 'LJSPQK' },
//     ],
//   },
//   {
//     header: 'Weapon & Item Cheats',
//     data: [
//       { effect: 'Weapon Set 1', cheatCode: 'LXGIWYL' },
//       { effect: 'Weapon Set 2', cheatCode: 'KJKSZPJ' },
//       { effect: 'Weapon Set 3', cheatCode: 'UZUMYMW' },
//       { effect: 'Infinite Ammo', cheatCode: 'WANRLTW' },
//       { effect: 'Jetpack', cheatCode: 'ROCKETMAN' },
//       { effect: 'Parachute', cheatCode: 'AIYPWZQP' },
//     ],
//   },
//   {
//     header: 'Vehicle Spawning Cheats',
//     data: [
//       { effect: 'Spawn Rhino Tank', cheatCode: 'AIWPRTON' },
//       { effect: 'Spawn Jet (Hydra)', cheatCode: 'JUMPJET' },
//       { effect: 'Spawn Hunter', cheatCode: 'OHDUDE' },
//       { effect: 'Spawn Monster Truck', cheatCode: 'MONSTERMASH' },
//     ],
//   },
// ];

function RouteComponent() {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms delay, same as the original hx-trigger

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const { data: categories = [], isLoading: isSearching } = useQuery({
    queryKey: ['cheats', debouncedQuery], // A unique key for this query
    queryFn: () => fetchCheats(debouncedQuery), // The function that fetches the data
    placeholderData: (previousData) => previousData, // Show previous data while new data is loading
  });

  const { mutate: submitCheat, isPending: isSubmitting } = useMutation({
    mutationFn: sendCheat, // The function that performs the mutation
    onSuccess: (data) => {
      console.log('Submission successful:', data);
      setResponse(data); // Update the UI with the success message from the API
    },
    onError: (error: any) => {
      console.error('Submission failed:', error);
      // Create a generic error message if the API fails unexpectedly
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      setResponse({ message: errorMessage, isError: true });
    },
  });

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-2 sm:p-4">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">GTA:SA Advanced Cheat Injector</h1>
          <p className="text-gray-600">Live search for a cheat or enter one manually.</p>
        </header>

        <ResponseMessage response={response} />

        {/* Pass the mutation function and its loading state to the form */}
        <ManualCheatForm onCheatSubmit={submitCheat} isLoading={isSubmitting} />

        {/* Pass the search handler and the query's loading state to the search bar */}
        <SearchBar onSearch={setSearchQuery} isLoading={isSearching} />

        {/* Pass the fetched data and the mutation function to the list */}
        <CheatList categories={categories} onSendCheat={submitCheat} />
      </div>
    </div>
  );
};