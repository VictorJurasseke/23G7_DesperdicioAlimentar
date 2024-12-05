import React from 'react';
import { MostrarOvo } from '../TelaPerfil/FunctionPets';
import { MudarFundoraridade } from '../NivelAcesso';
import { motion } from 'framer-motion';
import { ModalInfoJogadores } from './FunctionListarUsuario';


const CardUsuario = ({ token, navigate, user_nome, user_img_caminho, ID_usuarios, pontos_usuario, peso_acumulativo, rank_usuario, jo_nome, jo_tema, nome_pet, caminho_pet, raridade_pet, ID_inv_pets, evolucao, tur_nome,ID_jogos }) => {

  // Se a evolução for 1, mudamos a imagem e o nome para "Ovo"
  if (evolucao === 1) {
    caminho_pet = MostrarOvo(raridade_pet);
    nome_pet = "Ovo";

  }

  // <img src= className=" img-fluid" alt="..." />

  // Obtém a cor do fundo com base na raridade do pet
  const corFundo = MudarFundoraridade(raridade_pet);


  return (
    <>
      <div>

        <motion.div
          onClick={()=>{ModalInfoJogadores(token, navigate, user_nome, user_img_caminho, ID_usuarios, pontos_usuario, peso_acumulativo, rank_usuario, jo_nome, jo_tema, nome_pet, caminho_pet, raridade_pet, ID_inv_pets, evolucao, tur_nome,ID_jogos )}}
          className="card text-dark card-pet d-flex"
          style={{
            maxWidth: "150px",
            transition: 'flex-grow 0.3s ease', // Suaviza a mudança no flex-grow
            position: 'relative', // Certifica que a barra de progresso será posicionada abaixo
          }}
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          whileTap={{ scale: 1.05 }} // Leve aumento ao clicar
          whileHover={{ scale: 1.08 }} // Aumenta levemente ao passar o mouse
        >
          <div className="d-flex flex-column">
            {/* Imagem do pet */}
            <img
              src={`http://localhost:3025/Pets/${caminho_pet}`}
              className="card-img-top img-ajustada "
              style={{ filter: 'saturate(120%)', backgroundColor: corFundo, borderRadius:'6px 6px 0 0' }}
              alt={nome_pet}
            />
          </div>

          <div className='bg-light m-0 p-0 d-flex flex-row gap-2 p-1'>
            <div className='' style={{ width: '30px', height: '30px' }}>
              <img src={`http://localhost:3025/public/${user_img_caminho}`} className='rounded-circle' style={{ width: "100%", height: "100%" }} alt={user_nome} />
            </div>
            <p
              style={{
                margin: 0,
                whiteSpace: "nowrap", // Garante que o texto não quebre em várias linhas
                overflow: "hidden", // Oculta o texto que ultrapassa o espaço
                textOverflow: "ellipsis", // Adiciona os "..." no final do texto cortado
              }}
            >
              {user_nome}
            </p>
          </div>
        </motion.div>
      </div>
    </>

  );
};

export default CardUsuario;