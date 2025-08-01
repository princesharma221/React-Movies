const API_KEY = 'd83c49fb'; // Your OMDb API key
const BASE_URL = 'https://www.omdbapi.com/';

// Get random popular movies (using search with common terms)
export const getPopulerMovies = async () => {
    try {
        // Common search terms that typically return popular movies
        const searchTerms = ['action', 'comedy', 'drama', 'adventure', 'sci-fi'];
        const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        
        const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${randomTerm}&type=movie`);
        const data = await res.json();
        
        if (data.Response === 'True') {
            return data.Search.map((movie, index) => ({
                ...movie,
                id: movie.imdbID,
                release_date: movie.Year,
                title: movie.Title,
                poster: movie.Poster
            }));
        }
        throw new Error(data.Error || 'Failed to fetch movies');
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const searchMovies = async (query) => {
    try {
        const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
        const data = await res.json();
        
        if (data.Response === 'True') {
            return data.Search.map(movie => ({
                ...movie,
                id: movie.imdbID,
                release_date: movie.Year,
                title: movie.Title,
                poster: movie.Poster
            }));
        }
        throw new Error(data.Error || 'No movies found');
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};