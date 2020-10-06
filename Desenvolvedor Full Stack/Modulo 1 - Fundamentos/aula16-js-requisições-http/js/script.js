window.addEventListener('load', () => {
    console.log('Antes da Promise');
    
    doFetch();
    doFetchAsync();

    console.log('Depois da Promise');
    
    // console.log(divisionPromise(12, 6));  //retorna uma promise
    divisionPromise(12, 6).then(result => console.log(result));

    execueDivisionPromise();
    execueDivisionPromiseAsync();
});

function showData(data) {
    const user = document.querySelector("#user");
    user.textContent = 'Usuári do GitHub: ' + data.login + '. Natural de ' + data.location;
}

function doFetch() {
    fetch('https://api.github.com/users/kevinzamperetti')
    .then(res => res.json().then(data => showData(data)))
    .catch(error => console.log('Erro na Requisição: ' + error));
}

async function doFetchAsync() {
    const res = await fetch('https://api.github.com/users/kevinzamperetti');
    const data = await res.json();
    console.log(data);
}


function divisionPromise(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject('Não é possível dividir por 0.');
        }
        resolve(a / b);
    })
}

function execueDivisionPromise() {
    divisionPromise(12, 0)
    .then(result => console.log(result))
    .catch(errorMessage => console.log('Falha na divisão. ' + errorMessage));
}

async function execueDivisionPromiseAsync() {
    const division = await divisionPromise(12, 2);
    console.log(division);
    
}