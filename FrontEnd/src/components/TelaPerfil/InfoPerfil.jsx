import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap


const InfoPerfil = ({ nome, periodo, nivel_acesso }) => {
 
switch (nivel_acesso) {
    case 0:
      nivel_acesso = "Administrador";
      break;
    case 1:
      nivel_acesso = "Aluno";
      break;
    case 3:
      nivel_acesso = "Jogador";
      break;
    }
  
  return (
        <div className="col-md-4  ">
          <div className="card-body text-start">
            <h2>{nome}</h2>
            <p className='text-secondary'>Periodo: {periodo} <br/>{nivel_acesso} </p>
          </div>
        </div>  
  );
};

export default InfoPerfil;
