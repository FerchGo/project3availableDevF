 const baseURL = 'https://pokeapi.co/api/v2/pokemon/'   // aqui se pone el link dela api para traer la info //
 const pokemon = document.getElementById('pokemonName')       // en la constante pokemo vamos a estar guardando el nombre o id del pokemon que escribamos en el campo de texto del inpuit index html y el pokemonName lo exportamos de html index  //
 const buttonSearch = document.getElementById('searchPokemon')
 const buttonDelete = document.getElementById('deletePokemon')
 const appNode = document.getElementById('app')  // sera el nodo donde se inisertaran loos pokemones se encuentra en el html index//

 buttonSearch.addEventListener('click', insertPokemon)  // cuuando se haga clickn en la imagen se llamara la funcion insertPokemon
 buttonSearch.addEventListener('touchstart', insertPokemon)  // esta funcion es para moviles click es para pc

 buttonDelete.addEventListener('click', deletePokemon)  // cuuando se haga clickn en la imagen se llamara la funcion insertPokemon//
 buttonDelete.addEventListener('touchstart', deletePokemon) // esta funcion es para moviles clink es para pc 

 function insertPokemon(){                                 // funcion para usar la lupa de busquedas //
     window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)                                        // aqui le diremos al navegador que realice una peticion a una pagina web le realizamos la peticion a URL luego el pokemon y regla de minusculas //
        .then(Response => {                                                                          //con then realizamos la peticion y ponemos la respuesta que vamos a optener y con => la pasamos a parametro y creamos una array funtion con el if y el 404 es el codigp de internet para error //
            if (Response.status === 404) {
                alert('this is not available. Try with another one!' )                            // alert es el mensaje que nos indicara la alerta de si no cumple con algo //
            } else {
               return Response.json()
            }
        })
        .then(ResponseJSON => {
            const allItems = []                                           // aqui se guarda la info de pokemones que se pide para insertar //

            const result = []                                            // aqui se obtiene la informacion de los pokemones  //
           
           for(let pokemonInfo in ResponseJSON){
               result.push([pokemonInfo, ResponseJSON[pokemonInfo]])
            }


            console.table(result)

            //* crear imagen
           
            const pokemonImage = document.createElement('img')
            pokemonImage.src = result[14][1].front_default

            //* traeremos el nombre y id 
            const pokemonName = document.createElement('h2')
            pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`;
            
            //*Type del pokemon
            const pokemonType = document.createElement('h2')
            pokemonType.innerText = `Type: ${result[16][1][0].type.name}`;

            //*Weight 
            const pokemonWeight = document.createElement('h2')
            pokemonWeight.innerText = `Weight: ${result[17][1]}`;

            //*attack
            const pokemonAttack = document.createElement('h2')
            pokemonAttack.innerText = `Attack: ${result[15][1][3].base_stat}`;

            //*defensa
            const pokemonDefense = document.createElement('h2')
            pokemonDefense.innerText = `Defense: ${result[15][1][2].base_stat}`;

            //*guardar lainfo en una contenedor

            const container = document.createElement('div')
            container.append(pokemonImage, pokemonName, pokemonType, pokemonWeight, pokemonAttack, pokemonDefense)
            container.classList.add('container');

            allItems.push(container)

            appNode.append(...allItems)   // con el operador 3 puntos traigo todos los elementos //

         })
     }

 function deletePokemon(){                                // funcion para usar la sesta de basura y eliminar//  
     let allPokemon = appNode.childNodes
     allPokemon = Array.from(allPokemon)

     allPokemon.forEach(pokemon => {
       pokemon.remove(pokemon)
     })
 }


