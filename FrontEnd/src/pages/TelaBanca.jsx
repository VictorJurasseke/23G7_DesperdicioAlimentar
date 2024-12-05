import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import { useNavigate } from 'react-router-dom';
import Header from '../components/TelaHome/Header';

const TelaBanca = () => {


    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate); // Pega os dados de usuario do cliente para criar a tela


    useEffect(()=>{
        verificarUsuario()
    },[])



    return (
        <>
        {Dados_usuario && (
            <>
            {
                Dados_usuario.user_tipo_acesso == 4 ? (
                    <>
                    <Header corLetra={'#000000'} Dados_usuario={Dados_usuario}></Header>
                    <h1>Conta da banca logado</h1>
                    </>
                ) : navigate('/user')
            }
            
            
            
            
            </>
        ) }
        </>


    );
};

export default TelaBanca;
