import React from 'react'
import './App.css'
import TelaHome from '../src/pages/TelaHome' // Apresentação do site
// import TelaCadastro from './pages/TelaCadastro' // Cadastro do Usuario
import TelaLogin from './pages/TelaLogin' // Login do usuario
import TelaPerfil from './pages/TelaPerfil' // Perfil do usuario
import Biblioteca_Usuarios from './pages/TelaListarUsuario' // TelaListarUsuario
import TelaDev from './pages/TelaDev'
import TelaParticiparJogo from './pages/TelaParticiparJogo'
import TelaRank from './pages/Rank'
import PerfilJogador from './pages/TelaPerfilJogador'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisitarPerfilJogador from './pages/TelaVisitarPerfilJogador'


export default function App() {
  return (
    
 
    <Router>
    <Routes>
      <Route path="/" element={<TelaHome/>}/>
      {/* <Route path="/register" element={<TelaCadastro/>}/> */}
      <Route path="/user" element={<TelaPerfil/>}/>
      <Route path="/login" element={<TelaLogin/>}/>
      <Route path="/list" element={<Biblioteca_Usuarios/>}/>
      <Route path="/devs" element={<TelaDev/>}/>
      <Route path="/games" element={<TelaParticiparJogo/>}/>
      <Route path="/rank" element={<TelaRank/>}/>
      <Route path="/player" element={<PerfilJogador/>}/>
      <Route path="/visitar/:id" element={<VisitarPerfilJogador/>}/>

    </Routes>
  </Router>
  )
}
