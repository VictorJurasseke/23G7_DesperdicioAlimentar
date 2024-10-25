

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import TableJogos from './TableJogos';



const TelaFormJogo = ({ token, navigate, TableUnidade }) => {
    
    const renderizarUnidades = (TableUnidade) => {
        console.log("Renderizando", TableUnidade);
        return TableUnidade.map(unidade => <option value={unidade.ID_escola} name={unidade.es_nome}>${unidade.es_nome}</option>)

    };  
    
  
    return (
        <>
            <form id="form-jogo">
                <div class="mb-3 text-start">
                    <label for="Unidade" class="form-label">Unidades</label>
                    <select id="Unidade" onChange={console.log("AA")} className="form-select">
                        <option value="">Selecione sua unidade</option>
                        {renderizarUnidades(TableUnidade)}
                    </select>
                </div>
                <div class="mb-3 text-start">
                    <label for="jo_nome" class="form-label">Nome do Jogo</label>
                    <input type="text" id="jo_nome" className="form-control" placeholder="Ex: Jogo de Redução de Desperdício"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jo_datai" className="form-label">Data de Início</label>
                    <input type="date" id="jo_datai" className="form-control"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jo_dataf" className="form-label">Data de Fim</label>
                    <input type="date" id="jo_dataf" className="form-control"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jo_status" className="form-label">Status do Jogo</label>
                    <select id="jo_status" className="form-select">
                        <option value="">Selecione o status</option>
                        <option value="1">Ativo</option>
                        <option value="2">Inativo</option>
                    </select>
                </div>
                <div className="mb-3 text-start">
                    <label for="jogos_pts_segunda" className="form-label">Multiplicador Segunda</label>
                    <input type="number" step="0.1" id="jogos_pts_segunda" className="form-control" placeholder="Ex: 1.2"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jogos_pts_terca" className="form-label">Multiplicador Terça</label>
                    <input type="number" step="0.1" id="jogos_pts_terca" className="form-control" placeholder="Ex: 1.0"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jogos_pts_quarta" className="form-label">Multiplicador Quarta</label>
                    <input type="number" step="0.1" id="jogos_pts_quarta" className="form-control" placeholder="Ex: 1.0"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jogos_pts_quinta" className="form-label">Multiplicador Quinta</label>
                    <input type="number" step="0.1" id="jogos_pts_quinta" className="form-control" placeholder="Ex: 1.0"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jogos_pts_sexta" className="form-label">Multiplicador Sexta</label>
                    <input type="number" step="0.1" id="jogos_pts_sexta" className="form-control" placeholder="Ex: 1.0"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jogos_pts_sabado" className="form-label">Multiplicador Sábado</label>
                    <input type="number" step="0.1" id="jogos_pts_sabado" className="form-control" placeholder="Ex: 1.0"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="jogos_pts_domingo" className="form-label">Multiplicador Domingo</label>
                    <input type="number" step="0.1" id="jogos_pts_domingo" className="form-control" placeholder="Ex: 1.0"/>
                </div>

                <div className="mb-3 text-start">
                    <label for="valor_grama" className="form-label">Valor por Grama</label>
                    <input type="number" step="0.001" id="valor_grama" className="form-control" placeholder="Ex: 0.200"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="valor_pontos" className="form-label">Valor de Pontos</label>
                    <input type="number" id="valor_pontos" className="form-control" placeholder="Ex: 1"/>
                </div>
                <div className="mb-3 text-start">
                    <label for="tara_prato" className="form-label">Tara do Prato</label>
                    <input type="number" step="0.001" id="tara_prato" className="form-control" placeholder="Ex: 0.150"/>
                </div>
            </form>
        </>
    );
};

export default TelaFormJogo;
