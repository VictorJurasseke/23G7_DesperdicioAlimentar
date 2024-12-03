import React from 'react';

const CardUsuario = ({nome, caminho_pet, turma }) => {

 
    return (
        <div className="card col-1 m-1">
        <img src={`http://localhost:3025/Pets/${caminho_pet}`} className=" img-fluid"   alt="..." />
        <div className="card-body">
          <p className="card-text jaroFont" style={{ marginBottom: "0" }}>{nome}</p>
          <p className="card-text text-secondary jaroFont" style={{ fontSize: "12px", marginTop: "0" }}>{turma}</p>
        </div>
      </div>
      
    );
};

export default CardUsuario;


