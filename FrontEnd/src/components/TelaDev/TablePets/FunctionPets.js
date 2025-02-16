import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlPets = "http://localhost:3025/api/pets";
import { SwalErroToken } from '../../TelaPerfil/SwalError';

// Variável necessária para o SweetAlert2
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

// Função para abrir a tela de edição de pets
export const ModalEditPets = (ID_pet, atualizar, token, navigate) => {
    swalWithBootstrapButtons.fire({
        title: "Editar Pet",
        text: "Aqui você pode editar os detalhes do pet.",
        icon: "info"
    });
};

// Função para abrir o Modal para deletar pet especifico
export const ModalDeletePet = (ID_pet, atualizar, token, navigate) => {
    swalWithBootstrapButtons.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deletarPet(ID_pet, atualizar, token, navigate);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seu pet está seguro",
                icon: "error"
            });
        }
    });
};

// Hook para importar dados dos pets
export const useImportarDadosPets = (token, navigate) => {
    const [TodosPets, setTodosPets] = useState([]);

    const BuscarTodosPets = async () => {
        try {
            const resposta = await axios.get(urlPets, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTodosPets(resposta.data);
        } catch (error) {
            SwalErroToken(navigate, error);
        }
    };
    return { TodosPets, BuscarTodosPets };
};

// // Função para deletar um pet
export const deletarPet = async (id, nome, atualizar, token, navigate) => {
    try {
        const resposta = await axios.delete(`${urlPets}/${id}/${nome}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: `Seu pet não foi deletado!<br> <br> Código do erro: ${resposta.data.error.code}`,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deletado!",
                text: "Seu pet foi deletado!",
                icon: "success"
            });
        }
    } catch (error) {
        SwalErroToken(navigate, error);
    }
};

export const ModalCriarPet = async (token, navigate, TodosPets, BuscarTodosPets) => {
    Swal.fire({
        title: "Inserir Pet",
        html: `
        <form id="form-pet">
            <div class="mb-3 text-start">
                <label for="nome_pet" class="form-label">Nome do Pet:</label>
                <input type="text" id="nome_pet" class="form-control" placeholder="Nome do Pet" />
            </div>
            <div class="mb-3 text-start">
                <label for="caminho_pet" class="form-label">Imagem do Pet:</label>
                <input type="file" id="caminho_pet" class="form-control" />
            </div>
            <div class="mb-3 text-start">
                <label for="desc_pet" class="form-label">Descrição do Pet:</label>
                <textarea id="desc_pet" class="form-control" placeholder="Descrição do Pet" rows="3"></textarea>
            </div>
            <div class="mb-3 text-start">
                <label for="ponto_pet" class="form-label">Pontos para o pet evoluir:</label>
                <input type="number" id="ponto_pet" class="form-control" placeholder="Pontos padrão 100" />
            </div>
            <div class="mb-3 text-start">
                <label for="raridade_pet" class="form-label">Raridade do Pet:</label>
                <select id="raridade_pet" class="form-select">
                    <option disabled selected>Selecione a raridade:</option>
                    <option value="Comum">Comum</option>
                    <option value="Raro">Raro</option>
                    <option value="Épico">Épico</option>
                    <option value="Lendário">Lendário</option>
                </select>
            </div>
        </form>
        `,
        icon: "info",
        confirmButtonColor: "#198754",
        denyButtonColor: "#ffc107",
        confirmButtonText: "Cadastrar",
        showDenyButton: true, // Habilita o botão de "Cadastrar Pets Padrão"
        denyButtonText: "Cadastrar Pets Padrão", // Texto do botão "Cadastrar Pets Padrão"

        preConfirm: async () => {
            const formData = new FormData();
            formData.append("nome_pet", document.getElementById("nome_pet").value);
            formData.append("desc_pet", document.getElementById("desc_pet").value);
            formData.append("ponto_pet", document.getElementById("ponto_pet").value);
            formData.append("raridade_pet", document.getElementById("raridade_pet").value);

            // Captura o arquivo do input
            const fileInput = document.getElementById("caminho_pet");
            if (fileInput.files.length > 0) {
                formData.append("pet_img_caminho", fileInput.files[0]);
            }

            return formData; // Retorna os dados para serem usados após o clique no botão "Cadastrar"
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const formData = result.value;
            CriarPet(token, navigate, formData, BuscarTodosPets);
        } else if (result.isDenied) {
            // Chama a função para cadastrar pets padrão
            CadastrarPetsPadrao(token, navigate, BuscarTodosPets);
        }
    });
};

const CadastrarPetsPadrao = async (token, navigate, BuscarTodosPets) => {
    try {
        // Enviar a requisição POST para o endpoint /pets
        const resposta = await axios.post(urlPets+'/criarPets', {}, {
            headers: {
                "Authorization": `Bearer ${token}`, // Apenas o token no cabeçalho
            },
        });

        // Exibir a resposta no console para depuração
        console.log(resposta);

        if (resposta.data.status === true) {
            // Se a resposta for bem-sucedida, pode chamar alguma ação, como buscar todos os pets ou exibir uma mensagem
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Pets padrão cadastrados com sucesso!",
                icon: "success"
            });
            BuscarTodosPets()
        } else {
            // Caso contrário, exibe uma mensagem de erro com a resposta
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Os pets padrão não foram cadastrados com sucesso!<br> <br> Código do erro: " + (resposta.data.message || 'Erro desconhecido'),
                icon: "error"
            });
        }
    } catch (error) {
        // Tratar erros na requisição, como token inválido
        SwalErroToken(navigate, error);
    }
};


// Função para criar pet no backend
export const CriarPet = async (token, navigate, formData, BuscarTodosPets) => {
    try {
        const resposta = await axios.post(urlPets, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log(resposta.data.status)
        if (resposta.data.status == true) {
            BuscarTodosPets(); // Atualiza a lista
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu pet foi criado com sucesso!",
                icon: "success"
            });
        } else {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu pet não foi criado com sucesso!<br> <br> Código do erro: " + (resposta.data.message || 'Erro desconhecido'),
                icon: "error"
            });
        }
    } catch (error) {
        SwalErroToken(navigate, error);
    }
};


// Função para abrir o Modal para deletar todos os pets
export const ModalDeleteTodosPets = (atualizar, token, navigate) => {
    swalWithBootstrapButtons.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deletarTodosPet(atualizar, token, navigate);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seu pet está seguro",
                icon: "error"
            });
        }
    });
};


// // Função para deletar um pet
const deletarTodosPet = async (atualizar, token, navigate) => {
    try {
        const resposta = await axios.delete(`${urlPets}/apagartodos`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(resposta)
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: `${resposta.data?.message}`,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deletado!",
                text: "Seu pet foi deletado!",
                icon: "success"
            });
        }
    } catch (error) {
        SwalErroToken(navigate, error);
    }
};