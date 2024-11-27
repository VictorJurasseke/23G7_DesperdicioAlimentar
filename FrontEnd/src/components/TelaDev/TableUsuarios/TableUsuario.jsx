import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import UsuarioTR from './UsuarioTR';
import { useImportarDadosUsuario, ModalAdicionarUsuario, ModalCriarUsuario } from './FunctionUsuario';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BiAddToQueue } from "react-icons/bi";
import Fuse from 'fuse.js';
import LoadingComponent from '../../TelaPerfil/LoadingComponent';
import LoadDev from '../LoadingDev';

const TableUsuario = ({ token, navigate }) => {

    const { TodosUsuarios, BuscarTodosUsuarios, setTodosUsuarios } = useImportarDadosUsuario(token, navigate);

    // Variável que guarda o filtro selecionado
    const [SelectAcesso, setSelectAcesso] = useState();

    // useState que guarda os usuários filtrados    
    const [UsuarioFiltrado, setUsuarioFiltrado] = useState(TodosUsuarios);

    // useState que guarda o texto do input de pesquisa
    const [Pesquisa, setPesquisa] = useState('');

    // Configurações do Fuse.js
    const fuseOptions = {
        keys: ['user_nome', 'user_email'], // Campos que serão pesquisados
        threshold: 0.4, // Sensibilidade da pesquisa
    };

    // Instância do Fuse.js
    const fuse = new Fuse(UsuarioFiltrado, fuseOptions);


    const SelectSwitchAcesso = (SelectAcesso) =>{
        switch (SelectAcesso) {
            case '0':
                setUsuarioFiltrado(TodosUsuarios.filter((usuario) => usuario.user_tipo_acesso === 0));
                break;
            case '1':
                setUsuarioFiltrado(TodosUsuarios.filter((usuario) => usuario.user_tipo_acesso === 1));
                break;
            case '2':
                setUsuarioFiltrado(TodosUsuarios.filter((usuario) => usuario.user_tipo_acesso === 2));
                break;
            case '3':
                setUsuarioFiltrado(TodosUsuarios.filter((usuario) => usuario.user_tipo_acesso === 3));
                break;
            default:
                setUsuarioFiltrado(TodosUsuarios);
    
        }
    }

    // Efeito para filtrar por tipo de acesso
    useEffect(() => {
        SelectSwitchAcesso(SelectAcesso)
        setPesquisa('')
    }, [SelectAcesso, TodosUsuarios]);

    // Efeito para buscar todos os usuários ao montar o componente
    useEffect(() => {
        BuscarTodosUsuarios(setUsuarioFiltrado);
        SelectSwitchAcesso(SelectAcesso)
        FiltrarBarraPesquisa()
    }, []);

    // Função para lidar com a pesquisa

    const FiltrarBarraPesquisa = () =>{
        if (Pesquisa.trim() === '') {
            setUsuarioFiltrado(TodosUsuarios);
            SelectSwitchAcesso(SelectAcesso)
        } else {
            const resultados = fuse.search(Pesquisa).map((result) => result.item);
            setUsuarioFiltrado(resultados);
        }
    }
    useEffect(() => {
        FiltrarBarraPesquisa()
    }, [Pesquisa, TodosUsuarios]);

    return (
        <>
            <div className='col-12 d-flex justify-content-end'>
                <div className='align-items-center text-center d-flex flex-row gap-3 position-absolute' style={{ top: '200px', zIndex:20 }}>
                    <form className="d-flex" role="search">
                        <select
                            onChange={(e) => setSelectAcesso(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="5" selected>Todos</option>
                            <option value="0">Administrador</option>
                            <option value="1">Aluno</option>
                            <option value="2">Usuário</option>
                            <option value="3">Jogador</option>
                        </select>
                    </form>
                    <form className="d-flex" role="search">
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
            </div>
            {UsuarioFiltrado.length > 0 ? (
                <table className="table table-striped table-hover text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID Usuário</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Nível Acesso</th>
                            <th>Período</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {UsuarioFiltrado.map((item) => (
                            <UsuarioTR
                                key={item.ID_usuarios}
                                ID_usuarios={item.ID_usuarios}
                                user_nome={item.user_nome}
                                user_email={item.user_email}
                                user_tipo_acesso={item.user_tipo_acesso}
                                user_periodo={item.user_periodo}
                                atualizar={BuscarTodosUsuarios}
                                setUsuarioFiltrado={setUsuarioFiltrado}
                                navigate={navigate}
                                token={token}
                                setSelectAcesso={setSelectAcesso}
                                UsuarioFiltrado={UsuarioFiltrado}
                            />
                        ))}
                    </tbody>
                </table>

            ) : (<p className='text-center mt-4'>Não há resultados para busca...</p>)
            }

            <div className="d-flex justify-content-center mt-4">
                <div className='d-flex align-items-center'>
                    <BiAddToQueue
                        className='text-success'
                        onClick={() => ModalCriarUsuario(token, navigate, BuscarTodosUsuarios, setUsuarioFiltrado)}
                        style={{ fontSize: '40px', marginRight: '15px', cursor: 'pointer' }}
                    />
                    <Button
                        className="btn btn-success"
                        onClick={() => ModalAdicionarUsuario(token, navigate, TodosUsuarios, BuscarTodosUsuarios, setUsuarioFiltrado)}
                    >
                        Importar SVC
                    </Button>
                </div>
            </div>
        </>
    );
};

export default TableUsuario;
