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
export const ModalEditUnidade = (id, BuscarUnidades, token, navigate) => {
    console.log(id);
    swalWithBootstrapButtons.fire({
        title: "Edit User",
        text: "Here you can edit user details.",
        icon: "info"
    });
};

// Função de abrir modal para deletar arquivos
export const ModalDeleteUnidade = (id, BuscarUnidades, token, navigate) => {
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
            deletarUnidade(id, BuscarUnidades, token, navigate);
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
    const [TodasUnidade, setTodasUnidade] = useState([]);

    async function BuscarUnidades() {
        try {
            let resposta = await axios.get(urlUnidade, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
         
            setTodasUnidade(resposta.data);
        } catch (error) {
            SwalErroToken(navigate, error)

        }
    }



    return {
        TodasUnidade,
        BuscarUnidades // Retorne a função de BuscarUnidades
    };
};

// Deletar Unidade específica
export const deletarUnidade = async (id, BuscarUnidades, token, navigate) => {
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
            BuscarUnidades(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });

        }
    } catch (error) {
        SwalErroToken(navigate, error)

    }
};




// é passado por params para criar a unidade
export const ModalCriarUnidade = (token, navigate, BuscarUnidades) => {

    Swal.fire({
        title: "Criando Unidade",
        text: "Coloque as informações abaixo!",
        html: `
           <form id="form-jogo">
          <div class="mb-3 text-start">
            <label for="jo_nome" class="form-label">Nome da sua unidade:</label>
            <input type="text" id="nome_unidade" class="form-control" placeholder="Ex: SESI CE-138 ANASTACIO">
          </div>
        </form>
                    `,
        showCancelButton: true,
        confirmButtonText: "Criar Jogo",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            const nome_unidade = document.getElementById("nome_unidade").value;

            console.log(nome_unidade)

            CriarUnidade(navigate, token, nome_unidade, BuscarUnidades)

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Nenhuma escola foi criada!",
                icon: "error"
            });
        }

    });
};

export const CriarUnidade = async (navigate, token, nome_unidade, BuscarUnidades) => {
    try {
        const resposta = await axios.post(`${urlUnidade}/${nome_unidade}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(resposta);
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Sua unidade não foi criada com sucesso!<br> <br> Código do erro: " + resposta.data,
                icon: "error"
            });
        } else {
            BuscarUnidades(); // Atualiza a lista
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Sua unidade foi criada com sucesso!",
                icon: "success"
            });
            console.log("Jogo criado sucesso");
        }
    } catch (error) {

        SwalErroToken(navigate, error)

    }


}
