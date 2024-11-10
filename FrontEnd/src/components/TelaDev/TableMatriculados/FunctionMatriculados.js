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

export const ModalDeleteMatriculados = (ID_usuarios, BuscarTodosMatriculados, BuscarNaoMatriculados, navigate, token) => {
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
            deletarMatriculados(ID_usuarios, BuscarTodosMatriculados, BuscarNaoMatriculados, navigate, token);

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
            SwalErroToken(navigate, error)

        }

    }

    // BUSCA TODOS OS USUARIOS 
    async function BuscarNaoMatriculados() {

        try {
            let resposta = await axios.get(urlMatriculados + "/semmatricula", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodosNaoMatriculados(resposta.data)
        } catch (error) {
            SwalErroToken(navigate, error)


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

const renderizarUsuarios = (NaoMatriculados) => {

    return NaoMatriculados.map(usuarios => `<option value='${usuarios.ID_usuarios}' name="${usuarios.user_nome}" }>${usuarios.user_nome}</option>`).join('');
};



// ModalCriarMatricula
export const ModalCriarMatricula = (NaoMatriculados, BuscarNaoMatriculados, navigate, token, TodosJogos, TodasTurmas, BuscarTodosMatriculados) => {

    Swal.fire({
        title: "Criando Matriculas!",
        text: "Coloque as informações abaixo!",
        html: `
           <form id="form-matricula">   
              <div class="mb-3 text-start">
                <p>Selecione o jogo</p>
                <select id="ID_jogo" class="form-select" aria-label="Default select example">
                  <option disabled value="" selected>Jogos:</option>
                  ${renderizarJogos(TodosJogos)}
                </select>
              </div>
              <div class="mb-3 text-start">
                <p>Selecione a turma</p>
                <select id="ID_turmas" class="form-select" aria-label="Default select example">
                  <option disabled value="" selected>Turmas:</option>
                  ${renderizarTurmas(TodasTurmas)}
                </select>
              </div>
              <div class="mb-3 text-start">
                <p>Selecione os usuarios</p>
                <select id="ID_usuarios" class="form-select" aria-label="Default select example">
                  <option disabled value="" selected>Usuarios que ainda não jogam:</option>
                  ${renderizarUsuarios(NaoMatriculados)}
                </select>
              </div>
              <p id="error-msg" class="text-danger" style="display: none;">Preencha todos os campos</p>
           </form>
        `,
        showCancelButton: true,
        confirmButtonText: "Matricular",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        preConfirm: () => {
            const ID_jogo = document.getElementById("ID_jogo").value;
            const ID_turmas = document.getElementById("ID_turmas").value;
            const ID_usuarios = document.getElementById("ID_usuarios").value;

            if (!ID_jogo || !ID_turmas || !ID_usuarios) {
                document.getElementById("error-msg").style.display = "block";
                return false; // impede o fechamento do modal
            }

            return { ID_jogo, ID_turmas, ID_usuarios }; // retorna os valores para o then
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            const Form = result.value;
            MatricularAluno(navigate, token, Form, BuscarTodosMatriculados, BuscarNaoMatriculados);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Nenhuma matrícula foi criada!",
                icon: "error"
            });
        }
    });
};


export const MatricularAluno = async (navigate, token, form, BuscarTodosMatriculados, BuscarNaoMatriculados) => {
    try {

        const resposta = await axios.post(`${urlMatriculados}`, form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(resposta);
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu aluno não foi matriculado com sucesso!<br> <br> Código do erro: " + resposta.data.message,
                icon: "error"
            });
        } else {
            BuscarTodosMatriculados(); // Atualiza a lista de todos que estão matriculados em um jogo após a exclusão
            BuscarNaoMatriculados(); // Atualiza a lista de todos que ainda não estão matriculados em um jogo
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu aluno foi matriculado com sucesso!",
                icon: "success"
            });
        }
    } catch (error) {
        SwalErroToken(navigate, error)

    }
}


export const deletarMatriculados = async (ID_usuarios, BuscarTodosMatriculados, BuscarNaoMatriculados, navigate, token) => {
    // O BUSCAR NÃO MATRICULADOS ESTA DANDO ERRO, NÃO ESTA ATUALIZANDO A LISTA COMO DEVERIA
    try {
        let resposta = await axios.delete(`${urlMatriculados}/${ID_usuarios}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(resposta)
        if (!resposta.data.status) {
            console.log("Não foi excluído");
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Sua matricula não foi deletada!<br> <br> Código do erro: " + resposta.data.message,
                icon: "error"
            });
        } else {
            BuscarTodosMatriculados(); // Atualiza a lista após a exclusão
            BuscarNaoMatriculados()
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Sua matricula foi deletada!",
                icon: "success"
            });
        }
    } catch (error) {
        SwalErroToken(navigate, error)
    }
};
