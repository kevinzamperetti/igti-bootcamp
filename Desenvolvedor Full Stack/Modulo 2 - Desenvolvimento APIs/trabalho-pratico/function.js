import fs, { promises as fsp } from 'fs';

/*
1. Criar uma função que irá criar um arquivo JSON para cada estado representado no
arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a
aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser
o UF do estado, por exemplo: MG.json.
*/
export async function criarJsonPorEstado() {

    let dados = await fsp.readFile("./data/Estados.json");
    const estados = JSON.parse(dados);

    dados = await fsp.readFile("./data/Cidades.json");
    const cidades = JSON.parse(dados);

    estados.forEach(estado => {
        const file = `./data/generated/${estado.Sigla}.json`;
        const cidadesEstado = cidades.filter(cidade => cidade.Estado === estado.ID);
        fsp.writeFile(file, JSON.stringify(cidadesEstado));
    });

}

/*
2. Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
*/
export async function getTotalCidadesPorEstado(uf) {
    const file = `./data/generated/${uf}.json`;
    const dados = await fsp.readFile(file);
    const cidades = JSON.parse(dados);
    return cidades.length;
}

/*
3. Criar um método que imprima no console um array com o UF dos cinco estados
que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
“UF - 74”, “UF - 72”, “UF - 65”]
*/
export async function getCincoEstadosComMaisCidades() {
    const file = `./data/Estados.json`;
    const dados = await fsp.readFile(file);
    const estados = JSON.parse(dados);

    const list = [];
    for (const estado of estados) {
        const total = await getTotalCidadesPorEstado(estado.Sigla);
        list.push({
            UF: estado.Sigla,
            TotalCidades: total
        });        
    }
    list.sort((a, b) => b.TotalCidades - a.TotalCidades);
    
    const result = [];
    list.slice(0,5).forEach(item => result.push(item.UF + " - " + item.TotalCidades));

    console.log(result);
}

/*
4. Criar um método que imprima no console um array com o UF dos cinco estados
que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF
- 27”, “UF - 25”, “UF - 23”, “UF - 21”]
*/
export async function getCincoEstadosComMenosCidades() {
    const file = `./data/Estados.json`;
    const dados = await fsp.readFile(file);
    const estados = JSON.parse(dados);

    const list = [];
    for (const estado of estados) {
        const total = await getTotalCidadesPorEstado(estado.Sigla);
        list.push({
            UF: estado.Sigla,
            TotalCidades: total
        });        
    }
    list.sort((a, b) => b.TotalCidades - a.TotalCidades);
    
    const result = [];
    list.slice(-5).forEach(item => result.push(item.UF + " - " + item.TotalCidades));

    console.log(result);
}

/*
5. Criar um método que imprima no console um array com a cidade de maior nome de
cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
Cidade – UF”, ...].
*/
export async function listMaioresCidadePorEstado() {
    const file = `./data/Estados.json`;
    const estados = JSON.parse(await fsp.readFile(file));

    const arrayResult = [];
    for(const estado of estados) {
        const maiorCidade = await getMaiorCidadePorEstado(estado.Sigla);
        arrayResult.push(maiorCidade.Nome + " - " + estado.Sigla);
    }
    console.log(arrayResult);
}

async function getMaiorCidadePorEstado(uf) {
    const file = `./data/generated/${uf}.json`;
    const dados = await fsp.readFile(file);
    const cidades = JSON.parse(dados);

    let result;
    cidades.forEach(cidade => {
        if (!result) {
            result = cidade;
        } else if (cidade.Nome.length > result.Nome.length) {
            result = cidade;
        } else if ((cidade.Nome.length === result.Nome.length) &&
                    (cidade.Nome.toLowerCase() < result.Nome.toLowerCase())) { //já ordena em ordem alfabética
            result = cidade
        }
    })
    return result;
}

/*
6. Criar um método que imprima no console um array com a cidade de menor nome
de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome
da Cidade – UF”, ...].
*/
export async function listMenoresCidadePorEstado() {
    const file = `./data/Estados.json`;
    const estados = JSON.parse(await fsp.readFile(file));

    const arrayResult = [];
    for(const estado of estados) {
        const maiorCidade = await getMenorCidadePorEstado(estado.Sigla);
        arrayResult.push(maiorCidade.Nome + " - " + estado.Sigla);
    }
    console.log(arrayResult);
}

async function getMenorCidadePorEstado(uf) {
    const file = `./data/generated/${uf}.json`;
    const dados = await fsp.readFile(file);
    const cidades = JSON.parse(dados);

    let result;
    cidades.forEach(cidade => {
        if (!result) {
            result = cidade;
        } else if (cidade.Nome.length < result.Nome.length) {
            result = cidade;
        } else if ((cidade.Nome.length === result.Nome.length) &&
                    (cidade.Nome.toLowerCase() < result.Nome.toLowerCase())) { //já ordena em ordem alfabética
            result = cidade
        }
    })
    return result;
}

/*
7. Criar um método que imprima no console a cidade de maior nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
*/
export async function getCidadeMaiorNome() {
    const file = `./data/Estados.json`;
    const estados = JSON.parse(await fsp.readFile(file));

    let result;
    const listCidades = [];

    //Sem reduce
    // for (const estado of estados) {
    //     const maiorCidade = await getMaiorCidadePorEstado(estado.Sigla);
    //     listCidades.push({
    //         Nome: maiorCidade.Nome,
    //         UF: estado.Sigla
    //     });
    // }
    
    // for (const cidade of listCidades) {
    //     if (!result) {
    //         result = cidade;
    //     } else if (cidade.Nome.length > result.Nome.length) {
    //         result = cidade;
    //     } else if (cidade.Nome.length === result.Nome.length) {
    //         if (cidade.Nome.toLowerCase() < result.Nome.toLowerCase()) {
    //             result = cidade
    //         } else {
    //             result = result
    //         }
    //     }
    // }
    // return result;

    //Utilizando reduce
    for (const estado of estados) {
        const maiorCidade = await getMaiorCidadePorEstado(estado.Sigla);
        listCidades.push({
            Nome: maiorCidade.Nome,
            UF: estado.Sigla
        });
    }
    result = listCidades.reduce((prev, curr) => {
        if (prev.Nome.length > curr.Nome.length) {
            return prev;
        } else if (prev.Nome.length < curr.Nome.length) {
            return curr;
        } else {
            return prev.Nome.toLowerCase() < curr.Nome.toLowerCase() ? prev : curr;
        } 
    })
    console.log(result.Nome + " - " + result.UF);
}

/*
8. Criar um método que imprima no console a cidade de menor nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
*/
export async function getCidadeMenorNome() {
    const file = `./data/Estados.json`;
    const estados = JSON.parse(await fsp.readFile(file));

    let result;
    const listCidades = [];

    for (const estado of estados) {
        const maiorCidade = await getMenorCidadePorEstado(estado.Sigla);
        listCidades.push({
            Nome: maiorCidade.Nome,
            UF: estado.Sigla
        });
    }
    result = listCidades.reduce((prev, curr) => {
        if (prev.Nome.length < curr.Nome.length) {
            return prev;
        } else if (prev.Nome.length > curr.Nome.length) {
            return curr;
        } else {
            return prev.Nome.toLowerCase() < curr.Nome.toLowerCase() ? prev : curr;  //comparação de ordem alfabética
        } 
    })
    console.log(result.Nome + " - " + result.UF);
}