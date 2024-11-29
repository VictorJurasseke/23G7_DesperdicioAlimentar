// usePerfilDados.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwalErroToken } from '../TelaPerfil/SwalError';
import { BiBorderRadius } from 'react-icons/bi';
const UrlDadosPets = "http://localhost:3025/api/pets";

export const usePetsDados = (token, navigate) => {

    const [TodosPetsTemporada, setTodosPetsTemporada] = useState([]);
    const [jo_nome, setjo_nome] = useState()
    const [QuantidadeMascote, setQuantidadeMascote] = useState(0) // Quantidade já pegos até agora
    const [jo_tema, setjo_tema] = useState()
    const [jo_rank, setjo_rank] = useState()
    const [pontos, set_pontos] = useState()
    const [TurmasUsuario, setTurmasUsuario] = useState()
    const [ID_Jogos, setID_jogos] = useState()
    const [PetPrincipal, SetPetPrincipal] = useState()

    // Função para procurar todos os pets do usuario no jogo especifico e mandar as info dele
    const ProcurarPets = async () => {
        console.log("Procurando pets e informações do jogo")
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
            
            console.log("RESPOSTA BUSCANDO informação de jogador e pets:",resposta)
            const Pets = resposta.data.pets

            
            setjo_nome(resposta.data.jo_nome)
            setTodosPetsTemporada(Pets);
            setjo_tema(resposta.data?.jo_tema)
            setjo_rank(resposta.data?.RankJogoAtual)
            set_pontos(resposta.data?.PontosUsuario)
            setTurmasUsuario(resposta.data?.TurmasUsuario)
            setQuantidadeMascote(resposta.data.mascotesStatus)
            setID_jogos(resposta.data?.ID_Jogos)
            SetPetPrincipal(resposta.data.PetPrincipal)

            
            // Mostra em mascotes apenas a quantidade exibida por padrão
           
        } catch (error) {
            console.log("Deu erro em procurar os pets:", error)
            SwalErroToken(navigate, error)


        }
    };


    // Chama a função `retornarPerfil` apenas uma vez, após o componente ser montado
    // useEffect(() => {
    //     ProcurarPets();
    // }, []); // Array vazio garante que o efeito será executado apenas uma vez

    return { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote, jo_tema, pontos, jo_rank, TurmasUsuario, ID_Jogos, PetPrincipal }; // Retorna o estado
};



export const ModalPetProgresso = async (evolucao, ID_inventario, token, navigate, ponto_evo, ProcurarPets, nome_pet) => {
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
        console.log(nome_pet)
    }
};

export const MostrarOvo = (raridade) => {
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

// {jo_tema === 1 && (
//     <CardVerao TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
//   )}

//   {jo_tema === 2 && (
//     <CardOutono TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
//   )}
//   {jo_tema === 3 && (
//     <CardInverno TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
//   )}
//   {jo_tema === 4 && (
//     <CardPrimavera TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
//   )}

// summer:
// background-color: #ffd600;
//     color: #E91E63;
//     position: relative;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//     width: 1200px;
//     border-radius: 90px;

// .Autumn-card {
//     background-color: #a72300;
//     color: #ff8a36;
//     position: relative;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//     width: 80%;
//     border-radius: 90px;

// .winter-card {
//     background-color: #a1c9ff;
//     color: #4200ff;
//     position: relative;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//     width: 80%;
//     border-radius: 90px;


// }



// }

// .spring-card {
//     background-color: #f2abc5;
//     color: #8705b0;
//     position: relative;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//     width: 1200px;
//     border-radius: 90px;


// }

// mudar o estilo dependendo do tema do jogo: 
export const obterEstiloTema = (jo_tema) => {
    switch (jo_tema) {
        case 1:
            return {
                backgroundColor: "#ffd600", // Temporada de verao
                color: "#E91E63",
                padding: "15px",
                borderRadius: "20px",
                border: "1px solid #E91E63",
                boxSizing: "border-box",
            };
        case 2:
            return {
                backgroundColor: "#a72300", // Temporada de outono
                color: "#ff8a36",
                padding: "15px",
                borderRadius: "20px",
                border: "1px solid #ff8a36",
                boxSizing: "border-box",



            };
        case 3:
            return {
                backgroundColor: "#a1c9ff", // Temporada de inverno
                color: "#4200ff",
                padding: "15px",
                borderRadius: "20px",
                border: "1px solid #4200ff",
                boxSizing: "border-box",
            };
        case 4:
            return {
                backgroundColor: "#f2abc5", // Temporada de primavera
                color: "#8705b0",
                padding: "15px",
                borderRadius: "20px",
                border: "1px solid #8705b0",
                boxSizing: "border-box",
            };
        default:
            return {
                display: "none"
            };
    }
};


export const MudarPrincipal = async (token, navigate, ID_inventario) =>{

    console.log("Mudar para este ser o principal")
    
    try {
        let resposta = await axios.get(
            `${UrlDadosPets}/principal/${ID_inventario}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        // Atualiza a barra de progresso com o valor correto
        
        console.log(resposta)

    } catch (error) {
        SwalErroToken(navigate, error);
    }
}


// Busca o pet principal do usuario
export const BuscarPetPrincipal = async (token,navigate,SetPetPrincipal, ID_Jogos) =>{

   
    console.log("Buscando pet principal do usuario do jogo:", ID_Jogos)
    
    try {
        let resposta = await axios.get(
            `${UrlDadosPets}/buscarpet/${ID_Jogos}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        // Atualiza a barra de progresso com o valor correto
        console.log("BUSCAR PET PRINCIPAL RESPOSTA:",resposta.data.pet)
        SetPetPrincipal(resposta.data.pet)


    } catch (error) {

        console.log("Erro em buscar pet principal")
        SwalErroToken(navigate, error);
    }
}