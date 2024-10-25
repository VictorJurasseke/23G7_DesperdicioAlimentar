import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/TelaHome/Header';
import FiltrosRadios from '../components/TelaListarUsuario/FiltrosRadios';
import CardUsuario from '../components/TelaListarUsuario/CardAluno';
import NavbarPets from '../components/TelaPerfil/NavbarPets'
import LoadingComponent from '../components/TelaPerfil/LoadingComponent';


const arrayPets = [
  { id: 1, nome: "Victor Sales", caminho: "http://localhost:3025/public/Egg.gif", turma: "1 EM" },
  { id: 2, nome: "Kayk Saraiva", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turma: "2 EM" },
  { id: 3, nome: "Nicolas Prado", caminho: "http://localhost:3025/public/CoelhoNike.gif", turma: "3 EM" },
  { id: 4, nome: "Gabriel Prado", caminho: "http://localhost:3025/public/Egg.gif", turma: "1 EM" },
  { id: 5, nome: "Lucas Moreno", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turma: "2 EM" },
  { id: 6, nome: "Raissa Furlan", caminho: "http://localhost:3025/public/CoelhoNike.gif", turma: "3 EM" },
  { id: 7, nome: "Alana Silva", caminho: "http://localhost:3025/public/Egg.gif", turma: "1 EM" },
  { id: 8, nome: "James Brito", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turma: "2 EM" },
  { id: 1, nome: "Victor Sales", caminho: "http://localhost:3025/public/Egg.gif", turma: "1 EM" },
  { id: 2, nome: "Kayk Saraiva", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turma: "2 EM" },
  { id: 3, nome: "Nicolas Prado", caminho: "http://localhost:3025/public/CoelhoNike.gif", turma: "3 EM" },
  { id: 4, nome: "Gabriel Prado", caminho: "http://localhost:3025/public/Egg.gif", turma: "1 EM" },
  { id: 5, nome: "Lucas Moreno", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turma: "2 EM" },
  { id: 6, nome: "Raissa Furlan", caminho: "http://localhost:3025/public/CoelhoNike.gif", turma: "3 EM" },
  { id: 7, nome: "Alana Silva", caminho: "http://localhost:3025/public/Egg.gif", turma: "1 EM" },
  { id: 8, nome: "James Brito", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turma: "2 EM" },
];


{/* <div className='m-auto h-50 col-10 bg-light justify-content-center'>
  <FiltrosRadios />
  <div className='col-12 gap-1 d-flex bg-dark flex-wrap text-dark'>
    {arrayPets.map((item) => (
      <CardUsuario
        key={item.id} // Adicione uma chave única para cada elemento da lista
        nome={item.nome}
        caminho={item.caminho}
      />
    ))}
  </div>
</div> */}

const TelaUsuario = () => {
  return (
    <>
      <Header />
      <div className=' min-vh-100 d-flex align-items-center justify-content-center col-12 bg-light gap-2 flex-column'>
        <div style={{height:"100px"}}></div>
          <div className='col-12 p-2 d-flex flex-wrap align-self-center'>
            <FiltrosRadios /> 
            <div className='col-12 d-flex flex-wrap align-self-center p-2 align-items-center '>
              {arrayPets.map((item) => (
                <CardUsuario
                  key={item.id} // Adicione uma chave única para cada elemento da lista
                  nome={item.nome}
                  caminho={item.caminho}
                  turma={item.turma}
                />
              ))}

            </div>
   

        </div>
      </div>
    </>
  );
};

export default TelaUsuario;
