import fetch from "node-fetch";

let currPokemon = 2;

fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((resp) => resp.json())
    .then((data) => {
        const pokemonData = data;
        console.log(pokemonData["name"]);
        console.log(pokemonData["types"][0]["type"]["name"]);
        if (pokemonData["types"].length == 2)
            console.log(pokemonData["types"][1]["type"]["name"]);
        console.log("height: " + pokemonData["height"]/10.0 + "m");
        console.log("weight: " + pokemonData["weight"]/100.0 + "kg");
        pokemonData["stats"].forEach(e => console.log(e["stat"]["name"] + ": " + e["base_stat"]));

        const textbox = document.getElementById("nametext");
        console.log(textbox);
        document.getElementById("nametext").textContent = "asdfasdf";
    });

//there are 905 pokemon

//height is divided by 10
//weight is divided by 100