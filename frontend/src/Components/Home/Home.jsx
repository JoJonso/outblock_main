import { useEffect, useState } from "react";
import api from "../../../services/api.js";
import { useNavigate } from "react-router";

const Home = () => {

    const navigate = useNavigate();

    // Vithor --> GUARDAR INFORMAÇÕES NO USESTATE E COLOCAR NO FEED!!!
    const [userInfo,setUserInfo] = useState([]); 

    const authToken = async () => {
        // Pegando token salvo no localstorage
        const storedToken = localStorage.getItem('token');

        // Se não existir, voltar para a página de login
        if (!storedToken) {
            navigate('/login');
        }

        //  Se auth funcionar, pode entrar na página principal
        try {
            const auth = await api.get('/auth',{
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })

            console.log(auth);
        }catch(error) {
            //  Se o token é inválido, voltar para o login 
            navigate('/login');
            console.log(error.message);
        }
    }

    const getUser = async () => {
        const storedToken = localStorage.getItem('token');

        try {
            const user = await api.get('/me', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            console.log(user.data);
        }catch(error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        //  Fazer requisição com api para ver se o token é valido
        authToken();

        //  Pegar informações do user baseado no payload do JWT
        getUser();
    },[])

    return (
        <div>
            <h1>Home page</h1>

        </div>
    )
}

export default Home;