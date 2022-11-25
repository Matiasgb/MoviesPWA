let dataTest ;
var favoritesCont = document.querySelector('.favorites-container');
var db = new Dexie("favorites");

  db.open()
  .then(function (db) {
    return db.table('favorite').toArray()
    .then(favorites => { // Y ejecuta esta funcion:
    var html = '';

      favorites.forEach(function (favorite) {
        html+= `<p>
                  <button id="${favorite.id}" class="btn btn-link bi bi-trash"></button>
                  ${favorite.title}</p>`;
      });
 
      document.querySelector('.favorites-container').innerHTML = html;
      
  });
  })
  .catch("NoSuchDatabaseError", function (e) {
    // Database with that name did not exist
    console.error("Database not found");
  })
  .catch(function (e) {
    console.error("Oh uh: " + e);
  });




  favoritesCont.addEventListener('click', function (event) {
    console.log(db.table("favorite"));
    // chequeo que es un LI lo que clickeo el usuario:
    if (event.target.hasAttribute('id') && event.target.classList.contains('bi-trash')) {
      event.preventDefault();
    
      // Cual es el ID a borrar?
      var id = event.target.getAttribute("id");

      // Le pido a la IndexedDB que donde el ID sea el mismo que el Clickeado, borre
      db.table("favorite").where('id').equals(id).delete().then(refreshView);
    }
  });
  


  function refreshView() {
   
    return db.table('favorite').toArray()
      .then(favorites => { 
          var html = '';
  
        favorites.forEach(function (favorite) {
          html+= `<p>
                    <button id="${favorite.id}" class="btn btn-link bi bi-trash"></button>
                    ${favorite.title}</p>`;
        });
        document.querySelector('.favorites-container').innerHTML = html;
        
        
    });
  }