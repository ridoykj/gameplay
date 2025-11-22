import { useQuery, useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useMemo } from 'react';
import { fetchCheats, sendCheat } from '../../../../controller/cheats-api';
import type { ResponseData, Cheat } from '../../../../types';
import CheatList from '../../../../views/error/components/games/gta/san-andreas/CheatList';
import ManualCheatForm from '../../../../views/error/components/games/gta/san-andreas/ManualCheatForm';
import ResponseMessage from '../../../../views/error/components/games/gta/san-andreas/ResponseMessage';
import SearchBar from '../../../../views/error/components/games/gta/san-andreas/SearchBar';
import FavoritesList from '../../../../views/error/components/games/gta/san-andreas/FavoritesList';

export const Route = createFileRoute('/_main/games/gta/san-andreas')({
  component: RouteComponent,
})

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

  // State for favorites, loaded from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const savedFavorites = localStorage.getItem('gta-sa-favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  // Effect to save favorites to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('gta-sa-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  // Function to toggle a cheat's favorite status
  const toggleFavorite = (cheatCode: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(cheatCode)) {
        return prevFavorites.filter(code => code !== cheatCode);
      } else {
        return [...prevFavorites, cheatCode];
      }
    });
  };

  const { data: allCategories = [], isLoading: isSearching } = useQuery({
    queryKey: ['cheats', ''], // A unique key for fetching all cheats
    queryFn: () => fetchCheats(''), // Fetch all data when the component mounts
  });

  // Memoize the list of favorite cheat objects
  const favoriteCheats = useMemo(() => {
    if (!allCategories.length || !favorites.length) {
      return [];
    }
    const allCheats: Cheat[] = allCategories.flatMap(category => category.data);
    return favorites
      .map(favCode => allCheats.find(cheat => cheat.cheatCode === favCode)).filter((c): c is Cheat => c !== undefined);
  }, [allCategories, favorites]);

  const filteredCategories = useMemo(() => {
    if (!debouncedQuery) {
      return allCategories; // If no search query, return all categories
    }
    // If there is a search query, filter on the client side
    const lowercasedQuery = debouncedQuery.toLowerCase();
    return allCategories
      .map(category => ({
        ...category,
        data: category.data.filter(cheat => cheat.cheatCode.toLowerCase().includes(lowercasedQuery) || cheat.effect.toLowerCase().includes(lowercasedQuery)),
      }))
      .filter(category => category.data.length > 0);
  }, [allCategories, debouncedQuery]);

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

        {/* Display favorite cheats */}
        <FavoritesList favorites={favoriteCheats} onSendCheat={submitCheat} onToggleFavorite={toggleFavorite} />

        {/* Pass the mutation function and its loading state to the form */}
        <ManualCheatForm onCheatSubmit={submitCheat} isLoading={isSubmitting} />

        {/* Pass the search handler and the query's loading state to the search bar */}
        <SearchBar onSearch={setSearchQuery} isLoading={isSearching} />

        {/* Pass the fetched data, mutation function, favorites, and toggle function to the list */}
        <div className="mt-6">
          <CheatList categories={filteredCategories} onSendCheat={submitCheat} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
      </div>
    </div>
  );
}
