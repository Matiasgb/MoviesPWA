

const apiPoster = '3120765513dbb51e78ab31ec3ec16ba9'
//https://api.themoviedb.org/3/search/movie?api_key=&query=" + film + "&callback=?
// SRC FOR IMAGE POSTER http://image.tmdb.org/t/p/w500/data1.results[0].poster_path

const API = 'ecc901c8';

/* 
http://www.omdbapi.com/?apikey=[yourkey]&
Poster API requests:
http://img.omdbapi.com/?apikey=[yourkey]&
*/
var favoritesBtn = document.querySelector('.favorite-btn');
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


let currentMovie ;


if (localStorage.getItem("search") !== null ) {
    noSearchMade.classList.add("d-none");
    var lastSearch = localStorage.getItem("search");
   var cleanJson = JSON.parse(lastSearch)

    
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
            <p class="imdb h5 text-end"><img src="img/imdb.png" class="w-50 px-3">${cleanJson.imdbRating}/10</p>
            <p class="rotten h5 text-end"><img src="img/rotten.png" class="w-50 px-3">${cleanJson.Ratings[1].Value}</p>
        </div>
        </div>
       
        `)

        const movieSecondary = ElementFromHtml(` <div class="movie-info row">
        <div class="col-lg-4">
            <img src="${cleanJson.Poster}" alt="${cleanJson.Title}" class="poster-img img-fluid m-auto d-block w-100">
        </div>
        <div class="movie-genres col-lg-8">
            <ul class="movie-tags">
                <li></li>
            </ul>
            <div class="movie-description h5">
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
            <button class="my-3 favorite-btn btn btn-danger m-auto">Add to Favorites list</button>
        </div>
    </div>`)

        resultsBox.append(MovieMain,movieSecondary)
  } else if (localStorage.getItem("search") == null) {
   
  }




// DOBLE PROMESA ??

    async function basicPromiseAll(query) {
        try {
          const [data1, data2] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiPoster}&query="${query}"`).then(result => result.json()),
            fetch(`https://www.omdbapi.com/?apikey=${API}&t=${query}`).then(result => result.json()),
          ]);
          //console.log(data1)
          //console.log(data2)
          currentMovie = data2;
          return [data1, data2];
        } catch (err) {
          console.log(err);
          return [];
        }
      }

      //fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiPoster}&query="${query}"`).then(result => result.json()),

   
btn.addEventListener('click', function () {
    resultsBox.innerHTML = ''

noSearchMade.classList.add("d-none")

const resultado = basicPromiseAll(input.value);

  
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
            <p class="imdb h5 text-end"><img src="img/imdb.png" class="w-50 px-3">${value[1].imdbRating}/10</p>
            <p class="rotten h5 text-end"><img src="img/rotten.png" class="w-50 px-3">${value[1].Ratings[1].Value}</p>
        </div>
        </div>
       
        `)

        const movieSecondary = ElementFromHtml(` <div class="movie-info row">
        <div class="col-lg-4">
            <img src="${value[1].Poster}" alt="${value[1].Title}" class="w-100 poster-img img-fluid m-auto d-block">
            
        </div>

        <div class="movie-genres col-lg-8">
            <ul class="movie-tags">
                <li></li>
            </ul>
            <div class="movie-description h5">
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
            <button class="favorite-btn btn btn-danger my-3 m-auto">Add to Favorites list</button>
        </div>
    </div>`)

        resultsBox.append(MovieMain,movieSecondary)
        
    })
  });
  




// OFF - ON



var estado = document.querySelector('.on-off');

// Escucho a ver si el usuario se desconecta
window.addEventListener('offline', event =>{
    console.log('usuario esta desconectado', event);
    estado.style.display = 'flex';
});

// Escucho a ver si el usuario se conecta nuevamente
window.addEventListener('online', event =>{
    console.log('usuario esta conectado!! ALEGRIA!', event);
    estado.style.display = 'none';
});


if( !navigator.onLine ){
    console.log('estoy sin conexion pero en el momento de carga!!');
}









// HTML TEMPLATE FUNCTION

function ElementFromHtml(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}



// INTALL PROMPT 

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {

  e.preventDefault();
 
  deferredPrompt = e;


});

let buttonInstall = document.querySelector(".install")
buttonInstall.addEventListener('click', async () => {
   
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
   
    
    deferredPrompt = null;
  });


  
  var db = new Dexie('favorites');

// Obtengo ciertos elementos del DOM que voy a usar


var favorites = document.querySelector('.favorites-container');

// defino la version de la base (podria tener varias)
// defino que parte de eso va a ser "indexada" (en este caso 'id')
db.version(2).stores({ favorite: 'id, title, plot' });

// Abro la Base y ejecuto la funcion "refreshView"

function refreshView() {
  // devolve la DB como Array, con el metodo propio de Dexie toArray
  return db.favorite.toArray()
    .then(favorites => { // Y ejecuta esta funcion:
        var html = '';

      favorites.forEach(function (favorite) {
        html+= `<p>
                  <button id="${favorite.id}" class="btn btn-link bi bi-trash"></button>
                  ${favorite.title}</p>`;
      });
      console.log(html)
      
      
  });
}

// En el click del boton
favoritesBtn.addEventListener('click', function () {
    console.log(currentMovie)
  db.favorite.put({
    title: currentMovie.Title,
    plot: currentMovie.Plot, // Agrego el valor que haya en el input a la IndexedDB
    id: String(Date.now()) // uso como ID la fecha actual, convertida en STRING
  })
});

