import React, { createContext, useContext, useState, useEffect } from 'react';
import { Restaurant, Dish, Section } from '@/types/restaurant';

interface RestaurantContextType {
  restaurants: Restaurant[];
  currentOwner: { restaurantId: string; username: string } | null;
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>, username: string, password: string) => string;
  removeRestaurant: (id: string) => void;
  getRestaurant: (id: string) => Restaurant | undefined;
  addDish: (restaurantId: string, sectionId: string, dish: Omit<Dish, 'id' | 'restaurantId' | 'sectionId'>) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (dishId: string, restaurantId: string) => void;
  addSection: (restaurantId: string, section: Omit<Section, 'id' | 'restaurantId'>) => string;
  updateSection: (section: Section) => void;
  deleteSection: (sectionId: string, restaurantId: string) => void;
  authenticateOwner: (username: string, password: string) => string | null;
  logout: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

interface OwnerCredentials {
  restaurantId: string;
  username: string;
  password: string;
}

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [ownerCredentials, setOwnerCredentials] = useState<OwnerCredentials[]>([]);
  const [currentOwner, setCurrentOwner] = useState<{ restaurantId: string; username: string } | null>(null);

  useEffect(() => {
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants) {
      const parsedRestaurants = JSON.parse(storedRestaurants);
      console.log('Loaded restaurants from localStorage:', parsedRestaurants);
      setRestaurants(parsedRestaurants);
    }

    const storedCredentials = localStorage.getItem('ownerCredentials');
    if (storedCredentials) {
      const parsedCredentials = JSON.parse(storedCredentials);
      console.log('Loaded credentials from localStorage:', parsedCredentials);
      setOwnerCredentials(parsedCredentials);
    }
  }, []);

  const addRestaurant = (restaurant: Omit<Restaurant, 'id'>, username: string, password: string): string => {
    const id = Date.now().toString();
    const newRestaurant: Restaurant = {
      ...restaurant,
      id,
      dishes: [],
      sections: []
    };
    
    const updatedRestaurants = [...restaurants, newRestaurant];
    const newCredentials: OwnerCredentials = {
      restaurantId: id,
      username,
      password
    };
    const updatedCredentials = [...ownerCredentials, newCredentials];
    
    setRestaurants(updatedRestaurants);
    setOwnerCredentials(updatedCredentials);
    
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    localStorage.setItem('ownerCredentials', JSON.stringify(updatedCredentials));
    
    return id;
  };

  const authenticateOwner = (username: string, password: string): string | null => {
    console.log('Authenticating owner:', username, password);
    console.log('Available credentials:', ownerCredentials);
    console.log('Available restaurants:', restaurants);
    
    const credentials = ownerCredentials.find(
      cred => cred.username === username && cred.password === password
    );
    
    if (credentials) {
      console.log('Authentication successful for:', credentials);
      setCurrentOwner({
        restaurantId: credentials.restaurantId,
        username: credentials.username
      });
      return credentials.restaurantId;
    }
    
    console.log('Authentication failed - no matching credentials found');
    return null;
  };

  const logout = () => {
    setCurrentOwner(null);
  };

  const removeRestaurant = (id: string) => {
    const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));

    const updatedCredentials = ownerCredentials.filter(cred => cred.restaurantId !== id);
    setOwnerCredentials(updatedCredentials);
    localStorage.setItem('ownerCredentials', JSON.stringify(updatedCredentials));
  };

  const getRestaurant = (id: string): Restaurant | undefined => {
    console.log('Getting restaurant with ID:', id);
    console.log('Available restaurants:', restaurants);
    const restaurant = restaurants.find(restaurant => restaurant.id === id);
    console.log('Found restaurant:', restaurant);
    return restaurant;
  };

  const addDish = (restaurantId: string, sectionId: string, dish: Omit<Dish, 'id' | 'restaurantId' | 'sectionId'>) => {
    const id = Date.now().toString();
    const newDish: Dish = {
      id,
      restaurantId,
      sectionId,
      ...dish
    };

    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === restaurantId) {
        return {
          ...restaurant,
          dishes: [...restaurant.dishes, newDish]
        };
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const updateDish = (dish: Dish) => {
    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === dish.restaurantId) {
        return {
          ...restaurant,
          dishes: restaurant.dishes.map(d => d.id === dish.id ? dish : d)
        };
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const deleteDish = (dishId: string, restaurantId: string) => {
    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === restaurantId) {
        return {
          ...restaurant,
          dishes: restaurant.dishes.filter(dish => dish.id !== dishId)
        };
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const addSection = (restaurantId: string, section: Omit<Section, 'id' | 'restaurantId'>): string => {
    const id = Date.now().toString();
    const newSection: Section = {
      id,
      restaurantId,
      ...section
    };

    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === restaurantId) {
        return {
          ...restaurant,
          sections: [...restaurant.sections, newSection]
        };
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    return id;
  };

  const updateSection = (section: Section) => {
    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === section.restaurantId) {
        return {
          ...restaurant,
          sections: restaurant.sections.map(s => s.id === section.id ? section : s)
        };
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const deleteSection = (sectionId: string, restaurantId: string) => {
    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === restaurantId) {
        return {
          ...restaurant,
          sections: restaurant.sections.filter(section => section.id !== sectionId),
          dishes: restaurant.dishes.map(dish => ({ ...dish, sectionId: dish.sectionId === sectionId ? 'default' : dish.sectionId }))
        };
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const value: RestaurantContextType = {
    restaurants,
    currentOwner,
    addRestaurant,
    removeRestaurant,
    getRestaurant,
    addDish,
    updateDish,
    deleteDish,
    addSection,
    updateSection,
    deleteSection,
    authenticateOwner,
    logout
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};
