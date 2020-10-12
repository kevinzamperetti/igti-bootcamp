const nome = "Teste de exportação de módulo";

function soma(a, b) {
    return a + b;
}

function subtracao(a, b) {
    return a - b;
}

export default { soma, subtracao, nome}