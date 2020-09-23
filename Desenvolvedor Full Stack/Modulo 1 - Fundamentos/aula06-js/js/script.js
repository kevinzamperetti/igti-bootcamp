console.log("Olá, mundo.!");

var title = document.querySelector('h1');
title.textContent = 'Modificado por Kevin Zamperetti Schepke';

// Comentário de linha

/* 
   Comentário de Bloco
*/

// Feito no Console do Chrome

var a = 5;
var b = 4;

if ( a > b) {
  console.log(a + ' é maior que ' + b);
} else {
  if (a < b) {
    console.log(a + ' é menor que ' + b);
  } else {
    console.log(a + ' é igual a ' + b);
  }
}

// Operador ternário

a = 6;
b = 7;

var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
console.log(resposta);

// Switch
var dia = 1, r = '';

switch (dia) {
  case 1: r = 'Domingo'; break;
  case 2: r = 'Segunda'; break;
  case 3: r = 'Terça'; break;
  case 4: r = 'Quarta'; break;
  case 5: r = 'Quinta'; break;
  case 6: r = 'Sexta'; break;
  case 7: r = 'Sábado'; break;
  default: r = 'Dia inválido'; break;
}

console.log('O dia da semana é: ' + r);

// // Somatório com While

var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log('O total do somatório é: ' + somatorio);

// Somatório com Do While

numeroAtual = 1;
somatorio = 0;

do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log('O total do somatório é: ' + somatorio);

somatorio = 0;

// For
for (numeroAtual = 1; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}
console.log('O total do somatório é: ' + somatorio);

