import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import Header from '../../components/TelaHome/Header';

const Corpo = () => {
  return (
    <>
      {/* Seção Principal */}
      <div
        className="container-fluid min-vh-100 d-flex flex-lg-row flex-column align-items-center gap-5 position-relative"
        style={{
          backgroundImage: "url('../../public/img/backg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          

          // filter: 'blur(10px)'
        }}
      >
        <div className="col-12 bg-dark position-absolute top-0 start-0 vh-100 bg-opacity-50"></div> 
        {/* Texto e descrição */}
        <div className="col-lg-6 col-12 text-center text-lg-start z-2 mb-5">
          <h1
            className="text-light border-bottom w-75 mx-auto mx-lg-0"
            style={{ fontSize: 'calc(2rem + 2vw)', fontWeight: '700' }}
          >
            Hatch
          </h1>
          <div className="p-3 bg-dark text-light rounded mt-3">
            <p className="fs-6">
              Aplicativo educacional para combater o desperdício alimentar nas escolas. A ideia central é que os alunos cuidem de um “ovo virtual” que, ao atingir um certo nível de felicidade, choca e se transforma em um animal de estimação único. Com um placar que define os participantes mais empenhados no projeto. A felicidade do ovo aumenta através da pesagem do alimento, pós refeição, considerando que se houver muito desperdício pelo aluno, haverá retrocesso na felicidade de sua mascote. O jogo terá como objetivo principal gerar competitividade entre os alunos, incentivando-os a obter os animais de estimação mais raros e sempre se manter no topo da tabela, onde vai ser possível até mesmo receber prêmio pelo feito.
            </p>
            <a className="btn btn-lg text-light bg-success shadow" href="/login" type="button">
              Entrar
            </a>
          </div>
        </div>

        {/* Imagens de mascotes */}
        <div className="col-lg-5 col-12 d-flex justify-content-center justify-content-lg-end align-items-end z-2">
          <img
            className="img-fluid me-2"
            style={{ maxWidth: '45%' }}
            src="../../../public/img/Egg.gif"
            alt="Egg"
          />
          <img
            className="img-fluid"
            style={{ maxWidth: '45%' }}
            src="../../../public/img/CoelhoNeymar.gif"
            alt="Coelho Neymar"
          />
        </div>


      </div>
    </>
  );
};

export default Corpo;