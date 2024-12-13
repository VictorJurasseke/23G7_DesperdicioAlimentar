

import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import GraficoBarra from './Barra';
import TotalDesperdicio from './TotalDesperdicio';
import TemporadaDesperdicio from './TemporadaDesperdicio';
import { useImportarTemporadas, useImportarTotalAnual } from './FunctionRelatorio';



const TelaRelatorio = ({ token, navigate }) => {



    const { TurmasAnual, DesperdicioAnual, BuscarTotalAnual } = useImportarTotalAnual(token, navigate)


    const { Temporadas, BuscarTotalTemporadas } = useImportarTemporadas(token, navigate)
    // const { TurmasAnual, DesperdicioAnual, BuscarTotalAnual } = useImportarTemporadas(token, navigate)

    useEffect(() => {
        BuscarTotalAnual()
        BuscarTotalTemporadas()
    }, [])

    useEffect(()=>{
      console.log("Temporadas mudou",Temporadas)  
      console.log(Temporadas.length)
    },[Temporadas])

    // table da tabela jogo e o botoa de rota de adicionar



    // Total de desperdicio de todos os jogos E FILTRAR POR TURMA,
    //  Total de desperdicio do jogo atual FILTRAR POR TURMA
    //  MÉDIA DE DESPERDICIO POR ALUNOS JOGANDO


    // ALUNOS QUE MAIS DESPERDIÇAM E TEM MENOS PETS - MAU JOGADORES


    //ALUNOS QUE MENOS DESPERDIÇAM E TEM MAIS PETS - BOM JOGADORES

    // Array com todas as turmas
    const turmas = ['3EM', '2EM', '1EM']

    // Array com o peso de desperdicio das turmas
    const Desperdicio = [4.3, 4.3, 8.4]


    // String com o nome da temporada
    const jo_nome = "Temporada de Verãos"


    // String com o nome da escola
    const es_nome = "SESI ANASTACIO CE 138"








    return (
        <>

            <div className='col-12 d-flex flex-column  justify-content-start min-vh-100 gap-2'>

                {/* Desperdicio total de todos jogos */}
                {/* Buscar emm todos jogos a soma de todos os pesos acumulados em cada turma, devolver um array com todas as turmas, o peso de total de cada uma, e a escola */}
                {TurmasAnual && (
                    <TotalDesperdicio turmas={TurmasAnual} desperdicio={DesperdicioAnual} texto={"Desperdiçados anualmente"} jo_nome={"Anual"} />
                )}



                {/* Temporadas jogo desperdicio */}
                <div className='d-flex flex-row mt-5 gap-5 col-12 flex-wrap justify-content-center'>
                    {/* Iterando sobre os dados das temporadas para renderizar cada uma */}

                    {Temporadas.length > 0 && (
                        <>
                            {Temporadas.map((temporada, index) => (
                                <TemporadaDesperdicio
                                    key={index}
                                    turmas={temporada.turmas}
                                    desperdicio={temporada.desperdicio}
                                    jo_nome={temporada.jo_nome}   // Passa o nome da temporada
                                />
                            ))}

                        </>
                    )}

                </div>



            </div>

        </>
    );
};

export default TelaRelatorio;
