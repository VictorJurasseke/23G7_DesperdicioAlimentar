import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card_pet from '../TelaPerfil/Card_pet';
import { usePetsDados } from './FunctionPets';
import './div_pets.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";

const NavBarPets = ({ token, navigate, TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote, jo_tema, visitante }) => {



    // Guarda o filtro selecionado
    const [SelectRaridade, setSelectRaridade] = useState('');
    const petsContainerRef = useRef(null); // Referência para o contêiner de cards
    const [isMouseDown, setIsMouseDown] = useState(false); // Controle do estado do mouse
    const [startX, setStartX] = useState(0); // Posição inicial do mouse
    const [scrollLeft, setScrollLeft] = useState(0); // Posição inicial do scroll
    const [quantidadeExibida, setQuantidadeExibida] = useState(20);  // Começa com 5

    const [Mascotes, setMascotes] = useState([]);
    const [MaximoSeta, setMaximoSeta] = useState(2);  // Flag para saber se atingiu o máximo - 1 = Diminuir 2; = Aumentar; 3 = Não mostrar seta

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
    // useEffect(() => {
    //     ProcurarPets();
    //     console.log("Valor de qtd",quantidadeExibida)
    //     setMascotes(TodosPetsTemporada.slice(0,quantidadeExibida))
    //     console.log(Mascotes)
    //     if (quantidadeExibida >= TodosPetsTemporada.length) {
    //         setMaximoSeta(1);  // Alcançou o limite, não há mais o que carregar
    //     } else {
    //         setMaximoSeta(2);  // Ainda há mais pets para carregar
    //     }
    // }, [quantidadeExibida]);

    // useEffect(() => {
    //     ProcurarPets();
    //     setMascotes(TodosPetsTemporada.slice(0,5))
    // }, []);

    useEffect(() => {

        //Guarda um objeto com os mascotes  cortados pareados com a quantidade do selecionada do cliente
        const MascotesCortados = TodosPetsTemporada.slice(0, quantidadeExibida)

        console.log("Mascotes cortados:", TodosPetsTemporada.slice(0, quantidadeExibida))

        //Roda a função de select e coloca implementa os mascotes selecionados pelo cliente
        selectRaridadeSwitch(SelectRaridade, MascotesCortados)
    }, [TodosPetsTemporada, SelectRaridade])



    const selectRaridadeSwitch = (SelectRaridade, MascotesCortados) => {
        switch (SelectRaridade) {
            case 'comum':
                console.log("Comum selecionado e filtrando", TodosPetsTemporada.filter((pets) => pets.raridade_pet === "Comum"))
                setMaximoSeta(3)
                setMascotes(TodosPetsTemporada.filter((pets) => pets.raridade_pet === "Comum"));
                break;
            case 'raro':
                setMaximoSeta(3)
                setMascotes(TodosPetsTemporada.filter((pets) => pets.raridade_pet === "Raro"));
                break;
            case 'épico':
                setMaximoSeta(3)
                setMascotes(TodosPetsTemporada.filter((pets) => pets.raridade_pet === "Épico"));
                break;
            case 'lendário':
                setMaximoSeta(3)
                setMascotes(TodosPetsTemporada.filter((pets) => pets.raridade_pet === "Lendário"));
                break;
            default:
                // Passa o valor padrão da seta para aumentar e tambem coloca os mascotes cortados
                if (TodosPetsTemporada.length <= 20) {
                    console.log('ALOO SETA3 SOME')
                    setMaximoSeta(3)
                } else if (quantidadeExibida >= TodosPetsTemporada.length) {
                    console.log('ALOO SETA1 DIMINUIR')
                    setMaximoSeta(1);  // Alcançou o limite, não há mais o que carregar
                } else {
                    console.log('TEM MUITO AINDA')
                    setMaximoSeta(2);  // Ainda há mais pets para carregar
                }
                setMascotes(MascotesCortados)
        }
    }


    // Função para filtrar os mascotes
    useEffect(() => {
        console.log("Valor de qtd", quantidadeExibida)
        setMascotes(TodosPetsTemporada.slice(0, quantidadeExibida))
        console.log(Mascotes)
        if (TodosPetsTemporada.length <= 20) {
            console.log('ALOO SETA3 SOME')
            setMaximoSeta(3)
        } else if (quantidadeExibida >= TodosPetsTemporada.length) {
            console.log('ALOO SETA1 DIMINUIR')
            setMaximoSeta(1);  // Alcançou o limite, não há mais o que carregar
        } else {
            console.log('TEM MUITO AINDA')

            setMaximoSeta(2);  // Ainda há mais pets para carregar
        }
        console.log("tema:", jo_tema)
        console.log("todos:", TodosPetsTemporada)
    }, [quantidadeExibida]);





    return (
        <>
            <div className='col-12 border-top h-100 d-flex flex-row'>
                <form role="search" className='col-lg-2 col-md-12 col-sm-12'>
                    <select
                        value={SelectRaridade}
                        onChange={(e) => setSelectRaridade(e.target.value)}
                        style={{ border: "2px solid #243447", color: "#243447", backgroundColor: "#d9c89f", borderRadius: '20px' }}
                        className="form-select form-select-sm jaroFont text-center p-1 fs-4" // Adicionado 'me-2' para margem à direita
                        aria-label="Default select example">
                        <option style={{}} value="">Todos:</option>
                        <option style={{}} value="comum">Comuns</option>
                        <option style={{}} value="raro">Raros</option>
                        <option style={{}} value="épico">Épicos</option>
                        <option style={{}} value="lendário">Lendários</option>
                    </select>
                </form>
            </div>
            <motion.div
                className="pets-container p-3"
                ref={petsContainerRef}
                initial={{}}
                animate={{ x: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 20 }}
                onMouseDown={handleMouseDown} // Ativa o arraste quando o mouse é pressionado
                onMouseUp={handleMouseUp} // Desativa o arraste quando o mouse é liberado
                onMouseLeave={handleMouseUp} // Desativa o arraste caso o mouse saia do contêiner
                onMouseMove={handleMouseMove} // Controla o movimento do scroll
            >
                {Mascotes.length > 0 ? (
                    <>
                        {Mascotes.map((item) => (

                            <Card_pet
                                visitante={visitante}
                                key={item.ID_inv_pets} // Use um identificador único
                                raridade={item.raridade_pet}
                                nome={item.nome_pet}
                                caminho={item.caminho_pet}
                                desc_pet={item.desc_pet}
                                evolucao={item.evolucao}
                                ID_inventario={item.ID_inv_pets}
                                ponto_evo={item.ponto_pet}
                                nivel_pet={item.pontuacao_pet}
                                pet_principal={item.pet_principal}
                                token={token}
                                navigate={navigate}
                                ProcurarPets={ProcurarPets}
                                onImageMouseDown={handleImageMouseDown} // Passa a função para o card
                            />
                        ))}

                        {/* Botão para mostrar mais ou tirar 15 pets */}
                        <div className="d-flex justify-content-center align-items-center col-1">

                            {MaximoSeta == 1 && (
                                <button
                                    className="btn-mais-15"
                                    onClick={() => {
                                        setQuantidadeExibida(20); // Volta ao padrao
                                    }}
                                >
                                    <FaCircleChevronLeft />
                                </button>
                            )}
                            {MaximoSeta == 2 && (
                                <button
                                    className="btn-mais-15"
                                    onClick={
                                        () => {
                                            setQuantidadeExibida((prevQuantidade) => prevQuantidade + 15);
                                        }}
                                >
                                    <FaCircleChevronRight />
                                </button>
                            )}

                            {MaximoSeta == 3 && null}
                        </div>
                    </>
                ) : (<h1 className='m-0 jaroFont'>Não possui nenhum {SelectRaridade}</h1>)}
            </motion.div >
        </>
    );
};

export default NavBarPets;
