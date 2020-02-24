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

    // Ajax donde se llama al API de Pokémon
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

    // Función para mostrar información técnica de un Pokémon
    $(document).on('click', '.pokemon-cont', function(event) {
      var showPokemon2 = function(pokemon) {
        var img = pokemon.sprites.front_default;
        var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        var id = pokemon.id;
        var hp = pokemon.stats[0].base_stat;
        var def = pokemon.stats[1].base_stat;
        var atk = pokemon.stats[2].base_stat;
        var vel = pokemon.stats[3].base_stat;
        var defEsp = pokemon.stats[4].base_stat;
        var velEsp = pokemon.stats[5].base_stat;
        $("#pokeElements").remove();
        $("#elementPoke").append(pokemonAdd2(img, name, id, hp, def, atk, vel, defEsp, velEsp));
        $(".back").click(function(){window.location.reload(true);});
      }

      var pokemonAdd2 = function(img, name, id, hp, def, atk, vel, defEsp, velEsp) {
        var show2 = "<div class='poke-info'><div class='poke-manes'>" + name + "</div><div class='poke-ids'>#" + id
        + "</div><img class='specific-img' src='" + img
        + "' alt='Pokémon'><div class='info-title'><h3>Perfil del Pokémon Competitívamente</h3></div><br><div class='poke-container'><span class='info-text'>HP: " + hp
        + "</span><br><span class='info-text'>Defensa: " + def + "</span><br><span class='info-text'>Ataque: " + atk
        + "</span><br><span class='info-text'>Velocidad: " + vel + "</span><br><span class='info-text'>Defensa Esp: "
        + defEsp + "</span><br><span class='info-text'>Velocidad Esp: " + velEsp + "</span></div><br><center><button class='back' >Salir</button></center></div>" ;
        return show2;
      }

      // Ajax para llamar la API de Pokemón
      var pokeAjax2 = function(pokeSpecific) {
        $.ajax({
          url: 'https://pokeapi.co/api/v2/pokemon/' + pokeSpecific,
          type: 'GET',
          datatype: 'json',
        })
        .done(function(visualize) {
          showPokemon2(visualize);
          // Con ésto debe mostrar el Pokémon específico que se está preguntando
        })
        .fail(function(error) {
          console.log('La página no está funcionando');
          swal("Error! Vuelve a cargar la página");
          // Ésto se mostrara por consola y una alerta en caso de que la página no corra
        });
      }

      pokeAjax2($(this).data('id'));

    })

    // Función para buscar pokémon en search
    // Falta una función donde el botón busque realmente y no reinicie a 0 todo
    $(document).ready(function() {
      $('#pokemon-search').on('keyup', function() {
        var find = $(this).val().toLowerCase();
      $('.pokemon-cont').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(find) > -1)
      });
    });
  });


})
