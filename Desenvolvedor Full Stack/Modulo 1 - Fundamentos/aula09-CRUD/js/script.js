
window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var globalInputName = null;
var isEditing = false;
var globalCurrentIndex = null;

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

  function updateName(name) {
    globalNames[globalCurrentIndex] = name;
  }

  function handleTyping(event) {

    var hasText = !!event.target.value &&  event.target.value.trim() !== '';
    if (!hasText) {
      clearInput;
      return;
    }

    if (event.key === 'Enter' &&) {
      if (isEditing) {
        updateName(event.target.value);
        // render();
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }

  globalInputName.addEventListener('keyup', handleTyping)
  globalInputName.focus();
}

function render(){
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      // render();
    }

    var button = document.createElement('button');
    button.classList.add('delete-button');
    button.textContent = 'X';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      globalInputName.value = name;
      globalInputName.focus();
      isEditing = true;
      globalCurrentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem)
    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for(var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
  // render();
}

function clearInput() {
  globalInputName.value = '';
  globalInputName.focus();
  // render();  
}