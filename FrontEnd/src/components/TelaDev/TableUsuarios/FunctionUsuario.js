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
export const ModalEditUsuario = async (id, atualizar, token, navigate) => {
    try {
        // Requisição para buscar dados do usuário
        let resposta = await axios.get(`${urlUsuario}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Dados do usuário para preencher o formulário
        const usuario = resposta.data[0]// Acessando o primeiro item da resposta


        // Exibir o modal com os dados do usuário
        const { value: formValues } = await Swal.fire({
            title: `Editar usuário: ${usuario.user_nome}`,
            html: `
            <form id="form-jogo">
                <div class="mb-3 text-start">
                    <label for="user_nome" class="form-label">Nome:</label>
                    <input type="text" id="user_nome_edit" class="form-control" placeholder="Nome do aluno" value="${usuario.user_nome || ''}">
                </div>
                <div class="mb-3 text-start">
                    <label for="user_email_edit" class="form-label">Email:</label>
                    <input type="text" id="user_email_edit" class="form-control" placeholder="Email@gmail.com" value="${usuario.user_email || ''}">
                </div>
                <div class="mb-3 text-start">
                    <label for="user_senha" class="form-label">Senha:</label>
                    <input type="password" id="user_senha_edit" class="form-control" placeholder="Sesisp@SeuRM"">
                </div>
                <div class="mb-3 text-start">
                    <label for="tipo_acesso_edit" class="form-label">Tipo de Acesso:</label>
                    <select id="tipo_acesso_edit" class="form-select">
                        <option value="0" ${usuario.user_tipo_acesso === 0 ? 'selected' : ''}>Administrador</option>
                        <option value="1" ${usuario.user_tipo_acesso === 1 ? 'selected' : ''}>Aluno</option>
                        <option value="2" ${usuario.user_tipo_acesso === 2 ? 'selected' : ''}>Usuário</option>
                        <option value="3" ${usuario.user_tipo_acesso === 3 ? 'selected' : ''}>Jogador</option>
                        <option value="4" ${usuario.user_tipo_acesso === 4 ? 'selected' : ''}>Banca</option>
                    </select>
                </div>
                <div class="mb-3 text-start">
                    <label for="periodo" class="form-label">Período:</label>
                    <select id="periodo_edit" class="form-select">
                        <option value="Matutino" ${usuario.user_periodo === 'Matutino' ? 'selected' : ''}>Matutino</option>
                        <option value="Noturno" ${usuario.user_periodo === 'Noturno' ? 'selected' : ''}>Noturno</option>
                    </select>
                </div>
            </form>`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            confirmButtonText: "Confirmar",
            preConfirm: () => {
                // Retorna os dados do formulário preenchido
                return {
                    user_nome: document.getElementById('user_nome_edit').value,
                    user_email: document.getElementById('user_email_edit').value,
                    user_senha: document.getElementById('user_senha_edit').value,
                    user_tipo_acesso: document.getElementById('tipo_acesso_edit').value,
                    user_periodo: document.getElementById('periodo_edit').value,
                    user_img_caminho: usuario.user_img_caminho || "User.png", // Mantendo a imagem original ou atribuindo um padrão
                    user_qrcode: usuario.user_qrcode || "" // Mantendo o QR code original ou vazio
                };
            }
        });

        if (formValues) {
            // Chame a função para criar ou editar o usuário com os dados coletados
            EditarUsuario(navigate, token, formValues, atualizar,id);
        }
    } catch (error) {
        console.error("Erro ao editar o usuário:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao carregar os dados do usuário. Tente novamente mais tarde.'
        });
    }
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




const EditarUsuario = async (navigate, token, formValues, BuscarTodosUsuarios,id) => {

    try {
        const resposta = await axios.put(`${urlUsuario}/${id}`, formValues, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });


        console.log(resposta.data.status);
        console.log("respota", resposta);


        if (resposta.data?.errors || resposta?.status == false) {

            console.log("Há erros presentes", resposta.data.errors)

            ModalErroUsuario(resposta.data.errors, token, navigate, BuscarTodosUsuarios)
        } else {
            BuscarTodosUsuarios(); // Atualiza a lista
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu usuário foi editado com sucesso!",
                icon: "success"
            });
            console.log("Usuário criado com sucesso");
        }
    } catch (error) {
        console.log("Deu algum erro?")
        SwalErroToken(navigate, error);
    }


}

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
            SwalErroToken(navigate, error)

        }

    }

    return {
        TodosUsuarios,
        BuscarTodosUsuarios,
        setTodosUsuarios
    }
}

export const deletarUsuario = async (id, atualizar, token, navigate) => {
    try {
        let resposta = await axios.delete(`${urlUsuario}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(resposta)
        if (!resposta.data.status) {

            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu usuario não foi deletado!<br> <br>" + resposta.data.message,
                icon: "error"
            });
        } else {
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Seu usuario foi deletado!",
                icon: "success"
            });
            console.log("Apagou sucesso", resposta.data)
            atualizar(); // Atualiza a lista após a exclusão

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
        <option value="4">Banca</option>
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
            CriarUsuario(navigate, token, Form, BuscarTodosUsuarios, setUsuarioFiltrado)

        }
    });
};




// CriarUsuario
export const CriarUsuario = async (navigate, token, Form, BuscarTodosUsuarios, setUsuarioFiltrado) => {


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
        confirmButtonText: 'Fechar',
    }).then((result) => {
        if (result.isConfirmed) {
            
        }
    });
}

