import './App.css';
import  { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from './Components/Home/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>

          <Route path="/register" element={<Register/>}/>

          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App;
