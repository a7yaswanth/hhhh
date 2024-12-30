import React from 'react';
import { Order, Movie } from '../../types';
import { formatCurrency } from '../../utils/format';

interface OrderListProps {
  orders: Order[];
  movies: Movie[];
  onCancelOrder: (orderId: string) => void;
}

export default function OrderList({ orders, movies, onCancelOrder }: OrderListProps) {
  const getMovie = (movieId: string) => movies.find(m => m.id === movieId);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {orders.map(order => {
        const movie = getMovie(order.movieId);
        if (!movie) return null;

        return (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {order.quantity} × {formatCurrency(movie.price)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <p className="mt-2 font-bold">{formatCurrency(order.totalAmount)}</p>
                {order.status === 'pending' && (
                  <button
                    onClick={() => onCancelOrder(order.id)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}