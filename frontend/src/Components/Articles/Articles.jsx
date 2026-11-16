import { useEffect } from "react";
import api from "../../../services/api.js";
import { useNavigate } from "react-router";

const Articles = () => { 
    const navigate = useNavigate();
    // GUARDAR INFORMAÇÕES NO USESTATE E COLOCAR NO FEED!!!
    //  const [userInfo,setUserInfo] = useState({}); 

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

    useEffect(() => {
        authToken();
    },[])


    return (
        <>
            <h1>Wip</h1>
        </>
    );
}

export default Articles