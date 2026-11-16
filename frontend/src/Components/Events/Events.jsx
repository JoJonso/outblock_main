import { useEffect } from "react";
import api from "../../../services/api.js";
import { useNavigate } from "react-router";
import logo from "../../Assets/Images/outblock_logo.svg"
import '../Events/Events.css'

const Events = () => {
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
            <header>
                <div className="image-container">
                    <img src={logo} alt="Outblock official logo"/>
                </div>
            </header>
            <main>
                <div className="searchbar-container">
                    <input type="search" name="searchbar" id="search"/>
                    <button type="button" id="createEvent">+ Criar Evento</button>
                </div>
            </main>
        </>
    );
}

export default Events;