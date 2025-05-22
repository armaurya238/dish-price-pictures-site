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
      imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974&auto=format"
    },
    {
      id: "s2",
      name: "Beet Carpaccio",
      description: "Thinly sliced roasted beets with goat cheese, candied walnuts, and micro greens drizzled with balsamic glaze",
      price: "$12",
      imageUrl: "https://images.unsplash.com/photo-1633436375153-11716ebe9667?q=80&w=1972&auto=format"
    },
    {
      id: "s3",
      name: "Tuna Tartare",
      description: "Fresh diced tuna mixed with avocado, cucumber, and sesame-soy dressing, served with wonton crisps",
      price: "$16",
      imageUrl: "https://images.unsplash.com/photo-1626200419199-391ae4be7a44?q=80&w=1974&auto=format"
    }
  ];

  const mainDishes: Dish[] = [
    {
      id: "m1",
      name: "Filet Mignon",
      description: "8oz grass-fed beef tenderloin with truffle mashed potatoes, roasted asparagus, and red wine reduction",
      price: "$38",
      imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format"
    },
    {
      id: "m2",
      name: "Herb Roasted Chicken",
      description: "Free-range half chicken marinated in herbs, served with wild mushroom risotto and seasonal vegetables",
      price: "$28",
      imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=2076&auto=format"
    },
    {
      id: "m3",
      name: "Braised Short Rib",
      description: "Slow-cooked beef short rib with celeriac purée, glazed root vegetables, and natural jus",
      price: "$32",
      imageUrl: "https://images.unsplash.com/photo-1544025162-f72b1d478c95?q=80&w=2069&auto=format"
    }
  ];

  const seafoodDishes: Dish[] = [
    {
      id: "sf1",
      name: "Pan-Seared Scallops",
      description: "Jumbo scallops with sweet corn purée, crispy pancetta, and micro herbs",
      price: "$34",
      imageUrl: "https://images.unsplash.com/photo-1632807519158-e02ce273736e?q=80&w=2066&auto=format"
    },
    {
      id: "sf2",
      name: "Grilled Octopus",
      description: "Tender Spanish octopus with fingerling potatoes, chorizo, olives, and smoked paprika oil",
      price: "$28",
      imageUrl: "https://images.unsplash.com/photo-1599084993091-1cb5c0129564?q=80&w=1974&auto=format"
    },
    {
      id: "sf3",
      name: "Miso Glazed Salmon",
      description: "Scottish salmon with miso glaze, forbidden rice, bok choy, and ginger-scallion sauce",
      price: "$30",
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format"
    }
  ];

  const vegetarianDishes: Dish[] = [
    {
      id: "v1",
      name: "Wild Mushroom Risotto",
      description: "Creamy Arborio rice with assorted wild mushrooms, truffle oil, and Parmigiano-Reggiano",
      price: "$24",
      imageUrl: "https://images.unsplash.com/photo-1633895545365-bcdb53b4dd06?q=80&w=1972&auto=format"
    },
    {
      id: "v2",
      name: "Mediterranean Vegetable Tart",
      description: "Roasted eggplant, zucchini, and bell peppers in a savory tart shell with herbed goat cheese",
      price: "$22",
      imageUrl: "https://images.unsplash.com/photo-1464500422302-6188776dcbf4?q=80&w=1974&auto=format"
    },
    {
      id: "v3",
      name: "Spiced Cauliflower Steak",
      description: "Thick-cut cauliflower steak with harissa spice, tahini sauce, pomegranate seeds, and pine nuts",
      price: "$20",
      imageUrl: "https://images.unsplash.com/photo-1553557202-676ab853382a?q=80&w=1974&auto=format"
    }
  ];

  const dessertDishes: Dish[] = [
    {
      id: "d1",
      name: "Dark Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla bean ice cream and raspberry coulis",
      price: "$14",
      imageUrl: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=1974&auto=format"
    },
    {
      id: "d2",
      name: "Lemon Tart",
      description: "Tangy lemon curd in a buttery shortbread shell with Italian meringue and fresh berries",
      price: "$12",
      imageUrl: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?q=80&w=2002&auto=format"
    },
    {
      id: "d3",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream",
      price: "$10",
      imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1974&auto=format"
    }
  ];

  const drinkItems: Dish[] = [
    {
      id: "dr1",
      name: "Signature Cocktails",
      description: "Selection of house special cocktails crafted by our mixologists",
      price: "$14-18",
      imageUrl: "https://images.unsplash.com/photo-1578664182340-5eeb67a8e8bf?q=80&w=1974&auto=format"
    },
    {
      id: "dr2",
      name: "Wine Selection",
      description: "Carefully curated wines from around the world",
      price: "$12-20/glass",
      imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format"
    },
    {
      id: "dr3",
      name: "Artisanal Coffee",
      description: "Premium coffee and espresso drinks",
      price: "$5-8",
      imageUrl: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1964&auto=format"
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
