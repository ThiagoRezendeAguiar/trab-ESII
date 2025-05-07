# PizzaApp - Projeto de Faculdade
 
## Requisitos
 
- Node.js
- npm ou yarn
- Banco de dados PostgreSQL
 
## Configuração Inicial
 
1. Clone o repositório:
git clone https://github.com/ThiagoRezendeAguiar/trab-ESII.git
 
 
2. Configure o arquivo `.env` no diretório `backend`:
 
Edite o arquivo com suas configurações de banco de dados
 
DATABASE_URL="postgresql://usuario:senha@localhost:5432/postgres"
JWT_SECRET="sua_chave_secreta_para_jwt"
STRIPE_SECRET= 'chave_api_stripe'
 
3. Inicie o projeto completo na própria raiz do projeto(instalação, configuração do banco e inicialização):
npm run start:fresh
 
 
Este comando irá:
- Instalar todas as dependências (backend e frontend)
- Configurar o banco de dados e popular com pizzas
- Iniciar o servidor backend e o aplicativo frontend
 
4. Após a configuração, o aplicativo estará disponível em:
- Frontend: http://localhost:5173 (ou a porta configurada pelo Vite)
- Backend API: http://localhost:3000 (ou a porta configurada no backend)
 
5. Caso seja sua segunda vez executando utilize
npm run dev