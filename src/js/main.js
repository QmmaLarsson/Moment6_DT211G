"use strict";
//Variabler för sökfunktion
const searchBtnEl = document.getElementById("searchBtn");
const searchInputEl = document.getElementById("searchInput");

//Händelselyssnare för sökfunktion
searchBtnEl.addEventListener("click", checkInput);

//Funktion för sökfunktion
function checkInput() {
    let movie = searchInputEl.value;
    if (movie !== "") {
        searchMovie(movie);
    } else {
        alert("Please add a movie title.");
    }
}

async function searchMovie(movie) {
    try {
        //Fetch-anrop
        const response = await fetch(`http://www.omdbapi.com/?t=${movie}&plot=full&apikey=d68ae12b`);
        const data = await response.json();

        if (data.Response === "True") {
            //Variabler för titel, beskrivning och bild
            const movieTitle = data.Title;
            const movieGenre = data.Genre;
            const moviePlot = data.Plot;
            const movieImage = data.Poster;

            //Skådespelara sparas i en array i variabeln movieActors
            let movieActors = [];
            movieActors.length = 0;
            const actors = data.Actors.split(",").map(actor => actor.trim());
            Array.prototype.push.apply(movieActors, actors)

            //Variabel för resultat1
            const result1El = document.getElementById("result1");
            const result2El = document.getElementById("result2");

            //Skriv ut bild, titel och beskrivning till resultat1
            result1El.innerHTML = `<img src=${movieImage}><h2>${movieTitle}</h2><p>${movieGenre}</p><p>${moviePlot}</p>`;

            movieActors.forEach((actor, index) => {
                const actorBtn = document.createElement("button");
                actorBtn.textContent = actor;
                const btnId = `${index}`;
                actorBtn.id = btnId;
                result2El.appendChild(actorBtn);
            });

        } else {
            console.error(error);
        }

    } catch {
        document.getElementById("error").innerHTML = "<p>Something went wrong, please try again later.</p>"
    }
}