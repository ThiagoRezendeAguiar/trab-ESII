export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  ingredients: string[];
  isAvailable: boolean;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}