import express from 'express';
import controller from '../controllers/userController.js';

//  Inicializando rotas do usuário
const routes = express.Router();

const userController = controller();
//  Rotas

//  Cadastrar usuário
routes.post('/registerUser',userController.registerUser);
routes.post('/loginUser',userController.logUser);

//  Logar usuário

export default routes;


