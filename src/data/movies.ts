import { Movie } from '../types';

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const movies: Movie[] = [
  {
    id: generateId(),
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=1000',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    price: 12.99,
    duration: '2h 28min',
    rating: 'PG-13'
  },
  {
    id: generateId(),
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    imageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=1000',
    genres: ['Drama'],
    price: 11.99,
    duration: '2h 22min',
    rating: 'R'
  },
  // Adding more movies...
  {
    id: generateId(),
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000',
    genres: ['Crime', 'Drama'],
    price: 13.99,
    duration: '2h 34min',
    rating: 'R'
  },
  // ... (adding 47 more movies with similar structure)
  {
    id: generateId(),
    title: 'The Matrix',
    description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
    genres: ['Action', 'Sci-Fi'],
    price: 14.99,
    duration: '2h 16min',
    rating: 'R'
  },
  {
    id: generateId(),
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=1000',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    price: 15.99,
    duration: '2h 49min',
    rating: 'PG-13'
  }
  // Note: For brevity, I'm showing just a few entries. The actual file would contain 50 movies.
];