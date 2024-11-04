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

export const ModalDeleteMatriculados = (id, atualizar, navigate, token) => {
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
            deletarMatriculados(id, atualizar, navigate, token);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seus arquivos estão seguros",
                icon: "error"
            });
        }
    });
};

export const useImportarDadosMatriculados = (token, navigate) => {
    const [TodosMatriculados, setTodosMatriculados] = useState([])
    
    const [NaoMatriculados, setTodosNaoMatriculados] = useState([])

    async function BuscarTodosMatriculados() {
        try {
            let resposta = await axios.get(urlMatriculados, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodosMatriculados(resposta.data)
        } catch (error) {
            // SwalErroToken(navigate)
            console.log(error)

        }

    }

    async function BuscarNaoMatriculados() {
        try {
            let resposta = await axios.get(urlMatriculados+"/semmatricula", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Resp",resposta)
            setTodosNaoMatriculados(resposta.data)
        } catch (error) {
            // SwalErroToken(navigate)
            console.log(error)

        }

    }



    return {
        TodosMatriculados,
        BuscarTodosMatriculados,

        NaoMatriculados,
        BuscarNaoMatriculados
    }
}

const renderizarJogos = (TodosJogos) => {
    return TodosJogos.map(jogos => `<option value='${jogos.ID_jogos}' name="${jogos.jo_nome}" }>${jogos.jo_nome}</option>`).join('');
};

const renderizarTurmas = (TodasTurmas) => {
    return TodasTurmas.map(turmas => `<option value='${turmas.ID_turmas}' name="${turmas.tur_nome}" }>${turmas.tur_nome}</option>`).join('');
};

// dando erro aqui, não esta lendo como função

const renderizarUsuarios = (NaoMatriculados) => {
    console.log(NaoMatriculados)
    return NaoMatriculados.map(usuarios => `<option value='${usuarios.ID_usuarios}' name="${usuarios.user_nome}" }>${usuarios.user_nome}</option>`).join('');
};



// ModalCriarMatricula
export const ModalCriarMatricula = (NaoMatriculados, navigate, token, TodosJogos, TodasTurmas) => {
  
// fazer todos os perfis selecionados virarem balãozinhos, e terminar esta função de cadastrar

    Swal.fire({
        title: "Criando Matriculas!",
        text: "Coloque as informações abaixo!",
        html: `
           <form id="form-matricula">   
          <div class="mb-3 text-start">
            <p>Selecione o jogo</p>
            <select id="jogo" class="form-select" aria-label="Default select example">
             <option disabled selected>Jogos:</option>
             ${renderizarJogos(TodosJogos)}
            </select>
            </div>
          <div class="mb-3 text-start">
           <p>Selecione a turma</p>
             <select id="turma" class="form-select" aria-label="Default select example">
               <option disabled selected>Turmas:</option>
               ${renderizarTurmas(TodasTurmas)}
          
               </select>
               </div>
               <div class="mb-3 text-start">
               <p>Selecione os usuarios</p>
               <select id="usuarios" class="form-select" aria-label="Default select example">
               <option disabled selected>Usuarios que ainda não jogam:</option>
               ${renderizarUsuarios(NaoMatriculados)}
               
              </select>
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

            
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Nenhuma escola foi criada!",
                icon: "error"
            });
        }

    });
};


export const deletarMatriculados = async (id, atualizar, navigate, token) => {

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
