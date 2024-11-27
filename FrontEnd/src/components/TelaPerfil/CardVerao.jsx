import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap


import './CardVerao.css'
import { formatarData } from './FunctionParticiparJogo';

const CardVerao = ({ jo_nome, jo_datai, jo_dataf, ID_jogos, ID_usuarios, es_nome, token, navigate, Participar, TodasTurmas, jo_desc }) => {



    console.log("Data:",)
    console.log(formatarData(jo_datai))
    return (

        <>
            <div className='position-absolute col-10 back-summer'>aaa</div>
            <div className="summer-card p-4 d-flex row ">
                <div className='text-start flex-column col-4 d-flex p-4'>
                    <h1 className="title-summer ">{jo_nome.toUpperCase()}</h1>
                    <p className="lyrics-summer">
                        {jo_desc}
                    </p>
                    <p className="dates text-light fw-bold fs-6">Data Início: {jo_datai}<br />Data Fim: {jo_dataf}</p>
                </div>
                <div className=' col-8 align-self-center h-100 d-flex flex-column justify-content-end '>
                    <img
                        src="http://localhost:3025/public/SummerBunny.gif"
                        alt="Gentle Bunny"
                        style={{
                            alignSelf: "end",
                            width: '200px',
                            height: '200px',
                            borderRadius: '20px', // borda arredondada

                        }}
                    />
                    <div className='  align-items-end d-flex justify-content-end'>
                        <button onClick={() => { Participar(ID_jogos, jo_nome, es_nome, token, navigate, TodasTurmas) }} className="participar-btn-summer">
                            <span role="img" aria-label="sun">☀️</span> Participar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardVerao;
