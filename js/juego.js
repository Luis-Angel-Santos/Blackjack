let deck=[];
const tipos=      ['C','D','H','S'];
const especiales= ['A','J','Q','K'];

let puntosjugador=0,
    puntoscomputadora=0;

//referencias html
const pedir=document.querySelector('#pedir');
const puntoshtml=document.querySelectorAll('small');
const cartasjugador=document.querySelector('#jugador-cartas');

const crearDeck=() => {
    for(let i=2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }
    for(let tipo of tipos){
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck= _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//tomar carta
const pedirCarta=()=>{
    if(deck.length===0){
        throw 'No hay cartas en el deck';
    }
    const carta=deck.pop();
    return carta; 
}

//pedirCarta();
const valorCarta=(carta)=>{
    const valor=carta.substring(0, carta.length - 1);
    return(isNaN( valor ) ) ?
           (valor === 'A' ) ? 11 : 10
           : valor * 1;
        }
    
        //eventos
pedir.addEventListener('click', ()=>{
    const carta=pedirCarta();    
    puntosjugador=puntosjugador + valorCarta(carta);
    puntoshtml[0].innerText=puntosjugador;

    const imgCarta=document.createElement('img');
    imgCarta.src= `cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    cartasjugador.append(imgCarta);

    if (puntosjugador>21) {
        console.warn('Lo siento, has perdido');
        pedir.disabled = true;
    }else if(puntosjugador===21){
        console.warn('21, genial!!');
        pedir.disabled=true;
    }

});
