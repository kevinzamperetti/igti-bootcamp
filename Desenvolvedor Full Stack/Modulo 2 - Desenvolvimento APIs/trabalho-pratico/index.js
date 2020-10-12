import {
    criarJsonPorEstado,
    getCincoEstadosComMaisCidades,
    getCincoEstadosComMenosCidades,
    listMaioresCidadePorEstado,
    listMenoresCidadePorEstado,
    getCidadeMaiorNome,
    getCidadeMenorNome
} from "./function.js"

init();

async function init() {
    
    await criarJsonPorEstado();

    console.log('\n-> Cinco Estados que possuem MAIS cidades:');
    await getCincoEstadosComMaisCidades();

    console.log('\n-> Cinco Estados que possuem MENOS cidades:');
    await getCincoEstadosComMenosCidades();
    
    console.log('\n-> Lista de Cidades com MAIOR nome para cada estado:');
    await listMaioresCidadePorEstado();

    console.log('\n-> Lista de Cidades com MENOR nome para cada estado:');
    await listMenoresCidadePorEstado();

    console.log('\n-> Cidade com MAIOR nome entre TODOS estados:');
    await getCidadeMaiorNome();

    console.log('\n-> Cidade com MENOR nome entre TODOS estados:');
    await getCidadeMenorNome();

    console.log('\n-> FIM <-');
}

