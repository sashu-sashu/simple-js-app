const pokemonRepository = (function () {

  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // search function
  const search = document.getElementById('pokemon-search');
  search.addEventListener('input', searchList);

  function searchList() {
    let searchInput = document.getElementById('pokemon-search').value;
    searchInput = searchInput.toLowerCase();
    const listItem = $('li');
    listItem.each(function () {
      const item = $(this);
      const name = item.text();
      if (name.includes(searchInput)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  /// key-values pairs returned

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    const pokemonList = document.querySelector('.pokemon-list');
    const pokemonItem = document.createElement('li');
    /// Bootstrap utility classes added
    pokemonList.classList.add('group-list-item');
    pokemonList.classList.add('col-sm-4', 'col-md-6', 'col-lg-12');
    const buttonItem = document.createElement('button');
    buttonItem.innerText = pokemon.name;
    buttonItem.classList.add('pokemon-button');
    buttonItem.setAttribute('data-toggle', 'modal');
    // this attribute should select ONLY pokemon-modal
    buttonItem.setAttribute('data-target', '#pokemon-modal');
    $(buttonItem).addClass('button-class btn-block btn m1');
    pokemonItem.appendChild(buttonItem);
    pokemonList.appendChild(pokemonItem);

    addListener(buttonItem, pokemon);
  }

  function loadingMessageHidden(hide) {
    const loadingMessage = document.querySelector('.loading-message');
    if (hide) {
      loadingMessage.classList.add('hidden');
    } else {
      loadingMessage.classList.remove('hidden');
    }
  }

  // promis function added
  function loadList() {
    return fetch(apiUrl).then((response) => response.json()).then((json) => {
      json.results.forEach((item) => {
        const pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  // item details added
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url).then((response) => response.json()).then((details) => {
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types.map((type) => type.type.name).join(',');
      item.abilities = details.abilities.map((ability) => ability.ability.name).join(',');
      item.weight = details.weight;

    }).catch((e) => {
      loadingMessageHidden(true);
      console.error(e);
    });
  }

  // function for showing pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
  }

  // Function for adding event listener to pokemon buttons that listen to a click
  function addListener(button, pokemon) {
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

  // jQ code to implement Modal
  function showModal(pokemon) {
    // $('#pokemon-modal .modal-body');
    $('#pokemon-modal .modal-title').text(pokemon.name);
    $('#pokemon-modal .modal-img.front').attr('src', pokemon.imageUrlFront);
    $('#pokemon-modal .modal-img.back').attr('src', pokemon.imageUrlBack);
    $('#pokemon-modal .height').text(`height : ${pokemon.height}`);
    $('#pokemon-modal .weight').text(`weight : ${pokemon.weight}`);
    $('#pokemon-modal .types').text(`types : ${pokemon.types}`);
    //const modalHeader = $('.modal-header');
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
  };
}());

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
