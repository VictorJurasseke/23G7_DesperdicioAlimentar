import React, { useState, useRef, useEffect } from 'react';


const CaixaInput = ({ nomeCaixa, name, value, onChange, type }) => {

    return (
        <>
            <div className="mb-0">
                <label htmlFor={name} className="form-label m-0">{nomeCaixa}</label>
                <input
                    required
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    type={type}
                    
                />


            </div>


        </>
    );
};

export default CaixaInput;
