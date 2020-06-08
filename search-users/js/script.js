let inputUser = document.querySelector("#buscar");
let divOutput = document.querySelector("#output");
let divSummaries = document.querySelector("#summaries");
let btnBuscar = document.querySelector("#btnBuscar");
let users = [];

const noHaveUserHTML = `<div>
    <h5>
        Nenhum usuário filtrado
    </h5>
  </div>`;

const noHaveSummHTML = `<div>
     <h5>
         Nada a ser exibido
     </h5>
   </div>`;

let usersHTML = noHaveUserHTML;
let summHTML = noHaveSummHTML;

async function getData() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();

  users = json.results.map((data) => {
    return {
      name: data.name.first + " " + data.name.last,
      picture: data.picture.thumbnail,
      age: data.dob.age,
      gender: data.gender,
    };
  });
}

window.addEventListener("load", () => {
  inputUser.textContent = "";
  btnBuscar.disabled = true;
  renderHTML();
  getData();
  listenInput();
  listenBtn();
});

function listenBtn() {
  btnBuscar.addEventListener("click", () => {
    analyseText(inputUser.value.toLowerCase());
  });
}

function listenInput() {
  inputUser.addEventListener("keyup", (e) => {
    console.log(e.target.value.trim().length > 0);
    if (e.target.value.trim().length <= 0) {
      usersHTML = noHaveUserHTML;
      summHTML = noHaveSummHTML;
      btnBuscar.disabled = true;
      renderHTML();
      return;
    }
    btnBuscar.disabled = false;
    analyseText(e.target.value.toLowerCase());
  });
}

function analyseText(e) {
  const userFilter = filterUsers(e.toLowerCase());
  formatHTML(userFilter);
}

function notHasUsers(userFilter) {
  return userFilter === 0;
}

function formatHTML(usersFilter) {
  if (notHasUsers(usersFilter)) {
    usersHTML = noHaveUserHTML;
    summHTML = noHaveSummHTML;
    return;
  }

  formatHTMLUsers(usersFilter);

  formatHTMLSummaries(usersFilter);

  renderHTML();
}

function formatHTMLSummaries(usersFilter) {
  summHTML = "";

  const genderMasc = usersFilter.filter((user) => user.gender === "male")
    .length;

  const genderFem = usersFilter.filter((user) => user.gender === "female")
    .length;

  const sumAges = usersFilter.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);

  const mediaAges = (sumAges / usersFilter.length).toPrecision(4);

  //console.log(genderMasc);
  //console.log(genderFem);
  //console.log(sumAges);
  //console.log(mediaAges);

  const summariesHTML = `<div>
  <ul>
  <li> Sexo masculino: ${genderMasc} </li>
  <li> Sexo Feminino: ${genderFem} </li>
  <li> Soma das idades: ${sumAges} </li>
  <li> Média das idades: ${mediaAges} </li>
  </ul>
  </div>`;

  summHTML = summariesHTML;
}

function formatHTMLUsers(usersFilter) {
  usersHTML = `<div>
  <h3>${usersFilter.length} usuários encontrados</h3></div>`;
  console.log(usersFilter);
  usersFilter.forEach((data) => {
    const userHTML = `<div>
          <ul>
          <li><img src="${data.picture}">  ${data.name}, ${data.age} anos</li>
          </ul>
          </div>`;

    usersHTML += userHTML;
  });
}

function renderHTML() {
  divSummaries.innerHTML = summHTML;
  divOutput.innerHTML = usersHTML;
}

function filterUsers(name) {
  return users
    .filter((user) => {
      if (user.name.toLowerCase() === name) {
        return user.name;
      }
      if (user.name.toLowerCase().indexOf(name) !== -1) {
        return user.name;
      }
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}
