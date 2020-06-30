const formatterBRMoney = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatTotal(valor) {
  console.log(valor);
  return formatterBRMoney.format(valor);
}

function formatRendimento(valor) {
  var sinal = valor < 0 ? "-" : "+";

  return sinal + formatTotal(valor);
}

function formatTaxa(valor) {
  if (!valor) return "";

  return valor.toFixed(2).replace(".", ",") + "%";
}

export { formatTotal, formatRendimento, formatTaxa };
