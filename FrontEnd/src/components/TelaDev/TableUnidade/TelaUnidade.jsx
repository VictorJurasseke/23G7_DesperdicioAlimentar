import React from 'react';
import TableUnidade from './TableUnidade';

const TelaUnidade = ({token, navigate}) => {
    return (
        <div className='d-flex flex-fill flex-column'>
       
                <TableUnidade  token={token} navigate={navigate}/>
         
        </div>
    );
};

export default TelaUnidade;