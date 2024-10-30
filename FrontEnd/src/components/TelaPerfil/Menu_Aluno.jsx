import React, {useEffect} from 'react';
import { useImportarDadosJogosEspecifico, formatarData } from '../TelaDev/TableJogo/FunctionJogos';
import 'bootstrap/dist/css/bootstrap.min.css';



const Menu_Aluno = (Dados_usuario, token, navigate) => {


    const {TableJogosEspecifico, BuscarJogosEspecifico} = useImportarDadosJogosEspecifico(token, navigate, 5) // puxa todos os jogos da unidade 5
   

    useEffect(() => {
        if (Dados_usuario.user_tipo_acesso === 1) {
            BuscarJogosEspecifico();
        }
    }, [Dados_usuario.user_tipo_acesso]);


    return (
        <>
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





        </>


    );
};

export default Menu_Aluno;
