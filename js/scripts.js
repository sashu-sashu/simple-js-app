let pokemonRepository = (function () {

let pokemonList = [];
let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"

let modalContainer = document.querySelector('#modal-container');

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
        let buttonItem = document.createElement('button');
        buttonItem.innerText = pokemon.name;
        buttonItem.classList.add('pokemon-button');
        pokemonItem.appendChild(buttonItem);
        pokemonList.appendChild(pokemonItem);
      
        addListener(buttonItem, pokemon);
    }  

    //new code
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
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          let types = [];
          details.types.forEach((item) => types.push(item.type.name));
          item.types = types;
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

	function showModal(pokemon) {
		// Clear modal content
		modalContainer.innerHTML = '';


		let modal = document.createElement('div');
		modal.classList.add('modal');

		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		//function is hiding modal
		closeButtonElement.addEventListener('click', hideModal);

		let imgElement = document.createElement('img');
		imgElement.src = pokemon.imageUrl;
		imgElement.classList.add('pokemon-front-image');

		let titleElement = document.createElement('h2');
		titleElement.innerText = pokemon.name;

		let heightElement = document.createElement('p');
		heightElement.innerText = `Height: ${pokemon.height}`;

		let typesElement = document.createElement('p');
		typesElement.innerText = `Types: ${pokemon.types.join(', ')}`;


		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(heightElement);
		modal.appendChild(typesElement);
		modal.appendChild(imgElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	// function is closing modal by clicking on the escape 
	window.addEventListener('keydown', (e) => {
		if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	// function is closing modal by the target
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if(target === modalContainer) {
			hideModal();
		}
	});

    
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
  