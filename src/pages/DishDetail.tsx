
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { ChevronLeft } from 'lucide-react';

const DishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [category, setCategory] = React.useState<string>("");

  React.useEffect(() => {
    // This simulates fetching the dish data based on id
    // In a real application, this would be an API call
    const findDish = () => {
      // Import all menu sections from Index.tsx
      const sections = [
        { id: "starters", name: "Starters", dishes: window.starterDishes },
        { id: "mains", name: "Main Courses", dishes: window.mainDishes },
        { id: "seafood", name: "From the Sea", dishes: window.seafoodDishes },
        { id: "vegetarian", name: "Vegetarian", dishes: window.vegetarianDishes },
        { id: "desserts", name: "Desserts", dishes: window.dessertDishes },
        { id: "drinks", name: "Beverages", dishes: window.drinkItems }
      ];
      
      // Loop through sections to find the dish
      for (const section of sections) {
        if (section.dishes) {
          const foundDish = section.dishes.find((d: any) => d.id === id);
          if (foundDish) {
            setDish(foundDish);
            setCategory(section.name);
            break;
          }
        }
      }
      setLoading(false);
    };

    findDish();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Dish not found</h2>
          <Link to="/">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-10">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Menu
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="overflow-hidden rounded-lg">
              <img 
                src={dish.imageUrl} 
                alt={dish.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div>
              <span className="text-sm font-medium text-menu-accent uppercase tracking-wider">{category}</span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-3">{dish.name}</h1>
              <div className="text-xl font-medium text-menu-accent mb-6">{dish.price}</div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700">{dish.description}</p>
                
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h3 className="font-serif text-xl font-semibold mb-4">Chef's Notes</h3>
                  <p className="text-gray-600">
                    Our chef prepares this dish with locally-sourced ingredients, 
                    carefully selected for maximum flavor and freshness. Each 
                    {category.toLowerCase().includes("drink") ? " beverage " : " dish "} 
                    is made to order, ensuring the perfect dining experience.
                  </p>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h3 className="font-serif text-xl font-semibold mb-4">Ingredients</h3>
                  <p className="text-gray-600">
                    All our ingredients are carefully selected for quality and sustainability.
                    Please inform your server of any allergies or dietary requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer 
        restaurantName="Culinary Canvas"
        address="123 Gourmet Avenue, Foodville, CA 90210"
        phone="(123) 456-7890"
        hours="Monday - Friday: 11:00 AM - 10:00 PM\nSaturday - Sunday: 10:00 AM - 11:00 PM"
      />
    </div>
  );
};

export default DishDetail;
