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

// Função de abrir a tela de edição de items

// Função de abrir a tela de edição de itens
export const ModalEditJogos = (id, navigate, token) => {
    swalWithBootstrapButtons.fire({
        title: "Edit User",
        text: "Editar as informações do jogo.",
        icon: "info"
    });
};

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
    console.log("Renderizando", TableUnidade);
    return TableUnidade.map(unidade => `<option value='${unidade.ID_escola}' name="${unidade.es_nome}" }>${unidade.es_nome}</option>`).join('');
};


export const ModalCriarJogo = (atualizar, navigate, token, Tableunidade, setForm, Form) => {
    console.log("Modal", Tableunidade);

    Swal.fire({
        title: "Criando jogo",
        text: "Coloque as informações abaixo!",
        html: `
           <form id="form-jogo">
        <div class="mb-3 text-start">
            <label for="Unidade" class="form-label">Unidades</label>
            <select id="Unidade" class="form-select">
              <option value="">Selecione sua unidade</option>
             ${renderizarUnidades(Tableunidade)}
            </select>
          </div>
          <div class="mb-3 text-start">
            <label for="jo_nome" class="form-label">Nome do Jogo</label>
            <input type="text" id="jo_nome" class="form-control" placeholder="Ex: Jogo de Redução de Desperdício">
          </div>
          <div class="mb-3 text-start">
            <label for="jo_datai" class="form-label">Data de Início</label>
            <input type="date" id="jo_datai" class="form-control">
          </div>
          <div class="mb-3 text-start">
            <label for="jo_dataf" class="form-label">Data de Fim</label>
            <input type="date" id="jo_dataf" class="form-control">
          </div>
           <div class="mb-3 text-start">
            <label for="jo_status" class="form-label">Status do Jogo</label>
            <select id="jo_status" class="form-select">
              <option value="">Selecione o status</option>
              <option value="1">Ativo</option>
              <option value="2">Inativo</option>
            </select>
          </div>
          <div class="mb-3 text-start">
            <label for="jogos_pts_segunda" class="form-label">Multiplicador Segunda</label>
            <input type="number" step="0.1" id="jogos_pts_segunda" class="form-control" placeholder="Ex: 1.2">
          </div>
          <div class="mb-3 text-start">
            <label for="jogos_pts_terca" class="form-label">Multiplicador Terça</label>
            <input type="number" step="0.1" id="jogos_pts_terca" class="form-control" placeholder="Ex: 1.0">
          </div>
          <div class="mb-3 text-start">
            <label for="jogos_pts_quarta" class="form-label">Multiplicador Quarta</label>
            <input type="number" step="0.1" id="jogos_pts_quarta" class="form-control" placeholder="Ex: 1.0">
          </div>
          <div class="mb-3 text-start">
            <label for="jogos_pts_quinta" class="form-label">Multiplicador Quinta</label>
            <input type="number" step="0.1" id="jogos_pts_quinta" class="form-control" placeholder="Ex: 1.0">
          </div>
          <div class="mb-3 text-start">
            <label for="jogos_pts_sexta" class="form-label">Multiplicador Sexta</label>
            <input type="number" step="0.1" id="jogos_pts_sexta" class="form-control" placeholder="Ex: 1.0">
          </div>
          <div class="mb-3 text-start">
            <label for="jogos_pts_sabado" class="form-label">Multiplicador Sábado</label>
            <input type="number" step="0.1" id="jogos_pts_sabado" class="form-control" placeholder="Ex: 1.0">
          </div>
          <div class="mb-3 text-start">
            <label for="jogos_pts_domingo" class="form-label">Multiplicador Domingo</label>
            <input type="number" step="0.1" id="jogos_pts_domingo" class="form-control" placeholder="Ex: 1.0">
          </div>
         
          <div class="mb-3 text-start">
            <label for="valor_grama" class="form-label">Valor por Grama</label>
            <input type="number" step="0.001" id="valor_grama" class="form-control" placeholder="Ex: 0.200">
          </div>
          <div class="mb-3 text-start">
            <label for="valor_pontos" class="form-label">Valor de Pontos</label>
            <input type="number" id="valor_pontos" class="form-control" placeholder="Ex: 1">
          </div>
          <div class="mb-3 text-start">
            <label for="tara_prato" class="form-label">Tara do Prato</label>
            <input type="number" step="0.001" id="tara_prato" class="form-control" placeholder="Ex: 0.150">
          </div>
        </form>
                    `,
        showCancelButton: true,
        confirmButtonText: "Criar Jogo",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            const unidade = document.getElementById("Unidade").value;
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

            // jogos data mudanca ta dando pau ai!!!!!!!!!
            // Atualizar estado ou fazer post para o backend com os dados coletados
            const jogos_data_mudanca = new Date();
            let dataMudada = formatarDataParaBanco(jogos_data_mudanca)
            const jo_datai_formatada = formatarDataParaBanco(jo_datai);  // Converte para YYYY-MM-DD
            const jo_dataf_formatada = formatarDataParaBanco(jo_dataf);  // Converte para YYYY-MM-DD
            console.log(dataMudada)
            setForm({
                unidade,
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
                dataMudada
            });

            const novoForm = {
                unidade,
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
                dataMudada
            }
            console.log(novoForm)

            CriarJogo(atualizar, navigate, token, novoForm)

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Nenhum jogo foi criado!",
                icon: "error"
            });
        }



    });
};


export const useImportarDadosJogos = (token, navigate) => {
    
    const [TableJogos, setTableJogos] = useState([])
    console.log(token)
    async function atualizar() {
        try {
            let resposta = await axios.get(urlJogos, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
        
            setTableJogos(resposta.data)
        } catch (error) {
            // SwalErroToken(navigate)
            console.log(error)
        }
    }

    useEffect(() => {
        atualizar()
    }, [])

    return {
        TableJogos,
        atualizar
    }
}


export const useImportarDadosJogosEspecifico = (token, navigate, ID_escola) => {
    const [TableJogosEspecifico, setTableJogosEspecifico] = useState([])
    
    async function BuscarJogosEspecifico() {
        try {
            let resposta = await axios.get(`${urlJogos}/disp/${ID_escola}`, {  // Inclui ID_escola na URL
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTableJogosEspecifico(resposta.data);  // Corrige o nome do estado
        } catch (error) {
            console.log(error);
            // SwalErroToken(navigate); // Descomente se estiver tratando erros com SweetAlert
        }
    }

    // useEffect(() => {
    //     BuscarJogosEspecifico()
    // }, [])

    return {
        TableJogosEspecifico,
        BuscarJogosEspecifico
    }
}


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
        SwalErroToken(navigate)
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
                html: "Seu jogo não foi criado com sucesso!<br> <br> Código do erro: " + resposta.data,
                icon: "error"
            });
        } else {
            atualizar(); // Atualiza a lista após a exclusão
            swalWithBootstrapButtons.fire({
                title: "Criado!",
                text: "Seu jogo foi criado com sucesso!",
                icon: "success"
            });
            console.log("Jogo criado sucesso");
        }
    } catch (error) {

        SwalErroToken(navigate)
        console.log(error)
    }
};
