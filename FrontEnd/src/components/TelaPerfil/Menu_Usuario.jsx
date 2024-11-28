import React, { useEffect } from 'react';
import { formatarData, useImportarDadosJogos } from '../TelaDev/TableJogo/FunctionJogos';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardJogos from './CardJogos';
import { motion } from 'framer-motion';
import { useImportarDadosTurmas } from '../TelaDev/TableTurmas/FunctionTurmas';

const Menu_Usuario = ({ Dados_usuario, token, navigate }) => {




    const { TodosJogosAtivos, BuscarJogosAtivos } = useImportarDadosJogos(token, navigate) // puxa todos os jogos da unidade 5


    // console.log("Todos os jogos do sistema ativo:",TodosJogosAtivos)

    const { TodasTurmas, BuscarTurmas } = useImportarDadosTurmas(token, navigate)

    useEffect(() => {
        if (Dados_usuario.user_tipo_acesso === 2) {
            BuscarJogosAtivos();
            BuscarTurmas()
            console.log("Funcão chamada")

        }
    }, []);

    console.log(TodosJogosAtivos)


    return (
        <>

            <motion.div className="text-center p-3 position-relative d-flex align-items-center" initial={{ y: "-100vh", opacity: 0 }} transition={{ duration: "1", type: "spring", stiffness: 20 }} animate={{ y: 70, opacity: 1 }}>
                {TodosJogosAtivos.length === 0 ? (
                    <>Não há nenhum jogo disponivel em sua escola!</>
                ) : (
                    <>
                        <div className="col-12 gap-2 d-flex flex-wrap justify-content-center">
                            {TodosJogosAtivos.map((item) => (
                                // puxa todos os jogos do banco que estão disponiveis na sua escola
                                // Alterar o banco para ler o status do jogo e resultá-lo diferente
                                // Exemplo: status = 0 = Não funcionando; status = 1  = Funcionando
                                <CardJogos

                                    key={item.ID_jogos} // Certifique-se de que cada item tenha um identificador único

                                    jo_datai={formatarData(item.jo_datai)}
                                    jo_dataf={formatarData(item.jo_dataf)}
                                    jo_nome={item.jo_nome}
                                    jo_desc={item.jo_desc}
                                    jo_status={item.jo_status}
                                    ID_jogos={item.ID_jogos}
                                    ID_usuarios={Dados_usuario.ID_usuarios}
                                    es_nome={item.es_nome}
                                    token={token}
                                    navigate={navigate}
                                    jo_tema={item.jo_tema}
                                    TodasTurmas={TodasTurmas}
                                />
                            ))}
                        </div>
                    </>
                )}
            </motion.div>






        </>


    );
};

export default Menu_Usuario;
