import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
 
async function main() {
console.log('Iniciando seed do banco de dados - Populando pizzas...');
 
// Limpar pizzas existentes (opcional)
await prisma.pizza.deleteMany({});
 
console.log('Dados de pizzas existentes removidos.');
 
 
const pizzas = await Promise.all([
  prisma.pizza.create({
    data: {
      name: 'Margherita',
      description: 'Pizza italiana clássica com molho de tomate, mussarela fresca e manjericão',
      price: 12.99,
      ingredients: ['Molho de Tomate', 'Mussarela Fresca', 'Manjericão', 'Azeite de Oliva', 'Sal'],
      isAvailable: true,
      category: 'popular',
    },
  }),
  prisma.pizza.create({
    data: {
      name: 'Pepperoni Supreme',
      description: 'Tradicional favorita americana carregada com fatias de pepperoni e queijo extra',
      price: 14.99,
      ingredients: ['Molho de Tomate', 'Mussarela', 'Pepperoni', 'Orégano'],
      isAvailable: true,
      category: 'popular',
    },
  }),
  prisma.pizza.create({
    data: {
      name: 'Vegetariana',
      description: 'Legumes frescos do jardim em uma massa fina com nosso molho especial',
      price: 15.99,
      ingredients: ['Molho de Tomate', 'Mussarela', 'Pimentão', 'Cogumelos', 'Cebola', 'Azeitonas Pretas', 'Espinafre'],
      isAvailable: true,
      category: '',
    },
  }),
  prisma.pizza.create({
    data: {
      name: 'Frango com BBQ',
      description: 'Base de molho BBQ defumado coberto com frango grelhado, cebola roxa e coentro',
      price: 16.99,
      ingredients: ['Molho BBQ', 'Mussarela', 'Frango Grelhado', 'Cebola Roxa', 'Coentro', 'Gouda Defumado'],
      isAvailable: true,
      category: 'popular',
    },
  }),
  prisma.pizza.create({
    data: {
      name: 'Quatro Queijos',
      description: 'Combinação deliciosa de quatro queijos premium derretidos sobre nossa massa artesanal',
      price: 17.99,
      ingredients: ['Molho de Tomate', 'Mussarela', 'Gorgonzola', 'Parmesão', 'Provolone'],
      isAvailable: true,
      category: '',
    },
  }),
  prisma.pizza.create({
    data: {
      name: 'Calabresa',
      description: 'Pizza tradicional brasileira com calabresa fatiada e cebola',
      price: 13.99,
      ingredients: ['Molho de Tomate', 'Mussarela', 'Calabresa', 'Cebola', 'Orégano'],
      isAvailable: true,
      category: '',
    },
  }),
  prisma.pizza.create({
    data: {
      name: 'Portuguesa',
      description: 'Combinação de presunto, ovos, cebola, azeitonas e ervilhas',
      price: 15.49,
      ingredients: ['Molho de Tomate', 'Mussarela', 'Presunto', 'Ovos', 'Cebola', 'Azeitonas', 'Ervilhas'],
      isAvailable: true,
      category: '',
    },
  }),
  prisma.pizza.create({
    data: {
      name: 'Havaiana',
      description: 'Combinação doce e salgada de presunto e abacaxi',
      price: 14.49,
      ingredients: ['Molho de Tomate', 'Mussarela', 'Presunto', 'Abacaxi'],
      isAvailable: true,
      category: '',
    },
  }),
]);
 
console.log(`${pizzas.length} pizzas criadas com sucesso!`);
console.log('Seed concluído!');
}
 
main()
.catch((e) => {
  console.error('Erro durante o seed:', e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});