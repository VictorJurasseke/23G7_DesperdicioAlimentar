import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import CardPerfil from '../components/TelaPerfil/CardPerfil';
import Header from '../components/TelaHome/Header';
import NavbarPets from '../components/TelaPerfil/NavbarPets';
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import LoadingComponent from '../components/TelaPerfil/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import CardJogos from '../components/TelaPerfil/CardJogos';
import { useImportarDadosJogosEspecifico, formatarData, useImportarDadosJogos } from '../components/TelaDev/TableJogo/FunctionJogos';

const TelaPerfil = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { Dados_usuario } = usePerfilDados(token, navigate); // Pega os dados de usuario do cliente para criar a tela

    // Carrega todos os jogos disponiveis 
    const { TableJogosEspecifico } = useImportarDadosJogosEspecifico(token, navigate);

    console.log("JOGOS DADOS", TableJogosEspecifico);
    console.log("Dados do usuario", Dados_usuario);
    console.log("Tela carregada");

    return (
        <>
            {Dados_usuario ? ( // Verifica se Dados_usuario não é null e se o token está correto
                <>
                    <div className="col-12 d-flex flex-column overflow-hidden text-dark min-vh-100 position-relative z-2">
                        <Header />
                        <div className="col-12 mt-5 text-dark position-relative">
                            <CardPerfil
                                nome={Dados_usuario.user_nome}
                                periodo={Dados_usuario.user_periodo}
                                escola={Dados_usuario.es_nome}
                                img={Dados_usuario.user_img_caminho}
                                token={token}
                                navigate={navigate}
                            />

                            <div className="text-dark position-relative">
                                {/* Se for aluno, ele mostrara os jogos disponiveis para ele participar 1 == aluno, 2 == usuario, 3 == jogador  0 == DEV  */}
                                {Dados_usuario.user_tipo_acesso === 1 && (
                                    <div className="text-center p-3 position-relative" style={{ zIndex: 2 }}>
                                        {TableJogosEspecifico.length === 0 ? (
                                            <>Não há jogos na sua escola</>
                                        ) : (
                                            <>
                                                <p>Veja todos os jogos da sua escola:</p>
                                                <div className="col-12 gap-2 d-flex flex-wrap justify-content-center">
                                                    {TableJogosEspecifico.map((item) => (
                                                        // puxa todos os jogos do banco que estão disponiveis na sua escola
                                                        // Alterar o banco para ler o status do jogo e resultá-lo diferente
                                                        // Exemplo: status = 0 = Não funcionando; status = 1  = Funcionando
                                                        <CardJogos
                                                            key={item.ID_jogos} // Certifique-se de que cada item tenha um identificador único
                                                            jo_datai={formatarData(item.jo_datai)}
                                                            jo_dataf={formatarData(item.jo_dataf)}
                                                            jo_nome={item.jo_nome}
                                                            jo_data_status={item.jo_status}
                                                            ID_jogos={item.ID_jogos}
                                                            ID_usuarios={Dados_usuario.ID_usuarios}
                                                            es_nome={item.es_nome}
                                                            token={token}
                                                            navigate={navigate}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingComponent /> // Mensagem de carregamento enquanto verifica se o usuário está logado
            )}
        </>
    );
};

export default TelaPerfil;
