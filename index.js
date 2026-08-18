import 'dotenv/config'
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';


//  Inicializando aplicação express
const app = express();

//Utilizando CORS (pensar na explicação dps)
app.use(cors());

app.use(express.json());

// Importar rotas
app.use(userRoutes);

//Porta do servidor
const PORT = 3000;

//Definindo rotas utilizadas na aplicação

app.listen(PORT,() => {
    console.log(`Server on!`);
})