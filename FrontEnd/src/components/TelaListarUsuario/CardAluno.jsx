import React from 'react';

const CardUsuario = ({nome, caminho, turma }) => {
 
    return (
        <div className="card col-2 m-1">
        <img src={caminho} className=" img-fluid"   alt="..." />
        <div className="card-body">
          <p className="card-text" style={{ marginBottom: "0" }}>{nome}</p>
          <p className="card-text text-secondary" style={{ fontSize: "12px", marginTop: "0" }}>{turma}</p>
        </div>
      </div>
      
    );
};

export default CardUsuario;


