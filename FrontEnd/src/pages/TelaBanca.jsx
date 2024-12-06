import React, { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import { useNavigate } from 'react-router-dom';
import Header from '../components/TelaHome/Header';
import QRcode from '../components/TelaCadastro/QRcode';
import { usePeso } from '../components/TelaBanca/FunctionTelaBanca';
import CaixaInput from '../components/TelaCadastro/CaixaInput';
import ErroCaixa from '../components/TelaCadastro/Erro';

const TelaBanca = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate); // Pega os dados de usuario do cliente para criar a tela




    const {
        errosVisiveis,
        showScanner,
        FormPeso,
        setShowScanner,
        AtualizarFormPeso,
        AtivarScan,
        ProgressoPeso,
    } = usePeso(token, navigate)

    useEffect(() => {
       
        verificarUsuario()
    }, [])


    // Preciso mostrar o multiplicador diário; input de peso e qrcode

    return (
        <>
            {Dados_usuario && (
                <>
                    {
                        Dados_usuario.user_tipo_acesso == 4 ? (
                            <>
                                <Header corLetra={'#ffffff'} Dados_usuario={Dados_usuario}></Header>

                                <div className="fundoIMG min-vh-100">
                                    {/* Aqui vai o conteúdo da sua página */}
                                </div>
                                {/* Tela principal */}
                                <div className="col-12 p-3 d-flex min-vh-100 flex-column align-items-center z-1">


                                    {/* Card principal */}


                                    <div className='col-lg-4 col-md-6 col-5 col-sm-6 d-flex justify-content-center align-items-center gap-5'>
                                       
                                        <div className='col-5' >
                                            
                                            <img src='http://localhost:3025/Pets/GentleBunny.gif' style={{ width: "100%", height: "100%" }}></img>
                                        </div>
                                    </div>

                                    <div className="jaroFont text-light text-center fs-4 col-lg-4 col-md-10 col-12 rounded-top shadow" style={{ minHeight: '45px', backgroundColor: "#243447" }}>
                                        <h1 className='text-light text-center'>Insira seu desperdicio:</h1>
                                    </div>


                                    <div className="col-12 col-md-10 col-lg-4 rounded-bottom shadow z-2 p-4 d-flex align-items-center flex-column  jaroFont" style={{ backgroundColor: "#F3E8D1", height: "40%" }}>

                                        <div className='col-12 col-md-5 col-lg-9 fs-4'>


                                            <CaixaInput
                                            
                                                nomeCaixa={"Peso(kg):"}
                                                placeholder={"0.20"}
                                                name={"Peso"}
                                                type={"number"}
                                                value={FormPeso.Peso}
                                                onChange={AtualizarFormPeso}
                                            />

                                            <QRcode
                                                name="QRcode"
                                                value={FormPeso.QRcode}
                                                onChange={AtualizarFormPeso}
                                                showScanner={showScanner}
                                                setShowScanner={setShowScanner}
                                            />
                                           
                                            {errosVisiveis.Campo && (
                                                <ErroCaixa chave={120} texto="Preencha todos os campos"/>
                                            )}
                                            <button type="button" className="btn btn-warning text-white col-12 mt-2" onClick={AtivarScan}>
                                                Scan
                                            </button>
                                            <button type="button" onClick={ProgressoPeso} className="btn btn-success text-white col-12 mt-2">
                                                Enviar
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </>
                        ) : navigate('/user')
                    }




                </>
            )}
        </>


    );
};

export default TelaBanca;
