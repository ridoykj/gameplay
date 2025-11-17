import createAxiosInstance from "../config/axios-config";
import type { CheatCategory, ResponseData } from "../types";
const baseUrl: string = import.meta.env.VITE_BASE_URI || '';
const axiosInstance = createAxiosInstance(baseUrl);

/**
 * Fetches cheat categories from the API.
 * @param query - The search string to filter cheats.
 * @returns A promise that resolves to an array of CheatCategory.
 */
export const fetchCheats = async (query: string): Promise<CheatCategory[]> => {
  const response = await axiosInstance.get<CheatCategory[]>(`/cheats/search`, {
    params: {
      q: query,
    },
  });
  return response.data;
};


/**
 * Sends a cheat code to the server.
 * @param cheatCode - The cheat code to send.
 * @returns A promise that resolves to the server's response message.
 */
export const sendCheat = async (cheatCode: string): Promise<ResponseData> => {
    // The htmx version sent { cheat: 'CHEATCODE' }. We replicate that here.
    const params = new URLSearchParams();
    params.append('cheat', cheatCode);

    const response = await axiosInstance.post<ResponseData>('/cheats/send', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // We expect an HTML string back, so transform it into our ResponseData shape
        transformResponse: (res) => {
            // This is a basic way to parse the HTML string from your original backend
            // A real API would ideally return JSON.
            const isError = res.includes('class="error"');
            const message = res.replace(/<[^>]*>?/gm, ''); // Strip HTML tags
            return { message, isError };
        }
    });

    return response.data;
};