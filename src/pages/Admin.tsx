
import React, { useState } from 'react';
import { useRestaurants } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Utensils, Search, Trash } from 'lucide-react';

const Admin = () => {
  const { restaurants, addRestaurant, removeRestaurant } = useRestaurants();
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [restaurantLogo, setRestaurantLogo] = useState('');
  const [restaurantCover, setRestaurantCover] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDelisting, setIsDelisting] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRestaurant = () => {
    if (!restaurantName.trim()) {
      toast.error('Restaurant name is required');
      return;
    }

    const newRestaurantId = addRestaurant({
      name: restaurantName,
      description: restaurantDescription,
      logoUrl: restaurantLogo || 'https://source.unsplash.com/random/?restaurant,logo',
      coverImageUrl: restaurantCover || 'https://source.unsplash.com/random/?restaurant,food',
      dishes: []
    });

    toast.success(`Restaurant ${restaurantName} has been added!`);
    setRestaurantName('');
    setRestaurantDescription('');
    setRestaurantLogo('');
    setRestaurantCover('');
    setIsDialogOpen(false);
    
    // Navigate to the restaurant menu management page
    navigate(`/admin/restaurant/${newRestaurantId}`);
  };

  const handleDelistRestaurant = (id: string) => {
    setRestaurantToDelete(id);
    setIsDelisting(true);
  };

  const confirmDelist = () => {
    if (restaurantToDelete) {
      removeRestaurant(restaurantToDelete);
      toast.success("Restaurant has been delisted successfully");
      setIsDelisting(false);
      setRestaurantToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Restaurant Admin Dashboard</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Restaurant</DialogTitle>
              <DialogDescription>
                Enter details about the new restaurant you want to onboard.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right col-span-1">
                  Name
                </label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="Restaurant name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right col-span-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={restaurantDescription}
                  onChange={(e) => setRestaurantDescription(e.target.value)}
                  placeholder="Restaurant description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="logo" className="text-right col-span-1">
                  Logo URL
                </label>
                <Input
                  id="logo"
                  className="col-span-3"
                  value={restaurantLogo}
                  onChange={(e) => setRestaurantLogo(e.target.value)}
                  placeholder="Logo image URL (optional)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="cover" className="text-right col-span-1">
                  Cover Image
                </label>
                <Input
                  id="cover"
                  className="col-span-3"
                  value={restaurantCover}
                  onChange={(e) => setRestaurantCover(e.target.value)}
                  placeholder="Cover image URL (optional)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddRestaurant}>Add Restaurant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search bar for restaurants */}
      <div className="mb-6 relative">
        <div className="flex items-center w-full max-w-md border rounded-md overflow-hidden">
          <Search className="h-4 w-4 mx-3 text-gray-500" />
          <Input
            placeholder="Search restaurants by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(restaurant => (
            <Card key={restaurant.id} className="overflow-hidden">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={restaurant.coverImageUrl || "https://source.unsplash.com/random/?restaurant,food"} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                    {restaurant.logoUrl && (
                      <img 
                        src={restaurant.logoUrl} 
                        alt={`${restaurant.name} logo`}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <CardTitle>{restaurant.name}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {restaurant.description || "No description available."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {restaurant.dishes.length} {restaurant.dishes.length === 1 ? 'dish' : 'dishes'} on menu
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                >
                  View Menu
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate(`/admin/restaurant/${restaurant.id}`)}
                  >
                    Manage Menu
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelistRestaurant(restaurant.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 border border-dashed rounded-lg">
            <Utensils className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No restaurants found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try a different search term" : "Start by adding your first restaurant"}
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Restaurant
            </Button>
          </div>
        )}
      </div>

      {/* Confirmation dialog for delisting a restaurant */}
      <Dialog open={isDelisting} onOpenChange={setIsDelisting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delist Restaurant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delist this restaurant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDelisting(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelist}>Delist Restaurant</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
