import "reflect-metadata";
import { container } from "tsyringe";
import { PizzaService } from "../service/pizza.service";
import { prisma } from "./prisma";
import { PrismaClient } from "@prisma/client";
import { PizzaController } from "../controller/pizza.controller";

container.register('PrismaClient', {useValue: prisma});

container.register('PizzaController', {useClass: PizzaController});
container.register('PizzaService', {useClass: PizzaService});

export { container };