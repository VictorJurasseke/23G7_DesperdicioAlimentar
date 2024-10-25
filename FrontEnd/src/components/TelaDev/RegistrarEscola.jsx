import React, { useState, useEffect } from 'react';
import CaixaInput from '../../components/TelaCadastro/CaixaInput';



const RegistrarEscola = () => {


    const [FormEscola, setFormescola] = useState({
        escola: "SESI-138",
    });

    useEffect(() => {
        console.log(FormEscola); // Imprime o estado atualizado sempre que ele muda
    }, [FormEscola]);

    // Altera o formulário mantendo as informações antigas
    const AtualizarForm = (e) => {
        const { name, value } = e.target;
        setFormescola(valorAntigo => ({
            ...valorAntigo,
            [name]: value
        }));
    };

    return (
        <>
            <h1 className='text-center text-dark'>Registrar Escola</h1>
            <form > {/* Adiciona onSubmit para o formulário */}
                <CaixaInput
                    name={"email"}
                    type={"email"}
                    value={FormEscola.escola}
                    onChange={AtualizarForm}
                    nomeCaixa={"Escola"}
                />

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-success col-12 text-light">Registrar Unidade</button> {/* Usa type="submit" */}
                <a href='/register' className="btn btn-primary col-12 mt-2">Escolas Já cadastradas</a>
            </form>
        </>
    );
};

export default RegistrarEscola;
