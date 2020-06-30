import React from "react";
import Installment from "./Installment";

export default function Installments({ data }) {
  console.log(data);
  const { valor, taxa, quantidade } = data;

  const array = Array.from({ length: quantidade }, (v, i) => i);

  console.log(valor, taxa, quantidade);

  return array.map((mes) => (
    <Installment
      data={{
        mes: mes + 1,
        valor: valor,
        juros: taxa,
      }}
    ></Installment>
  ));
}
