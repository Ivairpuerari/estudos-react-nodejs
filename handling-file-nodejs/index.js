const fs = require("fs");

function readFile(filename) {
  var file = fs.readFileSync(filename);

  return JSON.parse(file);
}

async function init() {
  const states = await readFile("./Estados.json");

  const cities = await readFile("./Cidades.json");

  states.forEach((state) => {
    var citiesToState = cities.filter((city) => city.Estado == state.ID);
    fs.writeFileSync(
      "./" + state.Sigla + ".Json",
      JSON.stringify(citiesToState)
    );
  });
}

init();

function countCitiesToState(state) {
  const cities = readFile(state + ".Json");

  return cities.length;
}

function buildObject(sigla) {
  return { uf: sigla, size: countCitiesToState(sigla) };
}

function topFiveState() {
  const states = readFile("./Estados.json");

  return states
    .map((state) => buildObject(state.Sigla))
    .sort((a, b) => b.size - a.size);
}

function topFiveStateWord() {
  const states = readFile("./Estados.json");

  return states
    .map((state) => buildObjctWord(state.Sigla))
    .sort((a, b) => a.nome.length - b.nome.length);
}

function buildObjctWord(sigla) {
  return { uf: sigla, nome: biggestCityToState(sigla) };
}

function biggestCityToState(sigla) {
  const cities = readFile(sigla + ".Json");

  const top = cities.sort((a, b) => b.Nome.length - a.Nome.length);

  return top[0].Nome;
}

function biggestCityToStateDesc(sigla) {
  const cities = readFile(sigla + ".Json");

  const top = cities.sort((a, b) => a.Nome.length - b.Nome.length);

  return top[0].Nome;
}

function buildObjctWordDesc(sigla) {
  return { uf: sigla, nome: biggestCityToStateDesc(sigla) };
}

function topFiveStateWordDesc() {
  const states = readFile("./Estados.json");

  return states
    .map((state) => buildObjctWordDesc(state.Sigla))
    .sort((a, b) => a.nome.length - b.nome.length);
}

console.log("QUANTIDADES DE CIDADES PARA ESTADO: ");

console.log(countCitiesToState("MT"));

console.log("ESTADOS ORDENADOS POR QUANTIDADES DE CIDADES:");
console.log(topFiveState());

console.log("ESTADOS ORDENADOS POR MAIOR NOME:");
console.log(topFiveStateWord());

console.log("ESTADOS ORDENADOS POR MENOR NOME DE CIDADES:");
console.log(topFiveStateWordDesc());
