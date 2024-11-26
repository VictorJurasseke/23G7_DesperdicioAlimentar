import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalPetProgresso, MostrarOvo } from './FunctionPets';
import { MudarFundoraridade } from '../NivelAcesso';
import './div_pets.css';
import { motion } from 'framer-motion';

const Url = 'http://localhost:3025/Pets/';

const Card_pet = ({
  nome,
  caminho,
  nivel_pet,
  raridade,
  evolucao,
  ID_inventario,
  ponto_evo,
  token,
  navigate,
  ProcurarPets,
}) => {

  // Se a evolução for 1, mudamos a imagem e o nome para "Ovo"
  if (evolucao === 1) {
    caminho = MostrarOvo(raridade);
    nome = "Ovo";
  }

  // Calcula a barra de progresso com base no nível e pontos de evolução
  const BarraProgresso = Math.min(nivel_pet, ponto_evo);

  // Obtém a cor do fundo com base na raridade do pet
  const corFundo = MudarFundoraridade(raridade);

  return (
    <motion.div 
     
      className="card col-1 shadow-sm text-dark card-pet"
      whileTap={{ scale: 1.05 }}      /* Leve aumento ao clicar */
      whileHover={{ scale: 1.05 }}    /* Aumenta levemente ao passar o mouse */
    >
      {/* Imagem do pet */}
      <img
  src={Url + caminho}
  className="card-img-top img-ajustada"
  style={{ filter: 'saturate(120%)' }}
  alt={nome}
  draggable="false" // Desativa o comportamento de arraste da imagem
  onClick={() => {
    ModalPetProgresso(
      evolucao,
      ID_inventario,
      token,
      navigate,
      ponto_evo,
      ProcurarPets
    );
  }}
/>

      
      <div className="card-body">
        <h5 className="card-title fw-bold" style={{ color: corFundo }}>
          {nome}
        </h5>

        {evolucao === 1 && (
          <div className="progress" style={{ height: '10px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${BarraProgresso}%`,
                backgroundColor: corFundo,
                transition: 'width 0.5s ease', // Suaviza a animação
              }}
              aria-valuenow={BarraProgresso}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card_pet;
