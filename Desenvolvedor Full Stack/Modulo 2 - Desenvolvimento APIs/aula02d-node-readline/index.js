import { promises } from "fs";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

pergunta();

function pergunta(params) {
    rl.question("Digite um número (ou digite '" + "q" + "' para sair): ", numero => {
    
    if (numero === "q") {
        rl.close();
    } else {
        const multiplos = [];
        for (let index = 0; index < numero; index++) {
            if(index % 3 === 0 || index % 5 === 0) {
                multiplos.push(index)
            }
        }
        console.log(multiplos);
    
            pergunta();
        }
    });
}

//Pare na Aula 1.6.5. Módulos do Nodejs - Events