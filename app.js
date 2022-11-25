console.log("hello")
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene a la mini barra de información que aparezca en smartphones
  e.preventDefault();
  // Guarda el evento para que se dispare más tarde
  deferredPrompt = e;
  // Actualizar la IU para notificarle al usuario que se puede instalar tu PWA

  // De manera opcional, envía el evento de analíticos para saber si se mostró la promoción a a instalación del PWA
  console.log(`'beforeinstallprompt' event was fired.`);
});

let buttonInstall = document.querySelector(".install")
buttonInstall.addEventListener('click', async () => {
    // Esconde la información promotora de la instalación

    // Muestre el mensaje de instalación
    deferredPrompt.prompt();
    // Espera a que el usuario responda al mensaje
    const { outcome } = await deferredPrompt.userChoice;
    // De manera opcional, envía analíticos del resultado que eligió el usuario
    console.log(`User response to the install prompt: ${outcome}`);
    // Como ya usamos el mensaje, no lo podemos usar de nuevo, este es descartado
    deferredPrompt = null;
  });












const apiPoster = '3120765513dbb51e78ab31ec3ec16ba9'
//https://api.themoviedb.org/3/search/movie?api_key=&query=" + film + "&callback=?
// SRC FOR IMAGE POSTER http://image.tmdb.org/t/p/w500/data1.results[0].poster_path

const API = 'ecc901c8';

/* 
http://www.omdbapi.com/?apikey=[yourkey]&
Poster API requests:
http://img.omdbapi.com/?apikey=[yourkey]&
*/

const btn = document.querySelector(".search-btn");
const input = document.querySelector(".search-input");
var results = document.getElementById('results');
var poster = document.querySelector(".poster-img");
const movieTitle = document.querySelector(".movie-title h2");
const movieRunetime = document.querySelector(".runetime");
const movieReleased = document.querySelector(".released");
const movieRating = document.querySelector(".imdb");
const movieRating2 = document.querySelector(".rotten");
const movieGenres = document.querySelector(".movie-tags");
const moviePlot = document.querySelector(".plot");
const movieDirector = document.querySelector(".director");
const movieWriters = document.querySelector(".writers");
const movieActors = document.querySelector(".actors");
const resultsBox = document.querySelector(".results-box")
const noSearchMade = document.querySelector(".no-search")


if (localStorage.getItem("search") !== null ) {
    noSearchMade.classList.add("d-none");
    var lastSearch = localStorage.getItem("search");
   var cleanJson = JSON.parse(lastSearch)
    console.log(cleanJson)
    
    let MovieMain = ElementFromHtml(`
        <div class="data d-flex justify-content-between">
        <div class="movie-title">
        <h2>${cleanJson.Title}</h2>
        <div class="d-flex gap-5 ">
            <p class="mr-3 released">${cleanJson.Released}</p>
            <hr>
            <p class="mr-3 runetime">${cleanJson.Runtime}</p>
        </div>
        </div>
        
        <div class="movie-rating">
            <p class="imdb">${cleanJson.imdbRating}</p>
            <p class="rotten">${cleanJson.Ratings[1].Value}</p>
        </div>
        </div>
       
        `)

        const movieSecondary = ElementFromHtml(` <div class="movie-info row">
        <div class="col-lg-4">
            <img src="${cleanJson.Poster}" alt="${cleanJson.Title}" class="poster-img img-fluid m-auto d-block">
        </div>
        <div class="movie-genres col-lg-8">
            <ul class="movie-tags">
                <li></li>
            </ul>
            <div class="movie-description">
                <p class="plot">
                    ${cleanJson.Plot}
                </p>
                <hr>
                <p class="movie-director">
                    Director: <span class="director"> ${cleanJson.Director}</span>
                </p>
                <hr>
                <p class="movie-writers">
                    Writer: <span class="writers"> ${cleanJson.Writer}</span>
                </p>
                <hr>
                <p class="movie-actors">
                    Actors: <span class="actors"> ${cleanJson.Actors}</span>
                </p>
            </div>
        </div>
    </div>`)

        resultsBox.append(MovieMain,movieSecondary)
  } else if (localStorage.getItem("search") == null) {
    console.log("do nothing")
  }




// DOBLE PROMESA

    async function basicPromiseAll(query) {
        try {
          const [data1, data2] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiPoster}&query="${query}"`).then(result => result.json()),
            fetch(`https://www.omdbapi.com/?apikey=${API}&t=${query}`).then(result => result.json()),
          ]);
          console.log(data1)
          console.log(data2)
          return [data1, data2];
        } catch (err) {
          console.log(err);
          return [];
        }
      }

      //fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiPoster}&query="${query}"`).then(result => result.json()),

      // En el click del boton
btn.addEventListener('click', function () {
    
noSearchMade.classList.add("d-none")

const resultado = basicPromiseAll(input.value);
    //const resultado = hardPromiseAll();
  
    resultado.then(function(value){
        localStorage.setItem("search", JSON.stringify(value[1]));
        

        let MovieMain = ElementFromHtml(`
        <div class="data d-flex justify-content-between">
        <div class="movie-title">
        <h2>${value[1].Title}</h2>
        <div class="d-flex gap-5 ">
            <p class="mr-3 released">${value[1].Released}</p>
            <hr>
            <p class="mr-3 runetime">${value[1].Runtime}</p>
        </div>
        </div>
        
        <div class="movie-rating">
            <p class="imdb">${value[1].imdbRating}</p>
            <p class="rotten">${value[1].Ratings[1].Value}</p>
        </div>
        </div>
       
        `)

        const movieSecondary = ElementFromHtml(` <div class="movie-info row">
        <div class="col-lg-4">
            <img src="${value[1].Poster}" alt="${value[1].Title}" class="poster-img img-fluid m-auto d-block">
        </div>

        <div class="movie-genres col-lg-8">
            <ul class="movie-tags">
                <li></li>
            </ul>
            <div class="movie-description">
                <p class="plot">
                    ${value[1].Plot}
                </p>
                <hr>
                <p class="movie-director">
                    Director: <span class="director"> ${value[1].Director}</span>
                </p>
                <hr>
                <p class="movie-writers">
                    Writer: <span class="writers"> ${value[1].Writer}</span>
                </p>
                <hr>
                <p class="movie-actors">
                    Actors: <span class="actors"> ${value[1].Actors}</span>
                </p>
            </div>
        </div>
    </div>`)

        resultsBox.append(MovieMain,movieSecondary)
        
    })
  });
  




// OFF - ON



var estado = document.getElementById('estado');

// Escucho a ver si el usuario se desconecta
window.addEventListener('offline', event =>{
    console.log('usuario esta desconectado', event);
    estado.innerHTML = 'usuario esta desconectado!';
});

// Escucho a ver si el usuario se conecta nuevamente
window.addEventListener('online', event =>{
    console.log('usuario esta conectado!! ALEGRIA!', event);
    estado.innerHTML = 'usuario esta conectado!';
});

// Chequeo si tiene conexion al momento de carga
if( !navigator.onLine ){
    console.log('estoy sin conexion pero en el momento de carga!!');
}









// HTML TEMPLATE FUNCTION

function ElementFromHtml(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

