import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';





const QRcode = ({ showScanner, setShowScanner, name, onChange }) => {



  const videoRef = useRef(null); // Referência para o elemento de vídeo
  const [scanResult, setScanResult] = useState(''); // Resultado do escaneamento

  useEffect(() => {
    onChange({ target: { name, value: scanResult } });
  }, [scanResult])


  useEffect(() => {
    let qrScanner;
    if (showScanner && videoRef.current) {
      qrScanner = new QrScanner(videoRef.current, (result) => {
        setScanResult(result); // `result.data` é geralmente uma string 
        console.log(scanResult)
        setShowScanner(false); // Oculta o scanner após sucesso
        qrScanner.stop(); // Para o scanner
      });

      qrScanner.start().catch((error) => {
        console.error('Falha ao iniciar o scanner:', error);
      });
    }

    // Cleanup function
    return () => {
      if (qrScanner) {
        qrScanner.stop();
      }
    };
  }, [showScanner]);





  return (
    <>
      <div className="">
        <p className='m-0'>QRCODE</p>
        <input
          placeholder="QRCODE:"
          name={name}
          value={scanResult}
          readOnly // Tornar o campo apenas leitura
          id="qrcode_registrar"
          className="form-control form-control-sm"
        />
      </div>
      {showScanner && (
        <div className="scanner-overlay mt-3 ">
          <div className='col-12 text-end'>
            <a
              className='text-center'
              onClick={() => setShowScanner(false)}
            >
              Fechar
            </a>
          </div>
          <video ref={videoRef} style={{ width: '100%' }}></video>
        </div>
      )}



    </>
  );
};

export default QRcode;

