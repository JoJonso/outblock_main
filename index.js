import express from 'express';
import userRoutes from './routes/userRoutes.js';

//  Inicializando aplicação express
const app = express();

app.use(express.json());

// Importar rotas
app.use(userRoutes);

//Porta do servidor
const PORT = 3000;

//Definindo rotas utilizadas na aplicação

app.listen(PORT,() => {
    console.log(`Server on!`);
})