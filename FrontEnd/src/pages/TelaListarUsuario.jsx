import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/TelaHome/Header';
import FiltrosRadios from '../components/TelaListarUsuario/FiltrosRadios';
import CardUsuario from '../components/TelaListarUsuario/CardAluno';
import { useNavigate } from 'react-router-dom';
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import { useImportarDadosJogadores } from '../components/TelaListarUsuario/FunctionListarUsuario';
import Fuse from 'fuse.js';


const TelaUsuario = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);
  const { TodosJogadores, BuscarTodosJogadores, setTodosJogadores, TodasTurmas } = useImportarDadosJogadores(token, navigate);

  const [JogadoresFiltrados, setJogadoresFiltrados] = useState([]);
  const [FiltroTurma, setFiltroTurma] = useState('Todos'); // Alterado para garantir valor inicial


  // useState que guarda o texto do input de pesquisa
  const [Pesquisa, setPesquisa] = useState('');

  // Configurações do Fuse.js
  const fuseOptions = {
    keys: ['user_nome'], // Campos que serão pesquisados
    threshold: 0.4, // Sensibilidade da pesquisa
  };

  // Instância do Fuse.js
  const fuse = new Fuse(JogadoresFiltrados, fuseOptions);




  const AlterarTurma = (ID_turmas) => {
    setFiltroTurma(ID_turmas);
  };

  useEffect(() => {
    if (FiltroTurma !== 'Todos') {
      setJogadoresFiltrados(TodosJogadores.filter(InfoJogadores => InfoJogadores.turmas_ID_turmas === FiltroTurma));
    } else {
      setJogadoresFiltrados(TodosJogadores);  // Exibe todos os pets quando 'Todos' é selecionado
    }
  }, [FiltroTurma]);

  useEffect(() => {
    BuscarTodosJogadores(setJogadoresFiltrados)
    verificarUsuario();
    FiltrarBarraPesquisa()
  }, []);

  const FiltrarBarraPesquisa = () => {
    if (Pesquisa.trim() === '') {
      setFiltroTurma('Todos')
    } else {
      const resultados = fuse.search(Pesquisa).map((result) => result.item);
      setJogadoresFiltrados(resultados);
    }
  }
  useEffect(() => {
    FiltrarBarraPesquisa()
  }, [Pesquisa, TodosJogadores]);

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
                  {TodasTurmas.map((item) => (
                    <FiltrosRadios
                      key={item.ID_turmas}  // Adicione uma chave única para cada elemento
                      ID_turmas={item.ID_turmas}
                      tur_nome={item.tur_nome}
                      AlterarTurma={AlterarTurma}
                    />
                  ))}
                </div>
                <form className="d-flex gap-2" role="search">
                  <input
                    value={Pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              </div>
              <div className='col-12 d-flex flex-wrap align-self-center p-2 align-items-center gap-3 flex-row'>
                {JogadoresFiltrados.length > 0 ? (
                  <>
                    
                    {JogadoresFiltrados.map((item) => (
                      <CardUsuario
                        key={item.ID_usuarios}
                        user_nome={item.user_nome}
                        user_img_caminho={item.user_img_caminho}
                        ID_usuarios={item.ID_usuarios}
                        pontos_usuario={item.pontos_usuario}
                        peso_acumulativo={item.peso_acumulativo}
                        rank_usuario={item.rank_usuario}
                        jo_nome={item.jo_nome}
                        jo_tema={item.jo_tema}
                        tur_nome={item.tur_nome}
                        nome_pet={item.nome_pet}
                        caminho_pet={item.caminho_pet}
                        raridade_pet={item.raridade_pet}
                        ID_inv_pets={item.ID_inv_pets}
                        evolucao={item.evolucao}
                        token={token}
                        navigate={navigate}
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
