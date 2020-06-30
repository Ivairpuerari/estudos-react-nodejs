import React, { useState } from "react";
import Installments from "../Installment/Installments";
import css from "./form.module.css";

export default function Form() {
  const [montante, setMontante] = useState(100);
  const [juros, setJuros] = useState(0.01);
  const [parcelas, setParcelas] = useState(1);

  const handleChangeMontante = (valor) => {
    setMontante(valor.target.value);
    console.log("montante:" + valor.target.value);
    return;
  };

  const handleChangeJuros = (valor) => {
    setJuros(valor.target.value);
    console.log("juros:" + valor.target.value);
    return;
  };

  const handleChangeParcelas = (valor) => {
    setParcelas(valor.target.value);
    console.log("parcelas:" + valor.target.value);
    return;
  };

  return (
    <div>
      <div className={css.flexRow}>
        <h2>React - Juros Composto</h2>
      </div>
      <div className="row">
        <div className="input-field col s4">
          <label className="active" htmlFor="inputMontante">
            Montante inicial:
          </label>
          <input
            autoFocus
            id="inputMontante"
            type="Number"
            onChange={handleChangeMontante}
            min="100"
            step="100"
          />
        </div>
        <div className="input-field col s4">
          <label className="active" htmlFor="inputJuro">
            Taxas de juros mensal:
          </label>
          <input
            id="inputJuro"
            type="Number"
            onChange={handleChangeJuros}
            min="-12"
            step="0.01"
          />
        </div>
        <div className="input-field col s4">
          <label className="active" htmlFor="inputParcela">
            Período (meses):
          </label>
          <input
            id="inputParcela"
            type="Number"
            onChange={handleChangeParcelas}
            min="1"
            step="1"
          />
        </div>
      </div>
      <div className="row">
        <Installments
          data={{
            valor: montante,
            taxa: juros,
            quantidade: parcelas,
          }}
        />
      </div>
    </div>
  );
}
