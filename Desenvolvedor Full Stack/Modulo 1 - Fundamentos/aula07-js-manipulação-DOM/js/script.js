var input1 = document.querySelector('#input1');
input1.textContent = 'Nome: ';

var city= document.querySelector('#city');
city.textContent = 'Porto Alegre - RS';

var data = document.querySelectorAll('.data');
data = Array.from(data);

for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.classList.add('emphasis');
}