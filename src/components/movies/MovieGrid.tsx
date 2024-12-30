import React, { useMemo } from 'react';
import { Movie } from '../../types';
import { formatCurrency } from '../../utils/format';
import Toast from '../ui/Toast';
import { useToast } from '../../hooks/useToast';

interface MovieGridProps {
  movies: Movie[];
  selectedGenres: string[];
  searchQuery: string;
  onMovieSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, selectedGenres, searchQuery, onMovieSelect }: MovieGridProps) {
  const { isVisible, message, showToast, hideToast } = useToast();

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesGenres = selectedGenres.length === 0 || 
        movie.genres.some(genre => selectedGenres.includes(genre));
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGenres && matchesSearch;
    });
  }, [movies, selectedGenres, searchQuery]);

  const handleBookMovie = (movie: Movie) => {
    onMovieSelect(movie);
    showToast(`Successfully booked "${movie.title}"`);
  };

  if (filteredMovies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No movies found matching your criteria</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredMovies.map(movie => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{movie.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">
                  {formatCurrency(movie.price)}
                </span>
                <button
                  onClick={() => handleBookMovie(movie)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isVisible && (
        <Toast 
          message={message} 
          onClose={hideToast}
        />
      )}
    </>
  );
}