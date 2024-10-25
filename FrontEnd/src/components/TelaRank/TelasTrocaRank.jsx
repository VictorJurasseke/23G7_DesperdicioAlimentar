import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const TelasTrocaJogos = ({ FuncaoAlvo }) => {


  const [Radio, setRadio] = useState('option1')

  const PassarInfo = (event) => {
    setRadio(event.target.id)
    FuncaoAlvo(event.target.id)
  }

  return (
    <>
      <div className=' col-12 d-flex p-4 mb-2 justify-content-between border-bottom  '>
        <div className='d-flex flex-row gap-2'>

          <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" defaultChecked onChange={PassarInfo} />
          <label className="text-dark fs-2" htmlFor="option1">Melhores jogadores da sua escola!</label>
        </div>
        
        <form className="d-flex" role="search" >
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default TelasTrocaJogos;
