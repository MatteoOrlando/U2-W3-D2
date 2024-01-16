// Inizializzo la constante del inserimento nome richiamandolo
//col getElementById

const nameInput = document.getElementById('event-name')

const eventForm = document.getElementsByClassName('form')[0]
const eventRow = document.getElementsByClassName ('row')[1]

let events = []

// creo la classe che genererá l'oggetto (nome)

class NameSaved {
    constructor(_name) {
        this.eventName = _name
    }
}

const emptyForm = function(){
   nameInput.value = "" 
}
const emptyEventsRow = function(){

    eventRow.innerHTML = ""
}
// Seleziono la row e ciclo gli events dell"array, generando il contenuto 
// che poi andrá nella Col che appenderó successivamente
const generateNameCard = function(){

emptyEventsRow();

events.forEach((ev, i) =>{
    // inizio ciclo, che crea un div con queste caratteristiche, di volta in volta
    const newCol = document.createElement('div')
          newCol.classList.add("col")
          newCol.innerHTML = `<div class="card">
          <div class="card-header">Evento</div>
          <div class="card-body">
              <h5 class="card-title">${ev.eventName}</h5>
              <button class="btn btn-danger remove-button">ELIMINA</button>
          </div>
      </div>`;
    //  provo ad usare un quesrySelector per prendere la newCol creata, e poterla cancellare
    newCol.querySelector('.remove-button').addEventListener("click", event =>{
        removeCardName(event, i)
    })


        eventRow.appendChild(newCol)
        emptyForm()
}
)
}

// inizio codice che rimuove la card creata via dal DOM,
// aggiornando anche il localStorage
const removeCardName = function (event, i) {

// rimuovo la card dal DOM
event.target.closest(".col").remove()

// Aggiorno il local Storage, e ri-salvare la card nel localStorage,
// dopo averla rimossa dal DOM
const eventsAsString = localStorage.getItem('events')
const arrayOfEvents = JSON.parse(eventsAsString)

arrayOfEvents.splice(i, 1)

// Converto il dato in stringa, perché localStorage ed SessionStorage salvano,
// ed immagazzinano solo dati stringa
localStorage.setItem("events", JSON.stringify(arrayOfEvents))
    
}

eventForm.addEventListener('submit', function (e) {
e.preventDefault()
const eventFromForm = new NameSaved(nameInput.value)
console.log(eventFromForm)
    

events.push(eventFromForm)
// per poterlo salvare nel localStorage, trasformo in una stringa il dato evento dal Form
localStorage.setItem('events', JSON.stringify(events))

generateNameCard()
})



if(localStorage.getItem('events')){

    const eventsAsString = localStorage.getItem('events')
    const arrayOfEvents = JSON.parse(eventsAsString)

    events = arrayOfEvents

generateNameCard()
}
