import { useState } from 'react'
import "./Login.css"
import { AtSign, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import api from '../../../services/api.js';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    async function logUser(e) {
      e.preventDefault();

      try{
        const login = await api.post('/loginUser', {username,password});
        
        if (login.status == 200) {
          localStorage.setItem('token',login.data);
          navigate('/');
        }
      }catch(error) {
        console.log(error.message);
      }
    }

    return (
    <>
      <main className='mainLogin'>
        <section className="art"></section>

        <section className="login">
          <form onSubmit={logUser}>
            <h1>Faça seu login</h1>

            <div className="input-field">
              <input type="text" id="user" name="user" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Nome de usuário ou e-mail"/>
              <AtSign className='icon'/>
            </div>

            <div className="input-field">
              <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Senha"/>
              <Lock className='icon'/>
            </div>

            <div className="remember-me">
              <label><input type="checkbox" id="remember-me" name="remember-me"/>Lembrar de mim</label>

              <a href="#">Esqueceu a senha?</a>
            </div>

            <div className="enter">
              <button type="submit">Entrar</button>
            </div>
            

            <div className="signup">
              <p>Ainda não tem uma conta? <Link to="/register">Crie uma!</Link></p>
            </div>
          </form>  
        </section>
      </main>
    </>
    )
}

export default Login