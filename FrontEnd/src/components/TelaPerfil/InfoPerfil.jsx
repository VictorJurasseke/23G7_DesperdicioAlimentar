import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap


const InfoPerfil = ({ nome, periodo, escola}) => {
  return (
        <div className="col-md-4  ">
          <div className="card-body text-start">
            <h2>{nome}</h2>
            <p className='text-secondary'>Escola: {escola} <br/>Periodo: {periodo} </p>
          </div>
        </div>  
  );
};

export default InfoPerfil;
