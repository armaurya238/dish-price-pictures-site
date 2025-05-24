import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dish, Section } from '@/types/restaurant';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Trash, LinkIcon, QrCode, Download } from 'lucide-react';
import SectionManager from '@/components/SectionManager';
import QRCode from 'qrcode.react';

const RestaurantAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurant, addDish, updateDish, deleteDish, addSection, updateSection, deleteSection } = useRestaurants();
  const [restaurant, setRestaurant] = useState(getRestaurant(id || ''));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  
  // Form state
  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishImageUrl, setDishImageUrl] = useState('');

  useEffect(() => {
    if (!restaurant) {
      toast.error('Restaurant not found');
      navigate('/admin');
      return;
    }
    
    // Set default selected section if there are sections
    if (restaurant.sections?.length > 0 && !selectedSectionId) {
      setSelectedSectionId(restaurant.sections[0].id);
    }
  }, [restaurant, navigate, selectedSectionId]);

  useEffect(() => {
    // Refresh restaurant data when changes occur
    setRestaurant(getRestaurant(id || ''));
  }, [id, getRestaurant]);

  const handleOpenAddDishDialog = () => {
    if (!selectedSectionId && restaurant?.sections.length > 0) {
      toast.error('Please select a section first');
      return;
    }
    
    if (restaurant?.sections.length === 0) {
      toast.error('Please create a section first before adding dishes');
      return;
    }
    
    setEditingDish(null);
    setDishName('');
    setDishDescription('');
    setDishPrice('');
    setDishImageUrl('');
    setIsDialogOpen(true);
  };

  const handleOpenEditDishDialog = (dish: Dish) => {
    setEditingDish(dish);
    setDishName(dish.name);
    setDishDescription(dish.description);
    setDishPrice(dish.price);
    setDishImageUrl(dish.imageUrl);
    setIsDialogOpen(true);
  };

  const handleSaveDish = () => {
    if (!dishName.trim() || !dishPrice.trim()) {
      toast.error('Dish name and price are required');
      return;
    }

    if (!selectedSectionId && restaurant?.sections.length > 0) {
      toast.error('Please select a section first');
      return;
    }

    const imageUrl = dishImageUrl || 'https://source.unsplash.com/random/?food,dish';

    if (editingDish) {
      // Update existing dish
      updateDish({
        ...editingDish,
        name: dishName,
        description: dishDescription,
        price: dishPrice,
        imageUrl,
        sectionId: selectedSectionId || editingDish.sectionId
      });
      toast.success(`${dishName} has been updated!`);
    } else {
      // Add new dish
      addDish(id || '', selectedSectionId || 'default', {
        name: dishName,
        description: dishDescription,
        price: dishPrice,
        imageUrl
      });
      toast.success(`${dishName} has been added to the menu!`);
    }

    setIsDialogOpen(false);
    setDishName('');
    setDishDescription('');
    setDishPrice('');
    setDishImageUrl('');
  };

  const handleDeleteDish = (dish: Dish) => {
    if (window.confirm(`Are you sure you want to delete ${dish.name}?`)) {
      deleteDish(dish.id, dish.restaurantId);
      toast.success(`${dish.name} has been removed from the menu`);
    }
  };

  const handleAddSection = (name: string, description: string) => {
    const newSectionId = addSection(id || '', { name, description });
    setSelectedSectionId(newSectionId);
  };

  const handleEditSection = (section: Section) => {
    updateSection(section);
  };

  const handleDeleteSection = (sectionId: string) => {
    deleteSection(sectionId, id || '');
    
    // If the deleted section was selected, select another one
    if (selectedSectionId === sectionId) {
      const remainingSections = restaurant?.sections.filter(s => s.id !== sectionId);
      if (remainingSections?.length > 0) {
        setSelectedSectionId(remainingSections[0].id);
      } else {
        setSelectedSectionId(null);
      }
    }
  };
  
  const handleDownloadQR = () => {
    const canvas = document.getElementById('restaurant-qrcode') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${restaurant?.name.replace(/\s+/g, '-').toLowerCase()}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // Generate the correct restaurant-specific URL
  const restaurantUrl = `${window.location.origin}/restaurant/${id}`;

  // Get dishes for the selected section
  const sectionDishes = restaurant?.dishes.filter(
    dish => dish.sectionId === selectedSectionId
  ) || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setDishImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-500">Manage restaurant menu</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => navigate('/admin')} className="text-xs sm:text-sm">
            Back to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(restaurantUrl);
              toast.success('Restaurant URL copied to clipboard');
            }}
            className="text-xs sm:text-sm"
          >
            <LinkIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Copy URL
          </Button>
          <Button 
            variant="outline"
            onClick={() => setIsQrDialogOpen(true)}
            className="text-xs sm:text-sm"
          >
            <QrCode className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            QR Code
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            className="text-xs sm:text-sm"
          >
            View Public Page
          </Button>
        </div>
      </div>

      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Restaurant QR Code</DialogTitle>
            <DialogDescription>
              Customers can scan this QR code to view your restaurant menu
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCode 
                id="restaurant-qrcode"
                value={restaurantUrl} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center break-all">{restaurantUrl}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsQrDialogOpen(false)} variant="outline">
              Close
            </Button>
            <Button onClick={handleDownloadQR}>
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-8 p-6 border rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Restaurant Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <p>{restaurant.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Description</p>
            <p>{restaurant.description || 'No description provided'}</p>
          </div>
        </div>
      </div>

      {/* Section Manager */}
      <SectionManager 
        restaurantId={id || ''}
        sections={restaurant.sections || []}
        onAddSection={handleAddSection}
        onEditSection={handleEditSection}
        onDeleteSection={handleDeleteSection}
        onSelectSection={setSelectedSectionId}
        selectedSectionId={selectedSectionId}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          {selectedSectionId 
            ? `Menu Items in ${restaurant.sections.find(s => s.id === selectedSectionId)?.name || 'Selected Section'} (${sectionDishes.length})`
            : `Menu Items (${restaurant.dishes?.length || 0})`}
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenAddDishDialog} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Dish
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[550px] max-h-[90vh] overflow-y-auto m-2">
            <DialogHeader>
              <DialogTitle>{editingDish ? 'Edit Dish' : 'Add New Dish'}</DialogTitle>
              <DialogDescription>
                Enter the details for this menu item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="dish-name" className="text-sm font-medium">
                  Dish Name *
                </label>
                <Input
                  id="dish-name"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="Dish name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dish-description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="dish-description"
                  value={dishDescription}
                  onChange={(e) => setDishDescription(e.target.value)}
                  placeholder="Dish description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dish-price" className="text-sm font-medium">
                  Price *
                </label>
                <Input
                  id="dish-price"
                  value={dishPrice}
                  onChange={(e) => setDishPrice(e.target.value)}
                  placeholder="$0.00"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Dish Image (Recommended: 800x600px, landscape format)
                </label>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {dishImageUrl && (
                    <div className="h-32 w-full overflow-hidden rounded border">
                      <img
                        src={dishImageUrl}
                        alt="Dish preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleSaveDish} className="w-full sm:w-auto">
                {editingDish ? 'Save Changes' : 'Add Dish'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile-optimized table */}
      {sectionDishes && sectionDishes.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionDishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell>
                      <div className="h-16 w-16 rounded overflow-hidden bg-gray-100">
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{dish.name}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="line-clamp-2">{dish.description}</div>
                    </TableCell>
                    <TableCell>{dish.price}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEditDishDialog(dish)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteDish(dish)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Mobile card layout */}
          <div className="block sm:hidden space-y-4 p-4">
            {sectionDishes.map((dish) => (
              <div key={dish.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{dish.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{dish.description}</p>
                    <p className="font-semibold">{dish.price}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEditDishDialog(dish)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteDish(dish)}
                    className="flex-1"
                  >
                    <Trash className="h-4 w-4 text-red-500 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          {restaurant.sections?.length > 0 ? (
            <>
              <h3 className="text-lg font-medium mb-2">No dishes in this section yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first dish to the selected section</p>
              <Button onClick={handleOpenAddDishDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Dish
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-2">Create a section first</h3>
              <p className="text-gray-500 mb-4">You need to create at least one section before adding dishes</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantAdmin;
