import React, { useEffect, useState } from 'react';
//-----
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/TelaPerfilJogador/CardPerfilJogador.css';
// ----
// Componentes 
import Header from '../components/TelaHome/Header';
// ----
// Funções
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeaderCardJogador from '../components/TelaPerfilJogador/HeaderCardJogador';
import { useParams } from 'react-router-dom';
//-----
// Imagem de wireframe
import '../components/TelaPerfilJogador/div_pets.css';

// Componentes
import CardInfoJogador from '../components/TelaPerfilJogador/CardInfoJogador';
import { usePetsDados } from '../components/TelaPerfil/FunctionPets';
import NavBarPets from '../components/TelaPerfilJogador/NavbarPets';
import { usePerfilJogadorVisitado } from '../components/TelaVisitarPerfil/TelaVisitarPerfilJogador';

const VisitarPerfilJogador = () => {
    const { ID_usuarios, ID_jogos } = useParams(); // Acessa o parâmetro 'id' da URL
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true); // Estado para controle de loading

    // Info do usuário logado
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);

    // Info do usuário que está sendo visitado
    const { Dados_Visitado, BuscarVisitado } = usePerfilJogadorVisitado(token, navigate, ID_usuarios, ID_jogos);

    // Chamar info do usuário e do visitado
    useEffect(() => {
        console.log("Buscando dados do usuário...");
        verificarUsuario();
        console.log("Buscando dados do usuário visitado...");
        BuscarVisitado();

        // Alterando o estado de loading para false quando os dados estiverem carregados
        setLoading(false);
    }, []);

    // Verificar se os dados do usuário e do visitado estão prontos
    if (loading) {
        return <div>Carregando...</div>; // Mostrar mensagem de carregamento
    }

    return (
        <>
            {Dados_usuario && Dados_Visitado && (
                <>
                    <Header corLetra={"#ffffff"} Dados_usuario={Dados_usuario} />
                    <div className="fundoIMG min-vh-100">
                        {/* Aqui vai o conteúdo da sua página */}
                    </div>
                    {/* Tela principal */}
                    <div className="col-12 p-3 d-flex min-vh-100 justify-content-center z-1">


                        {/* Card principal */}
                        <div className="col-12 col-md-10 col-lg-10 rounded shadow z-2" style={{ backgroundColor: "#F3E8D1", transform: 'scale(0.8, 0.8)' }}>

                            {/* Header que guarda o jogo atual e os coletados */}
                            <HeaderCardJogador jo_nome={Dados_Visitado.jo_nome} QuantidadeMascote={Dados_Visitado.mascotesStatus} />
                            <div className='p-4 '>
                                {Dados_Visitado.PetPrincipal ? (
                                    <CardInfoJogador peso_acumulativo={Dados_Visitado.peso_acumulativo} turma={Dados_Visitado.TurmasUsuario} nome_pet={Dados_Visitado.PetPrincipal.nome_pet} raridade_pet={Dados_Visitado.PetPrincipal.raridade_pet} evolucao={Dados_Visitado.PetPrincipal.evolucao} QuantidadeMascote={Dados_Visitado.mascotesStatus} caminho_pet={Dados_Visitado.PetPrincipal.caminho_pet} img={Dados_Visitado.UsuarioVisitado[0].user_img_caminho} nome={Dados_Visitado.UsuarioVisitado[0].user_nome} rank_usuario={Dados_Visitado.RankJogoAtual} pontos_usuario={Dados_Visitado.PontosUsuario} />) : (<h1>Não carregou</h1>)}

                                <div className='col-12 d-flex flex-column'>

                                    {/* Filtro dos pets */}
                                {Dados_Visitado.pets ? (
                                    // Passar visitante true para desativar funções da tela
                                    <NavBarPets visitante={true} token={token} navigate={navigate} TodosPetsTemporada={Dados_Visitado.pets} ProcurarPets={BuscarVisitado} jo_nome={Dados_Visitado.jo_nome} QuantidadeMascote={Dados_Visitado.mascotesStatus} jo_tema={Dados_Visitado.jo_tema} />

                                ) : (<h1>Nãda</h1>)}
                                </div>
                                <div>

                                </div>

                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default VisitarPerfilJogador;
