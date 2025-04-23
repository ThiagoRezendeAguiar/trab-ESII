export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    ingredients: string[];
    imageUrl?: string;
    isAvailable: boolean;
  }