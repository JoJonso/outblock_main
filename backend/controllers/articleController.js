import prisma from '../services/adapter.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function controller() {
    return {
        get prisma() {
            return prisma;
        },

        async postArticle(req,res) {
            try{
                const {title,tags,content, userId} = req.body;

                if (!title || !tags || !content) {
                    res.status(400).json("Bad Request!");
                }

                const postArticle = await prisma.articles.create({
                    data: {
                        title: title,
                        tags: tags,
                        content: content,
                        publishDate: new Date(),
                        userId: Number(userId)
                    }
                });

                res.status(201).json(postArticle);
            }catch(error) {
                res.status(500).json("Internal server error!");
                console.log(error.message);
            }
        },

        async deleteArticle(req,res) {
            try {
                const { id } = req.body;

                const deleteArticle = await prisma.articles.delete({
                    where: {
                        id: Number(id)
                    }
                })

                if (!deleteArticle) {
                    res.status(404).json("Article Not found!");
                }

                res.status(200).json("Article Deleted!");
            }catch(error) {
                res.status(500).json("Internal server error!");
                console.log(error.message);
            }
        }
    }
}
export default controller;