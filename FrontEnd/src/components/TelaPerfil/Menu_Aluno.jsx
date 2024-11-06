import React, { useEffect } from 'react';
import { useImportarDadosJogosEspecifico, formatarData } from '../TelaDev/TableJogo/FunctionJogos';
import 'bootstrap/dist/css/bootstrap.min.css';



const Menu_Aluno = (Dados_usuario, token, navigate) => {


    console.log(Dados_usuario.Dados_usuario)
    // Mostrar Todos os jogos 
    const { TableJogosEspecifico, BuscarJogosEspecifico } = useImportarDadosJogosEspecifico(token, navigate, 5) // puxa todos os jogos da unidade 5 APENAS


    
    return (
        <>
            {Dados_usuario.Dados_usuario.user_tipo_acesso == 1 && (
                <div className="text-center p-3 position-relative" style={{ zIndex: 2 }}>
                    <h1>Precisa cadastrar seu qrcode mudar e mudar a senha para user_tipo_acesso; e ter acesso ao site</h1>
                </div>
            )}
        </>


    );
};

export default Menu_Aluno;
