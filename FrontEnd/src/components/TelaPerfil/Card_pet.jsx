import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalPetProgresso } from './FunctionPets';
import { MudarFundoraridade } from '../NivelAcesso';

const Url = 'http://localhost:3025/Pets/';

const Card_pet = ({ nome, caminho, nivel_pet, raridade, evolucao, ID_inventario, ponto_evo, token, navigate,ProcurarPets }) => {
    const BarraProgresso = Math.min(nivel_pet, ponto_evo);
    console.log("Barra atualizada")
    const corFundo = MudarFundoraridade(raridade);

    return (
        <div className="card col-1 shadow text-dark">
            <img
                src={Url + caminho}
                className="card-img-top"
                style={{ filter: 'saturate(120%)' }}
                alt={nome}
                onClick={() => {
                    ModalPetProgresso(
                        evolucao,
                        ID_inventario,
                        token,
                        navigate,
                        ponto_evo,
                        ProcurarPets
                    );
                }}
            />
            <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: corFundo }}>
                    {nome}
                </h5>

                {!evolucao && (
                    <div className="progress" style={{ height: '10px' }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                                width: `${BarraProgresso}%`,
                                backgroundColor: corFundo,
                                transition: 'width 0.5s ease' // Suavizar a animação
                            }}
                            aria-valuenow={BarraProgresso}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card_pet;
