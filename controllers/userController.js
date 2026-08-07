import prisma from '../adapter.js';
import bcrypt from 'bcrypt';

function controller() {
    return {
        get prisma() {
            return prisma;
        },

        async registerUser(req,res) {
            try{
                const {
                    username,
                    email,
                    password,
                    birthDate
                } = req.body;

                const hashPassword = await bcrypt.hash(password,10);

                const newUser = await prisma.user.create({
                    data: {
                        username:username,
                        email:email,
                        password: hashPassword,
                        birthDate: new Date(birthDate)
                    }
                })

                res.status(201).json(newUser);
            }catch(error){
                console.log(error.message);
                res.status(500).json({error});
            }
        },

        async logUser(req,res) {
            try {
                const {
                    username,
                    password
                } = req.body;
                
                if (!username || !password) {
                    return res.status(400).json("Incorrect Password or username");
                }

                const logUser = await prisma.user.findUnique({
                    where: {
                        username: username,
                    }
                })

                if (!logUser) {
                    return res.status(404).json("User not found...");
                }

                const matchingPassword = await bcrypt.compare(password,logUser.password);


                if (matchingPassword) {
                    return res.status(200).json("Login Sucessfully!");
                }else {
                    return res.status(401).json("Login failed...");
                }

            }catch(error) {
                res.status(500).json("Internal server error!");
            }
        }
    }
}

export default controller;