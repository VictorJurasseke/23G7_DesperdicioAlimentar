import React from 'react';

const FiltrosRadios = ({ ID_turmas, tur_nome, AlterarTurma }) => {
    const AtivarAlterador = (e) => {
        if (e.target.checked) {  // Verifica se o radio foi selecionado
            AlterarTurma(ID_turmas);  // Chama a função que passa o valor de ID_turmas para o componente pai
        }
    };

    return (
        <>
            <input
                type="radio"
                className="btn-check"
                name="options"
                id={"option" + ID_turmas}
                autoComplete="off"
                onChange={AtivarAlterador}  // Chama o AtivarAlterador ao selecionar para trocar a turma
            />
            <label className="btn btn-outline-secondary jaroFont" htmlFor={"option" + ID_turmas}>
                {tur_nome}
            </label>
        </>
    );
};

export default FiltrosRadios;
