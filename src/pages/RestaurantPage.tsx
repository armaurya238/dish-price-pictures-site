
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import MenuSection from '@/components/MenuSection';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurant } = useRestaurants();
  const restaurant = getRestaurant(id || '');

  useEffect(() => {
    if (!restaurant) {
      toast.error('Restaurant not found');
      navigate('/');
    }
  }, [restaurant, navigate]);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Restaurant Not Found</h1>
        <p className="mb-8">The restaurant you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="absolute inset-0">
          {restaurant.coverImageUrl && (
            <img
              src={restaurant.coverImageUrl}
              alt={restaurant.name}
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 text-center">
          <div className="mb-6">
            {restaurant.logoUrl && (
              <img
                src={restaurant.logoUrl}
                alt={`${restaurant.name} logo`}
                className="w-24 h-24 rounded-full border-4 border-white object-cover mx-auto"
              />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">
            {restaurant.name}
          </h1>
          {restaurant.description && (
            <p className="max-w-2xl text-lg drop-shadow-md">{restaurant.description}</p>
          )}
        </div>
      </section>

      {/* Restaurant Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <div className="flex space-x-4">
              {restaurant.sections && restaurant.sections.length > 0 && (
                <div className="hidden md:flex items-center space-x-4">
                  {restaurant.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#section-${section.id}`}
                      className="text-gray-700 hover:text-gray-900 text-sm font-medium"
                    >
                      {section.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-8">
        {restaurant.sections && restaurant.sections.length > 0 ? (
          restaurant.sections.map((section) => {
            const sectionDishes = restaurant.dishes.filter(dish => dish.sectionId === section.id);
            return (
              <MenuSection
                key={section.id}
                id={`section-${section.id}`}
                title={section.name}
                description={section.description}
                dishes={sectionDishes}
              />
            );
          })
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">No menu items available</h2>
            <p className="text-gray-500">This restaurant hasn't added any dishes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
