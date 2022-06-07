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



    function getAll () {
        return pokemonList;
    }
    
    function add (pokemon) {
        pokemonList.push(pokemon);
    }
    
    return {
        add: function(pokemon) {
          pokemonList.push(pokemon);
        },
        getAll: function() {
          return pokemonList;
        }
    };
}) ()

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height:10, type: "electric"});
console.log(pokemonRepository.getAll());

///updated cod forEach function (IIFE)
pokemonRepository.getAll().forEach(function (pokemon){
    document.write(pokemon.name + ": " + pokemon.type + "; " + pokemon.height + "<br />");
  });
