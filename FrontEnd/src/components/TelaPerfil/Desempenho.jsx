import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import CardPerfil from '../../components/TelaPerfil/CardPerfil';
import Header from '../../components/TelaHome/Header';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FaTrophy } from 'react-icons/fa';
const Desempenho = ({ Posicao}) => {
    return (
      <>
        
        <div className='bg-warning col-4 '>
        <FaTrophy style={{ color: 'gold', fontSize:"50px"}} />
          <h2 className="text-center text-danger" style={{fontSize:'50px', fontWeight:800, backgroundColor:"red"}}>#{Posicao}</h2>
        </div>
      </>
    
    );
  };

export default Desempenho;
