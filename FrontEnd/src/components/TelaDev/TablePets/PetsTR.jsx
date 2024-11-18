import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { ModalDeletePet, ModalEditPets } from './FunctionPets'; // Importando funções de pets

const Url = 'http://localhost:3025/Pets/'


const PetsTR = ({ ID_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, token, navigate, atualizar, nome_pet }) => {
    return (
        <>
            <tr>
                <td>{ID_pet}</td>                    {/* ID do pet */}
                <td>{nome_pet}</td>                  {/* Nome do pet */}
                <td><img src={Url+caminho_pet} alt={caminho_pet} style={{ width: 30, height: 30 }} /></td> {/* Imagem do pet */}
                <td>{desc_pet}</td>                  {/* Descrição do pet */}
                <td>{ponto_pet}</td>                 {/* Pontuação do pet */}
                <td>{raridade_pet}</td>              {/* Raridade do pet */}
                <td className='fs-5'>
                    <div className='col-12 d-flex justify-content-evenly'>
                        <a onClick={() => { ModalEditPets(ID_pet, atualizar, token, navigate) }}><HiPencil /></a>  {/* Modificado ID_pet */}
                        <a onClick={() => { ModalDeletePet(ID_pet,caminho_pet, atualizar, token, navigate) }}><HiOutlineTrash /></a>  {/* Modificado ID_pet */}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default PetsTR;
