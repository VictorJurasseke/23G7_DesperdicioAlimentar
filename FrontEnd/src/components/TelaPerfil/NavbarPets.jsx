import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card_pet from '../TelaPerfil/Card_pet';
import { usePetsDados } from './FunctionPets';
import './div_pets.css';
import { motion } from 'framer-motion';
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";

const NavBarPets = ({ token, navigate }) => {
    const { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote } = usePetsDados(token, navigate);


    // Guarda o filtro selecionado
    const [SelectRaridade, setSelectRaridade] = useState('');

 
    
    
    const petsContainerRef = useRef(null); // Referência para o contêiner de cards
    const [isMouseDown, setIsMouseDown] = useState(false); // Controle do estado do mouse
    const [startX, setStartX] = useState(0); // Posição inicial do mouse
    const [scrollLeft, setScrollLeft] = useState(0); // Posição inicial do scroll
    
    const [quantidadeExibida, setQuantidadeExibida] = useState(5);  // Começa com 5
    
    const [Mascotes, setMascotes] = useState();
    const [MaximoSeta, setMaximoSeta] = useState(false);  // Flag para saber se atingiu o máximo
    
    // Função para ativar o efeito de "arraste" quando o mouse é pressionado
    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.clientX); // Posição inicial do mouse
        setScrollLeft(petsContainerRef.current.scrollLeft); // Posição do scroll
        petsContainerRef.current.style.cursor = 'grabbing'; // Altera o cursor para 'grabbing'
    };
    
    // Função para desativar o efeito de "arraste" quando o mouse é liberado
    const handleMouseUp = () => {
        setIsMouseDown(false);
        petsContainerRef.current.style.cursor = 'grab'; // Restaura o cursor para 'grab'
    };
    
    // Função para movimentar o scroll horizontal com o mouse
    const handleMouseMove = (e) => {
        if (!isMouseDown) return; // Se o mouse não estiver pressionado, não faz nada
        const x = e.clientX; // Posição atual do mouse
        const walk = (x - startX) * 2; // Multiplicador para controlar a velocidade do movimento
        petsContainerRef.current.scrollLeft = scrollLeft - walk; // Atualiza o scroll com base no movimento do mouse
    };
    
    // Prevenir que o clique na imagem dispare o onMouseDown do contêiner
    const handleImageMouseDown = (e) => {
        e.stopPropagation(); // Impede que o evento de mouse down se propague para o contêiner
    };

    // Carregar pets e verificar se atingiu o máximo
    useEffect(() => {
        ProcurarPets(setMascotes, quantidadeExibida);
        if (quantidadeExibida >= TodosPetsTemporada.length) {
            setMaximoSeta(true);  // Alcançou o limite, não há mais o que carregar
        } else {
            setMaximoSeta(false);  // Ainda há mais pets para carregar
        }
    }, [quantidadeExibida]);
    
    
    const selectRaridadeSwitch = (SelectRaridade) => {
        switch (SelectRaridade) {
            case '1':
                
                setMascotes(Mascotes.filter((pets) => pets.raridade_pet === "Comum"));
                break;
            case '2':
                setMascotes(Mascotes.filter((pets) => pets.raridade_pet === "Raro"));
                break;
            case '3':
                setMascotes(Mascotes.filter((pets) => pets.raridade_pet === "Épico"));
                break;
            case '4':
                setMascotes(Mascotes.filter((pets) => pets.raridade_pet === "Lendário"));
                break;
            default:
                
                setMascotes(TodosPetsTemporada);
        }
    }


     // Função para filtrar os mascotes
     useEffect(() => {
        selectRaridadeSwitch(SelectRaridade)
        console.log("tema:", SelectRaridade)
        console.log("todos:", TodosPetsTemporada)
    }, [SelectRaridade, Mascotes]);






    return (
        <>
            <nav className="navbar bg-body-dark p-2">
                <motion.div className="d-flex flex-row col-12 justify-content-between align-items-center"
                    initial={{ x: "-100vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, type: "spring", stiffness: 40 }}>

                    {/* Alinhar o h6 à esquerda */}
                    <h6 className='align-self-start justify-self-center'>{`Mascotes da ${jo_nome}: ${QuantidadeMascote}`}</h6>

                    {/* Formulários à direita */}
                    <form className="d-flex" role="search">
                        <select
                            value={SelectRaridade}
                            onChange={(e) => setSelectRaridade(e.target.value)}
                            className="form-select me-2" // Adicionado 'me-2' para margem à direita
                            aria-label="Default select example"
                        >
                            <option value="">Todos:</option>
                            <option value="1">Comum</option>
                            <option value="2">Raro</option>
                            <option value="3">Épico</option>
                            <option value="4">Lendário</option>
                        </select>

                        <input
                            className="form-control me-2" // Adicionado 'me-2' para margem à direita
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />

                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>

                </motion.div>

            </nav>

            <motion.div
                className="pets-container"
                ref={petsContainerRef}
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, type: "spring", stiffness: 40 }}
                onMouseDown={handleMouseDown} // Ativa o arraste quando o mouse é pressionado
                onMouseUp={handleMouseUp} // Desativa o arraste quando o mouse é liberado
                onMouseLeave={handleMouseUp} // Desativa o arraste caso o mouse saia do contêiner
                onMouseMove={handleMouseMove} // Controla o movimento do scroll
            >
                {Mascotes && (
                    <>
                        {Mascotes.map((item) => (
                            <Card_pet
                                key={item.ID_inv_pets} // Use um identificador único
                                raridade={item.raridade_pet}
                                nome={item.nome_pet}
                                caminho={item.caminho_pet}
                                evolucao={item.evolucao}
                                ID_inventario={item.ID_inv_pets}
                                ponto_evo={item.ponto_pet}
                                nivel_pet={item.pontuacao_pet}
                                token={token}
                                navigate={navigate}
                                ProcurarPets={ProcurarPets}
                                onImageMouseDown={handleImageMouseDown} // Passa a função para o card
                            />
                        ))}

                        {/* Botão para mostrar mais ou tirar 15 pets */}
                        <div className="d-flex justify-content-center align-items-center col-1">
                            {MaximoSeta ? (
                                <button
                                    className="btn-mais-15"
                                    onClick={() => {
                                        setQuantidadeExibida((5)); // Volta ao padrao
                                    }}
                                >
                                    <FaCircleChevronLeft />
                                </button>
                            ) : (
                                <button
                                    className="btn-mais-15"
                                    onClick={() => {
                                        setQuantidadeExibida((prevQuantidade) => prevQuantidade + 15);
                                    }}
                                >
                                    <FaCircleChevronRight />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </>
    );
};

export default NavBarPets;
