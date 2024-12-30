import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

export default function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const { signOut } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Film className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 font-semibold text-xl">MovieBox</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/movies"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Browse Movies
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  Orders
                </Link>
                <div className="flex items-center border-l pl-4 ml-4">
                  <span className="text-sm text-gray-700 mr-3">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-indigo-600"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/signin"
                className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}