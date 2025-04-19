export interface Address {
    id: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
    customerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateAddressInput = Omit<Address, 'id' | 'customerId' |'createdAt' | 'updatedAt'>;
export type UpdateAddressInput = Partial<CreateAddressInput>;