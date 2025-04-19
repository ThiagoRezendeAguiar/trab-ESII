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

export type CreatePizzaInput = Omit<Pizza, 'id' |'isAvailable' |'createdAt' | 'updatedAt'>;
export type UpdatePizzaInput = Partial<CreatePizzaInput>;


