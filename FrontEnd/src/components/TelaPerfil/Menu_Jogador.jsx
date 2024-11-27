import React, { useEffect, useState } from 'react';
import { formatarData } from '../TelaDev/TableJogo/FunctionJogos';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarPets from './NavbarPets'
import { obterEstiloTema, usePetsDados } from './FunctionPets';
import Desempenho from './Desempenho';

const Menu_Jogador = ({ Dados_usuario, token, navigate }) => {


    const { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote, jo_tema, pontos, jo_rank } = usePetsDados(token, navigate);

    const [EstiloDesempenho, setEstiloDesempenho] = useState()

    useEffect(() => {
        setEstiloDesempenho(obterEstiloTema(jo_tema))
    })

    return (
        <>

            <div className="text-center p-3 position-relative col-12 d-flex flex-column" style={{ zIndex: 2 }}>
               
                <NavBarPets token={token} navigate={navigate} TodosPetsTemporada={TodosPetsTemporada} ProcurarPets={ProcurarPets} jo_nome={jo_nome} QuantidadeMascote={QuantidadeMascote} jo_tema={jo_tema} />

            </div>
        </>


    );
};

export default Menu_Jogador;
