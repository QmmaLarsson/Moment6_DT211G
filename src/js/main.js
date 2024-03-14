"use strict";
//Variabler för sökfunktion
const searchBtnEl = document.getElementById("searchBtn");
const searchInputEl = document.getElementById("searchInput");

//Händelselyssnare och funktion för sökfunktion
searchBtnEl.addEventListener("click", checkInput, false);

function checkInput() {
    let movie = searchInputEl.value;
    if (movie !== "") {
        searchMovie(movie);
    } else {
        alert("Skriv in en filmtitel.");
    }
}

async function searchMovie(movie) {
    try {
        //Fetch-anrop
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=5980c8441267fa0280955a5da15fe080`);
        const data = await response.json();

    } catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare.</p>"
    }
}