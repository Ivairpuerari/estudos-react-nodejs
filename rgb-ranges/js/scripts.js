var inputRed,
  inputGreen,
  inputBlue = 0;

function updateView() {
  const rgb = `rgb(${inputRed.value}, ${inputGreen.value}, ${inputBlue.value})`;

  const view = document.querySelector(".output");

  console.log(rgb);

  view.style.backgroundColor = rgb;
}

function redValue() {
  inputRed = document.querySelector("#red-value");
  inputRed.value = 0;

  range = document.querySelector("#red");
  range.value = 0;

  range.addEventListener("input", function (e) {
    inputRed.value = event.target.value;
    updateView();
  });
}

function greenValue() {
  inputGreen = document.querySelector("#green-value");
  inputGreen.value = 0;

  range = document.querySelector("#green");
  range.value = 0;

  range.addEventListener("input", function (e) {
    inputGreen.value = event.target.value;
    updateView();
  });
}

function blueValue() {
  inputBlue = document.querySelector("#blue-value");
  inputBlue.value = 0;

  range = document.querySelector("#blue");
  range.value = 0;

  range.addEventListener("input", function (e) {
    inputBlue.value = event.target.value;
    updateView();
  });
}

function init(e) {
  redValue();
  greenValue();
  blueValue();
  updateView();
}

window.addEventListener("load", init);
