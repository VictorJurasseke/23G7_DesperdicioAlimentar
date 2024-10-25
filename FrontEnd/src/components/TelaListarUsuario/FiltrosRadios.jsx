import React from 'react';

const FiltrosRadios = ({  }) => {
 
    return (
        <>
        <div className=' col-12 d-flex p-4 mb-2 justify-content-between border-bottom  '>
          <div className='d-flex flex-row gap-2'>

          <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" defaultChecked />
          <label className="btn text-dark" htmlFor="option1">3 EM</label>

          <input type="radio" className="btn-check " name="options" id="option2" autoComplete="off" />
          <label className="btn text-secondary " htmlFor="option2">2 EM</label>
          
          <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" />
          <label className="btn text-secondary" htmlFor="option3">1 EM</label>
          
          <input type="radio" className="btn-check" name="options" id="option4" autoComplete="off" />
          <label className="btn text-secondary" htmlFor="option4">Relevância</label>

          <input type="radio" className="btn-check" name="options" id="option5" autoComplete="off" />
          <label className="btn text-secondary" htmlFor="option5">Data</label>
          </div>       
          <form className="d-flex" role="search" >
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
       
        </div>
        </>
    );
};

export default FiltrosRadios;


