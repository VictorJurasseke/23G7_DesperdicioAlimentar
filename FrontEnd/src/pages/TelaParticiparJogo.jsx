import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/TelaHome/Header';
import TableParticipar from '../components/TelaParticiparJogos/TableParticipar'
import TelasTrocaJogos from '../components/TelaParticiparJogos/TelasTrocaJogos';
import { useImportarDadosJogos } from '../../src/components/TelaDev/TableJogo/FunctionJogos';
import LoadingComponent from '../components/TelaPerfil/LoadingComponent';
import { useNavigate } from 'react-router-dom';


const TelaParticiparJogo = () => {

  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const [Radio, setRadio] = useState('option1');

  const FuncaoAlvo = (alvoCapturado) => {
    setRadio(alvoCapturado);
  };
  const { TableJogos, atualizar } = useImportarDadosJogos(token,navigate)

  console.log(TableJogos)
  return (
    <>
      <>
        {TableJogos ? ( // Verifica se TableJogos não é null e se o token esta correto
          <>
            <Header />
            <div className='d-flex flex-column min-vh-100 '>
              <div style={{ height: "100px" }}></div> {/* Cabeçalho */}
              <TelasTrocaJogos FuncaoAlvo={FuncaoAlvo} />
              <div className='d-flex flex-column flex-fill'>
                <TableParticipar info={TableJogos} navigate={navigate} token={token}/>
              </div>
            </div>
          </>
        ) : (
          <LoadingComponent /> // Mensagem de carregamento enquanto
          // verifica se o usuario esta logado
        )}
      </>

    </>
  );
};

export default TelaParticiparJogo;
