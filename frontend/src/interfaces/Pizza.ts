export interface Pizza {
  id: string;
  name: string;
  description?: string;
  price: number;
  ingredients: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}