import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import CaixaInput from '../../components/TelaCadastro/CaixaInput';
import axios from 'axios'; // Importa axios
import { useLogin, useVerificarLogin } from '../TelaLogin/FunctionLogin';
import { useNavigate } from 'react-router-dom';
const CorpoLogin = () => {
  
  
  
  const { Dados_usuario } = useVerificarLogin(); // Verifica se o usuario esta logado e se não há usuarios na tabela para inserção da conta dev
  const navigate = useNavigate();
  
  
  const {
    FormLogin,
    LogarUser,
    AtualizarForm
  } = useLogin();

  
    // Verifique se os dados do usuário são verdadeiros e volte para tela perfil
    if (Dados_usuario) {
      navigate('/user');
    }
  // Adiciona Dados_usuario como dependência

  return (
    <div className='col-12 d-flex vh-100 bg-dark'>
      <img className='col-12 min-vh-100 position-absolute z-1' style={{ filter: 'blur(10px)' }} src='../../public/img/backg.jpg' alt="Background" />
      <div className='col-10 col-lg-4 col-md-8 bg-light m-auto p-2 rounded shadow-lg text-dark z-2'>
        <h1 className='text-center text-success'>Login</h1>
        <form onSubmit={LogarUser}>
          <CaixaInput
            name={"email"}
            type={"email"}
            value={FormLogin.email}
            onChange={AtualizarForm}
            nomeCaixa={"Email"}
          />
          <CaixaInput
            name={"senha"}
            type={"password"}
            value={FormLogin.senha}
            onChange={AtualizarForm}
            nomeCaixa={"Senha"}
          />
          <a className="text-end d-block">Esqueci minha senha</a>
          <button type="submit" className="btn btn-success col-12 text-light">Logar</button>
        
        </form>
      </div>
    </div>
  );
};

export default CorpoLogin;
