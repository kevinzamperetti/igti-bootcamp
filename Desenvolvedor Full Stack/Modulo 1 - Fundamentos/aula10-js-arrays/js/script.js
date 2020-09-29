window.addEventListener('load', () => {
    doMap();
    doFilter();
    doForEach();
    doReduce();
    doFind();
});

function doMap() {
    const nameEmailArray = people.results.map(person => {
        return {
            name: person.name,
            email: person.email
        }
    });
    console.log(nameEmailArray);
    return nameEmailArray;
}

function doFilter() {
    const olderThan18 = people.results.filter(person => {
        return person.dob.age > 18;
    });
    console.log(olderThan18);
}

function doForEach() {
    const mappedPeople = doMap();
    mappedPeople.forEach(person => {
        person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length;
    });
    console.log(mappedPeople);
}

function doReduce() {
    const totalAges = people.results.reduce((accumulator, current) => {
      return accumulator + current.dob.age;
    }, 0);
    console.log(totalAges);

    // let sumAges = 0;
    // for(let i=0; i < people.results.length; i++) {
    //     var current = people.results[i];
    //     sumAges += current.dob.age;
    // }
    // console.log(sumAges);
}

function doFind() {
    const found = people.results.find(person => {
        return person.location.state === 'Minas Gerais';
    });
    console.log(found);
}

//parei na Aula 11.3 - Manipulação de arrays com ES6+