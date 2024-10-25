import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import Card_pet from './Card_pet';
import { FixedSizeList as List } from 'react-window';


let arrayPets = [
    {id:1, nome: "Egg", caminho: "http://localhost:3025/public/Egg.gif" },
    {id:2, nome: "Neymar", caminho: "http://localhost:3025/public/CoelhoNeymar.gif" },
    {id:3, nome: "NikeyBoy", caminho: "http://localhost:3025/public/CoelhoNike.gif" },
]


const Lib = () => {     
    return (
        <div className='col-12  d-flex flex-wrap gap-2 p-3 text-dark'>

            {arrayPets.map((item) => (
                <Card_pet
                    key={item.id} // Adicione uma chave única para cada elemento da lista
                    nome={item.nome}
                    caminho={item.caminho}
                />
            ))}
        </div>
    );
};

export default Lib;
