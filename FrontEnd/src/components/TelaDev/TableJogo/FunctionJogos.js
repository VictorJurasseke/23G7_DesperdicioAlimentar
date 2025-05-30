import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlJogos = "http://localhost:3025/api/jogos";
import { SwalErroToken } from '../../TelaPerfil/SwalError';
import { Form } from 'react-bootstrap';

// Variavel necessaria para o SweetAlert2

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});


export const ModalConfigJogos = (id, navigate, token) => {
    swalWithBootstrapButtons.fire({
        title: "Configurar Jogo",
        text: "Configurações do jogo TABLE JOGOS_CONFIG",
        icon: "info"
    });
};

// Função de abrir modal para deletar arquivos
export const ModalDeleteJogos = (id, atualizar, navigate, token) => {
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
            deletarJogos(id, atualizar, navigate, token);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Seus arquivos estão seguros",
                icon: "error"
            });
        }
    });
};



const renderizarUnidades = (TableUnidade) => {
    return TableUnidade.map(unidade => `<option value='${unidade.ID_escola}' name="${unidade.es_nome}" }>${unidade.es_nome}</option>`).join('');
};

export const ModalCriarJogo = (atualizar, navigate, token, TodasUnidade, setForm, Form) => {
    Swal.fire({
        title: "Criando jogo",
        text: "Coloque as informações abaixo!",
        html: `
           <form id="form-jogo">
    <div class="mb-3 text-start">
        <label for="unidade" class="form-label">Unidades</label>
        <select id="unidade" class="form-select">
            <option value="">Selecione sua unidade</option>
            <!-- As opções das unidades serão geradas pela função renderizarUnidades -->
            ${renderizarUnidades(TodasUnidade)}
        </select>
    </div>
    <div class="mb-3 text-start">
        <label for="jo_tema" class="form-label">Temática</label>
        <select id="jo_tema" class="form-select">
            <option disabled selected value="select" disabled>Selecione o tema:</option>
            <option value="1">Verão</option>
            <option value="2">Outono</option>
            <option value="3">Inverno</option>
            <option value="4">Primavera</option>
        </select>
    </div>
    <div class="mb-3 text-start">
        <label for="jo_nome" class="form-label">Nome do Jogo</label>
        <input type="text" id="jo_nome" class="form-control" placeholder="Temporada de Verão">
    </div>
     <div class="mb-3 text-start">
                <label for="jo_desc" class="form-label">Descrição do Jogo:</label>
                <textarea id="jo_desc" class="form-control" placeholder="Descrição do Jogo" rows="3"></textarea>
            </div>
    <div class="mb-3 text-start">
        <label for="jo_datai" class="form-label">Data de Início</label>
        <input type="date" id="jo_datai" class="form-control" readonly>
    </div>
    <div class="mb-3 text-start">
        <label for="jo_dataf" class="form-label">Data de Fim</label>
        <input type="date" id="jo_dataf" class="form-control" readonly>
    </div>
    <div class="mb-3 text-start">
        <label for="jo_status" class="form-label">Status do Jogo</label>
        <select id="jo_status" class="form-select">
            <option value="" disabled selected>Selecione o status</option>
            <option value="1">Ativo</option>
            <option value="2">Inativo</option>
        </select>
    </div>
    <!-- Multiplicadores de Pontos para cada dia da semana -->
    <div class="mb-3 text-start">
        <label for="jogos_pts_segunda" class="form-label">Multiplicador Segunda</label>
        <input type="number" step="0.1" id="jogos_pts_segunda" class="form-control" placeholder="1.2">
    </div>
    <div class="mb-3 text-start">
        <label for="jogos_pts_terca" class="form-label">Multiplicador Terça</label>
        <input type="number" step="0.1" id="jogos_pts_terca" class="form-control" placeholder="1.0">
    </div>
    <div class="mb-3 text-start">
        <label for="jogos_pts_quarta" class="form-label">Multiplicador Quarta</label>
        <input type="number" step="0.1" id="jogos_pts_quarta" class="form-control" placeholder="1.0">
    </div>
    <div class="mb-3 text-start">
        <label for="jogos_pts_quinta" class="form-label">Multiplicador Quinta</label>
        <input type="number" step="0.1" id="jogos_pts_quinta" class="form-control" placeholder="1.0">
    </div>
    <div class="mb-3 text-start">
        <label for="jogos_pts_sexta" class="form-label">Multiplicador Sexta</label>
        <input type="number" step="0.1" id="jogos_pts_sexta" class="form-control" placeholder="1.0">
    </div>
    <div class="mb-3 text-start">
        <label for="jogos_pts_sabado" class="form-label">Multiplicador Sábado</label>
        <input type="number" step="0.1" id="jogos_pts_sabado" class="form-control" placeholder="1.0">
    </div>
    <div class="mb-3 text-start">
        <label for="jogos_pts_domingo" class="form-label">Multiplicador Domingo</label>
        <input type="number" step="0.1" id="jogos_pts_domingo" class="form-control" placeholder="1.0">
    </div>
    <!-- Campos adicionais de configuração -->
    <div class="mb-3 text-start">
        <label for="valor_grama" class="form-label">Peso médio das refeições:</label>
        <input type="number" step="0.001" id="valor_grama" class="form-control" placeholder="0.200">
    </div>
    <div class="mb-3 text-start">
        <label for="valor_pontos" class="form-label">Valor de Pontos Maximo:</label>
        <input type="number" id="valor_pontos" class="form-control" placeholder="1">
    </div>
    <div class="mb-3 text-start">
        <label for="tara_prato" class="form-label">Tara do Prato (g):</label>
        <input type="number" step="0.001" id="tara_prato" class="form-control" placeholder="0.150">
    </div>
</form>

        `,
        willClose: () => {
            console.log("Modal Fechou")
        },
        showCancelButton: true,
        confirmButtonText: "Criar Jogo",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            const unidade = document.getElementById("unidade").value;
            const jo_nome = document.getElementById("jo_nome").value;
            const jo_datai = document.getElementById("jo_datai").value;
            const jo_dataf = document.getElementById("jo_dataf").value;
            const jo_status = document.getElementById("jo_status").value;
            const jogos_pts_segunda = document.getElementById("jogos_pts_segunda").value;
            const jogos_pts_terca = document.getElementById("jogos_pts_terca").value;
            const jogos_pts_quarta = document.getElementById("jogos_pts_quarta").value;
            const jogos_pts_quinta = document.getElementById("jogos_pts_quinta").value;
            const jogos_pts_sexta = document.getElementById("jogos_pts_sexta").value;
            const jogos_pts_sabado = document.getElementById("jogos_pts_sabado").value;
            const jogos_pts_domingo = document.getElementById("jogos_pts_domingo").value;
            const valor_grama = document.getElementById("valor_grama").value;
            const valor_pontos = document.getElementById("valor_pontos").value;
            const tara_prato = document.getElementById("tara_prato").value;
            const jo_tema = document.getElementById("jo_tema").value
            const jogos_data_mudanca = new Date();
            const jo_desc = document.getElementById("jo_desc").value

            let dataMudada = formatarDataParaBanco(jogos_data_mudanca);
            const jo_datai_formatada = formatarDataParaBanco(jo_datai);
            const jo_dataf_formatada = formatarDataParaBanco(jo_dataf);





            const novoForm = {
                unidade,
                jo_tema,
                jo_nome,
                jo_datai_formatada,
                jo_dataf_formatada,
                jo_status,
                jogos_pts_segunda,
                jogos_pts_terca,
                jogos_pts_quarta,
                jogos_pts_quinta,
                jogos_pts_sexta,
                jogos_pts_sabado,
                jogos_pts_domingo,
                valor_grama,
                valor_pontos,
                tara_prato,
                dataMudada,
                jo_desc
            };

            setForm(novoForm);
            console.log(novoForm);
            CriarJogo(atualizar, navigate, token, novoForm);

        } else if (result.dismiss === Swal.DismissReason.cancel) {

            Swal.fire({
                title: "Cancelado",
                text: "Nenhum jogo foi criado!",
                icon: "error",
            });
        }
    });

    // Atualizar as datas conforme a estação muda no select, ou seja o valor do jo_estacao mudou, ele já pega e atualiza as datas
    document.getElementById("jo_tema").addEventListener("change", atualizarDatas);
};
export const atualizarDatas = () => {
    const jo_tema = document.getElementById("jo_tema").value;
    const jo_datai = document.getElementById("jo_datai");
    const jo_dataf = document.getElementById("jo_dataf");
    const jo_nome = document.getElementById("jo_nome");
    const jo_status = document.getElementById("jo_status");
    const anoAtual = new Date().getFullYear();
    const jogos_pts_segunda = document.getElementById("jogos_pts_segunda");
    const jogos_pts_terca = document.getElementById("jogos_pts_terca");
    const jogos_pts_quarta = document.getElementById("jogos_pts_quarta");
    const jogos_pts_quinta = document.getElementById("jogos_pts_quinta");
    const jogos_pts_sexta = document.getElementById("jogos_pts_sexta");
    const jogos_pts_sabado = document.getElementById("jogos_pts_sabado");
    const jogos_pts_domingo = document.getElementById("jogos_pts_domingo");
    const valor_grama = document.getElementById("valor_grama");
    const valor_pontos = document.getElementById("valor_pontos");
    const tara_prato = document.getElementById("tara_prato");
    const jo_desc = document.getElementById("jo_desc")

    // Definindo as temporadas em um objeto para simplificar a atribuição
    const temporadas = {
        "1": { inicio: `${anoAtual}-01-30`, fim: `${anoAtual}-03-20`, nome: "Temporada de Verão", jogos_pts_segunda: 1, jogos_pts_terca: 1, jogos_pts_quarta: 1, jogos_pts_quinta: 1, jogos_pts_sexta: 1, jogos_pts_sabado: 1, jogos_pts_domingo: 1, valor_grama: 0.800, valor_pontos: 10, tara_prato: 0.150, jo_desc: "Mergulhe na diversão! Mostre suas habilidades, suba no rank e conquiste o topo da competição!" },
        "2": { inicio: `${anoAtual}-03-21`, fim: `${anoAtual}-06-21`, nome: "Temporada de Outono", jogos_pts_segunda: 1, jogos_pts_terca: 1, jogos_pts_quarta: 1, jogos_pts_quinta: 1, jogos_pts_sexta: 1, jogos_pts_sabado: 1, jogos_pts_domingo: 1, valor_grama: 0.800, valor_pontos: 10, tara_prato: 0.150, jo_desc: "Prepare-se para explorar! Evite o desperdício de alimentos e conquiste o topo do rank com estilo" },
        "3": { inicio: `${anoAtual}-06-22`, fim: `${anoAtual}-09-22`, nome: "Temporada de Inverno", jogos_pts_segunda: 1, jogos_pts_terca: 1, jogos_pts_quarta: 1, jogos_pts_quinta: 1, jogos_pts_sexta: 1, jogos_pts_sabado: 1, jogos_pts_domingo: 1, valor_grama: 0.800, valor_pontos: 10, tara_prato: 0.150, jo_desc: "O desafio esfria, mas a competição aquece! Prove suas habilidades e conquiste os pets mais raros." },
        "4": { inicio: `${anoAtual}-09-23`, fim: `${anoAtual}-12-10`, nome: "Temporada de Primavera", jogos_pts_segunda: 1, jogos_pts_terca: 1, jogos_pts_quarta: 1, jogos_pts_quinta: 1, jogos_pts_sexta: 1, jogos_pts_sabado: 1, jogos_pts_domingo: 1, valor_grama: 0.800, valor_pontos: 10, tara_prato: 0.150, jo_desc: "Celebre a renovação! Alcance o maior rank enquanto aproveita a beleza da estação e desbloqueia novos pets." }
    };

    // Se o tema for válido, define as datas e o nome
    if (temporadas[jo_tema]) {
        const temporada = temporadas[jo_tema];
        jo_datai.value = temporada.inicio;
        jo_dataf.value = temporada.fim;
        jo_nome.value = temporada.nome;
        jogos_pts_segunda.value = temporada.jogos_pts_segunda
        jogos_pts_terca.value = temporada.jogos_pts_terca
        jogos_pts_quarta.value = temporada.jogos_pts_quarta
        jogos_pts_quinta.value = temporada.jogos_pts_quinta
        jogos_pts_sexta.value = temporada.jogos_pts_sexta
        jogos_pts_sabado.value = temporada.jogos_pts_sabado
        jogos_pts_domingo.value = temporada.jogos_pts_domingo
        valor_grama.value = temporada.valor_grama
        valor_pontos.value = temporada.valor_pontos
        tara_prato.value = temporada.tara_prato
        jo_desc.value = temporada.jo_desc
    } else {
        jo_datai.value = "";
        jo_dataf.value = "";
        jo_nome.value = "";
        jo_desc.value = ""
    }

    // Normalizando as datas
    const dataInicioObj = new Date(jo_datai.value);
    const dataFimObj = new Date(jo_dataf.value);

    // Resetando as horas para 00:00:00
    dataInicioObj.setHours(0, 0, 0, 0);
    dataFimObj.setHours(0, 0, 0, 0);

    // Verificando se a data atual está dentro do intervalo
    const jogos_data_mudanca = new Date();  // Data atual
    const novoStatus = (jogos_data_mudanca >= dataInicioObj && jogos_data_mudanca <= dataFimObj) ? "1" : "2";



    // Atualizando o valor do select
    jo_status.value = novoStatus;  // Isso vai definir o valor selecionado do select
    console.log("Valor do select jo_status:", jo_status.value);
};



// Modal editar jogo
export const ModalEditarJogo = async (id, atualizar, navigate, token) => {
    try {
        // Requisição para buscar dados do jogo
        let resposta = await axios.get(`${urlJogos}/especifico/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        // Dados do Jogo para preencher o formulário
        const jogo = resposta.data[0]; // Acessando o primeiro item da resposta

        console.log("Jogo", jogo.jo_nome);

        // Exibir o modal com os dados do jogo
        const { value: formValues } = await Swal.fire({
            title: `Editar o jogo: ${jogo.jo_nome}`,
            html: `
                <form id="form-jogo">
                    <div class="mb-3 text-start">
                        <label for="jogos_pts_segunda-edit" class="form-label">Multiplicador Segunda</label>
                        <input type="number" id="jogos_pts_segunda-edit" class="form-control" value="${jogo.jogos_pts_segunda}">
                    </div>
                    <div class="mb-3 text-start">
                        <label for="jogos_pts_terca-edit" class="form-label">Multiplicador Terça</label>
                        <input type="number" id="jogos_pts_terca-edit" class="form-control" value="${jogo.jogos_pts_terca}">
                    </div>
                    <div class="mb-3 text-start">
                        <label for="jogos_pts_quarta-edit" class="form-label">Multiplicador Quarta</label>
                        <input type="number" id="jogos_pts_quarta-edit" class="form-control" value="${jogo.jogos_pts_quarta}">
                    </div>
                    <div class="mb-3 text-start">
                        <label for="jogos_pts_quinta-edit" class="form-label">Multiplicador Quinta</label>
                        <input type="number" id="jogos_pts_quinta-edit" class="form-control" value="${jogo.jogos_pts_quinta}">
                    </div>
                    <div class="mb-3 text-start">
                        <label for="jogos_pts_sexta-edit" class="form-label">Multiplicador Sexta</label>
                        <input type="number" id="jogos_pts_sexta-edit" class="form-control" value="${jogo.jogos_pts_sexta}">
                    </div>
                    <div class="mb-3 text-start">
                        <label for="jogos_pts_sabado-edit" class="form-label">Multiplicador Sábado</label>
                        <input type="number" id="jogos_pts_sabado-edit" class="form-control" value="${jogo.jogos_pts_sabado}">
                    </div>
                    <div class="mb-3 text-start">
                        <label for="jogos_pts_domingo-edit" class="form-label">Multiplicador Domingo</label>
                        <input type="number" id="jogos_pts_domingo-edit" class="form-control" value="${jogo.jogos_pts_domingo}">
                    </div>
                </form>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            confirmButtonText: "Confirmar",
        });

        // Se o modal for confirmado
        if (formValues) {
            // Pegando os valores dos multiplicadores e convertendo para float
            const jogos_pts_segunda = parseFloat(document.getElementById("jogos_pts_segunda-edit").value);
            const jogos_pts_terca = parseFloat(document.getElementById("jogos_pts_terca-edit").value);
            const jogos_pts_quarta = parseFloat(document.getElementById("jogos_pts_quarta-edit").value);
            const jogos_pts_quinta = parseFloat(document.getElementById("jogos_pts_quinta-edit").value);
            const jogos_pts_sexta = parseFloat(document.getElementById("jogos_pts_sexta-edit").value);
            const jogos_pts_sabado = parseFloat(document.getElementById("jogos_pts_sabado-edit").value);
            const jogos_pts_domingo = parseFloat(document.getElementById("jogos_pts_domingo-edit").value);

            // Criando o objeto com os dados para atualização
            const novoForm = {
                jogos_pts_segunda,
                jogos_pts_terca,
                jogos_pts_quarta,
                jogos_pts_quinta,
                jogos_pts_sexta,
                jogos_pts_sabado,
                jogos_pts_domingo
            };

            // Chama a função para editar o jogo
            EditarJogo(navigate, token, novoForm, atualizar, id);
        }
    } catch (error) {
        console.error("Erro ao editar o jogo:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao carregar os dados do jogo. Tente novamente mais tarde.'
        });
    }
};




export const useImportarDadosJogos = (token, navigate) => {

    const [TodosJogos, setTodosJogos] = useState([])



    const [TodosJogosAtivos, setTodosJogosAtivos] = useState([])

    // FUNCAO QUE BUSCA TODOS OS JOGOS NO BANCO ATIVOS
    async function BuscarJogos() {
        try {
            let resposta = await axios.get(urlJogos, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            setTodosJogos(resposta.data)
        } catch (error) {
            SwalErroToken(navigate, error)

        }
    }

    // FUNCAO QUE BUSCA TODOS OS JOGOS ATIVOS  DO BANCO
    async function BuscarJogosAtivos() {
        try {
            let resposta = await axios.get(urlJogos + "/ativos", {
                headers: { "Authorization": `Bearer ${token}` }
            });


            setTodosJogosAtivos(resposta.data)
        } catch (error) {
            SwalErroToken(navigate, error)

        }
    }


    return {
        BuscarJogos,
        TodosJogos,

        BuscarJogosAtivos,
        TodosJogosAtivos

    }
}


// // Jogos especifico de escola x, só precisa passar o id da escola
// export const useImportarDadosJogosEspecifico = (token, navigate, ID_escola) => {
//     const [TableJogosEspecifico, setTableJogosEspecifico] = useState([])

//     async function BuscarJogosEspecifico() {
//         try {
//             let resposta = await axios.get(`${urlJogos}/disp/${ID_escola}`, {  // Inclui ID_escola na URL
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setTableJogosEspecifico(resposta.data);  // Corrige o nome do estado
//         } catch (error) {
//             console.log(error);
//             // SwalErroToken(navigate); // Descomente se estiver tratando erros com SweetAlert
//         }
//     }
//     return {
//         TableJogosEspecifico,
//         BuscarJogosEspecifico
//     }
// }


/// Formato de data padrão
export const formatarData = (dataString) => {
    const data = new Date(dataString);
    const novoModelo = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
    return novoModelo;
};

/// Formato de data para o banco
export const formatarDataParaBanco = (dataString) => {
    const data = new Date(dataString);
    const formatoBanco = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getDate().toString().padStart(2, '0')}`;
    return formatoBanco;
};


// Deletar Escola específica
export const deletarJogos = async (id, atualizar, navigate, token) => {
    try {
        let resposta = await axios.delete(`${urlJogos}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!resposta.data.status) {
            console.log("Não foi excluído");
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu jogo não foi deletado!<br> <br> Código do erro: " + resposta.data.error.code,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Seu jogo foi deletado!",
                icon: "success"
            });
            console.log("Excluído");
        }
    } catch (error) {
        SwalErroToken(navigate, error)
    }
};



export const CriarJogo = async (atualizar, navigate, token, novoForm) => {

    Form.jogos_data_mudanca = new Date().toISOString().split('T')[0]
    try {

        const resposta = await axios.post(`${urlJogos}`, novoForm, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(resposta);
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu jogo não foi criado com sucesso!<br> <br> Erro: " + resposta.data.message,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a criação
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu jogo foi criado com sucesso!",
                icon: "success"
            });
            console.log("Jogo criado sucesso");
        }
    } catch (error) {
        SwalErroToken(navigate, error)

    }
};


export const EditarJogo = async (navigate, token, novoForm, atualizar, id) => {

    

    novoForm.jogos_data_mudanca = new Date().toISOString().split('T')[0]

    console.log("Formulario de edit:",novoForm)
    try {

        const resposta = await axios.put(`${urlJogos}/${id}`, novoForm, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(resposta);
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu jogo não foi editado com sucesso!<br> <br> Erro: " + resposta.data.message,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a criação
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu jogo foi editado com sucesso!",
                icon: "success"
            });
            console.log("Jogo editado sucesso");
        }
    } catch (error) {
        SwalErroToken(navigate, error)

    }
};
export const MudarStatus = async (id, atualizar, navigate, token, status) => {


    let statusReal
    console.log(status)
    switch (status) {
        case "bg-success":
            statusReal = 2
            break;
        default:
            statusReal = 1 //ATIVAR
    }

    try {

        const resposta = await axios.put(`${urlJogos}/mudarStatus/${statusReal}/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(resposta);
        if (!resposta.data.status) {
            swalWithBootstrapButtons.fire({
                title: "Falhou!",
                html: "Seu jogo não teve a mudança de status com sucesso!<br> <br> Erro: " + resposta.data.message,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a mudança
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu jogo foi alterado com sucesso!",
                icon: "success"
            });
            console.log("Jogo criado sucesso");
        }
    } catch (error) {
        SwalErroToken(navigate, error)

    }

}