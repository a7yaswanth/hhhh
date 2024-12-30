export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  genres: string[];
  price: number;
  duration: string;
  rating: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  movieId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}