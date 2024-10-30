import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import TelaDev from '../../pages/TelaDev';


const Menu_Administrador = (OBJ_dados) => {
    console.log(OBJ_dados)
 
    return (
        <>
            {OBJ_dados.OBJ_dados.user_tipo_acesso === 0 && (
                <>
                    <TelaDev />
                </>
            )}
        </>


    );
};

export default Menu_Administrador;
