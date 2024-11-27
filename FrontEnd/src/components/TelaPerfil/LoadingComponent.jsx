import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FaTrophy } from 'react-icons/fa';
import InfoPerfil from './InfoPerfil';

import Spinner from 'react-bootstrap/Spinner';





const LoadingComponent = () => {
  return (
    <div className='text-center vh-100 d-flex justify-content-center align-items-center'>
       <Spinner animation="border" variant="primary"/>
    </div>
  );
};

export default LoadingComponent;

