import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const Turmas = ({ onChange, value, name }) => {
  return (
    <>
      <div className="">
        <label htmlFor="turma_registrar">Turma</label>
        <select name={name} onChange={onChange} value={value} id="turma_registrar" required className="form-select form-select-sm">
          <option disabled>Selecione uma turma:</option>
          <option value={1}>3° EM</option>
          <option value={2}>2° EM</option>
          <option value={3}>1° EM</option>
          <option value={4}>9° Fundamental II</option>
          <option value={5}>8° Fundamental II</option>
          <option value={6}>7° Fundamental II</option>
          <option value={7}>6° Fundamental II</option>
          <option value={8}>5° Fundamental I</option>
          <option value={9}>4° Fundamental I</option>
          <option value={10}>3° Fundamental I</option>
          <option value={11}>2° Fundamental I</option>
          <option value={12}>1° Fundamental I</option>
        </select>
      </div>
    </>
  );
};

export default Turmas;
