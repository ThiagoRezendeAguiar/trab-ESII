export interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCustomerInput = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCustomerInput = Partial<CreateCustomerInput>;