import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap


const Card_pet = ({nome, caminho}) => {
    return (
       
            <div className="card col-1 shadow text-dark  ">
                <img src={caminho} className="card-img-top" style={{filter:'saturate(120%)' }}  alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title ">{nome}</h5>
                        {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    </div>
            </div>
      

    );
};

export default Card_pet;
