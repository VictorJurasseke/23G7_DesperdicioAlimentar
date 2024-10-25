import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import Spinner from 'react-bootstrap/Spinner';




const LoadDev = () => {
  return (
    <div className='text-centerx d-flex justify-content-center align-items-center'>
             <Spinner animation="border" variant="primary"/>

    </div>
  );
};


export default LoadDev