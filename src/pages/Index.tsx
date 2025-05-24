import React from 'react';
import Hero from '@/components/Hero';
import MenuNav from '@/components/MenuNav';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';
import { Dish } from '@/components/MenuSection';

// Make dish data available globally for the DishDetail page
declare global {
  interface Window {
    starterDishes: Dish[];
    mainDishes: Dish[];
    seafoodDishes: Dish[];
    vegetarianDishes: Dish[];
    dessertDishes: Dish[];
    drinkItems: Dish[];
  }
}

const Index = () => {
  const restaurantInfo = {
    name: "Culinary Canvas",
    tagline: "An artful dining experience",
    address: "123 Gourmet Avenue, Foodville, CA 90210",
    phone: "(123) 456-7890",
    hours: "Monday - Friday: 11:00 AM - 10:00 PM\nSaturday - Sunday: 10:00 AM - 11:00 PM",
  };

  const menuCategories = [
    { id: "starters", name: "Starters" },
    { id: "mains", name: "Main Courses" },
    { id: "seafood", name: "Seafood" },
    { id: "vegetarian", name: "Vegetarian" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" }
  ];

  const starterDishes: Dish[] = [
    {
      id: "s1",
      name: "Truffle Arancini",
      description: "Crispy risotto balls infused with black truffle and stuffed with mozzarella cheese, served with garlic aioli",
      price: "$14",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop"
    },
    {
      id: "s2",
      name: "Beet Carpaccio",
      description: "Thinly sliced roasted beets with goat cheese, candied walnuts, and micro greens drizzled with balsamic glaze",
      price: "$12",
      imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=300&fit=crop"
    },
    {
      id: "s3",
      name: "Tuna Tartare",
      description: "Fresh diced tuna mixed with avocado, cucumber, and sesame-soy dressing, served with wonton crisps",
      price: "$16",
      imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=300&fit=crop"
    }
  ];

  const mainDishes: Dish[] = [
    {
      id: "m1",
      name: "Filet Mignon",
      description: "8oz grass-fed beef tenderloin with truffle mashed potatoes, roasted asparagus, and red wine reduction",
      price: "$38",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=300&fit=crop"
    },
    {
      id: "m2",
      name: "Herb Roasted Chicken",
      description: "Free-range half chicken marinated in herbs, served with wild mushroom risotto and seasonal vegetables",
      price: "$28",
      imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=300&fit=crop"
    },
    {
      id: "m3",
      name: "Braised Short Rib",
      description: "Slow-cooked beef short rib with celeriac purée, glazed root vegetables, and natural jus",
      price: "$32",
      imageUrl: "https://images.unsplash.com/photo-1544025162-f72b1d478c95?w=500&h=300&fit=crop"
    }
  ];

  const seafoodDishes: Dish[] = [
    {
      id: "sf1",
      name: "Pan-Seared Scallops",
      description: "Jumbo scallops with sweet corn purée, crispy pancetta, and micro herbs",
      price: "$34",
      imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500&h=300&fit=crop"
    },
    {
      id: "sf2",
      name: "Grilled Octopus",
      description: "Tender Spanish octopus with fingerling potatoes, chorizo, olives, and smoked paprika oil",
      price: "$28",
      imageUrl: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500&h=300&fit=crop"
    },
    {
      id: "sf3",
      name: "Miso Glazed Salmon",
      description: "Scottish salmon with miso glaze, forbidden rice, bok choy, and ginger-scallion sauce",
      price: "$30",
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=300&fit=crop"
    }
  ];

  const vegetarianDishes: Dish[] = [
    {
      id: "v1",
      name: "Wild Mushroom Risotto",
      description: "Creamy Arborio rice with assorted wild mushrooms, truffle oil, and Parmigiano-Reggiano",
      price: "$24",
      imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=300&fit=crop"
    },
    {
      id: "v2",
      name: "Mediterranean Vegetable Tart",
      description: "Roasted eggplant, zucchini, and bell peppers in a savory tart shell with herbed goat cheese",
      price: "$22",
      imageUrl: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&h=300&fit=crop"
    },
    {
      id: "v3",
      name: "Spiced Cauliflower Steak",
      description: "Thick-cut cauliflower steak with harissa spice, tahini sauce, pomegranate seeds, and pine nuts",
      price: "$20",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop"
    }
  ];

  const dessertDishes: Dish[] = [
    {
      id: "d1",
      name: "Dark Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla bean ice cream and raspberry coulis",
      price: "$14",
      imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=300&fit=crop"
    },
    {
      id: "d2",
      name: "Lemon Tart",
      description: "Tangy lemon curd in a buttery shortbread shell with Italian meringue and fresh berries",
      price: "$12",
      imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=300&fit=crop"
    },
    {
      id: "d3",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream",
      price: "$10",
      imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=300&fit=crop"
    }
  ];

  const drinkItems: Dish[] = [
    {
      id: "dr1",
      name: "Signature Cocktails",
      description: "Selection of house special cocktails crafted by our mixologists",
      price: "$14-18",
      imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=300&fit=crop"
    },
    {
      id: "dr2",
      name: "Wine Selection",
      description: "Carefully curated wines from around the world",
      price: "$12-20/glass",
      imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500&h=300&fit=crop"
    },
    {
      id: "dr3",
      name: "Artisanal Coffee",
      description: "Premium coffee and espresso drinks",
      price: "$5-8",
      imageUrl: "https://images.unsplash.com/photo-1545665277-5937489579f2?w=500&h=300&fit=crop"
    }
  ];

  // Make dish data available globally for the DishDetail page
  React.useEffect(() => {
    window.starterDishes = starterDishes;
    window.mainDishes = mainDishes;
    window.seafoodDishes = seafoodDishes;
    window.vegetarianDishes = vegetarianDishes;
    window.dessertDishes = dessertDishes;
    window.drinkItems = drinkItems;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero restaurantName={restaurantInfo.name} tagline={restaurantInfo.tagline} />
      
      <MenuNav categories={menuCategories} />
      
      <main className="flex-grow">
        <MenuSection 
          id="starters" 
          title="Starters" 
          description="Begin your culinary journey with our selection of appetizers"
          dishes={starterDishes} 
        />
        
        <div className="bg-gray-50">
          <MenuSection 
            id="mains" 
            title="Main Courses" 
            description="Expertly crafted entrées featuring the finest ingredients"
            dishes={mainDishes} 
          />
        </div>
        
        <MenuSection 
          id="seafood" 
          title="From the Sea" 
          description="Fresh seafood selections prepared with care"
          dishes={seafoodDishes} 
        />
        
        <div className="bg-gray-50">
          <MenuSection 
            id="vegetarian" 
            title="Vegetarian" 
            description="Creative plant-based dishes full of flavor"
            dishes={vegetarianDishes} 
          />
        </div>
        
        <MenuSection 
          id="desserts" 
          title="Desserts" 
          description="Sweet endings to complete your meal"
          dishes={dessertDishes} 
        />
        
        <div className="bg-gray-50">
          <MenuSection 
            id="drinks" 
            title="Beverages" 
            description="Refreshing drinks and spirits to complement your dining experience"
            dishes={drinkItems} 
          />
        </div>
      </main>
      
      <Footer 
        restaurantName={restaurantInfo.name}
        address={restaurantInfo.address}
        phone={restaurantInfo.phone}
        hours={restaurantInfo.hours}
      />
    </div>
  );
};

export default Index;
