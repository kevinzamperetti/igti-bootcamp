
window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var globalInputName = null;

function start() {
  globalInputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateinput();
  render();

}

function preventFormSubmit() {
  //para o form não atualizar ao dar enter no input
  function handleFormSubmit(event) {
    event.preventDefault();
    render();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit)
}

function activateinput() {
  function insertName(name) {
    globalNames.push(name);
  }

  function handleTyping(event) {
    if (event.key === 'Enter') {
      insertName(event.target.value);
    }
  }

  globalInputName.addEventListener('keyup', handleTyping)
  globalInputName.focus();
}

function render(){
  var divNames = document.querySelector('#names');
  var ul = document.createElement('ul');
  for(var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    li.textContent = currentName;
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
}

//Parei na aula 9.2