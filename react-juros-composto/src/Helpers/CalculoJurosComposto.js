function calculo(valor, juros, parcelas) {
  const total = Number(valor) * Math.pow(1 + Number(juros / 100), parcelas);

  const rendimento = total - valor;

  const taxa = (rendimento * 100) / valor;

  return {
    total,
    rendimento,
    taxa,
  };
}

export { calculo };
