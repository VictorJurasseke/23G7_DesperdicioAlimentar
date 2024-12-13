import React from 'react';
import GraficoBarra from './Barra';

const TotalDesperdicio = ({turmas,desperdicio,jo_nome}) => {


    return (
        <div className='col-12 h-50 jaroFont d-flex flex-row justify-content-center gap-4 mt-5 py-3' style={{ backgroundColor: "#243447" }}>
            <div className='text-light col-5 flex-column align-items-center justify-content-center d-flex p-4' >
                <h1>TOTAL DE DESPERDICIO ANUAL:</h1>
            </div>
            <div className='col-4 h-100'>
                <GraficoBarra turmas={turmas} desperdicio={desperdicio} jo_nome={jo_nome}/>
            </div>
        </div>
    );
};

export default TotalDesperdicio;
