import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlMatriculados = "http://localhost:3025/api/matriculados";
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

export const ModalEditMatriculados = (id) => {
    swalWithBootstrapButtons.fire({
        title: "Edit User",
        text: "Here you can edit user details.",
        icon: "info"
    });
};

// Função de Abrir Modal para deletar arquivos

export const ModalDeleteMatriculados = (id, atualizar, navigate,token) => {
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
            deletarMatriculados(id, atualizar, navigate,token);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seus arquivos estão seguros",
                icon: "error"
            });
        }
    });
};

export const useImportarDadosMatriculados = (token,navigate) => {
    const [TableMatriculados, setTableMatriculados] = useState([])
  
    async function atualizar() {
        try {
            let resposta = await axios.get(urlMatriculados, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTableMatriculados(resposta.data)
        } catch (error) {
            // SwalErroToken(navigate)
            console.log(error)

        }

    }

    useEffect(() => {
        atualizar()
    }, [])

    return {
        TableMatriculados,
        atualizar
    }
}


export const deletarMatriculados = async (id, atualizar,navigate,token) => {
    
    try {
        let resposta = await axios.delete(`${urlMatriculados}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!resposta.data.status) {
            console.log("Não foi excluído");
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Sua matricula não foi deletada!<br> <br> Código do erro: " + resposta.data.error.code,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Sua matricula foi deletada!",
                icon: "success"
            });
        }
    } catch (error) {
        console.log(error)
        // SwalErroToken(navigate)
    }
};
