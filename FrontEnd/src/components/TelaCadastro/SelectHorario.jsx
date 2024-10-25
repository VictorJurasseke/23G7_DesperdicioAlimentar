import React from 'react';

const SelectHorario = ({ name, onChange }) => {
    return (
        <>
            <div className="">
                <label htmlFor="unidade_registrar_horario" className="form-label m-1">Horário</label>
                <select
                    name={name}
                    onChange={onChange}
                    required
                    className="form-select form-select-sm"
                >
                    <option disabled>Selecione seu horário:</option>
                    <option value={"Matutino"}>Matutino</option>
                    <option value={"Vespertino"}>Vespertino</option>
                    <option value={"Noturno"}>Noturno</option>
                </select>
            </div>


        </>
    );
};

export default SelectHorario;


