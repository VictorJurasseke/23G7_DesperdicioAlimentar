import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalPetProgresso, MostrarOvo } from './FunctionPets';
import { MudarFundoraridade } from '../NivelAcesso';
import './div_pets.css';
import { AnimatePresence, motion } from 'framer-motion';

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
  desc_pet
}) => {

  const [AbrirDesc, setAbrirDesc] = useState(false)

  // Se a evolução for 1, mudamos a imagem e o nome para "Ovo"
  if (evolucao === 1) {
    caminho = MostrarOvo(raridade);
    nome = "Ovo";
    desc_pet = "Ovo misterioso"
  }

  // Calcula a barra de progresso com base no nível e pontos de evolução
  const BarraProgresso = Math.min(nivel_pet, ponto_evo);

  // Obtém a cor do fundo com base na raridade do pet
  const corFundo = MudarFundoraridade(raridade);

  return (
    <>

      <motion.div
        className="card text-dark card-pet d-flex flex-row "
        style={{
          backgroundColor: corFundo,
          zIndex: AbrirDesc ? '5' : '1',
          maxWidth: AbrirDesc ? '500px' : "200px",
          transition: 'flex-grow 0.3s ease', // Suaviza a mudança no flex-grow
          position: 'relative', // Certifica que a barra de progresso será posicionada abaixo
        }}
        initial={{x:-10}}
        animate={{x:0}}
        whileTap={{ scale: 1.05 }} // Leve aumento ao clicar
        whileHover={{ scale: 1.08 }} // Aumenta levemente ao passar o mouse
      >
        <div className="d-flex flex-column">
          {/* Imagem do pet */}
          <img
            src={Url + caminho}
            className="card-img-top img-ajustada"
            style={{ filter: 'saturate(120%)' }}
            alt={nome}
            draggable="false"
            onClick={() => {
              ModalPetProgresso(
                evolucao,
                ID_inventario,
                token,
                navigate,
                ponto_evo,
                ProcurarPets,
                nome,
                desc_pet,

              );
              setAbrirDesc(!AbrirDesc); // Alterna o estado
            }}
          />
        </div>

        

          {AbrirDesc && (
            <motion.div
              className="card-body d-flex flex-column"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x:-20}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h5 className="card-title fw-bold d-flex" style={{ color: "#FFFFFF", whiteSpace: "nowrap" }}>
                {nome}
              </h5>
              <div className="h-100 align-items-end justify-content-end d-flex flex-column column">
                <p className='text-light fs-5'>{desc_pet}</p>
                <p className='text-light'>Raridade: {raridade}</p>
              </div>
            </motion.div>
          )}
        


        <div className="mt-5" style={{ position: 'absolute', bottom: '0', width: '50%', transform: 'translateX(50%)' }}>
          {evolucao === 1 && (
            <div className="progress mt-2 m-2" style={{ height: '10px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${BarraProgresso}%`,
                  backgroundColor: "#28A745",
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


    </>

  );
};

export default Card_pet;
