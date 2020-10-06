window.addEventListener('load', function() {
    const timer = document.querySelector('#timer');

    let count = 0;
    const interval = setInterval(() => {
        timer.textContent = ++count;

        if (count === 10) {
            return this.clearInterval(interval);
        }
        if (count % 5 === 0) {  //quando número é multiplo de 5, mostra o ",5"
            setTimeout(() => {
                timer.textContent = count + ',5';
            }, 500);
        }
    }, 1000);
})