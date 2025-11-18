import { createFileRoute, useNavigate } from '@tanstack/react-router';

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

// function RouteComponent() {
//   // State Management
//   const [searchQuery, setSearchQuery] = useState('');
//   const [response, setResponse] = useState<ResponseData | null>(null);
//   const [debouncedQuery, setDebouncedQuery] = useState('');

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(searchQuery);
//     }, 300); // 300ms delay, same as the original hx-trigger

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [searchQuery]);

//   // const { data: categories = [], isLoading: isSearching } = useQuery({
//   //   queryKey: ['cheats', debouncedQuery], // A unique key for this query
//   //   queryFn: () => fetchCheats(debouncedQuery), // The function that fetches the data, now used for server-side search
//   //   placeholderData: (previousData) => previousData, // Show previous data while new data is loading
//   //   enabled: !!debouncedQuery, // Only run this query if there's a search term
//   // });

//   const { data: allCategories = [], isLoading: isSearching } = useQuery({
//     queryKey: ['cheats', ''], // A unique key for fetching all cheats
//     queryFn: () => fetchCheats(''), // Fetch all data when the component mounts
//   });

//   const filteredCategories = useMemo(() => {
//     if (!debouncedQuery) {
//       return allCategories; // If no search query, return all categories
//     }
//     // If there is a search query, filter on the client side
//     const lowercasedQuery = debouncedQuery.toLowerCase();
//     return allCategories
//       .map(category => ({
//         ...category,
//         data: category.data.filter(cheat => cheat.cheatCode.toLowerCase().includes(lowercasedQuery) || cheat.effect.toLowerCase().includes(lowercasedQuery)),
//       }))
//       .filter(category => category.data.length > 0);
//   }, [allCategories, debouncedQuery]);

//   const { mutate: submitCheat, isPending: isSubmitting } = useMutation({
//     mutationFn: sendCheat, // The function that performs the mutation
//     onSuccess: (data) => {
//       console.log('Submission successful:', data);
//       setResponse(data); // Update the UI with the success message from the API
//     },
//     onError: (error: any) => {
//       console.error('Submission failed:', error);
//       // Create a generic error message if the API fails unexpectedly
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       setResponse({ message: errorMessage, isError: true });
//     },
//   });

//   return (
//     <div className="bg-gray-100 min-h-screen font-sans p-2 sm:p-4">
//       <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
//         <header className="text-center mb-6">
//           <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">GTA:SA Advanced Cheat Injector</h1>
//           <p className="text-gray-600">Live search for a cheat or enter one manually.</p>
//         </header>

//         <ResponseMessage response={response} />

//         {/* Pass the mutation function and its loading state to the form */}
//         <ManualCheatForm onCheatSubmit={submitCheat} isLoading={isSubmitting} />

//         {/* Pass the search handler and the query's loading state to the search bar */}
//         <SearchBar onSearch={setSearchQuery} isLoading={isSearching} />

//         {/* Pass the fetched data and the mutation function to the list */}
//         <CheatList categories={filteredCategories} onSendCheat={submitCheat} />
//       </div>
//     </div>
//   );
// };


function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">Welcome to the Controller Hub</h1>
        <p className="text-gray-600">Explore various gaming tools and utilities.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Game Card */}
        <div role='button' tabIndex={0} className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-blue-600 transition-colors cursor-pointer"
          onClick={() => {
            navigate({ to: '/games', search: { filter: 'active' } })
          }}>
          <h2 className="text-2xl font-bold mb-2">Games</h2>
          <p className="text-blue-100">Discover cheats and utilities for your favorite games.</p>
        </div>

        {/* Controller Card */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-green-600 transition-colors cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Controllers</h2>
          <p className="text-green-100">Manage and configure your game controllers.</p>
        </div>

        {/* Mouse Card */}
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-red-600 transition-colors cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Mouse</h2>
          <p className="text-red-100">Optimize your mouse settings for gaming.</p>
        </div>

        {/* Keyboard Card */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-red-600 transition-colors cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Keyboard</h2>
          <p className="text-red-100">Optimize your keyboard settings for gaming.</p>
        </div>
      </div>
    </div>
  );
};