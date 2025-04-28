export interface Customer {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCustomerInput = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;
export type LoginCustomerInput = Pick<Customer, 'email' | 'password'>;
export type UpdateCustomerInput = Partial<CreateCustomerInput>;