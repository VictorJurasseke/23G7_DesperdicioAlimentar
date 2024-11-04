import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlUsuario = "http://localhost:3025/api/usuario";
import { SwalErroToken } from '../../TelaPerfil/SwalError';
import { Form } from 'react-router-dom';

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

export const ModalDeleteUsuario = (id, atualizar, token, navigate) => {

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
            deletarUsuario(id, atualizar, token, navigate);
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

    async function BuscarTodosUsuarios() {


        try {
            let resposta = await axios.get(urlUsuario, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodosUsuarios(resposta.data)
        } catch (error) {
            SwalErroToken(navigate)
            console.log(error)
        }

    }

    return {
        TodosUsuarios,
        BuscarTodosUsuarios
    }
}

export const deletarUsuario = async (id, atualizar, token, navigate) => {
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
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Seu usuario foi deletado!",
                icon: "success"
            });

        }
    } catch (error) {
        SwalErroToken(navigate)
        console.error('Erro ao deletar um jogo:', error);
    }
};
// estou adicionando usuarios com SVC
export const ModalAdicionarUsuario = (token, navigate) => {


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



export const ModalCriarUsuario = async (token, navigate, BuscarTodosUsuarios) => {
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
                    <input type="password" id="user_senha" class="form-control" placeholder="Sesisp@SeuRM">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="tipo_acesso" class="form-label">Tipo de Acesso:</label>
                    <select id="tipo_acesso" class="form-select" aria-label="Default select example">
                      <option disabled selected>Tipos de Acesso:</option>
                      <option value="0">Administrador</option>
                      <option value="1">Aluno</option>
                    </select>
                  </div>
                  <div class="mb-3 text-start">
                    <label for="periodo" class="form-label">Período:</label>
                    <select id="periodo" class="form-select" aria-label="Default select example">
                      <option disabled selected>Periodos:</option>
                      <option value="Matutino">Matutino</option>
                      <option value="Noturno">Noturno</option>
                    </select>
                  </div>
               </form>`,
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#198754",
        confirmButtonText: "Cadastrar"
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

            console.log("Objeto Form:", Form);
            CriarUsuario(navigate, token, Form, BuscarTodosUsuarios)
          
        }
    });
};


// CriarUsuario
export const CriarUsuario = async (navigate, token, Form, BuscarTodosUsuarios) => {
    try {
        const resposta = await axios.post(`${urlUsuario}`, Form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(resposta.data.status);

        if (resposta.data.status !== true) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu usuário não foi criado com sucesso!<br> <br> Código do erro: " + resposta.data.message || 'Erro desconhecido',
                icon: "error"
            });
        } else {
            BuscarTodosUsuarios(); // Atualiza a lista
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu usuário foi criado com sucesso!",
                icon: "success"
            });
            console.log("Usuário criado com sucesso");
        }
    } catch (error) {
        // Aqui você pode tratar o erro específico, se necessário
        // SwalErroToken(navigate);
        console.log("Erro ao criar usuário:", error);
    }
};
