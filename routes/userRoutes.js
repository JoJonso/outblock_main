import express from 'express';
import controller from '../controllers/userController.js';
import authUser from '../services/auth.js';

//  Inicializando rotas do usuário
const routes = express.Router();

const userController = controller();
//  Rotas

//  Cadastrar usuário
routes.post('/registerUser',userController.registerUser);
routes.post('/loginUser',userController.logUser);

routes.get('/auth',authUser, (req,res) => {
    res.status(200).json("Authentication Succeed!")
})

routes.get('/me',authUser, userController.getUser);


//  Logar usuário
export default routes;


