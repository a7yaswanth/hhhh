import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import MovieGrid from './movies/MovieGrid';
import PaymentSummary from './payment/PaymentSummary';
import OrderList from './orders/OrderList';
import { movies } from '../data/movies';
import { useMovieBooking } from '../hooks/useMovieBooking';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}

export default function AppRoutes() {
  const { orders, bookMovie, cancelOrder, processPayment } = useMovieBooking();

  return (
    <Layout>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/movies" 
          element={
            <PrivateRoute>
              <MovieGrid 
                movies={movies} 
                selectedGenres={[]} 
                searchQuery="" 
                onMovieSelect={(movie) => bookMovie(movie)} 
              />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <PrivateRoute>
              <>
                <OrderList 
                  orders={orders} 
                  movies={movies} 
                  onCancelOrder={cancelOrder} 
                />
                {orders.some(order => order.status === 'pending') && (
                  <div className="mt-6">
                    <PaymentSummary 
                      orders={orders.filter(order => order.status === 'pending')} 
                      onPayment={processPayment} 
                    />
                  </div>
                )}
              </>
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/movies" replace />} />
      </Routes>
    </Layout>
  );
}