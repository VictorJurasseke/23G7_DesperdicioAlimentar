import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const TelasTroca = ({FuncaoAlvo}) => {


  const [Radio, setRadio] = useState('option1')

  const PassarInfo = (event) => {
    setRadio(event.target.id) 
    FuncaoAlvo(event.target.id)
  }

  return (
    <>
      <div className=' col-12 d-flex p-4 mb-2 justify-content-between border-bottom  '>
        <div className='d-flex flex-row gap-2'>

          <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" defaultChecked onChange={PassarInfo}/>
          <label className="btn text-secondary" htmlFor="option1">Escola</label>

          <input type="radio" className="btn-check " name="options" id="option2" autoComplete="off" onChange={PassarInfo} />
          <label className="btn text-secondary" htmlFor="option2">Turmas</label>
       
          <input type="radio" className="btn-check " name="options" id="option3" autoComplete="off" onChange={PassarInfo} />
          <label className="btn text-secondary" htmlFor="option3">Usuário</label>
         
          <input type="radio" className="btn-check " name="options" id="option4" autoComplete="off" onChange={PassarInfo} />
          <label className="btn text-secondary" htmlFor="option4">Matriculados</label>
       
          <input type="radio" className="btn-check " name="options" id="option5" autoComplete="off" onChange={PassarInfo} />
          <label className="btn text-secondary" htmlFor="option5">Jogos</label>
       
        </div>
        <form className="d-flex" role="search" >
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

      </div>
    </>
  );
};

export default TelasTroca;
