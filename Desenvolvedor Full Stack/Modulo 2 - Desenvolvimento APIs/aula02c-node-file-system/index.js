// import {fs} from "fs";
import {promises as fs, readFile} from "fs";

//Utilizando promise com asyns e await

// init();
writeReadJson();

async function init() {
    try {
        await fs.writeFile("teste.txt", "teste teste\n");
        await fs.appendFile("teste.txt", "append teste");
        const resp = await fs.readFile("teste.txt", "utf-8");
        console.log(resp);
    } catch (err) {
        console.log(err);
    }
}

async function writeReadJson() {
    try {
        //escrita com valores iniciais
        const arrayCarros = [ "Gol", "Palio", "Uno"];
        const obj = {
            carros: arrayCarros
        }
        await fs.writeFile("teste.json", JSON.stringify(obj));

        //leitura com conteudo atual
        const data = JSON.parse(await fs.readFile("teste.json"));
        console.log(data);
        
        //modificamos o conteudo
        data.carros.push("Sandero");
        console.log(data);
        
        //sobrescrevemos o arquivo com o conteudo modificado
        await fs.writeFile("teste.json", JSON.stringify(data));
        const dataAlterado = JSON.parse(await fs.readFile("teste.json"));
        console.log(dataAlterado);

    } catch (err) {
        console.log(err);
    }
}

//Utilizando promise
// fs.writeFile("teste.txt", "teste teste\n").then(() => {
//     fs.appendFile("teste.txt", "append teste").then(() => {
//         fs.readFile("teste.txt", "utf-8").then(resp => {
//             console.log(resp);
//         });
//     }).catch(err => {
//         console.log(err);
//     });
// });

//Utilizando callbacks (assíncrono)
// console.log("---Assincrono---");
// console.log("1");
// fs.writeFile("teste.txt", "teste teste\n", (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("2");
//         console.log("Arquivo escrito com sucesso.");

//         fs.appendFile("teste.txt", "append texto", (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 fs.readFile("teste.txt", "utf-8", (err, data) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log(data)
//                     }
//                 });
//             }
//         })
//     }
// })
// console.log("3");

//// sincrono
// try {
//     console.log("---Sincrono---");
//     console.log("1");
//     fs.writeFileSync("texte-sincrono.txt", "teste");
//     console.log("2");
//     const data = fs.readFileSync("texte-sincrono.txt", "utf-8");
//     console.log(data);
//     console.log("3");
// } catch(err) {
//     console.log(err);
// }