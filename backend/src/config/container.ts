import "reflect-metadata";
import { container } from "tsyringe";
import { PizzaService } from "../service/pizza.service";
import { prisma } from "./prisma";
import { PizzaController } from "../controller/pizza.controller";
import { CustomerService } from "../service/customer.service";
import { CustomerController } from "../controller/customer.controller";
import { AddressController } from "../controller/address.controller";
import { AddressService } from "../service/address.service";

container.register('PrismaClient', {useValue: prisma});

container.register('PizzaController', {useClass: PizzaController});
container.register('PizzaService', {useClass: PizzaService});

container.register('CustomerController', {useClass: CustomerController});
container.register('CustomerService', {useClass: CustomerService});

container.register('AddressController', {useClass: AddressController});
container.register('AddressService', {useClass: AddressService});

export { container };