import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import UsuarioTR from './UsuarioTR';
import { useImportarDadosUsuario, ModalAdicionarUsuario, ModalCriarUsuario } from './FunctionUsuario';
import LoadDev from '../LoadingDev';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BiAddToQueue } from "react-icons/bi";


const TableUsuario = ({ token, navigate }) => {

    const { TodosUsuarios, BuscarTodosUsuarios } = useImportarDadosUsuario(token, navigate)
    console.log(TodosUsuarios)
    useEffect(() => {
        BuscarTodosUsuarios()
    }, [])

    return (
        <>
            <table className="table table-striped  table-hover  text-center">
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
                    {TodosUsuarios.map((item) => (
                        <UsuarioTR
                            key={item.ID_usuarios}
                            ID_usuarios={item.ID_usuarios}
                            user_nome={item.user_nome}
                            user_email={item.user_email}
                            user_tipo_acesso={item.user_tipo_acesso}
                            user_periodo={item.user_periodo}
                            atualizar={BuscarTodosUsuarios}
                            navigate={navigate}
                            token={token}
                        />
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-center mt-4">
                <div className='d-flex align-items-center'>
                    <BiAddToQueue
                        className='text-success'
                        onClick={() => { ModalCriarUsuario(token, navigate, BuscarTodosUsuarios) }}
                        style={{ fontSize: '40px', marginRight: '15px', cursor: 'pointer' }}
                    />
                    <Button
                        className="btn btn-success"
                        onClick={() => { ModalAdicionarUsuario(token, navigate, TodosUsuarios, BuscarTodosUsuarios) }}
                    >
                        Importar SVC
                    </Button>
                </div>
            </div>
        </>
    );
};

export default TableUsuario;
