
import React from 'react';
import GraficoBarra from './Barra';

const TemporadaDesperdicio = ({turmas,jo_nome, desperdicio}) => {


    return (
        < div className='col-5 jaroFont rounded flex-column justify-content-center py-3' style={{ backgroundColor: "#243447" }}>
            <div className='text-light col-12 text-center flex-column align-items-center justify-content-center d-flex p-4' >
                <h1>{jo_nome}:</h1>
            
            </div>
            <div className='col-12 h-50'>
                <GraficoBarra jo_nome={jo_nome} turmas={turmas} desperdicio={desperdicio} />
            </div>
        </div >
    );
};

export default TemporadaDesperdicio;
