import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlTurmas = "http://localhost:3025/api/turmas";
import { SwalErroToken } from '../../TelaPerfil/SwalError';


// Variavel necessaria para o SweetAlert2

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

// Função de abrir a tela de edição de items

export const ModalEditTurmas = (id,atualizar, token, navigate) => {
    swalWithBootstrapButtons.fire({
        title: "Edit User",
        text: "Here you can edit user details.",
        icon: "info"
    });
};

// Função de Abrir Modal para deletar arquivos

export const ModalDeleteTurmas = (id,atualizar, token, navigate) => {
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
            deletarTurmas(id, atualizar,token, navigate);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seus arquivos estão seguros",
                icon: "error"
            });
        }
    });
};



export const ModalCriarTurma = (token, navigate, BuscarTurmas) => {

    Swal.fire({
        title: "Criando Turma",
        text: "Coloque as informações abaixo!",
        html: `
           <form id="form-jogo">
          <div class="mb-3 text-start">
            <label for="jo_nome" class="form-label">Nome da turma:</label>
            <input type="text" id="nome_turma" class="form-control" placeholder="Ex: 3 Ano do Ensino Médio">
          </div>
        </form>
                    `,
        showCancelButton: true,
        confirmButtonText: "Criar Jogo",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            const nome_turma = document.getElementById("nome_turma").value;

            console.log(nome_turma)

            CriarTurmas(navigate, token, nome_turma, BuscarTurmas)

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Nenhuma Turma foi criada!",
                icon: "error"
            });
        }

    });
};

export const CriarTurmas = async (navigate, token, nome_turma, BuscarTurmas) => {
    try {
        const resposta = await axios.post(`${urlTurmas}/${nome_turma}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(resposta);
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Sua escola não foi criada com sucesso!<br> <br> Código do erro: " + resposta.data,
                icon: "error"
            });
        } else {
            BuscarTurmas(); // Atualiza a lista
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Sua turma foi criada com sucesso!",
                icon: "success"
            });
         
        }
    } catch (error) {

        SwalErroToken(navigate) 
        console.log(error)
    }


}

export const useImportarDadosTurmas = (token, navigate) => {
    const [TodasTurmas, setTodasTurmas] = useState([])
    async function BuscarTurmas() {
        console.log("buscando turmas..")
        try {
            let resposta = await axios.get(urlTurmas, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodasTurmas(resposta.data)
        } catch (error) {
            SwalErroToken(navigate)

        }

    }

    return {
        TodasTurmas,
        BuscarTurmas
    }
}

export const deletarTurmas = async (id, atualizar,token, navigate) => {
    try {
        let resposta = await axios.delete(`${urlTurmas}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Sua turma não foi deletada!<br> <br> Código do erro: " + resposta.data.error.code,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Sua turma foi deletado!",
                icon: "success"
            });
        }
    } catch (error) {
        console.error('Erro ao deletar uma turma:', error);
        SwalErroToken(navigate)
    }
    }
