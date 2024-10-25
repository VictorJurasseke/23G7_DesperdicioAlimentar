import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

import InfoPerfil from './InfoPerfil';

const CardPerfil = ({ nome, escola, img, periodo, token, navigate }) => {

  const logout = () => {
    Swal.fire({
      title: "Deseja sair?",
      showDenyButton: true,
      confirmButtonText: "Desconectar minha conta",
      denyButtonText: `Voltar`
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate("/login"); // Usar navigate aqui
      }
    });
  }

  return (
    <div className="col-12 text-dark mt-3 p-3 shadow-sm card-perfil">
      <div className="d-flex justify-content-end">
        <span 
          onClick={logout} 
          className="material-symbols-outlined fs-2 text-dark p-1 rounded"
          style={{ cursor: 'pointer' }}
        >
          logout
        </span>
      </div>

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
          <InfoPerfil nome={nome} periodo={periodo} escola={escola} />
        </div>
      </div>
    </div>
  );
};

export default CardPerfil;
