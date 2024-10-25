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

export const useImportarDadosTurmas = (token, navigate) => {
    const [TableTurmas, setTableTurmas] = useState([])
    async function atualizar() {
        console.log("Atualizado")
        try {
            let resposta = await axios.get(urlTurmas, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTableTurmas(resposta.data)
        } catch (error) {
            SwalErroToken(navigate)

        }

    }

    useEffect(() => {
        atualizar()
    }, [])

    return {
        TableTurmas,
        atualizar
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
