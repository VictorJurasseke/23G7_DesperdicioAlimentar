import React from 'react';
import { useImportarDadosUnidade } from '../TelaDev/TableUnidade/FunctionUnidade';




const SelectUnidade = () => {

  const {TableUnidade} = useImportarDadosUnidade()
  
  return (
    <>
      <div className="">
        <label htmlFor="unidade_registrar_escola" className="form-label m-1">Escola - Unidade</label>
        <select required className="form-select form-select-sm">
          <option value={0} disabled>Selecione sua escola:</option>
          {TableUnidade.map(item => (
          <Option key={unidade.ID_escola} value={item.ID_escola} nome={item.es_nome} />
        ))}
        </select>
      </div>
    </>
  );
};

export default SelectUnidade;
