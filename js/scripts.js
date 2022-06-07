let pokemonList=[
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
    ];


///for loop function
///for (let i = 0; i < pokemonList.length; i++) {
    ///if (pokemonList[i].height > 1 && pokemonList[i].height <3) { //code to highlight special Pokemon
        ///document.write(pokemonList[i].name + " " + "(height: "+ pokemonList[i].height + ") Here is an average one!" + "<br />");
    ///} else {
        ///document.write(pokemonList[i].name + " " + "(height: "+ pokemonList[i].height +") <br />");
      ///}
    ///}

///forEach function

    pokemonList.forEach(function(pokemon){
    document.write(pokemon.name + ": " + pokemon.type + "; " + pokemon.height + "<br />");
  });