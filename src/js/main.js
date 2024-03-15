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
        const response = await fetch(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=d68ae12b`);
        const data = await response.json();

        if (data.Response === "True") {
            //Variabler för titel, beskrivning och bild
            const movieTitle = data.Title;
            const movieGenre = data.Genre;
            const moviePlot = data.Plot;
            const movieImage = data.Poster;

            //Skådespelara sparas i en array i variabeln movieActors
            const movieActors = data.Actors.split(",").map(actor => actor.trim());

            //Variabel för resultat1
            const result1El = document.getElementById("result1");
            const result2El = document.getElementById("result2");
            const result3El = document.getElementById("result3");

            //Skriv ut bild, titel och beskrivning till resultat1
            result1El.innerHTML = `<img src=${movieImage}><h2>${movieTitle}</h2><p>${movieGenre}</p><p>${moviePlot}</p>`;

            //Ta bort tidigare knappar
            result2El.innerHTML = "";

            //Ta bort tidigare sökresultat
            result3El.innerHTML = "";

            //Skriv ut skådespelarna i form av knappar
            movieActors.forEach((actor, index) => {
                const actorBtn = document.createElement("button");
                actorBtn.textContent = actor;
                const btnId = `${index}`;
                actorBtn.id = btnId;
                result2El.appendChild(actorBtn);

                //Händelsehanterare till knapparna för skådespelarna
                actorBtn.addEventListener("click", actorSearch);
            });

        } else {
            console.error("Something went wrong.", error);
            document.getElementById("error").innerHTML = "<p>Something went wrong, please try again later.</p>";
        }

    } catch {
        console.error("Something went wrong.", error);
        document.getElementById("error").innerHTML = "<p>Something went wrong, please try again later.</p>";
    }
}

//Funktion till knapparna för skådespelarna
async function actorSearch() {
    //Hämta namnet på skådespelaren från knappen
    const actor = this.textContent;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=5980c8441267fa0280955a5da15fe080&query=${actor}`);
        const data = await response.json();

        if (data.Response = "True") {
            //Variabler
            const movies = data.results[0].known_for;
            const result3El = document.getElementById("result3");
            const actorsMovies = movies.map(movie => movie.title || movie.name);

            ///Ta bort tidigare resultat
            result3El.innerHTML = "";

            actorsMovies.forEach((movie, index) => {
                const movieLink = document.createElement("a");
                movieLink.textContent = movie;
                const linkId = `${index}`;
                movieLink.id = linkId;
                movieLink.href = "#";
                result3El.appendChild(movieLink);
                result3El.appendChild(document.createElement("br"));

                //Händelsehanterare till knapparna för skådespelarna
                movieLink.addEventListener("click", function() {
                    searchMovie(movie);
                });
            });

        } else {
            console.error("Something went wrong.", error);
            document.getElementById("error").innerHTML = "<p>Something went wrong, please try again later.</p>";
        }

    } catch (error) {
        console.error("Something went wrong.", error);
        document.getElementById("error").innerHTML = "<p>Something went wrong, please try again later.</p>";
    }
}