// usePerfilDados.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwalErroToken } from './SwalError';
const UrlDadosPets = "http://localhost:3025/api/pets";

export const usePetsDados = (token, navigate) => {

    const [TodosPetsTemporada, setTodosPetsTemporada] = useState(null);
    const [jo_nome, setjo_nome] = useState(null)



    // Função para procurar todos os pets do usuario no jogo especifico e mandar as info dele
    const ProcurarPets = async () => {
        if (!token) {
            SwalErroToken(navigate) // Redireciona para login se não existir token
            return;
        }
        try {
            let resposta = await axios.get(UrlDadosPets + `/temporada`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(resposta)
            setjo_nome(resposta.data.jo_nome)
            setTodosPetsTemporada(resposta.data.pets);

            console.log(resposta)
        } catch (error) {
            SwalErroToken(navigate, error)


        }
    };

    // Chama a função `retornarPerfil` apenas uma vez, após o componente ser montado
    // useEffect(() => {
    //     ProcurarPets();
    // }, []); // Array vazio garante que o efeito será executado apenas uma vez

    return { TodosPetsTemporada, ProcurarPets, jo_nome }; // Retorna o estado
};



export const ModalPetProgresso = async (evolucao, ID_inventario, token, navigate, ponto_evo, ProcurarPets) => {
    if (evolucao == 1) {

        Swal.fire({
            title: "Simular desperdicio",
            html: `
            <form id="form-pet">
                    <label for="raridade_pet" class="form-label">Selecione o desperdicio do usuário  enviado pela balança do refeitório:</label>
                    <select id="desperdicio" class="form-select">
                        <option value="" selected disabled>Selecione a quantidade de desperdicio:</option>
                        <option class="bg-success" value="1">Menor que 50g</option>
                        <option class="bg-warning" value="2">Entre 50g e 200g</option>
                        <option class="bg-danger" value="3">Maior que 200g</option>
                        <option class="bg-light" value="upar">Evoluir Mascote</option>
                    </select>
                </div>
            </form>
            `,
            icon: "info",
            confirmButtonColor: "#198754",
            confirmButtonText: "Simular",

            preConfirm: async () => {
                const desperdicio = document.getElementById("desperdicio").value
                if (!desperdicio) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Você precisa selecionar algum peso!",
                    });
                    return false
                }
                return desperdicio
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                SimularProgressoBalanca(result.value, ID_inventario, token, navigate, ponto_evo, ProcurarPets)
            }
        });
    } else {
        console.log("Mascote já evoluido")
    }
};

export const MostrarOvo = (raridade) => {
    console.log(raridade)
    const ovos = {
        Comum: "EggComum.gif",  // Azul
        Raro: "EggRaro.gif",     // Laranja
        Épico: "EggEpico.gif",   // Roxo
        Lendário: "EggLendario.gif",  // Dourado
    };
    return ovos[raridade] || "Egg.gif";  // CaminhoOvo padrão (caso o tipo não seja reconhecido)
};




const sortearDecimal = (min, max) => {
    return Math.random() * (max - min) + min;
};


const SimularProgressoBalanca = async (desperdicio, ID_inventario, token, navigate, ponto_evo, ProcurarPets) => {
    let valorAleatorioDesperdicado = 0;

    if (desperdicio == 1) {
        valorAleatorioDesperdicado = sortearDecimal(0, 0.050);
    } else if (desperdicio == 2) {
        valorAleatorioDesperdicado = sortearDecimal(0.051, 0.200);
    } else if (desperdicio == 3) {
        valorAleatorioDesperdicado = sortearDecimal(0.200, 0.999);
    } else if (desperdicio === "upar") {
        valorAleatorioDesperdicado = 100
    }

    try {
        let resposta = await axios.get(
            `${UrlDadosPets}/progresso/${valorAleatorioDesperdicado}/${ID_inventario}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

        // Atualiza a barra de progresso com o valor correto
        const pontuacaoFinal = Math.min(resposta.data.pontuacao_final, ponto_evo);
        ProcurarPets()
        console.log("Resposta da simulação", resposta)
        console.log("Nova pontuação:", pontuacaoFinal); // Debug

    } catch (error) {
        SwalErroToken(navigate, error);
    }
};

