
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { QrCode, Download } from 'lucide-react';
import QRCode from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// We'll reuse the RestaurantAdmin component
import RestaurantAdmin from './RestaurantAdmin';

const OwnerDashboard = () => {
  const { currentOwner, logout, getRestaurant } = useRestaurants();
  const navigate = useNavigate();
  const [isQrDialogOpen, setIsQrDialogOpen] = React.useState(false);

  useEffect(() => {
    if (!currentOwner) {
      toast.error('You must be logged in to access this page');
      navigate('/login');
      return;
    }
  }, [currentOwner, navigate]);

  const restaurant = currentOwner ? getRestaurant(currentOwner.restaurantId) : undefined;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
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

  const restaurantUrl = restaurant 
    ? `${window.location.origin}/restaurant/${restaurant.id}`
    : '';

  if (!currentOwner || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-8">Please log in to access this page.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Owner Dashboard</h1>
          <p className="text-gray-500">Welcome, {currentOwner.username}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsQrDialogOpen(true)}
          >
            <QrCode className="mr-2 h-4 w-4" />
            Restaurant QR Code
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
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
            <p className="text-xs text-muted-foreground mt-2">{restaurantUrl}</p>
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
      
      <div className="mb-6 p-4 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Your Restaurant: {restaurant.name}</h2>
        <p className="text-gray-600">{restaurant.description}</p>
        <div className="mt-3 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(restaurantUrl);
              toast.success('Restaurant URL copied to clipboard');
            }}
          >
            Copy Restaurant URL
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(`/restaurant/${restaurant.id}`, '_blank')}
          >
            View Public Page
          </Button>
        </div>
      </div>
      
      {/* Reuse the existing RestaurantAdmin component with the restaurant ID */}
      <RestaurantAdmin />
    </div>
  );
};

export default OwnerDashboard;
