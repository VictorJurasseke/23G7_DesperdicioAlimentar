import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import TelaDev from '../../pages/TelaDev';


const Menu_Administrador = (Dados_usuario) => {
    console.log(Dados_usuario)
 
    return (
        <>
            {Dados_usuario.Dados_usuario.user_tipo_acesso === 0 && (
                <>
                    <TelaDev />
                </>
            )}
        </>


    );
};

export default Menu_Administrador;
