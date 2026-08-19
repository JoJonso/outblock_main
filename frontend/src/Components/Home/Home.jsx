import { useEffect, useState } from "react";
import api from "../../../services/api.js";
import { useNavigate } from "react-router";
import "./Home.css"
import logo from "../../Assets/Images/outblock_logo.svg"
import user from "../../Assets/Images/user.svg"
import { Search, MessageCircleMore, Bell, Bookmark, Settings, FileImage, FilePlay, FileMusic, SquarePen  } from "lucide-react"

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
        <>
            <header className='headerHome'>
                <nav>
                    <img src={logo} alt="Logo do OutBlock"/>
                    <search>
                        <form action="/pesquisar" method="get">
                            <label for="pesquisar" className="visually-hidden">Pesquisar</label>
                            <div className='search-box'>
                                <input type="search" id="pesquisar" name="pesquisar" placeholder="Pesquisar..."/>
                                <button type="submit"><Search className='icon'/></button>
                            </div>
                        </form>
                    </search>
                </nav>
            </header>

            <main className='mainHome'>
                <section id="left">
                    <section id="profile">
                        <img src={user} alt="Foto de Usuário Padrão"/>

                        <h2>@usuario</h2>
                        
                        <div id='user-stats'>
                            <p>0 seguindo</p>
                            <p>0 seguidores</p>
                        </div>
                        
                        <div id='user-actions'>
                            <button type="submit">Ver perfil</button>
                            <div id='edit'><SquarePen className='icon'/></div>
                        </div>
                        
                    </section>

                    <section id="options">
                        <div className="option"><MessageCircleMore className='icon'/></div>
                        <div className="option"><Bell className='icon'/></div>
                        <div className="option"><Bookmark className='icon'/></div>
                        <div className="option"><Settings className='icon'/></div>
                    </section>

                    <section id="other-creators">
                        <h2>Outros criadores</h2>
                    </section>
                </section>

                <section id="feed">
                    <section id="publish">
                        <form>
                            <label for="your-post" className="visually-hidden">Mostre sua ideia ao mundo!</label>
                            <textarea id="your-post" name="your-post" placeholder="Mostre sua ideia ao mundo!"></textarea>
                            <div className='post-actions'>
                                <div className="medias">
                                    <FileImage className='icon'/>
                                    <FilePlay className='icon'/>
                                    <FileMusic className='icon'/>
                                </div>
                                <button type="submit">Publicar</button>
                            </div>
                        </form>
                    </section>
                </section>

                <section id="right">
                    <section id="events">
                        <h2>Eventos</h2>
                    </section>

                    <section id="articles">
                        <h2>Artigos</h2>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Home;