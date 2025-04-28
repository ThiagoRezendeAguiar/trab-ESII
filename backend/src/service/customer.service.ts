import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../utils/errors";
import { CreateCustomerInput, LoginCustomerInput, UpdateCustomerInput } from "../model/customer.model";
import { compare, hash } from 'bcryptjs';
import jwt from "jsonwebtoken";
import { env } from "process";

@injectable()
export class CustomerService {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

    async create(data: CreateCustomerInput) {
        const { name, email, password, phone } = data;
        
        if(!email){
            throw new Error ('Email incorrect');
        }

        if(!password){
            throw new Error ('Password incorrect');
        }

        const userAlreadyExists = await this.prisma.customer.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error('User already exists');
        } 
        const passwordHash = await hash(password, 8);
    
        const user = await this.prisma.customer.create({
            data:{
                name: name,
                email: email,
                phone: phone,
                password: passwordHash
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
            }
        })

        return user;    

    }

    async findFirst(data: LoginCustomerInput) {
        const { email, password } = data;

        if(!email || !password){
            throw new Error ('Email/password required');
        }

        const user = await this.prisma.customer.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            throw new Error('Email/password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch ){
            throw new Error('Email/password incorrect');
        }

        const token = jwt.sign({
            name: user.name,
            email: user.email,
       },
       env.JWT_SECRET as string,
       {
        subject: user.id,
        expiresIn: '30d'
       }
    
    )
    
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }

    async findAll() {
        return this.prisma.customer.findMany();
    }

    async findById(id: string) {
        const customer = await this.prisma.customer.findUnique({
            where: { id }
        });
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        return customer;
    }

    async update(id: string, data: UpdateCustomerInput) {
        const customer = await this.findById(id);
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        return this.prisma.customer.update({
            where: { id },
            data
        });
    }

    async delete(id: string) {
        const customer = await this.findById(id);
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        return this.prisma.customer.delete({
            where: { id }
        });
    }
}