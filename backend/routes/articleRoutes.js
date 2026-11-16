import express from 'express';
import controller from '../controllers/articleController.js';
import authUser from '../services/auth.js';

//  Inicializando rotas do usuário
const routes = express.Router();

const articleController = controller();

routes.post('/postArticle',articleController.postArticle);
routes.delete('/deleteArticle',articleController.deleteArticle);

//  Logar usuário
export default routes;


