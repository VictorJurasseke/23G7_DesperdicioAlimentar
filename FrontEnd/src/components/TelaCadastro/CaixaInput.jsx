import React, { useState, useRef, useEffect } from 'react';


const CaixaInput = ({ nomeCaixa, name, value, onChange, type }) => {

    return (
        <>
            <div className="m-2">
                <label htmlFor={name} className="form-label m-0">{nomeCaixa}</label>
                <input
                    required
                    id={name}
                    name={name}
                    onChange={onChange}
                    value={value}
                    className="form-control form-control-sm"
                    type={type}
                    autoComplete={type}
                />


            </div>


        </>
    );
};

export default CaixaInput;
