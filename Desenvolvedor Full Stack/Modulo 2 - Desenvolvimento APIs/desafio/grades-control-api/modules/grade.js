import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

export const writeGrades = async (data) => {
    writeFile(global.fileName, JSON.stringify(data, null, 2));
}

export const readGrades = async () => {
    return JSON.parse(await readFile(global.fileName));
}

// 1. Crie um endpoint para criar uma grade. Este endpoint deverá receber como parâmetros
// os campos student, subject, type e value conforme descritos acima. Esta grade deverá ser
// salva no arquivo json grades.json, e deverá ter um id único associado. No campo
// timestamp deverá ser salvo a data e hora do momento da inserção. O endpoint deverá
// retornar o objeto da grade que foi criada. A API deverá garantir o incremento automático
// deste identificador, de forma que ele não se repita entre os registros. Dentro do arquivo
// grades.json que foi fornecido para utilização no desafio o campo nextId já está com um
// valor definido. Após a inserção é preciso que esse nextId seja incrementado e salvo no
// próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.

export const saveGrade = async (req, res, next) => {
    try {
        let grade = req.body;

        if (!grade.student || !grade.subject || !grade.type || !grade.value == null) {
            throw new Error("Student, Subject, Type e Value são obrigatórios.");
        }

        const data = await readGrades();
        
        grade = { 
            id: data.nextId,
            student: grade.student,
            subject: grade.subject,
            type: grade.type,
            value: grade.value,
            timestamp: new Date()
        }
        data.nextId++;

        data.grades.push(grade);
        await writeGrades(data);

        res.send(grade);
        global.logger.info(`POST /grade - ${JSON.stringify(grade)}`);
    } catch (err) {
        next(err);
    }
};

// 2. Crie um endpoint para atualizar uma grade. Este endpoint deverá receber como
// parâmetros o id da grade a ser alterada e os campos student, subject, type e value. O
// endpoint deverá validar se a grade informada existe, caso não exista deverá retornar um
// erro. Caso exista, o endpoint deverá atualizar as informações recebidas por parâmetros
// no registro, e realizar sua atualização com os novos dados alterados no arquivo
// grades.json
export const editGrade = async (req, res, next) => {
    try {
        let grade = req.body;

        if (!grade.id || !grade.student || !grade.subject || !grade.type || !grade.value == null) {
            throw new Error("Id, Student, Subject, Type e Value são obrigatórios.");
        }

        const data = await readGrades();
        const index = data.grades.findIndex(grd => grd.id === grade.id);

        if (index === -1) {
            throw new Error("Id da Grade não encontrado.")
        }
        data.grades[index].student = grade.student;
        data.grades[index].subject = grade.subject;
        data.grades[index].type = grade.type;
        data.grades[index].value = grade.value;    
        
        await writeGrades(data);

        res.send(grade);
        global.logger.info(`PUT /grade - ${JSON.stringify(grade)}`);
    } catch (err) {
        next(err);
    }
};

//consulta de notas
export const getAllGrades = async (res, next) => {
    try {
        const data = await readGrades();
        res.send(data.grades);
        global.logger.info(`GET /grade`);
    } catch (err) {
        next(err);
    }
};

// 5. Crie um endpoint para consultar a nota total de um aluno em uma disciplina. O
// endpoint deverá receber como parâmetro o student e o subject, e realizar a soma de
// todas os as notas de atividades correspondentes a aquele subject para aquele student. O
// endpoint deverá retornar a soma da propriedade value dos registros encontrados.
export const getTotalGradeByStudentAndSubject = async (req, res, next) => {
    try {
        const { student, subject } = req.query;
        if (!student || !subject) {
            throw new Error("Student e Subject são obrigatórios.");
        }

        const data = await readGrades();
        const grade = data.grades.filter(grd => grd.student === student && grd.subject === subject);
        const total = grade.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);
        const result = {
            student: student,
            subject: subject,
            value: total
        }
        res.send(result);
        global.logger.info(
            `GET /grade/total?student=NomeAluno&subject=Disciplina (Student: ${req.query.student} - Subject: ${req.query.subject})`
        );
    } catch (err) {
        next(err);
    }
};

// 6. Crie um endpoint para consultar a média das grades de determinado subject e type. O
// endpoint deverá receber como parâmetro um subject e um type, e retornar a média. A
// média é calculada somando o registro value de todos os registros que possuem o subject
// e type informados, e dividindo pelo total de registros que possuem este mesmo subject e
// type.
export const getMediaGradeBySubjectAndType = async (req, res, next) => {
    try {
        const { subject, type } = req.query;
        if (!subject || !type) {
            throw new Error("Subject e Type são obrigatórios.");
        }

        const data = await readGrades();
        const grade = data.grades.filter(grd => grd.subject === subject && grd.type === type);
        const total = grade.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);
        const media = total / grade.length;
        const result = {
            subject: subject,
            type: type,
            value: media
        }
        res.send(result);
        global.logger.info(
            `GET /grade/media?subject=01 - JavaScript&type=Fórum (Student: ${req.query.student} - Subject: ${req.query.subject})`
        );
    } catch (err) {
        next(err);
    }
};

// 7. Crie um endpoint para retornar as três melhores grades de acordo com determinado
// subject e type. O endpoint deve receber como parâmetro um subject e um type retornar
// um array com os três registros de maior value daquele subject e type. A ordem deve ser
// do maior para o menor.
export const getBestGradesBySubjectAndType = async (req, res, next) => {
    try {
        const { subject, type } = req.query;
        if (!subject || !type) {
            throw new Error("Subject e Type são obrigatórios.");
        }

        const data = await readGrades();
        const grade = data.grades.filter(grd => grd.subject === subject && grd.type === type);
        grade.sort((a, b) => b.value - a.value);

        const result = [];
        grade.slice(0,3).forEach(item => result.push(item.value));

        res.send(result);
        global.logger.info(
            `GET /grade/best?subject=01 - JavaScript&type=Fórum (Student: ${req.query.student} - Subject: ${req.query.subject})`
        );
    } catch (err) {
        next(err);
    }
};

// 4. Crie um endpoint para consultar uma grade em específico. Este endpoint deverá
// receber como parâmetro o id da grade e retornar suas informações.
export const getGradeById = async (req, res, next) => {
    try {
        const data = await readGrades();
        const grade = data.grades.find(grade => grade.id === parseInt(req.params.id));
        res.send(grade);
        global.logger.info(`GET /grade/:id (id: ${req.params.id})`);
    } catch (err) {
        next(err);
    }
};

// 3. Crie um endpoint para excluir uma grade. Este endpoint deverá receber como
// parâmetro o id da grade e realizar sua exclusão do arquivo grades.json.
export const deleteGradeById = async (req, res, next) => {
    try {
        const data = await readGrades();
        data.grades = data.grades.filter(grade => grade.id !== parseInt(req.params.id));
        writeGrades(data);
        res.end();
        global.logger.info(`DELETE /grade/:id (id: ${req.params.id})`);
    } catch (err) {
        next(err);
    }
};