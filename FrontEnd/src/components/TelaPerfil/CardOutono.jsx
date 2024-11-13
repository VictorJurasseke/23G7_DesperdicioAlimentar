import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap


import './CardOutono.css'

const CardOutono = ({ jo_nome, jo_datai, jo_dataf, ID_jogos, ID_usuarios, es_nome, token, navigate, Participar, TodasTurmas }) => {

    console.log(jo_datai)


    return (

        <>
            <div className='position-absolute col-10 p-4  back-Autumn'>aaa</div>
            <div className="Autumn-card p-4 d-flex row">
                <div className='text-start flex-column col-4 d-flex  p-4'>
                    <h1 className="title-outono ">TEMPORADA DE OUTONO</h1>
                    <p className="lyrics-outono">
                        'Cause the players gonna play, play, play, play, play<br />
                        And the haters gonna hate, hate, hate, hate, hate<br />
                        Baby, I'm just gonna shake, shake, shake, shake, shake
                    </p>
                    <p className="dates text-light fw-bold fs-6">Data Início: 01/01/2024<br />Data Fim: 20/03/2024</p>
                </div>
                <div className=' col-8 align-self-center h-100 d-flex flex-column justify-content-end '>
                    <img
                        src="http://localhost:3025/public/GentleBunny.gif"
                        alt="Gentle Bunny"
                        style={{
                            alignSelf: "end",
                            width: '200px',
                            height: '200px',
                            borderRadius: '20px', // borda arredondada
                        }}
                    />
                    <div className='  align-items-end d-flex justify-content-end'>
                        <button onClick={() => { Participar(ID_jogos, jo_nome, es_nome, token, navigate, TodasTurmas) }} className="participar-btn-Autumn">
                            <span role="img" aria-label="sun">🍂</span> Participar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardOutono;
