import React, { createContext, useState, useContext, useEffect } from 'react';
import { Restaurant, Dish, RestaurantOwner, Section } from '../types/restaurant';

interface RestaurantContextType {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>, username: string, password: string) => string;
  getRestaurant: (id: string) => Restaurant | undefined;
  addDish: (restaurantId: string, sectionId: string, dish: Omit<Dish, 'id' | 'restaurantId' | 'sectionId'>) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (dishId: string, restaurantId: string) => void;
  removeRestaurant: (id: string) => void;
  authenticateOwner: (username: string, password: string) => string | null;
  restaurantOwners: RestaurantOwner[];
  currentOwner: RestaurantOwner | null;
  setCurrentOwner: (owner: RestaurantOwner | null) => void;
  logout: () => void;
  addSection: (restaurantId: string, section: Omit<Section, 'id' | 'restaurantId'>) => string;
  updateSection: (section: Section) => void;
  deleteSection: (sectionId: string, restaurantId: string) => void;
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
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Handle data migration for existing restaurants that don't have sections
      return parsedData.map((restaurant: any) => ({
        ...restaurant,
        sections: restaurant.sections || [],
        dishes: restaurant.dishes.map((dish: any) => ({
          ...dish,
          sectionId: dish.sectionId || 'default'
        }))
      }));
    }
    return [];
  });

  const [restaurantOwners, setRestaurantOwners] = useState<RestaurantOwner[]>(() => {
    const storedOwners = localStorage.getItem('restaurantOwners');
    return storedOwners ? JSON.parse(storedOwners) : [];
  });

  const [currentOwner, setCurrentOwner] = useState<RestaurantOwner | null>(() => {
    const storedOwner = localStorage.getItem('currentOwner');
    return storedOwner ? JSON.parse(storedOwner) : null;
  });

  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('restaurantOwners', JSON.stringify(restaurantOwners));
  }, [restaurantOwners]);

  useEffect(() => {
    if (currentOwner) {
      localStorage.setItem('currentOwner', JSON.stringify(currentOwner));
    } else {
      localStorage.removeItem('currentOwner');
    }
  }, [currentOwner]);

  const addRestaurant = (newRestaurant: Omit<Restaurant, 'id'>, username: string, password: string) => {
    const id = `restaurant-${Date.now()}`;
    const restaurant = { 
      ...newRestaurant, 
      id,
      sections: [],
      dishes: newRestaurant.dishes || [] 
    };
    
    setRestaurants((prev) => [...prev, restaurant]);
    
    // Create restaurant owner credentials
    const owner: RestaurantOwner = {
      id: `owner-${Date.now()}`,
      username,
      password, // In a real app, we would hash this
      restaurantId: id
    };
    
    setRestaurantOwners((prev) => [...prev, owner]);
    return id;
  };

  const getRestaurant = (id: string) => {
    return restaurants.find((r) => r.id === id);
  };

  const removeRestaurant = (id: string) => {
    setRestaurants((prev) => prev.filter(restaurant => restaurant.id !== id));
    // Also remove the owner
    setRestaurantOwners((prev) => prev.filter(owner => owner.restaurantId !== id));
  };

  const addSection = (restaurantId: string, newSection: Omit<Section, 'id' | 'restaurantId'>) => {
    const sectionId = `section-${Date.now()}`;
    
    setRestaurants((prevRestaurants) => 
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            sections: [...restaurant.sections, { ...newSection, id: sectionId, restaurantId }]
          };
        }
        return restaurant;
      })
    );

    return sectionId;
  };

  const updateSection = (updatedSection: Section) => {
    setRestaurants((prevRestaurants) => 
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === updatedSection.restaurantId) {
          return {
            ...restaurant,
            sections: restaurant.sections.map((section) => 
              section.id === updatedSection.id ? updatedSection : section
            )
          };
        }
        return restaurant;
      })
    );
  };

  const deleteSection = (sectionId: string, restaurantId: string) => {
    setRestaurants((prevRestaurants) => 
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          // First, filter out the section
          const updatedSections = restaurant.sections.filter(
            (section) => section.id !== sectionId
          );
          
          // Then, filter out all dishes that were in this section
          const updatedDishes = restaurant.dishes.filter(
            (dish) => dish.sectionId !== sectionId
          );
          
          return {
            ...restaurant,
            sections: updatedSections,
            dishes: updatedDishes
          };
        }
        return restaurant;
      })
    );
  };

  const addDish = (restaurantId: string, sectionId: string, newDish: Omit<Dish, 'id' | 'restaurantId' | 'sectionId'>) => {
    const dishId = `dish-${Date.now()}`;
    
    setRestaurants((prevRestaurants) => 
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            dishes: [...restaurant.dishes, { ...newDish, id: dishId, restaurantId, sectionId }]
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

  const authenticateOwner = (username: string, password: string): string | null => {
    const owner = restaurantOwners.find(
      (owner) => owner.username === username && owner.password === password
    );
    
    if (owner) {
      setCurrentOwner(owner);
      return owner.restaurantId;
    }
    
    return null;
  };

  const logout = () => {
    setCurrentOwner(null);
  };

  const value = {
    restaurants,
    addRestaurant,
    getRestaurant,
    addDish,
    updateDish,
    deleteDish,
    removeRestaurant,
    authenticateOwner,
    restaurantOwners,
    currentOwner,
    setCurrentOwner,
    logout,
    addSection,
    updateSection,
    deleteSection
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
