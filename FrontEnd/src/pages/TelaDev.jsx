import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelasTroca from '../components/TelaDev/TelasTroca';
import Header from '../components/TelaHome/Header';
import TelaJogo from '../components/TelaDev/TableJogo/TelaJogo';
import TelaUnidade from '../components/TelaDev/TableUnidade/TelaUnidade';
import TelaTurmas from '../components/TelaDev/TableTurmas/TelaTurmas';
import TelaUsuario from '../components/TelaDev/TableUsuarios/TelaUsuario';
import TelaMatriculados from '../components/TelaDev/TableMatriculados/TelaMatriculados';
import LoadingComponent from '../components/TelaPerfil/LoadingComponent';
import TelaPets from '../components/TelaDev/TablePets/TelaPets';



import { useNavigate } from 'react-router-dom';
import TelaRelatorio from '../components/TelaDev/TelaRelatorio/TelaRelatorio';

const TelaDev = () => {
  console.log("Tela renderizada");
  const [Radio, setRadio] = useState('option1');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const FuncaoAlvo = (alvoCapturado) => {
    setRadio(alvoCapturado);
  };

  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  // Simulação de carregamento de dados dos componentes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Desativa o loading após os componentes estarem prontos (simulação)
    }, 2000); // Aqui você pode substituir pela lógica real de carregamento

    return () => clearTimeout(timeout); // Limpa o timeout quando o componente desmonta
  }, []);

  if (loading) {
    return <LoadingComponent />; // Exibe o loading enquanto os componentes estão carregando
  }

  
  return (
    <>

      <div className='mt-5'>

        <TelasTroca FuncaoAlvo={FuncaoAlvo} />
        <div className='d-flex flex-column'>
          {Radio === 'option1' && <TelaUnidade token={token} navigate={navigate} />}
          {Radio === 'option2' && <TelaTurmas token={token} navigate={navigate} />}
          {Radio === 'option3' && <TelaUsuario token={token} navigate={navigate} />}
          {Radio === 'option4' && <TelaMatriculados token={token} navigate={navigate} />}
          {Radio === 'option5' && <TelaJogo token={token} navigate={navigate} />}
          {Radio === 'option6' && <TelaPets token={token} navigate={navigate} />}
          {Radio === 'option7' && <TelaRelatorio token={token} navigate={navigate} />}
          
        </div>
      </div>

    </>
  );
};

export default TelaDev;
