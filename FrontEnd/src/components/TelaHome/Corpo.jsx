import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { motion } from 'framer-motion';
import Header from '../../components/TelaHome/Header';


const Corpo = () => {
  return (
    <>
      {/* Seção Principal */}

      <div className='col-12 min-vh-100 d-flex z-3  align-items-center gap-5 ' >
        
        <img className='col-12 min-vh-100  position-absolute z-1' style={{ filter: 'blur(10px)' }} src='../../public/img/backg.jpg'></img>
        <motion.div
          initial={{ x: '-100vh' }} // Começa fora da tela, à esquerda
          animate={{ x: "10vh" }} // Move para a posição original (direita)
          transition={{ type:"spring", stiffness: 50 }} // Adiciona uma transição de mola

          className={'col-6 z-2 mb-5'}>
          <h1 className='text-light border-bottom  w-75' style={{ fontSize: '8rem', fontWeight:"700"}}>Hatch</h1>
          <div className='align-self-center p-3 bg-dark text-light mb-5 mt-1 rounded col-12'>
            <p className='fs-6'>Aplicativo educacional para combater o desperdício alimentar nas escolas. A ideia central é que os alunos cuidem de um “ovo virtual” que, ao atingir um certo nível de felicidade, choca e se transforma em um animal de estimação único. Com um placar que define os participantes mais empenhados no projeto. A felicidade do ovo aumenta através da pesagem do alimento, pós refeição, considerando que se houver muito desperdício pelo aluno, haverá retrocesso na felicidade de sua mascote. O jogo terá como objetivo principal gerar competitividade entre os alunos, incentivando-os a obter os animais de estimação mais raros e sempre se manter no topo da tabela, onde vai ser possível até mesmo receber prêmio pelo feito.</p>
            <a className="btn btn-lg text-light bg-success shadow" href="/login" type="button" >Entrar</a>
          </div>  
        </motion.div >

        <motion.div className='col-5 mb-5 align-self-end d-flex  rounded p-5  z-3'
          initial={{ y: '100vh' }} // Começa fora da tela, à esquerda
          animate={{ y: "0" }} // Move para a posição original (direita)
          transition={{ type:"spring", stiffness: 50 }} // Adiciona uma transição de mola
>
          <img className='col-6' src='../../../public/img/Egg.gif'></img>
          <img className='col-6' src='../../../public/img/CoelhoNeymar.gif'></img>
        </motion.div>

        <div className='col-12 bg-dark z-1 position-absolute vh-100 bg-opacity-50'></div>
      </div>
    </>
  );
};

export default Corpo;
