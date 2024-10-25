import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlUnidade = "http://localhost:3025/api/escola";
import { SwalErroToken } from '../../TelaPerfil/SwalError';
import { useNavigate } from 'react-router-dom';

// Variável necessária para o SweetAlert2
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

// Função de abrir a tela de edição de itens
export const ModalEditUnidade = (id, atualizar, token, navigate) => {
    console.log(id);
    swalWithBootstrapButtons.fire({
        title: "Edit User",
        text: "Here you can edit user details.",
        icon: "info"
    });
};

// Função de abrir modal para deletar arquivos
export const ModalDeleteUnidade = (id, atualizar, token, navigate) => {
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
            deletarUnidade(id, atualizar, token, navigate);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seus arquivos estão seguros",
                icon: "error"
            });
        }
    });
};

// Listar todas as unidades
export const useImportarDadosUnidade = (token, navigate) => {
    const [Tableunidade, setTableunidade] = useState([]);

    async function atualizar() {
        try {
            let resposta = await axios.get(urlUnidade, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTableunidade(resposta.data);
        } catch (error) {
            SwalErroToken(navigate)
        }
    }

    useEffect(() => {
        atualizar();
    }, []);

    return {
        Tableunidade,
        atualizar // Retorne a função de atualizar
    };
};

// Deletar Unidade específica
export const deletarUnidade = async (id, atualizar, token, navigate) => {
    try {
        let resposta = await axios.delete(`${urlUnidade}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                text: "Seu arquivo não foi deletado!   " + resposta.data.error.code,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            
        }
    } catch (error) {
        SwalErroToken(navigate)
        console.error('Erro ao deletar uma escola:', error);
    }
};
