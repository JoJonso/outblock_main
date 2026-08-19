import "./Register.css"
import { AtSign, Lock, Mail, CalendarDays } from "lucide-react";
import { Link } from "react-router";

//  Integração com o servidor por meio da api
import api from '../../../services/api.js';
import { useState } from "react";

const Register = () => {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [birthDate,setBirthDate] = useState('');

    async function registerUser(e) {
        e.preventDefault();

        try {
          console.log("Dados:", {
            username,
            email,
            password,
            birthDate
        });
          const response = await api.post('/registerUser',{username,email,password,birthDate});

          console.log("Usuário registrado com sucesso!" + "\n" + response.data);
        }catch(error) {
          console.log(error.message);
        }
    }
    return (
    <main className='mainRegister'>
      <section className="art"></section>

      <section className="register">
        <form onSubmit={registerUser}>
          <h1>Crie uma conta</h1>

          <div className="input-field">
            <input type="text" id="user" name="user" placeholder="Seu nome de usuário *" value={username} required onChange={(e) => {setUsername(e.target.value)}}/>
            <AtSign className='icon'/>
          </div>

          <div className="input-field">
            <input type="email" id="email" name="email" placeholder="Seu e-mail *" value={email} required onChange={(e) => {setEmail(e.target.value)}}/>
            <Mail className='icon'/>
          </div>

          <div className="input-field">
            <input type="password" id="password" name="password" placeholder="Sua senha *"  value={password} required onChange={(e) => {setPassword(e.target.value)}}/>
            <Lock className='icon'/>
          </div>

          <div className="input-field">
            <input type="date" id='birthdate' name='birthdate' placeholder='cu' value={birthDate} required onChange={(e) => {setBirthDate(e.target.value)}}/>
            <CalendarDays className="icon"/>
          </div>

          <div className="terms">
            <label><input type="checkbox" id="terms" name="terms"/><p>Eu concordo com os <a href="#">Termos e Condições</a></p></label>
          </div>

          <div className="enter">
            <button type="submit">Registre-se</button>
          </div>

          <div className="signup">
            <p>Já tem uma conta? <Link to="/login">Entre!</Link></p>
          </div>
        </form>  
      </section>
    </main>
    )
}

export default Register