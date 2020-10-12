import ev from './event.js'

ev.on("testEvent", obj => {
    console.log("ouviu também");
});

ev.emit("testEvent", "bla bla bla");

