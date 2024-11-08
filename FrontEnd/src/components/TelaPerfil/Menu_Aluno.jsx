import React, { useEffect, useState } from 'react';
import { formatarData } from '../TelaDev/TableJogo/FunctionJogos';
import 'bootstrap/dist/css/bootstrap.min.css';



// nomeCaixa, name, value, onChange, type
import CaixaInput from '../TelaCadastro/CaixaInput'

import ErroCaixa from '../TelaCadastro/Erro'
import { useCadastro } from '../TelaCadastro/FunctionCadastrar';

const Menu_Aluno = ({ Dados_usuario, token, navigate }) => {


    const {
        errosVisiveis,
        showScanner,
        FormValidar,
        setShowScanner,
        AtualizarFormValidar,
        AtivarScan,
        Cadastrar,
    } = useCadastro(token, navigate)

    // console.log("Tela carrega inteira")
    // <QRcode name="qrcode" value={Form.qrcode} onChange={AtualizarForm} showScanner={showScanner} setShowScanner={setShowScanner} />
    // { errosVisiveis.erro_qr && <ErroCaixa name="erro_qrcode" texto="QRCODE inválido ou já registrado!" /> }


    // Mostrar Todos os jogos 
    // const { TableJogosEspecifico, BuscarJogosEspecifico } = useImportarDadosJogosEspecifico(token, navigate, 5) // puxa todos os jogos da unidade 5 APENAS


    return (
        <>
            <div className='col-12 d-flex justify-content-center mt-5'>
                <form className='col-4 border d-flex flex-column p-3 rounded'>
                    <h3 className='text-center fw-bold'>VALIDAR:</h3>


                    {errosVisiveis.erro_qr && (<ErroCaixa chave={1} name="erro_qrcode" texto="QRcode Invalido!" />)}

                    <CaixaInput nomeCaixa={"Nova senha:"} name={"NovaSenha"} type={"password"} value={FormValidar.NovaSenha} onChange={AtualizarFormValidar}  ></CaixaInput>
                    {errosVisiveis.erro_senha && (<ErroCaixa chave={2} texto="A senha precisa ter 8 caractéres!" />)}


                    <CaixaInput nomeCaixa={"Confirmar nova senha:"} name={"ConfirmarNovaSenha"} type={"password"} value={FormValidar.ConfirmarNovaSenha} onChange={AtualizarFormValidar} />
                    {errosVisiveis.erro_confirmar_senha && (<ErroCaixa chave={3} texto="As senhas precisam ser iguais!" />)}


                    <div className='gap-2 d-flex flex-column mt-5'>
                        {errosVisiveis.erro_campo && (<ErroCaixa chave={4} name="erro_campo" texto="É necessario preencher todos os campos" />)}
                        <a onClick={Cadastrar} name={"QRcode"} className="btn btn-primary">Submit</a>
                    </div>
                </form>
            </div>
        </>


    );
};

export default Menu_Aluno;
