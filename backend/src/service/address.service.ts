import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { CustomerService } from "./customer.service";
import { AppError, NotFoundError } from "../utils/errors";
import { CreateAddressInput, UpdateAddressInput } from "../model/address.model";

@injectable()
export class AddressService {
    constructor(
        @inject("PrismaClient") private prisma: PrismaClient,
        @inject("CustomerService")private customerService: CustomerService
    ) {}

    async create(customerId:string, data: CreateAddressInput) {
        const customer = await this.customerService.findById(customerId);

        if (!customer) {
            throw new NotFoundError("Customer");
        }

        const address = await this.prisma.address.create({
            data: {
                ...data,
                customer: {
                    connect: {
                        id: customer.id,
                    },
                },
            },
        });

        return address;
    }

    async findAllByCustomerId(customerId: string) {
        const customer = await this.customerService.findById(customerId);

        const addresses = await this.prisma.address.findMany({
            where: {
                customerId: customer.id,
            },
        });

        if (!addresses) {
            throw new NotFoundError("Addresses");
        }

        return addresses;
    }

    async findById(customerId: string, id: string) {
        const address = await this.prisma.address.findUnique({ 
            where: {
                id,
            },
        });

        if (!address) {
            throw new NotFoundError("Address");
        }

        if (address.customerId !== customerId) {
            throw new AppError("Address does not belong to this customer", 403);
        }

        return address;
    }

    async update(customerId: string, id: string, data: UpdateAddressInput) {
        const  existingAddress = await this.prisma.address.findUnique({
            where: { id }
        });

        if (!existingAddress) {
            throw new NotFoundError("Address");
        }

        if (existingAddress.customerId !== customerId) {
            throw new AppError("Address does not belong to this customer", 403);
        }

        const address = await this.prisma.address.update({
            where: {
                id,
            },
            data: {
                ...data,
                customer: {
                    connect: {
                        id: customerId,
                    },
                },
            },
        });

        return address;
    }

    async updateDefault(customerId: string, id: string) {
        const existingAddress = await this.prisma.address.findUnique({
            where: { id }
        });

        if (!existingAddress) {
            throw new NotFoundError("Address");
        }

        if (existingAddress.customerId !== customerId) {
            throw new AppError("Address does not belong to this customer", 403);
        }

        const defaultAddress = await this.prisma.address.findFirst({
            where: {
                customerId,
                isDefault: true,
            },
        });

        if (defaultAddress) {
            await this.prisma.address.update({
                where: { id: defaultAddress.id },
                data: { isDefault: false },
            });
        }

        const address = await this.prisma.address.update({
            where: { id },
            data: { isDefault: true },
        });

        return address;
       
    }

    async delete(customerId: string, id: string) {
        const customer = await this.customerService.findById(customerId);

        if (!customer) {
            throw new NotFoundError("Customer");
        }

        const address = await this.prisma.address.findUnique({
            where: { id }
        });

        if (!address) {
            throw new NotFoundError("Address");
        }

        return this.prisma.address.delete({
            where: { id }
        });
    }
}