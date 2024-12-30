import { useState, useCallback, useEffect } from 'react';
import { Movie, Order } from '../types';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export function useMovieBooking() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  // Fetch user's orders on mount and when user changes
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data.map(order => ({
          ...order,
          id: order.id,
          userId: order.user_id,
          movieId: order.movie_id,
          totalAmount: Number(order.total_amount),
          status: order.status,
          createdAt: order.created_at
        })));
      }
    };

    fetchOrders();
  }, [user]);

  const bookMovie = useCallback(async (movie: Movie, quantity: number = 1) => {
    if (!user) return null;

    const newOrder = {
      user_id: user.id,
      movie_id: movie.id,
      quantity,
      total_amount: movie.price * quantity,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(newOrder)
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return null;
    }

    const formattedOrder: Order = {
      id: data.id,
      userId: data.user_id,
      movieId: data.movie_id,
      quantity: data.quantity,
      totalAmount: Number(data.total_amount),
      status: data.status,
      createdAt: data.created_at
    };

    setOrders(prev => [formattedOrder, ...prev]);
    return formattedOrder;
  }, [user]);

  const cancelOrder = useCallback(async (orderId: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' } 
            : order
        )
      );
    }
  }, []);

  const processPayment = useCallback(async () => {
    const pendingOrderIds = orders
      .filter(order => order.status === 'pending')
      .map(order => order.id);

    const { error } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .in('id', pendingOrderIds);

    if (!error) {
      setOrders(prev => 
        prev.map(order => 
          order.status === 'pending' 
            ? { ...order, status: 'paid' } 
            : order
        )
      );
    }
  }, [orders]);

  return {
    orders,
    bookMovie,
    cancelOrder,
    processPayment
  };
}