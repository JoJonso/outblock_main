import prisma from '../services/adapter.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function controller() {
    return {
        get prisma() {
            return prisma;
        },

        async registerUser(req,res) {
            try{

                // Informações da requisição
                const {
                    username,
                    email,
                    password,
                    birthDate
                } = req.body;

                // Criptogrando senha enviada na requisição
                const hashPassword = await bcrypt.hash(password,10);

                // Fazendo o insert de dados no banco
                const newUser = await prisma.user.create({
                    data: {
                        username:username,
                        email:email,
                        password: hashPassword,
                        birthDate: new Date(birthDate)
                    }
                })

                // Resposta da requisição: JSON do novo usuário
                res.status(201).json(newUser);
            }catch(error){
                // console.log(error.message); DEBUG

                // Erro no servidor
                res.status(500).json({error});
            }
        },

        async logUser(req,res) {
            try {
                const {
                    username,
                    password
                } = req.body;
                
                //  Verificando usuario e senha
                if (!username || !password) {
                    //  Caso não tenha, há tratamento do erro.
                    return res.status(400).json("Incorrect Password or username");
                }

                // Procurando usuário
                const logUser = await prisma.user.findUnique({
                    where: {
                        username: username,
                    }
                })

                // Verificando se o usuário existe
                if (!logUser) {
                    // Tratamento do erro
                    return res.status(404).json("User not found...");
                }

                // Criando o payload de jwt
                const payload = {
                    userId: logUser.id,
                    username: logUser.username,
                    birthDate: logUser.birthDate
                }

                //  Definindo o token jwt
                const token = jwt.sign(
                    payload,
                    process.env.MY_SECRET_KEY, 
                    {
                        expiresIn:"7d"
                    }
                );

                // Comparando senha enviada na requisição com senha do banco
                const matchingPassword = await bcrypt.compare(password,logUser.password);

                if (matchingPassword) {
                    //Realiza o login com sucesso
                    return res.status(200).json(token);
                }
                
                // Caso a senha seja incorreta, o login não é realizado
                res.status(401).json("Login failed...");
            }catch(error) {
                console.log(error.message)
                // Erro no servidor
                res.status(500).json("Internal server error!");
            }
        },

        async getUser(req,res) {
           try{
                const { userId } = req.user;

                const findUser = await prisma.user.findUnique({
                    where:{
                        id: parseInt(userId)
                    }
                })
                
                const userInfo = {
                    userId: findUser.id,
                    username: findUser.username,
                    userBirth: findUser.birthDate
                }
                res.status(200).json(userInfo);
           }catch(error){
                console.log(error.message)
                res.status(500).json("Internal server error!");
           } 
        }
    }
}

export default controller;