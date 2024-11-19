import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

import InfoPerfil from './InfoPerfil';

const CardPerfil = ({ nome, img, periodo, token, navigate, nivel_acesso }) => {

  return (
    <div className="col-12 text-dark mt-3 p-3 shadow-sm card-perfil">
      <div className="row d-flex mt-4 align-items-center">
        <div className="col-auto text-center">
          <img
            src={`http://localhost:3025/public/${img}`}
            className="img-fluid rounded-circle"
            alt="User"
            style={{ width: "100px", height: "100px", objectFit: 'cover' }} // Circular e ajuste de imagem
          />
        </div>
        <div className="col text-center">
          <InfoPerfil nome={nome} periodo={periodo} nivel_acesso={nivel_acesso} />
        </div>
      </div>
    </div>
  );
};

export default CardPerfil;
