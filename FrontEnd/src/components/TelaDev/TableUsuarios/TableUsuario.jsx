import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import UsuarioTR from './UsuarioTR';
import { useImportarDadosUsuario, ModalAdicionarUsuario } from './FunctionUsuario';
import LoadDev from '../LoadingDev';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const TableUsuario = ({token,navigate}) => {

    const { TableUsuario, atualizar } = useImportarDadosUsuario(token,navigate)


    return (
        <>
            {TableUsuario.length === 0 && <LoadDev />}
            {TableUsuario.length > 0 &&
                <>
                    <table className="table table-striped  table-hover  text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Usuário</th>
                                <th>Escola</th>
                                <th>Turma</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Nível Acesso</th>
                                <th>Período</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {TableUsuario.map((item) => (
                                <UsuarioTR
                                    key={item.ID_usuarios}
                                    ID_usuarios={item.ID_usuarios}
                                    es_nome={item.es_nome}
                                    tur_nome={item.tur_nome}
                                    user_nome={item.user_nome}
                                    user_email={item.user_email}
                                    user_tipo_acesso={item.user_tipo_acesso}
                                    user_periodo={item.user_periodo}
                                    atualizar={atualizar}
                                    navigate={navigate}
                                    token={token}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '80px' }} >
                        <Button className='btn btn-success' onClick={()=>{ModalAdicionarUsuario(token, navigate)}}>
                        Importar CSV
                        </Button>
                    </div>
                </>}
        </>
    );
};

export default TableUsuario;
