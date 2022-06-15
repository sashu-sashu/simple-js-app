let pokemonRepository = (function () {

let pokemonList = [
    {name: "Misdreavus", 
    height: 2, 
    type: ["ghost"]
    },

    {name: "Umbreon", 
    height: 1, 
    type: ["dark"]
    },

    {name: "Smoochum", 
    height: 3, 
    type: ["ice","psychic"]
    },

    {name: "Vileplume", 
    height: 3, 
    type: ["grass","poison"]
    }
    ]

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
      }  

    
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
      };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height:10, type: "electric"});
console.log(pokemonRepository.getAll());

///updated cod forEach function (IIFE)
pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });

  