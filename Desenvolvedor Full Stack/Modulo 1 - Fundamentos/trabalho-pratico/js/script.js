var inputRed = null;
var inputGreen = null;
var inputBlue = null;
var color = null;

var valueRed = 0;
var valueGreen = 0;
var valueBlue = 0;

window.addEventListener('load', start);

function start() {
  inputRed = document.querySelector('#inputRed');
  inputGreen = document.querySelector('#inputGreen');
  inputBlue = document.querySelector('#inputBlue');
  color = document.querySelector('#color');
  
  inputRed.addEventListener('input', printValueRed);
  inputGreen.addEventListener('input', printValueGreen);
  inputBlue.addEventListener('input', printValueBlue);

}

function printValueRed(event) {
  valueRed = document.querySelector('#valueRed').value = event.target.value;;
  color.style.backgroundColor = `rgb(${valueRed},${valueGreen},${valueBlue})`;
}

function printValueGreen(event) {
  valueGreen = document.querySelector('#valueGreen').value = event.target.value;;
  color.style.backgroundColor = `rgb(${valueRed},${valueGreen},${valueBlue})`;
}

function printValueBlue(event) {
  valueBlue = document.querySelector('#valueBlue').value = event.target.value;;
  color.style.backgroundColor = `rgb(${valueRed},${valueGreen},${valueBlue})`;
}

