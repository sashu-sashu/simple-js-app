let pokemonRepository = (function () {

let pokemonList = [];
let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"

///key-values pairs returned

    function add(pokemon) {
        pokemonList.push(pokemon);
      }
    
      function getAll() {
        return pokemonList;
      }

//shows details of any picked pokemon     
    function showDetails(pokemon) {
        console.log(pokemon);
    } 
     
/// adds event listener to element

    function addListener (htmlElement, pokemon) {
        htmlElement.addEventListener('click', function () {
            showDetails(pokemon);
       })
    }

    addListener(document.querySelector('h1'), 'it is a missing')


    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        /*button.addEventListener('click', function (event) {
            showDetails(pokemon)
        });*/
        addListener(button, pokemon);
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }  

    // promis function added
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

    // item details added
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
          console.log(item);
        });
    }  
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

  