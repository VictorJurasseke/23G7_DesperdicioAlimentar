import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SwalErroToken } from '../TelaPerfil/SwalError';
import { renderizarTurmas } from '../TelaDev/TableMatriculados/FunctionMatriculados';
export const urlJogos = "http://localhost:3025/api/jogos";











// Variável necessária para o SweetAlert2
const SwalModal = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});


const ModalErroTurma = () => {
    SwalModal.fire({
        title: `Ooops!`,
        text: `Você precisa selecionar uma turma para se cadastrar!`,
        icon: "error"
    });
}


// Função para exibir o modal de confirmação
// Fazer um select que lista todas as turmas registrada no sistema
export const ModalParticiparJogos = (ID_jogos, jo_nome, es_nome, token, navigate, TodasTurmas) => {
    let ID_turmas = 1; // Inicialmente, podemos definir uma turma padrão
    SwalModal.fire({
        title: "Participar?",
        html: `
            <p>Quer participar da ${jo_nome} da escola ${es_nome}?</p>
            <div class="mb-3 text-start">
                    <label for="tipo_acesso" class="form-label">Escolha sua turma:</label>
                    <select id="turmas" class="form-select" aria-label="Default select example">
                      <option disabled selected value="1">Turmas:</option>
                      ${renderizarTurmas(TodasTurmas)}
                    </select>
                  </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, vamos lá!",
        preConfirm: () => {
            // Pega o valor da turma selecionada
            const turmaSelecionada = document.getElementById('turmas').value;

            ID_turmas = turmaSelecionada; // Atualiza a variável com o valor selecionado
        }
    }).then((result) => {
        if (result.isConfirmed) {

            ID_turmas != 1 ? (ParticiparJogo(ID_jogos, jo_nome, es_nome, ID_turmas, token, navigate)) : ModalErroTurma()


        }
    });
};


// Função para registrar a participação do usuário no jogo
const ParticiparJogo = async (ID_jogos, jo_nome, es_nome, ID_turmas, token, navigate) => {

    try {
        // Faz a requisição para a API de participar do jogo
        let resposta = await axios.post(`${urlJogos}/participar`, { ID_jogos, ID_turmas }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });



        if (resposta?.data?.error?.errno == 1062) {
            console.log("usuario já cadastrado!");
            SwalModal.fire({
                title: `Oopss!`,
                text: `Você já está cadastrado neste jogo!!`,
                icon: "error"
            });
        } else if (resposta.data.status == true) {
            SwalModal.fire({
                title: `Sucesso!`,
                text: `Você agora esta participando, Bom Jogo!`,
                icon: "success",
                confirmButtonText: "Ok",  // Você pode personalizar o texto do botão, se quiser
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aqui você recarrega a página
                    window.location.reload();
                }
            });
        } else {
            console.log(resposta.data.error)
            SwalModal.fire({
                title: `Erro!`,
                text: `Ocorreu um erro inesperado`,
                icon: "error"
            })
        }
    } catch (error) {
        SwalErroToken(navigate, error)

    }
};

// Função para formatar a data
export const formatarData = (dataString) => {
    const data = new Date(dataString);
    const novoModelo = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
    return novoModelo;
};
