
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  coverImageUrl?: string;
  dishes: Dish[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  restaurantId: string;
}
