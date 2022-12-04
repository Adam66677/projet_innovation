const url = 'ws://localhost:9876'
const server = new WebSocket(url)

const chrono = document.getElementById('chrono')
const button1 = document.getElementById('start')
const button2 = document.getElementById('stop')
const button3 = document.getElementById('reset')

button1.disabled = true
button1.addEventListener('click', Demarrer, false)

button2.disabled = true
button2.addEventListener('click', Arreter, false )

button3.disabled = true
button3.addEventListener('click', Reset, false)

server.onopen = function() {
    button1.disabled = false
    button2.disabled = false
    button3.disabled = false
}

let heures = 0;
let minutes = 0;
let secondes = 0;

let timeout;

let estArrete = true;



const defilerTemps = () => {
    if (estArrete) return;
    secondes = parseInt(secondes);
    minutes = parseInt(minutes);
    heures = parseInt(heures);

    secondes++;

    if (secondes == 60) {
         minutes++;
         secondes = 0;
    }

    if (minutes == 60) {
        heures++;
        minutes = 0;
    }

//   affichage
    if (secondes < 10) {
        secondes = "0" + secondes;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (heures < 10) {
        heures = "0" + heures;
    }

    chrono.textContent = `${heures}:${minutes}:${secondes}`;

    timeout = setTimeout(defilerTemps, 1000);
  };
function Demarrer () {
    const demaarer = () => {
        if (estArrete) {
            estArrete = false;
            defilerTemps();
    server.send(demaarer)
        }
    }
};

function Arreter() {
    const arreeter = () => {
        if (!estArrete){
            estArrete = true;
            clearTimeout(timeout);
    server.send(arreeter)

        }
    }
};

function Reset(){
    const reeset = () => {
        chrono.textcontent = "00:00:00";
        estArreter = true;
        heures = 0;
        minutes = 0;
        secondes = 0;
        clearTimeout(timeout);
    server.send(reeset)
    }
};



