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
import { Plus, Utensils, Search, Trash, Upload } from 'lucide-react';

const Admin = () => {
  const { restaurants, addRestaurant, removeRestaurant } = useRestaurants();
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [restaurantLogo, setRestaurantLogo] = useState('');
  const [restaurantCover, setRestaurantCover] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    if (!username.trim() || !password.trim()) {
      toast.error('Username and password are required for restaurant owner');
      return;
    }

    const newRestaurantId = addRestaurant(
      {
        name: restaurantName,
        description: restaurantDescription,
        logoUrl: restaurantLogo || 'https://source.unsplash.com/random/?restaurant,logo',
        coverImageUrl: restaurantCover || 'https://source.unsplash.com/random/?restaurant,food',
        dishes: [],
        sections: [] // Make sure to include this property
      }, 
      username, 
      password
    );

    toast.success(`Restaurant ${restaurantName} has been added with owner account!`);
    setRestaurantName('');
    setRestaurantDescription('');
    setRestaurantLogo('');
    setRestaurantCover('');
    setUsername('');
    setPassword('');
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (type === 'logo') {
          setRestaurantLogo(result);
        } else {
          setRestaurantCover(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Restaurant Admin Dashboard</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto m-2">
            <DialogHeader>
              <DialogTitle>Add New Restaurant</DialogTitle>
              <DialogDescription>
                Enter details about the new restaurant you want to onboard.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Restaurant Information</h3>
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Restaurant Name *
                  </label>
                  <Input
                    id="name"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="Enter restaurant name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={restaurantDescription}
                    onChange={(e) => setRestaurantDescription(e.target.value)}
                    placeholder="Brief description of the restaurant"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Logo Image (Recommended: 200x200px, square format)
                  </label>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      className="cursor-pointer"
                    />
                    {restaurantLogo && (
                      <div className="h-20 w-20 rounded border overflow-hidden">
                        <img src={restaurantLogo} alt="Logo preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Cover Image (Recommended: 1200x400px, landscape format)
                  </label>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'cover')}
                      className="cursor-pointer"
                    />
                    {restaurantCover && (
                      <div className="h-24 w-full rounded border overflow-hidden">
                        <img src={restaurantCover} alt="Cover preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium text-lg">Owner Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                      Username *
                    </label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Owner's login username"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Owner's login password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleAddRestaurant} className="w-full sm:w-auto">Add Restaurant</Button>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
