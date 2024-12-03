import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/TelaHome/Header';
import FiltrosRadios from '../components/TelaListarUsuario/FiltrosRadios';
import CardUsuario from '../components/TelaListarUsuario/CardAluno';
import { useNavigate } from 'react-router-dom';
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';

const arrayPets = [

  { id: 1, nome: "Victor Sales", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 1, tur_nome: "3º EM" },
  { id: 2, nome: "Kayk Saraiva", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 1, tur_nome: "3º EM" },
  { id: 3, nome: "Nicolas Prado", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 2, tur_nome: "2º EM" },
  { id: 4, nome: "Gabriel Prado", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 2, tur_nome: "2º EM" },
  { id: 5, nome: "Lucas Moreno", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 3, tur_nome: "1º EM" },
  { id: 6, nome: "Raissa Furlan", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 3, tur_nome: "1º EM" },
  { id: 7, nome: "Alana Silva", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 4, tur_nome: "9º FII" },
  { id: 8, nome: "James Brito", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 4, tur_nome: "9º FII" },
  { id: 9, nome: "Victor Sales", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 5, tur_nome: "8º FII" },
  { id: 10, nome: "Kayk Saraiva", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 5, tur_nome: "8º FII" },
  { id: 11, nome: "Nicolas Prado", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 6, tur_nome: "7º FII" },
  { id: 12, nome: "Gabriel Prado", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 6, tur_nome: "7º FII" },
  { id: 13, nome: "Lucas Moreno", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 7, tur_nome: "6º FII" },
  { id: 14, nome: "Raissa Furlan", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 7, tur_nome: "6º FII" },
  { id: 15, nome: "Alana Silva", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 8, tur_nome: "5º FI" },
  { id: 16, nome: "James Brito", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 8, tur_nome: "5º FI" },
];


const ArrayFiltro = [
  { ID_turmas: 1, tur_nome: "3º EM" },
  { ID_turmas: 2, tur_nome: "2º EM" },
  { ID_turmas: 3, tur_nome: "1º EM" },
  { ID_turmas: 4, tur_nome: "9º FII" },
  { ID_turmas: 5, tur_nome: "8º FII" },
  { ID_turmas: 6, tur_nome: "7º FII" },
  { ID_turmas: 7, tur_nome: "6º FII" },
  { ID_turmas: 8, tur_nome: "5º FI" },
  { ID_turmas: 9, tur_nome: "4º FI" },
  { ID_turmas: 10, tur_nome: "3º FI" },
  { ID_turmas: 11, tur_nome: "2ª FI" },
  { ID_turmas: 12, tur_nome: "1º FI" },
];

const TelaUsuario = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);

  const [ArrayPetsFiltrados, setArrayPetsFiltrados] = useState(arrayPets);
  const [FiltroTurma, setFiltroTurma] = useState('Todos'); // Alterado para garantir valor inicial

  const AlterarTurma = (ID_turmas) => {
    setFiltroTurma(ID_turmas);
  };

  useEffect(() => {
    if (FiltroTurma !== 'Todos') {
      setArrayPetsFiltrados(arrayPets.filter(pet => pet.turmas_ID_turmas === FiltroTurma));
    } else {
      setArrayPetsFiltrados(arrayPets);  // Exibe todos os pets quando 'Todos' é selecionado
    }
  }, [FiltroTurma]);

  useEffect(() => {
    verificarUsuario();
  }, []);

  return (
    <>
      {Dados_usuario && (
        <>
          <Header Dados_usuario={Dados_usuario} corLetra={'#000000'} />
          <div className='min-vh-100 d-flex col-12 bg-light gap-2 flex-column'>
            <div style={{ height: "100px" }}></div>
            <div className='col-12 p-2 d-flex flex-wrap align-self-center'>
              <div className='col-12 d-flex p-4 mb-2 justify-content-between border-bottom'>
                <div className='d-flex flex-row gap-2'>
                  <input
                    type="radio"
                    className="btn-check"
                    onChange={() => AlterarTurma('Todos')}
                    name="options"
                    id="Todos"
                    autoComplete="off"
                    checked={FiltroTurma === 'Todos'}  // Agora com o estado controlado
                  />
                  <label className="btn text-dark" htmlFor="Todos">Todos</label>
                  {ArrayFiltro.map((item) => (
                    <FiltrosRadios
                      key={item.ID_turmas}  // Adicione uma chave única para cada elemento
                      ID_turmas={item.ID_turmas}
                      tur_nome={item.tur_nome}
                      AlterarTurma={AlterarTurma}
                    />
                  ))}
                </div>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
              <div className='col-12 d-flex flex-wrap align-self-center p-2 align-items-center'>
                {ArrayPetsFiltrados.length > 0 ? (
                  <>
                    {ArrayPetsFiltrados.map((item) => (
                      <CardUsuario
                        key={item.id}
                        nome={item.nome}
                        caminho={item.caminho}
                        turma={item.tur_nome}
                      />
                    ))}
                  </>
                ) : (
                  <h1 className='jaroFont'>Nenhum jogador nesta turma</h1>
                )}


              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TelaUsuario;
