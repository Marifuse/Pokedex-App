$(document).ready(function() {

// Primera parte para exponer los pokemon en pantalla
  var addPoke = function(pokemon) {
    pokemon.forEach(function(pokemons) {
      var id = pokemons.entry_number;
      var img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
      var url = pokemons.pokemon_species.url;
      var name = pokemons.pokemon_species.name.charAt(0).toUpperCase() + pokemons.pokemon_species.name.slice(1);
      $("#pokeElements").append(pokemonAdd(name, url, img, id));
    })
  }

  var pokemonAdd = function(name, url, img, id) {
    var show = "<div class='pokemon-cont' data-id='" + id + "'><div class='element'>"
    + name + "</div><img class='img-pkmn' src='" + img + "' alt='imagen-pokemon'></div>";
    return show;
  }

    // Ajax donde se llama al API de Pokemon
    var pokeAjax = function(pokemons) {
      $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1',
        type: 'GET',
        datatype: 'json',
      })
      .done(function(visualize) {
        addPoke(visualize.pokemon_entries);
        // Con ésto debe mostrar la carga completa de la lista
      })
      .fail(function(error) {
        console.log('La página no está funcionando');
        // Ésto se mostrara por consola en caso de que la página no corra
      });
    }

    pokeAjax();


})
