
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  coverImageUrl?: string;
  dishes: Dish[];
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  description?: string;
  restaurantId: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  restaurantId: string;
  sectionId: string;
}

export interface RestaurantOwner {
  id: string;
  username: string;
  password: string; // In a real app, we would hash this
  restaurantId: string;
}
