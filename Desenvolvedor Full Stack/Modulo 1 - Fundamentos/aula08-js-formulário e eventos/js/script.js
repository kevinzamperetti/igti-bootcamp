
window.addEventListener('load', start);

function start() {
  // var input1 = document.querySelector('#input1');
  // input1.value = 'Kevin Zamperetti Schepke';

  input1.addEventListener('keyup', countName)

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit)
}

function countName(event) {
  var count = event.target.value;

  console.log(event);
  var span = document.querySelector('#input1Length');
  span.textContent = 'Total de Caracteres:' + count.length;
}

function preventSubmit(event) {
  event.preventDefault();

  var input1 = document.querySelector('#input1');
  alert(input1.value + '. Cadastrado com Sucesso.')
}