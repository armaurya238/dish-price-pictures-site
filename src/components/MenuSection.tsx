
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
    <section id={id} className="py-16 menu-container">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
