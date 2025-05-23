
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import RestaurantAdmin from './RestaurantAdmin'; // Reusing the RestaurantAdmin component

const OwnerDashboard = () => {
  const { currentOwner, logout, getRestaurant } = useRestaurants();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOwner) {
      toast.error('You must be logged in to access this page');
      navigate('/login');
      return;
    }
  }, [currentOwner, navigate]);

  const restaurant = currentOwner ? getRestaurant(currentOwner.restaurantId) : undefined;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!currentOwner || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-8">Please log in to access this page.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Owner Dashboard</h1>
          <p className="text-gray-500">Welcome, {currentOwner.username}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      <div className="mb-6 p-4 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Your Restaurant: {restaurant.name}</h2>
        <p className="text-gray-600">{restaurant.description}</p>
      </div>
      
      {/* Reuse the existing RestaurantAdmin component */}
      <RestaurantAdmin />
    </div>
  );
};

export default OwnerDashboard;
