import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SwalErroToken } from '../TelaPerfil/SwalError';
export const urlJogos = "http://localhost:3025/api/jogos";

// Variável necessária para o SweetAlert2
const SwalModal = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

// Função para exibir o modal de confirmação
export const ModalParticiparJogos = (ID_jogos, jo_nome, es_nome, token, navigate) => {
    SwalModal.fire({
        title: "Participar?",
        text: `Quer participar do ${jo_nome} da escola ${es_nome}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, vamos lá!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Chama a função ParticiparJogo e passa o ID_jogos, jo_nome, es_nome e o navigate
            ParticiparJogo(ID_jogos, jo_nome, es_nome, token, navigate);
        }
    });
};

// Função para registrar a participação do usuário no jogo
const ParticiparJogo = async (ID_jogos, jo_nome, es_nome, token, navigate) => {
    try {
        // Faz a requisição para a API de participar do jogo
        let resposta = await axios.post(`${urlJogos}/participar/${ID_jogos}`, {}, {
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
                text: `Meus parabéns, você esta jogando ${jo_nome} da escola ${es_nome}, bom jogo!!`,
                icon: "success"
            });
        } else {
            console.log(resposta.data.error)
            SwalModal.fire({
                title: `Erro!`,
                text: `Ocorreu um erro inesperado`,
                icon: "success"
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
