import { useState } from "react";
import { SwalErroToken } from "../TelaPerfil/SwalError";
import axios from 'axios';
export const urlJogos = "http://localhost:3025/api/jogos";


// Preciso pegar isto do banco: 


// const arrayPets = [

//     { id: 1, nome: "Victor Sales", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 1, tur_nome: "3º EM" },
//     { id: 2, nome: "Kayk Saraiva", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 1, tur_nome: "3º EM" },
//     { id: 3, nome: "Nicolas Prado", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 2, tur_nome: "2º EM" },
//     { id: 4, nome: "Gabriel Prado", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 2, tur_nome: "2º EM" },
//     { id: 5, nome: "Lucas Moreno", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 3, tur_nome: "1º EM" },
//     { id: 6, nome: "Raissa Furlan", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 3, tur_nome: "1º EM" },
//     { id: 7, nome: "Alana Silva", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 4, tur_nome: "9º FII" },
//     { id: 8, nome: "James Brito", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 4, tur_nome: "9º FII" },
//     { id: 9, nome: "Victor Sales", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 5, tur_nome: "8º FII" },
//     { id: 10, nome: "Kayk Saraiva", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 5, tur_nome: "8º FII" },
//     { id: 11, nome: "Nicolas Prado", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 6, tur_nome: "7º FII" },
//     { id: 12, nome: "Gabriel Prado", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 6, tur_nome: "7º FII" },
//     { id: 13, nome: "Lucas Moreno", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 7, tur_nome: "6º FII" },
//     { id: 14, nome: "Raissa Furlan", caminho: "http://localhost:3025/public/CoelhoNike.gif", turmas_ID_turmas: 7, tur_nome: "6º FII" },
//     { id: 15, nome: "Alana Silva", caminho: "http://localhost:3025/public/Egg.gif", turmas_ID_turmas: 8, tur_nome: "5º FI" },
//     { id: 16, nome: "James Brito", caminho: "http://localhost:3025/public/CoelhoNeymar.gif", turmas_ID_turmas: 8, tur_nome: "5º FI" },
//   ];


//   const ArrayFiltro = [
//     { ID_turmas: 1, tur_nome: "3º EM" },
//     { ID_turmas: 2, tur_nome: "2º EM" },
//     { ID_turmas: 3, tur_nome: "1º EM" },
//     { ID_turmas: 4, tur_nome: "9º FII" },
//     { ID_turmas: 5, tur_nome: "8º FII" },
//     { ID_turmas: 6, tur_nome: "7º FII" },
//     { ID_turmas: 7, tur_nome: "6º FII" },
//     { ID_turmas: 8, tur_nome: "5º FI" },
//     { ID_turmas: 9, tur_nome: "4º FI" },
//     { ID_turmas: 10, tur_nome: "3º FI" },
//     { ID_turmas: 11, tur_nome: "2ª FI" },
//     { ID_turmas: 12, tur_nome: "1º FI" },
//   ];

export const useImportarDadosJogadores = (token, navigate) => {
    const [TodosJogadores, setTodosJogadores] = useState([])
    const [TodasTurmas, setTodasTurmas] = useState([])

    async function BuscarTodosJogadores(setJogadoresFiltrados) {


        try {
            let resposta = await axios.get(urlJogos + "/BuscarJogadores", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Todos os jogadores e outras informações", resposta)
            setTodosJogadores(resposta.data.TodosJogadores)
            setTodasTurmas(resposta.data.TodasTurmas)
            setJogadoresFiltrados(resposta.data.TodosJogadores)
        } catch (error) {
            console.log(error)
            SwalErroToken(navigate, error)

        }

    }

    return {
        TodosJogadores,
        TodasTurmas,
        BuscarTodosJogadores,
        setTodosJogadores
    }
}


// Função de abrir modal para mostrar as informações do jogadores
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

export const ModalInfoJogadores = (
    token,
    navigate,
    user_nome,
    user_img_caminho,
    ID_usuarios,
    pontos_usuario,
    peso_acumulativo,
    rank_usuario,
    jo_nome,
    jo_tema,
    nome_pet,
    caminho_pet,
    raridade_pet,
    ID_inv_pets,
    evolucao,
    tur_nome
) => {
    swalWithBootstrapButtons.fire({
        title: `${user_nome}`, // Nome do jogador como título
        html: `
            <div class="text-center">
                <img src="http://localhost:3025/Pets/${caminho_pet}" 
                     alt="${nome_pet}" 
                     class="img-fluid rounded-circle mb-3" 
                     style="max-width: 120px;">
                <h5>${nome_pet} (${raridade_pet})</h5>
                <p><strong>Jogador:</strong> ${user_nome}</p>
                <p><strong>Turma:</strong> ${tur_nome}</p>
                <p><strong>Pontos:</strong> ${pontos_usuario}</p>
                <p><strong>Peso Acumulativo:</strong> ${peso_acumulativo}</p>
                <p><strong>Rank:</strong> ${rank_usuario}</p>
                <p><strong>Jogo:</strong> ${jo_nome}</p>
                <p><strong>Evolução:</strong> ${evolucao || 'Não disponível'}</p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Fechar",
        cancelButtonText: "Visitar",
        customClass: {
            confirmButton: "btn btn-primary mx-2",
            cancelButton: "btn btn-secondary mx-2",
        },
        buttonsStyling: false, // Usa botões estilizados manualmente
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Modal fechado.");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Navegar para editar as informações do jogador
          
        }
    });
};