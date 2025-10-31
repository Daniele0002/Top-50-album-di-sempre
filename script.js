document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.scroll-container');

  containers.forEach(container => {
    const wrapper = container.querySelector('.wrapper');
    if (!wrapper) return;

    // Duplica i contenuti per creare il loop
    wrapper.innerHTML += wrapper.innerHTML;

    // Calcola durata in base alla larghezza dei contenuti originali
    const speed = Number(container.dataset.speed) || 100; // px/s
    const originalWidth = wrapper.scrollWidth / 2;        // metà, perché duplicato
    const duration = originalWidth / speed;               // secondi

    // Applica animazione
    wrapper.style.setProperty('--dur', `${duration}s`);
    wrapper.classList.add('scrolling');

    
    
    
    
  });
});

//GSAP
gsap.registerPlugin(ScrollTrigger, SplitText);
const quotes = document.querySelectorAll(".text");

function setupSplits() {
  quotes.forEach((text) => {
    // Reset if needed
    if (text.anim) {
      text.anim.progress(1).kill();
      text.split.revert();
    }

    text.split = SplitText.create(text, {
      type: "words,chars",
      linesClass: "split-line"
    });

    // Set up the anim
    text.anim = gsap.from(text.split.chars, {
      scrollTrigger: {
        trigger: text,
        toggleActions: "restart pause resume reverse",
        start: "20px 80%",
      },
      duration: 0.3,
      ease: "circ.out",
      y: 80,
      stagger: 0.02
    });
  });
}

ScrollTrigger.addEventListener("refresh", setupSplits);
setupSplits();




const slider = document.querySelector('.items');         
const slides = document.querySelectorAll('.item');   
           

const backgroundSlide = [
  'rgb(0, 0, 0)',  // slide 1
  'red',  // slide 2
  'rgb(35, 66, 52)',  // slide 3
  'rgb(37, 43, 44)',  // slide 4
  'rgb(110, 66, 31)',  // slide 5
  'rgb(55, 107, 8)',  // slide 6
  'rgb(110, 66, 31)',  // slide 7
  'rgb(248, 107, 26)',  // slide 8
  'rgb(57, 8, 122)',  // slide 9
  'rgb(171, 16, 39)',  // slide 10

];


let scroll = 0;           // posizione orizzontale corrente (px)
let lastIndex = -1;       // ultima slide applicata a UI (evita aggiornamenti ripetuti)

//larghezza slide per il'indicizazzione
function slideWidth() {
  
 
  return window.innerWidth / 2;  
}
//la massima distanza che posso scrollare orizzonantalmente
function maxScrollX() {
  return (slider.scrollWidth - slider.clientWidth);
}

function getCurrentSlideIndex() {
  const w = slideWidth(); //larghezza slide
  
  // round = cambio a metà strada (al 50%) e arrotonda il risultato
  const i = Math.round(scroll / w);
  
  return i;

}

function applyBodyBackground(index) {
  const bg = backgroundSlide[index % backgroundSlide.length] || backgroundSlide[0];
  document.body.style.background = bg;
  const menuInner = document.querySelector('.menu1__inner');
  if (menuInner) menuInner.style.background = bg;
  const blurBar = document.querySelector('.blur');
  if (blurBar) {
    blurBar.style.background = bg;
    
    

  }
  
}

// Listener classico: converte lo scroll verticale in orizzontale sullo slider
slider.addEventListener('wheel', (e) => {
  

  const maxX = maxScrollX();
  const atStart = scroll <= 0;
  const atEnd   = scroll >= maxX;
  const dir = Math.sign(e.deltaY); // +1 giù, -1 su

  // Se siamo agli estremi nella stessa direzione → lascia scorrere la pagina
  if ((atStart && dir > 0) || (atEnd && dir < 0)) {
    return;
  }

  // Altrimenti consumiamo l'evento e scorriamo orizzontalmente
  e.preventDefault();
  const SPEED = 0.4; // regola sensibilità
  // Inverto la direzione: deltaY positivo (giù) va verso sinistra
  scroll -=  e.deltaY * SPEED;
  update();
});




function update() {
  const maxX = maxScrollX();
  if (scroll < 0) scroll = 0;
  if (scroll > maxX) scroll = maxX;

  slider.scrollLeft = scroll;

  const idx = getCurrentSlideIndex();
  if (idx !== lastIndex) {
    applyBodyBackground(idx);
    
    lastIndex = idx;
    
    const counter= document.querySelector('.counter');
    if(idx > 0){
      counter.textContent= idx ;
    }
    else counter.textContent= '1';

    
  }
}






// Calcola la posizione dell'ultimo item
const lastSlideIndex = slides.length;

scroll = slides.length * slideWidth();

applyBodyBackground(lastSlideIndex);

update();


const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const buttons = document.querySelectorAll('button');
const catalogo = document.querySelector('.catalogo');
const slide = document.querySelector('.slide');

let clikced = true;


window.addEventListener('load', () => {
  
  button1.style.background = 'white';
  catalogo.style.display = 'none';
  button1.style.fill = 'black';
 
  
  
  
});
button1.addEventListener('click', () => {
  
  if(clikced == true) {
    
    button1.style.background = 'white';
    
    button1.style.fill = 'black';
    button2.style.background = 'none';
    button2.style.fill = 'white';
    catalogo.style.display = 'none';
    slide.style.display = 'block';
    document.body.style.height = 'auto';

  }
  
});

button2.addEventListener('click', () => {
  
  if(clikced == true) {
   
    button2.style.background = 'white';
    
    button2.style.fill = 'black';
    button1.style.background = 'black';
    button1.style.fill = 'white';
    
    catalogo.style.display = 'block';
    slide.style.display = 'none';
    document.body.style.background = 'black';
    document.body.style.height = 'auto';
    
    
    const menuInner = document.querySelector('.menu1__inner');
    const blurBar = document.querySelector('.blur');
    menuInner.style.background = 'black';
    blurBar.style.background = 'black';
  }
 
});

