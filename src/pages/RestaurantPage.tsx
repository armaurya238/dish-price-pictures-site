
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import MenuSection from '@/components/MenuSection';
import MenuNav from '@/components/MenuNav';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurant } = useRestaurants();
  const restaurant = getRestaurant(id || '');

  useEffect(() => {
    console.log('Restaurant ID from URL:', id);
    console.log('Restaurant found:', restaurant);
    
    if (id && !restaurant) {
      console.log('Restaurant not found for ID:', id);
      toast.error('Restaurant not found');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [restaurant, navigate, id]);

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Invalid Restaurant URL</h1>
        <p className="mb-8">No restaurant ID provided in the URL.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Restaurant Not Found</h1>
        <p className="mb-8">The restaurant you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  // Create menu categories for navigation
  const menuCategories = restaurant.sections?.map(section => ({
    id: section.id,
    name: section.name
  })) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-r from-gray-700 to-gray-900">
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
          <div className="mb-4 sm:mb-6">
            {restaurant.logoUrl && (
              <img
                src={restaurant.logoUrl}
                alt={`${restaurant.name} logo`}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-white object-cover mx-auto"
              />
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 sm:mb-4 drop-shadow-md">
            {restaurant.name}
          </h1>
          {restaurant.description && (
            <p className="max-w-2xl text-sm sm:text-base md:text-lg drop-shadow-md px-4">
              {restaurant.description}
            </p>
          )}
        </div>
      </section>

      {/* Menu Navigation */}
      {menuCategories.length > 0 && (
        <MenuNav categories={menuCategories} />
      )}

      {/* Menu Sections */}
      <main className="flex-grow">
        {restaurant.sections && restaurant.sections.length > 0 ? (
          restaurant.sections.map((section, index) => {
            const sectionDishes = restaurant.dishes.filter(dish => dish.sectionId === section.id);
            return (
              <div key={section.id} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                <MenuSection
                  id={section.id}
                  title={section.name}
                  description={section.description}
                  dishes={sectionDishes}
                />
              </div>
            );
          })
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-2">No menu items available</h2>
            <p className="text-gray-500">This restaurant hasn't added any dishes yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantPage;
