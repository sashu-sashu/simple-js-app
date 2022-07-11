let pokemonRepository = (function () {

let pokemonList = [];
let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"

let modalContainer = document.querySelector('#modal-container');

//search function
let search = document.getElementById("pokemon-search");
  search.addEventListener("input", searchList);

  function searchList() {
    let searchInput = document.getElementById("pokemon-search").value;
    searchInput = searchInput.toLowerCase();
    let listItem = $("li");
    listItem.each(function () {
      let item = $(this);
      let name = item.text();
      if (name.includes(searchInput)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

///key-values pairs returned

    function add(pokemon) {
        pokemonList.push(pokemon);
      }
    
    function getAll() {
      return pokemonList;
    }



    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let pokemonItem = document.createElement("li");
        ///Bootstrap utility classes added
        pokemonList.classList.add('group-list-item');
        pokemonList.classList.add("col-sm-4", "col-md-6", "col-lg-12");
        let buttonItem = document.createElement('button');
        buttonItem.innerText = pokemon.name;
        buttonItem.classList.add('pokemon-button');
        buttonItem.setAttribute('data-toggle', 'modal');
        buttonItem.setAttribute('data-target', '.modal');
        $(buttonItem).addClass('button-class btn-block btn m1');
        pokemonItem.appendChild(buttonItem);
        pokemonList.appendChild(pokemonItem);
      
        addListener(buttonItem, pokemon);
    }  

  
    function loadingMessageHidden(hide) {
		let loadingMessage = document.querySelector('.loading-message')
		if (hide) {
			loadingMessage.classList.add('hidden');
		} else {
			loadingMessage.classList.remove('hidden');
		}
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
          item.imageUrlFront = details.sprites.front_default;
          item.imageUrlBack = details.sprites.back_default;
          item.height = details.height;
          item.types = details.types.map(type => type.type.name).join(',');
          item.abilities = details.abilities.map(ability => ability.ability.name).join(',');
          item.weight = details.weight

          console.log(details)
        }).catch(function (e) {
          loadingMessageHidden(true); 
          console.error(e);
        });
    }

  // function for showing pokemon details
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			showModal(pokemon);
		});
	}
  
	// Function for adding event listener to pokemon buttons that listen to a click
	function addListener (button, pokemon) {
    button.addEventListener('click', (event) => {
      showDetails(pokemon)
    })
	}

  //jQ code to implement Modal
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h5>" + pokemon.name + "</h5>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
    let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");
    let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  };

    
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
  