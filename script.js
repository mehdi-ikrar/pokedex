const btnD = document.getElementById('botcross');
const btnT = document.getElementById('topcross');
const blueBtn = document.getElementById('button-blue');
const redBtn = document.getElementById('button-red');
const namePokemon = document.getElementById('name-screen');
const numberPokemon = document.getElementById('number-pokemon');
const imgPokemon = document.getElementById('picture');
const screen1 = document.getElementById('extra-info-screen-1');
const screen2 = document.getElementById('extra-info-screen-2');
const type1 = document.getElementById('type1');
const type2 = document.getElementById('type2');
const screenDescription = document.getElementById('screen-description');
function getAssetTypeEn(i){
    switch(i){
      case 'normal':
        return 'https://www.pokepedia.fr/images/4/40/Miniature_Type_T%C3%A9racristal_Normal_EV.png?20221125220450';
      case 'fighting':
        return 'https://www.pokepedia.fr/images/5/50/Miniature_Type_T%C3%A9racristal_Combat_EV.png?20221125221209';
      case 'flying':
        return 'https://www.pokepedia.fr/images/2/22/Miniature_Type_T%C3%A9racristal_Vol_EV.png?20221125220913';
      case 'poison':
        return 'https://www.pokepedia.fr/images/thumb/5/5e/Miniature_Type_T%C3%A9racristal_Poison_EV.png/160px-Miniature_Type_T%C3%A9racristal_Poison_EV.png';
      case 'ground':
        return 'https://www.pokepedia.fr/images/9/9f/Miniature_Type_T%C3%A9racristal_Sol_EV.png?20221125220406';
      case 'rock':
        return 'https://www.pokepedia.fr/images/0/0d/Miniature_Type_T%C3%A9racristal_Roche_EV.png?20221125220849';
      case 'bug':
        return 'https://www.pokepedia.fr/images/8/89/Miniature_Type_T%C3%A9racristal_Insecte_EV.png?20221125221115';
      case 'ghost':
        return 'https://www.pokepedia.fr/images/1/14/Miniature_Type_T%C3%A9racristal_Spectre_EV.png?20221125221054';
      case 'steel':
        return 'https://www.pokepedia.fr/images/f/f3/Miniature_Type_T%C3%A9racristal_Acier_EV.png?20221125220630';
      case 'fire':
        return 'https://www.pokepedia.fr/images/1/1e/Miniature_Type_T%C3%A9racristal_Feu_EV.png?20221125220248';
      case 'water':
        return 'https://www.pokepedia.fr/images/1/19/Miniature_Type_T%C3%A9racristal_Eau_EV.png?20221125220427';
      case 'grass':
        return 'https://www.pokepedia.fr/images/3/39/Miniature_Type_T%C3%A9racristal_Plante_EV.png?20221125220649';
      case 'electric':
        return 'https://www.pokepedia.fr/images/c/c2/Miniature_Type_T%C3%A9racristal_%C3%89lectrik_EV.png?20221125220809';
      case 'psychic':
        return 'https://www.pokepedia.fr/images/d/dc/Miniature_Type_T%C3%A9racristal_Psy_EV.png?20221125220828';
      case 'ice':
        return 'https://www.pokepedia.fr/images/c/c4/Miniature_Type_T%C3%A9racristal_Glace_EV.png?20221125220554';
      case 'dragon':
        return 'https://www.pokepedia.fr/images/1/1d/Miniature_Type_T%C3%A9racristal_Dragon_EV.png?20221125220737';
      case 'dark':
        return 'https://www.pokepedia.fr/images/e/e4/Miniature_Type_T%C3%A9racristal_T%C3%A9n%C3%A8bres_EV.png?20221125221140';
      case 'fairy':
        return 'https://www.pokepedia.fr/images/9/9a/Miniature_Type_T%C3%A9racristal_F%C3%A9e_EV.png?20221125221029';
      default:
        return 'https://www.pokepedia.fr/images/b/bb/Miniature_Type_Inconnu_Colo.png?20190525164800';
    }
  }


  async function getArticles() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=649 ");
    const data = await response.json();
    return data.results;
  }
  
  async function catchPokemon() {
    const results = await getArticles();
    let numPokemon = 0;
    console.log(results);
  
    function displayPokemon() {
      const url = results[numPokemon].url;
      fetch(url)
        .then(response => response.json())
        .then(pokemon => {
          console.log(pokemon);
          screen1.textContent = `${pokemon.height / 10} m`;
          screen2.textContent = `${pokemon.weight / 10} kg`;
          imgPokemon.src = pokemon.sprites.other.home.front_default;
          numberPokemon.textContent = pokemon.order;
          
          console.log(pokemon);
          type1word = getAssetTypeEn(pokemon.types[0].type.name)
          type1.src = type1word
          if (pokemon.types.length > 1) {
            type2word = getAssetTypeEn(pokemon.types[1].type.name);
            type2.src = type2word;
          } else {
            type2.src = type1word
          }
          fetch(pokemon.species.url)
            .then(reponse => reponse.json())
            .then(data => {
              pokeSpe = data
              console.log(pokeSpe);
              namePokemon.textContent = pokeSpe.names[4].name
              let description = pokeSpe.flavor_text_entries
                screenDescription.innerHTML = description[40].flavor_text
            })

          blueBtn.addEventListener('click',()=>{
            imgPokemon.src = pokemon.sprites.other.home.front_shiny;
          })
          redBtn.addEventListener('click',()=>{
            imgPokemon.src = pokemon.sprites.other.home.front_default;
          })

        });
    }
  
    btnT.addEventListener('click', () => {
      numPokemon = (numPokemon + 1) % results.length;
      displayPokemon();
    });
  
    btnD.addEventListener('click', () => {
      numPokemon = (numPokemon - 1 + results.length) % results.length;
      displayPokemon();
    });

  
    displayPokemon();
  }
  
  catchPokemon();


/*async function catchPokemon(){
    let resutlt = await getArticles()
    console.log(resutlt);
    let resultat = resutlt.results
    var compte = resultat[Math.floor(Math.random()*resultat.length)]    
    console.log(compte);
    
    screen1.innerHTML = compte.height
    screen2.innerHTML = compte.weight
    fetch(compte.url)
        .then(reponse => reponse.json())
        .then(data => {
            let resultsSpe = data
            console.log(resultsSpe);
            imgPokemon.src = resultsSpe.sprites.other.dream_world.front_default
            
            screen1.innerHTML = resultsSpe.height /10 +"  m"
            screen2.innerHTML = resultsSpe.weight /10 + "  kg"
            type1Word = getAssetTypeEn(resultsSpe.types[0].type.name)
            type1.src = type1Word
            
            //type2word = getAssetTypeEn(resultsSpe.types[1].type.name)
            //type2.src = type2word
            //console.log(type2)
            fetch(resultsSpe.species.url)
              .then(reponse => reponse.json())
              .then(data => {
              
                let description = data.flavor_text_entries
                screenDescription.innerHTML = description[40].flavor_text
                console.log(description)
                console.log(resultsSpe.species.url)
                fetch(resultsSpe.species.url)
                .then(reponse => reponse.json())
                .then(data => {
                    let nameFr = data
                    console.log(nameFr.names[4]);
                    namePokemon.innerHTML = nameFr.names[4].name

                })
                 
            
              }
            
            )
        })
}
function recup(){
  
}
btn2
//btn.addEventListener('click', catchPokemon);

*/