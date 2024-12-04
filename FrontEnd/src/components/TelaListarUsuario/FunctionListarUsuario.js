import { useState } from "react";
import { SwalErroToken } from "../TelaPerfil/SwalError";
import axios from 'axios';
import CardInfoJogador from "../TelaPerfilJogador/CardInfoJogador";
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





import { MudarCorLetraRaridade } from "../TelaPerfilJogador/FunctionPets";
import { BiSolidTrophy } from "react-icons/bi";
import { RiCopperCoinFill } from 'react-icons/ri'; // Importando ícone


// Função para renderizar o conteúdo do modal em HTML com as informações corretas
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
    // Aqui, montamos o HTML manualmente para passar para o SweetAlert
    const content = `
        <div class="text-center">
            <div class="d-flex flex-row flex-wrap">
                <!-- Imagem do Usuário -->
                <div class="col-12 col-sm-12 col-md-4 col-lg-2 d-flex justify-content-center align-items-center">
                    <img
                        src="http://localhost:3025/public/${user_img_caminho}"
                        class="rounded-circle"
                        alt="User"
                        style="object-fit: cover; max-height: 150px; max-width: 150px;"
                    />
                </div>
                <!-- Informações do Usuário -->
                <div style="white-space: nowrap; overflow: hidden;" class="col-sm-12 lh-lg text-start text-sm-center col-md-8 col-lg-2 text-md-center text-lg-start p-2 d-flex flex-column">
                    <h1 class="jaroFont m-0">${user_nome}</h1>
                    <h4 class="jaroFont m-0">Jogador do ${tur_nome}</h4>
                </div>
                <!-- Mascote -->
                <div class="col-sm-12 col-md-12 col-lg-4 d-flex flex-column align-items-center justify-content-center">
                    <img
                        src="http://localhost:3025/Pets/${caminho_pet}"
                        alt="PetPrincipal"
                        style="object-fit: contain; height: 150px;"
                    />
                    <p class="fs-4 jaroFont m-0" style="color: ${MudarCorLetraRaridade(raridade_pet)}">${nome_pet}</p>
                </div>
              
                <!-- Rank -->
                <div class="col-12 col-md-12 col-lg-4 jaroFont justify-content-center align-items-center align-self-center" style="color: #243447;">
                    <h2 class="">
                        <BiSolidTrophy /> ${rank_usuario}º
                    </h2>
                </div>
            </div>

         
        </div>
    `;

    // Aqui utilizamos SweetAlert para exibir o conteúdo HTML
    Swal.fire({
        html: content,
        width: '70%',
        showCancelButton: true,
        confirmButtonText: 'Fechar',
        cancelButtonText: 'Visitar',
        customClass: {
            confirmButton: 'btn btn-primary mx-2',
            cancelButton: 'btn btn-secondary mx-2',
        },
        buttonsStyling: false, // Usa botões estilizados manualmente
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Modal fechado.");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Navegar para olhar as informações do jogador
            navigate(`/visitar/${ID_usuarios}`);
        }
    });
};
