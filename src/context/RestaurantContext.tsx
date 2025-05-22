
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Restaurant, Dish } from '../types/restaurant';

interface RestaurantContextType {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => string;
  getRestaurant: (id: string) => Restaurant | undefined;
  addDish: (restaurantId: string, dish: Omit<Dish, 'id' | 'restaurantId'>) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (dishId: string, restaurantId: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const storedData = localStorage.getItem('restaurants');
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  const addRestaurant = (newRestaurant: Omit<Restaurant, 'id'>) => {
    const id = `restaurant-${Date.now()}`;
    const restaurant = { ...newRestaurant, id };
    setRestaurants((prev) => [...prev, restaurant]);
    return id;
  };

  const getRestaurant = (id: string) => {
    return restaurants.find((r) => r.id === id);
  };

  const addDish = (restaurantId: string, newDish: Omit<Dish, 'id' | 'restaurantId'>) => {
    const dishId = `dish-${Date.now()}`;
    
    setRestaurants((prevRestaurants) => 
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            dishes: [...restaurant.dishes, { ...newDish, id: dishId, restaurantId }]
          };
        }
        return restaurant;
      })
    );
  };

  const updateDish = (updatedDish: Dish) => {
    setRestaurants((prevRestaurants) => 
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === updatedDish.restaurantId) {
          return {
            ...restaurant,
            dishes: restaurant.dishes.map((dish) => 
              dish.id === updatedDish.id ? updatedDish : dish
            )
          };
        }
        return restaurant;
      })
    );
  };

  const deleteDish = (dishId: string, restaurantId: string) => {
    setRestaurants((prevRestaurants) => 
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            dishes: restaurant.dishes.filter((dish) => dish.id !== dishId)
          };
        }
        return restaurant;
      })
    );
  };

  const value = {
    restaurants,
    addRestaurant,
    getRestaurant,
    addDish,
    updateDish,
    deleteDish
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
