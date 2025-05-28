import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



//Imagens perfil - 
import Loira1 from '../../../public/img/Perfilmagem/Loira1.png';
import Morena1 from '../../../public/img/Perfilmagem/Morena1.png';
import Morena2 from '../../../public/img/Perfilmagem/Morena2.png';
import Morena3 from '../../../public/img/Perfilmagem/Morena3.png';
import Morena4 from '../../../public/img/Perfilmagem/Morena4.png';
import Rosa1 from '../../../public/img/Perfilmagem/Rosa1.png';
import Ruiva1 from '../../../public/img/Perfilmagem/Ruiva1.png';

import Azul2 from '../../../public/img/Perfilmagem/Azul2.png';
import Azul3 from '../../../public/img/Perfilmagem/Azul3.png';
import Azul4 from '../../../public/img/Perfilmagem/Azul4.png';
import Moicano1 from '../../../public/img/Perfilmagem/Moicano1.png';
import Branco1 from '../../../public/img/Perfilmagem/Branco1.png';
import Moreno1 from '../../../public/img/Perfilmagem/Moreno1.png';
import Nerd1 from '../../../public/img/Perfilmagem/Nerd1.png';
import Nerd2 from '../../../public/img/Perfilmagem/Nerd2.png';




// Componentes
import CaixaInput from '../TelaCadastro/CaixaInput';
import ErroCaixa from '../TelaCadastro/Erro';
import { useCadastro } from '../TelaCadastro/FunctionCadastrar';
import QRcode from '../TelaCadastro/QRcode';

const Menu_Aluno = ({ Dados_usuario, token, navigate }) => {
    const {
        errosVisiveis,
        showScanner,
        FormValidar,
        setShowScanner,
        AtualizarFormValidar,
        AtivarScan,
        Cadastrar,
    } = useCadastro(token, navigate);

    const [ImagemSelecionada, setImagem] = useState(null); // Estado para armazenar a imagem selecionada
    const [CaminhoBanco, setCaminhoBanco] = useState(FormValidar.Caminho_Banco)
    
    // Lista de imagens
    const Imagens = [
        { original: Loira1, caminho_banco: "Loira1.png" },
        { original: Morena1, caminho_banco: "Morena1.png" },
        { original: Morena2, caminho_banco: "Morena2.png" },
        { original: Morena3, caminho_banco: "Morena3.png" },
        { original: Morena4, caminho_banco: "Morena4.png" },
        { original: Rosa1, caminho_banco: "Rosa1.png" },
        { original: Ruiva1, caminho_banco: "Ruiva1.png" },
        { original: Azul2, caminho_banco: "Azul2.png" },
        { original: Azul3, caminho_banco: "Azul3.png" },
        { original: Azul4, caminho_banco: "Azul4.png" },
        { original: Moicano1, caminho_banco: "Moicano1.png" },
        { original: Branco1, caminho_banco: "Branco1.png" },
        { original: Moreno1, caminho_banco: "Moreno1.png" },
        { original: Nerd1, caminho_banco: "Nerd1.png" },
        { original: Nerd2, caminho_banco: "Nerd2.png" },
    ];
    
    const MudarImagemSelecionada = (i) => {
        setImagem(Imagens[i].original); // Atualiza a imagem selecionada
        setCaminhoBanco(Imagens[i].caminho_banco)
        AtualizarFormValidar({
            target: { name: 'Caminho_Banco', value: Imagens[i].caminho_banco },
        }); // Atualiza o estado com o novo caminho
    };

    useEffect(() => {
        console.log(ImagemSelecionada);
        console.log(CaminhoBanco);
        console.log(FormValidar)
    }, [ImagemSelecionada]);

    return (
        <>
            <div className="col-12 d-flex justify-content-center mt-5">
                <form className="col-4 border d-flex flex-column p-3 rounded">
                    <h3 className="text-center fw-bold">VALIDAR:</h3>

                    {/* Seletor de Imagens em formato de bolinhas */}
                    <div className="mt-4 text-center d-flex align-items-center flex-column">
                        <h4>Imagem de perfil:</h4>
                        <div className="d-flex gap-3 flex-wrap">
                            {Imagens.map((imagem, index) => (
                                <div
                                    key={index}
                                    className="image-circle-selector"
                                    onClick={() => MudarImagemSelecionada(index)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '2px solid #ccc',
                                        cursor: 'pointer',
                                        boxShadow: ImagemSelecionada === imagem.original ? '0 0 10px 2px rgba(0, 0, 0, 0.2)' : 'none',
                                        border: ImagemSelecionada === imagem.original ? '3px solid #D84B4B' : 'none', // Adiciona a borda na imagem selecionada
                                        transform: ImagemSelecionada == imagem.original ? 'scale(1.3)' : 'none',
                                        transition: 'transform 0.3s ease, border 0.3s ease' // Adiciona transição suave

                                    }}
                                >
                                    <img
                                        src={imagem.original}
                                        alt={`Imagem ${index}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {errosVisiveis.erro_qr && (
                        <ErroCaixa chave={1} name="erro_qrcode" texto="QRcode Invalido!" />
                    )}

                    <CaixaInput
                        nomeCaixa={"Nova senha:"}
                        name={"NovaSenha"}
                        type={"password"}
                        value={FormValidar.NovaSenha}
                        onChange={AtualizarFormValidar}
                    />
                    {errosVisiveis.erro_senha && (
                        <ErroCaixa chave={2} texto="A senha precisa ter 8 caractéres!" />
                    )}

                    <CaixaInput
                        nomeCaixa={"Confirmar nova senha:"}
                        name={"ConfirmarNovaSenha"}
                        type={"password"}
                        value={FormValidar.ConfirmarNovaSenha}
                        onChange={AtualizarFormValidar}
                    />
                    {errosVisiveis.erro_confirmar_senha && (
                        <ErroCaixa chave={3} texto="As senhas precisam ser iguais!" />
                    )}

                    <QRcode
                        name="QRcode"
                        value={FormValidar.QRcode}   // FormValidar.QRcode
                        onChange={AtualizarFormValidar}
                        showScanner={showScanner}
                        setShowScanner={setShowScanner}
                    />
                    {errosVisiveis.Campo && (
                        <ErroCaixa chave={4} name="erro_campo" texto="É necessário preencher todos os campos" />
                    )}

                    <div className="gap-2 d-flex flex-column mt-5">
                        <button type="button" className="btn btn-warning text-white" onClick={AtivarScan}>
                            Scan
                        </button>
                        <a onClick={Cadastrar} name={"QRcode"} className="btn btn-primary">
                            Submit
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Menu_Aluno;
