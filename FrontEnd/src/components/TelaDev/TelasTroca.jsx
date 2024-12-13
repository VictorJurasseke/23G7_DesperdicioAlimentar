import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import './TelaDev.css'; // Certifique-se de criar e importar o arquivo CSS

const TelasTroca = ({ FuncaoAlvo }) => {
  const [Radio, setRadio] = useState('option1');

  const PassarInfo = (event) => {
    setRadio(event.target.id);
    FuncaoAlvo(event.target.id);
  };

  return (
    <>
      <div className="col-10 py-3 m-3">
        <div className="row justify-content-start gap-1">
          <div className="col-auto">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option1"
              autoComplete="off"
              defaultChecked
              onChange={PassarInfo}
            />
            <label className="btn btn-outline-secondary" htmlFor="option1">Escola</label>
          </div>

          <div className="col-auto">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option2"
              autoComplete="off"
              onChange={PassarInfo}
            />
            <label className="btn btn-outline-secondary" htmlFor="option2">Turmas</label>
          </div>

          <div className="col-auto">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option3"
              autoComplete="off"
              onChange={PassarInfo}
            />
            <label className="btn btn-outline-secondary" htmlFor="option3">Usuário</label>
          </div>

          <div className="col-auto">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option4"
              autoComplete="off"
              onChange={PassarInfo}
            />
            <label className="btn btn-outline-secondary" htmlFor="option4">Matriculados</label>
          </div>

          <div className="col-auto">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option5"
              autoComplete="off"
              onChange={PassarInfo}
            />
            <label className="btn btn-outline-secondary" htmlFor="option5">Jogos</label>
          </div>

          <div className="col-auto">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option6"
              autoComplete="off"
              onChange={PassarInfo}
            />
            <label className="btn btn-outline-secondary" htmlFor="option6">Pets</label>
          </div>

          <div className="col-auto">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option7"
              autoComplete="off"
              onChange={PassarInfo}
            />
            <label className="btn btn-outline-secondary" htmlFor="option7">Relatorio</label>
          </div>

        </div>
      </div>
    </>
  );
};

export default TelasTroca;
