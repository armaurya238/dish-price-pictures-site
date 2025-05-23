
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useRestaurants } from '../context/RestaurantContext';

const NavBar = () => {
  const { currentOwner, logout } = useRestaurants();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide navigation on restaurant pages
  const isRestaurantPage = location.pathname.startsWith('/restaurant/');
  
  if (isRestaurantPage) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">FoodieHub</Link>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/">Home</Link>
          </Button>
          
          {currentOwner ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/owner/dashboard">My Restaurant</Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Restaurant Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/admin">Admin Dashboard</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
