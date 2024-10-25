import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import CardPerfil from '../../components/TelaPerfil/CardPerfil';
import Header from '../../components/TelaHome/Header';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FaTrophy } from 'react-icons/fa';
const Grafico = ({ Posicao}) => {
    return (
      <>
        <div className="col-6 d-flex align-items-center justify-content-center">
        <div className="d-flex h-75 align-items-end">
        <div className=''>
          <h2 className="position-absolute text-center text-danger " style={{top:'35%', width:'150px'}}>#{Posicao}</h2>
        <FaTrophy style={{ color: 'gold', fontSize:"150px"}} />
        </div>
        </div>
      </div>
      </>
    
    );
  };

export default Grafico;
