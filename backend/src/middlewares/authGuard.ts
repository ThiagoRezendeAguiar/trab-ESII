import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient, Customer } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

@injectable() // Decorador para permitir injeção
export class AuthGuard {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient // Injeção do Prisma
  ) {}

  async execute(
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void
  ) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return reply.status(401).send({ errors: ["Acesso negado."] });
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      const user = await this.prisma.customer.findUnique({ 
        where: { id: verified.id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,      
          createdAt: true,  
          updatedAt: true   
        }
      });

      if (!user) {
        return reply.status(401).send({ errors: ["Usuário não encontrado."] });
      }

      request.customer = user;
      done();

    } catch (error) {
      return reply.status(401).send({ errors: ["Token inválido."] });
    }
  }
}