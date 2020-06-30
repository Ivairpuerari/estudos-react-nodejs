import React from "react";
import { calculo } from "../../Helpers/CalculoJurosComposto";
import {
  formatRendimento,
  formatTaxa,
  formatTotal,
} from "../../Helpers/Formatter";

export default function Installment({ data }) {
  const { mes, valor, juros } = data;

  const { total, rendimento, taxa } = calculo(valor, juros, mes);

  return (
    <div className="col s3">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Parcela {mes} </span>
          <p>{formatTotal(total)}</p>
          <p>{formatRendimento(rendimento)}</p>
          <p>{formatTaxa(taxa)}</p>
        </div>
      </div>
    </div>
  );
}
