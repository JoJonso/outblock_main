import prisma from '../adapter.js';

export async function registerUser(req,res) {

    try{

        const {
            username,
            email,
            password,
            birthDate
        } = req.body;

        const newUser = await prisma.user.create({
            data: {
                username:username,
                email:email,
                password:password,
                birthDate: new Date(birthDate)
            }
        })

        res.status(201).json(newUser);
    }catch(error){
        console.log(error.message);
        res.status(500).json({error});
    }
}