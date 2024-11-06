import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { NivelAcesso } from '../NivelAcesso.js';


const InfoPerfil = ({ nome, periodo, nivel_acesso }) => {
 


  return (
        <div className="col-md-4  ">
          <div className="card-body text-start">
            <h2>{nome}</h2>
            <p className='text-secondary'>{NivelAcesso(nivel_acesso)} </p>
          </div>
        </div>  
  );
};

export default InfoPerfil;
