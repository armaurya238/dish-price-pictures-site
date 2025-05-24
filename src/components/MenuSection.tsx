
import React from 'react';
import DishCard from './DishCard';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface MenuSectionProps {
  id: string;
  title: string;
  description?: string;
  dishes: Dish[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ id, title, description, dishes }) => {
  return (
    <section id={id} className="py-8 sm:py-16 menu-container">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-10 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>
          )}
        </div>
        
        {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              imageUrl={dish.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
