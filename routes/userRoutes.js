import express from 'express';
import { registerUser } from '../controllers/userController.js';

//  Inicializando rotas do usuário
const routes = express.Router();

//  Rotas

//  Cadastrar usuário
routes.post('/registerUser',registerUser);

//  Logar usuário

export default routes;


