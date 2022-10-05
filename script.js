fetchPokemonData(1);

const totalPokemon = 905;
let currPokemon = 1;
const typeColors = {"normal":"#A8A77A", "fire":"#EE8130", "water":"#6390F0", "electric":"#F7D02C", "grass":"#7AC74C", "ice":"#96D9D6", "fighting":"#C22E28", "poison":"#A33EA1", "ground":"#E2BF65", "flying":"#A98FF3", "psychic":"#F95587", "bug":"#A6B91A", "rock":"#B6A136", "ghost":"#735797", "dragon":"#6F35FC", "dark":"#705746", "steel":"#B7B7CE", "fairy":"#D685AD"};

let infomoves = [];
let infoBoxStatus = 0;

leftBtn = document.getElementById("lbutton");
rightBtn = document.getElementById("rbutton");
leftBtn.addEventListener("click", (e) => {
    currPokemon -= 1;
    if (currPokemon < 1)
        currPokemon = totalPokemon;
    fetchPokemonData(currPokemon);
});
rightBtn.addEventListener("click", (e) => {
    currPokemon += 1;
    if (currPokemon > 905)
        currPokemon = 1;
    fetchPokemonData(currPokemon);
});

infoBtn = document.getElementById("infobtn");
movesBtn = document.getElementById("movesbtn");
infoBtn.addEventListener("click", (e) => {
    //set info
    document.getElementById("infotext").textContent = infomoves[0];
    document.getElementById("infobtn").style.backgroundColor = "#7CFF79";
    document.getElementById("movesbtn").style.backgroundColor = "#E8E8E8";
    infoBoxStatus = 0;
});
movesBtn.addEventListener("click", (e) => {
    //set moves
    document.getElementById("infotext").textContent = infomoves[1];
    document.getElementById("infobtn").style.backgroundColor = "#E8E8E8";
    document.getElementById("movesbtn").style.backgroundColor = "#7CFF79";
    infoBoxStatus = 1;
});

function fetchPokemonData(pokemonIndex) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonIndex)
    .then((resp) => resp.json())
    .then((data) => {
        //set image
        document.getElementById("picture").src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + currPokemon + ".png";

        //set name
        document.getElementById("nametext").textContent = data["name"];

        //set types
        let t1 = data["types"][0]["type"]["name"];
        document.getElementById("type1").textContent = t1;
        document.getElementById("type1").style.backgroundColor = typeColors[t1];
        if (data["types"].length == 2) {
            let t2 = data["types"][1]["type"]["name"];
            document.getElementById("type2").textContent = t2;
            document.getElementById("type2").style.backgroundColor = typeColors[t2];
        }
        else {
            document.getElementById("type2").textContent = "";
            document.getElementById("type2").style.backgroundColor = "#FFFFFF";
        }

        //set info
        let stats = "";
        stats += "height: " + data["height"]/10.0 + "m\r\n"
        stats += "weight: " + data["weight"]/100.0 + "kg\r\n"
        data["stats"].forEach(e => stats += e["stat"]["name"] + ": " + e["base_stat"] + "\r\n");
        const infoTextbox = document.getElementById("infotext");
        infoTextbox.setAttribute('style', 'white-space: pre;');

        //save moves
        moves = "";
        data["moves"].forEach(e => moves += e["move"]["name"] + "\r\n");
        infomoves = [stats, moves];

        if(infoBoxStatus == 0)
            infoTextbox.textContent = stats;
        else
            infoTextbox.textContent = moves;
    });
}

//there are 905 pokemon

//height is divided by 10
//weight is divided by 100