import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlUsuario = "http://localhost:3025/api/usuario";
import { SwalErroToken } from '../../TelaPerfil/SwalError';
import { Form } from 'react-router-dom';
import CaixaInput from '../../TelaCadastro/CaixaInput';

// Variavel necessaria para o SweetAlert2

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

// Função de abrir a tela de edição de items

export const ModalEditUsuario = (id, atualizar, token, navigate) => {

    swalWithBootstrapButtons.fire({
        title: "Edit User",
        text: "Here you can edit user details.",
        icon: "info"
    });
};

// Função de Abrir Modal para deletar arquivos

export const ModalDeleteUsuario = (id, atualizar, token, navigate,setUsuarioFiltrado,setSelectAcesso) => {

    swalWithBootstrapButtons.fire({
        title: "Tem certeza?",
        text: "Você não podera reverter isto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deletarUsuario(id, atualizar, token, navigate,setUsuarioFiltrado,setSelectAcesso);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seus arquivos estão seguros",
                icon: "error"
            });
        }
    });
};

export const useImportarDadosUsuario = (token, navigate) => {
    const [TodosUsuarios, setTodosUsuarios] = useState([])

    async function BuscarTodosUsuarios(setUsuarioFiltrado) {


        try {
            let resposta = await axios.get(urlUsuario, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsuarioFiltrado(resposta.data)
            setTodosUsuarios(resposta.data)
        } catch (error) {
            SwalErroToken(navigate, error)

        }

    }

    return {
        TodosUsuarios,
        BuscarTodosUsuarios,
        setTodosUsuarios
    }
}

export const deletarUsuario = async (id, atualizar, token, navigate,setUsuarioFiltrado,setSelectAcesso) => {
    try {
        let resposta = await axios.delete(`${urlUsuario}/${id}`);
        if (!resposta.data.status) {

            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu usuario não foi deletado!<br> <br> Código do erro: " + resposta.data.error.code,
                icon: "error"
            });
        } else {
            console.log(resposta.data)
            atualizar(setUsuarioFiltrado); // Atualiza a lista após a exclusão
            setSelectAcesso('5')
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Seu usuario foi deletado!",
                icon: "success"
            });

        }
    } catch (error) {
        SwalErroToken(navigate, error)

    }
};
// estou adicionando usuarios com SVC
export const ModalAdicionarUsuario = (token, navigate, BuscarTodosUsuarios) => {


    swalWithBootstrapButtons.fire({
        title: "Inserir usuários",
        html: `<div className="input-group mb-3">
                    <input type="file" class="form-control" id="inputGroupFile02">
                </div >
 `,
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Upload"
    }).then((result) => {
        if (result.isConfirmed) {



        }
    });
    console.log("AA")
}

// CRIAR ATRAVÉs DE INPUT 



export const ModalCriarUsuario = async (token, navigate, BuscarTodosUsuarios, setUsuarioFiltrado) => {
    Swal.fire({
        title: "Inserir usuários",
        html: `<form id="form-jogo">
                  <div class="mb-3 text-start">
                    <label for="user_nome" class="form-label">Nome:</label>
                    <input type="text" id="user_nome" class="form-control" placeholder="Nome do aluno">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="user_email" class="form-label">Email:</label>
                    <input type="text" id="user_email" class="form-control" placeholder="Email@gmail.com">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="user_senha" class="form-label">Senha:</label>
                    <input autoComplete="password" type="password" id="user_senha" class="form-control" placeholder="Sesisp@SeuRM">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="tipo_acesso" class="form-label">Tipo de Acesso:</label>
                    <select id="tipo_acesso" class="form-select" aria-label="Default select example">
                      <option disabled selected value="">Tipos de Acesso:</option>
                      <option value="0">Administrador</option>
                      <option value="1">Aluno</option>
                      <option value="2">Usuário</option>
                    </select>
                  </div>
                  <div class="mb-3 text-start">
                    <label for="periodo" class="form-label">Período:</label>
                    <select id="periodo" class="form-select" aria-label="Default select example">
                      <option disabled selected value="" >Periodos:</option>
                      <option value="Matutino">Matutino</option>
                      <option value="Noturno">Noturno</option>
                    </select>
                  </div>
               </form>`,
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#198754",
        confirmButtonText: "Cadastrar",
        preConfirm: () => {

        }
    }).then((result) => {
        if (result.isConfirmed) {
            const Form = {
                user_nome: document.getElementById('user_nome').value,
                user_email: document.getElementById('user_email').value,
                user_senha: document.getElementById('user_senha').value,
                user_tipo_acesso: document.getElementById('tipo_acesso').value,
                user_periodo: document.getElementById('periodo').value,
                user_img_caminho: "User.png", // Adicione o caminho da imagem se necessário
                user_qrcode: "" // Adicione o QR code se necessário
            };
            
            console.log("Periodoo", Form.user_periodo)
            console.log("Objeto Form:", Form);
            CriarUsuario(navigate, token, Form, BuscarTodosUsuarios,setUsuarioFiltrado)

        }
    });
};




// CriarUsuario
export const CriarUsuario = async (navigate, token, Form, BuscarTodosUsuarios,setUsuarioFiltrado) => {


    try {
        const resposta = await axios.post(`${urlUsuario}`, Form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });


        console.log(resposta.data.status);
        console.log("respota", resposta);


        if (resposta.data.errors || resposta.status == false) {

            console.log("Há erros presentes", resposta.data.errors)

            ModalErroUsuario(resposta.data.errors, token, navigate, BuscarTodosUsuarios)
        } else {
            BuscarTodosUsuarios(setUsuarioFiltrado); // Atualiza a lista
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu usuário foi criado com sucesso!",
                icon: "success"
            });
            console.log("Usuário criado com sucesso");
        }
    } catch (error) {
        SwalErroToken(navigate, error);
    }
}



export const ModalErroUsuario = (errors, token, navigate, BuscarTodosUsuarios) => {


    const erroFormatado = errors.join('<br>')



    Swal.fire({
        title: 'Erro!',
        html: erroFormatado,
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Tentar novamente',
    }).then((result) => {
        if (result.isConfirmed) {
            ModalCriarUsuario(token, navigate, BuscarTodosUsuarios);
        }
    });
}

