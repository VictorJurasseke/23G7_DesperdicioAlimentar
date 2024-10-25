import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlUsuario = "http://localhost:3025/api/usuario";
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
    const [TableUsuario, setTableUsuario] = useState([])

    async function atualizar() {


        try {
            let resposta = await axios.get(urlUsuario, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTableUsuario(resposta.data)
        } catch (error) {
            SwalErroToken(navigate)
            console.log(error)
        }

    }

    useEffect(() => {
        atualizar()
    }, [])

    return {
        TableUsuario,
        atualizar
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
// estou adicionando usuarios com csv
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
