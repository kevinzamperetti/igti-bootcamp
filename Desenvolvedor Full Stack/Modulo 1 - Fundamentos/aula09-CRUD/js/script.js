
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
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    var button = document.createElement('button');
    button.classList.add('delete-button');
    button.textContent = 'X';

    button.addEventListener('click', deleteName);

    return button;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for(var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = currentName;

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  globalInputName.value = '';
  globalInputName.focus();
}