
import React from 'react';
import { cn } from '@/lib/utils';

interface DishCardProps {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  className?: string;
}

const DishCard: React.FC<DishCardProps> = ({ name, description, price, imageUrl, className }) => {
  return (
    <div className={cn(
      "group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-lg font-medium text-gray-900">{name}</h3>
          <span className="text-menu-accent font-medium">{price}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default DishCard;
