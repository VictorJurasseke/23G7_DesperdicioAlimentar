import React, { useEffect, useState } from 'react';
import { formatarData } from '../TelaDev/TableJogo/FunctionJogos';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarPets from './NavbarPets'
import { BuscarPetPrincipal, obterEstiloTema, usePetsDados } from './FunctionPets';
import Desempenho from './Desempenho';


const Menu_Jogador = ({ Dados_usuario, token, navigate }) => {


    const { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote, jo_tema, pontos, jo_rank } = usePetsDados(token, navigate);

    const [PetPrincipal, setPetPrincipal] = useState()

    const [EstiloDesempenho, setEstiloDesempenho] = useState(false)

    useEffect(() => {
        setEstiloDesempenho(obterEstiloTema(jo_tema))
        console.log("Tela carregada")
        ProcurarPets()
        BuscarPetPrincipal(token, navigate, setPetPrincipal)
    }, [])

    useEffect(() => {
        console.log("TEMA:", jo_tema)
        console.log("estilo:", EstiloDesempenho)
        
    }, [EstiloDesempenho])



    return (
        <>

            {/* Carrega a tela quando terminar de puxar os pets */}
            {TodosPetsTemporada && (
                <div className="text-center p-3 position-relative col-12 d-flex flex-column justify-content-center bg-dark" style={{ zIndex: 2 }}>
                    {EstiloDesempenho && (<NavBarPets EstiloDesempenho={obterEstiloTema(jo_tema)} token={token} navigate={navigate} TodosPetsTemporada={TodosPetsTemporada} ProcurarPets={ProcurarPets} jo_nome={jo_nome} QuantidadeMascote={QuantidadeMascote} jo_tema={jo_tema} />)}
                </div>
            )}
        </>


    );
};

export default Menu_Jogador;
