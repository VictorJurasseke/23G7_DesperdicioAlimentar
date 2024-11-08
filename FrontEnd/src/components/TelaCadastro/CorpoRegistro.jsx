// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Turmas from './Turmas';
// import QRcode from './QRcode';
// import CaixaInput from './CaixaInput';
// import SelectUnidade from './SelectUnidade';
// import SelectHorario from './SelectHorario';
// import ErroCaixa from './Erro';
// import { useCadastro } from './FunctionCadastrar';
// import { useVerificarLogin } from '../TelaLogin/FunctionLogin';
// import { useNavigate } from 'react-router-dom';

// const CorpoRegistro = () => {
//   const {
//     errosVisiveis,
//     Form,
//     AtualizarForm,
//     AtivarScan,
//     Cadastrar,
//     showScanner,
//     setShowScanner
//   } = useCadastro();

//   const { Dados_usuario } = useVerificarLogin();
//   const navigate = useNavigate();

//   if (Dados_usuario) {
//     navigate('/user');
//   }
//   return (
//     <div className='d-flex justify-content-center align-items-center min-vh-100 bg-dark position-relative'>
//       <img
//         className='position-absolute w-100 h-100'
//         style={{ filter: 'blur(10px)', objectFit: 'cover' }}
//         src='../../public/img/backg.jpg'
//         alt="Background"
//       />
//       <div className='bg-light p-3 rounded shadow-lg text-dark m-5 z-2' style={{ maxWidth: '60%', width: '100%' }}>
//         <h1 className='text-center text-primary mb-4'>Registro</h1>
//         <form>
//           <CaixaInput name="nome" type="text" value={Form.nome} onChange={AtualizarForm} nomeCaixa="Usuário" />
//           {errosVisiveis.erro_nome && <ErroCaixa name="erro_usuario" texto="Nome já registrado por outro usuário!" />}

//           <CaixaInput name="email" type="email" value={Form.email} onChange={AtualizarForm} nomeCaixa="Email" />
//           {errosVisiveis.erro_email && <ErroCaixa name="erro_email" texto="Email inválido ou registrado por outro usuário!" />}

//           <CaixaInput name="senha" type="password" value={Form.senha} onChange={AtualizarForm} nomeCaixa="Senha" />
//           {errosVisiveis.erro_senha && <ErroCaixa name="erro_senha" texto="Senha menor que 8 caracteres!" />}

//           <CaixaInput name="confirmar_senha" type="password" value={Form.confirmar_senha} onChange={AtualizarForm} nomeCaixa="Confirmar Senha" />
//           {errosVisiveis.erro_confirmar_senha && <ErroCaixa name="erro_confirmar_senha" texto="As senhas não se coincidem" />}

//           <SelectHorario name="periodo" value={Form.periodo} onChange={AtualizarForm} />
//           <SelectUnidade name="unidade" value={Form.unidade} onChange={AtualizarForm} />
//           <Turmas name="turma" value={Form.turma} onChange={AtualizarForm} />

{/* <QRcode name="qrcode" value={Form.qrcode} onChange={AtualizarForm} showScanner={showScanner} setShowScanner={setShowScanner} />
{errosVisiveis.erro_qr && <ErroCaixa name="erro_qrcode" texto="QRCODE inválido ou já registrado!" />} */}

//           <div className="d-grid gap-2">
//             <button type="button" className="btn btn-warning text-white" onClick={AtivarScan}>Scan</button>
//             <button type="button" className="btn btn-success" onClick={Cadastrar}>Registrar</button>
//             <a type="button" className="btn btn-primary" href="/login">Já possuo</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CorpoRegistro;
