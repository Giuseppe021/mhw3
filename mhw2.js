document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselInner = document.querySelector('.carousel-inner');
  
    let currentIndex = 0;
    const numItems = document.querySelectorAll('.carousel-item').length;
    const intervalTime = 5000; // Tempo in millisecondi tra ogni scorrimento automatico
    let slideInterval;
  
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + numItems) % numItems;
      updateCarousel();
      resetInterval();
    });
  
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % numItems;
      updateCarousel();
      resetInterval();
    });
  
    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselInner.style.transform = `translateX(${offset}%)`;
    }
  
    function startSlide() {
      slideInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % numItems;
        updateCarousel();
      }, intervalTime);
    }
  
    function resetInterval() {
      clearInterval(slideInterval);
      startSlide();
    }
  
    startSlide();
  });
  


  


function onJson1(json) {
    console.log(json);
    /*
    <div class="not">
			<div>
				<h3></h3>
			</div>
		</div>
    */
    const notizie = document.querySelector('#notizie');
    notizie.innerHTML = '';
    let div=document.createElement('div');
    div.classList.add('not');
    for(let i=0;i<json.response.results.length;i++){
    
    let div1=document.createElement('div');
    let h3=document.createElement('h3');
    div1.appendChild(h3);
    notizie.appendChild(div);
    div.appendChild(div1);
    h3.textContent=json.response.results[i].webTitle;
    }
}  
  // Inizializza la mappa quando la finestra viene caricata
  //google.maps.event.addDomListener(window, 'load', initMap);
function notizie() {
  rest_url = 'https://content.guardianapis.com/search?api-key=a5a405d8-9b2f-45e6-9f62-f2412d6dba01';
  console.log('URL: ' + rest_url);
  // Esegui fetch
  fetch(rest_url).then(onResponse).then(onJson1);
}
notizie();

function onJson(json) {
  
  // Svuotiamo la libreria
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  // Leggi il numero di risultati
  const results = json.albums.items;
  let num_results = results.length;
  // Mostriamone al massimo 10
  if(num_results > 10)
    num_results = 10;
  // Processa ciascun risultato
  for(let i=0; i<num_results; i++)
  {
    // Leggi il documento
    const album_data = results[i]
    // Leggiamo info
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    // Creiamo il div che conterrà immagine e didascalia
    const album = document.createElement('div');
    album.classList.add('album');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = selected_image;
    // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}


function search(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

// OAuth credentials --- NON SICURO!
const client_id = 'b19b6aa32818484d8a4485c8da19644d';
const client_secret = 'dffb967755ee4ce8b5759ac1dac45367';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
// Aggiungi event listener al form
const form = document.querySelector('#apiToken');
form.addEventListener('submit', search)