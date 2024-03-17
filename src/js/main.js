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

//Variabler för elementen i HTML-dokumentet
const resultEl = document.getElementById("result");
const container2El = document.getElementById("container2");
const result1El = document.getElementById("result1");
const result2El = document.getElementById("result2");
const result3El = document.getElementById("result3");
const errorEl = document.getElementById("error");

async function searchMovie(movie) {
    try {
        //Fetch-anrop
        const response = await fetch(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=d68ae12b`);
        const data = await response.json();

        if (data.Response === "True") {

            //Variabler för titel, utgivningsår, genre, beskrivning, regissör och bild
            const movieTitle = data.Title;
            const movieYear = data.Year;
            const movieGenre = data.Genre;
            const moviePlot = data.Plot;
            const movieDirector = data.Director;
            const movieImage = data.Poster;

            //Skådespelara sparas i en array i variabeln movieActors
            const movieActors = data.Actors.split(",").map(actor => actor.trim());

            //Ta bort tidigare information
            resultEl.innerHTML = "";
            
            //Skapa en picture-tagg med olika källor för olika format
            const movieImageEl = document.createElement('picture');
            movieImageEl.innerHTML = `<source srcset="${movieImage}?as=avif&width=300" type="image/avif"><source srcset="${movieImage}?as=webp&width=300" type="image/webp"><source srcset="${movieImage}?width=300" type="image/jpeg"><img id="movieImage" src="${movieImage}?width=300" alt="Movie Poster">`;
            resultEl.appendChild(movieImageEl);

            //Skriv ut information om film
            result1El.innerHTML = `<h1 id="movieTitle">${movieTitle} (${movieYear})</h1><p id="movieGenre">${movieGenre}</p><p id="moviePlot">${moviePlot}</p><p><b>Director</b></p><p id="movieDirector">${movieDirector}</p>`;
            container2El.style.display = "grid";

            //Ta bort tidigare information
            result2El.innerHTML = "";
            result3El.innerHTML = "";
            errorEl.innerHTML = "";

            //Skriv ut rubrik
            result2El.innerHTML = `<p><b>Actors<b></p>`;

            //Skriv ut skådespelarna i form av knappar
            movieActors.forEach((actor, index) => {
                const actorBtn = document.createElement("button");
                actorBtn.textContent = actor;
                const btnId = `${index}`;
                actorBtn.class = btnId;
                result2El.appendChild(actorBtn);

                //Händelsehanterare till knapparna för skådespelarna
                actorBtn.addEventListener("click", actorSearch);

                //Töm input-fältet efter sökning
                searchInputEl.value = "";
            });

            result3El.innerHTML = `<p id="buttonInfo">Click on an actor to display some of the movies they are most known for.</p>`;

        } else {
            console.error("Something went wrong.", error);
            error.innerHTML = "<p>Something went wrong, please try again later.</p>";
        }

    } catch {
        console.error("Something went wrong.", error);
        error.innerHTML = "<p>Something went wrong, please try again later.</p>";
    }
}

//Funktion till knapparna för skådespelarna
async function actorSearch() {
    //Hämta namnet på skådespelaren från knappen
    const actor = this.textContent;
    try {
        //Fetch-anrop
        const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=5980c8441267fa0280955a5da15fe080&query=${actor}`);
        const data = await response.json();

        if (data.Response = "True") {
            //Variabler för filmerna skådespelaren är mest känd för
            const movies = data.results[0].known_for;
            const actorsMovies = movies.map(movie => movie.title || movie.name);

            //Ta bort tidigare resultat
            result3El.innerHTML = "";

            //Skriv ut filmerna i form av länkar
            actorsMovies.forEach((movie) => {
                const movieLink = document.createElement("a");
                movieLink.textContent = movie;
                movieLink.href = "#";
                result3El.appendChild(movieLink);
                result3El.appendChild(document.createElement("br"));

                //Händelsehanterare till länkarna för filmerna
                movieLink.addEventListener("click", function () {
                    searchMovie(movie);
                });
            });

        } else {
            console.error("Something went wrong.", error);
            error.innerHTML = "<p>Something went wrong, please try again later.</p>";
        }

    } catch (error) {
        console.error("Something went wrong.", error);
        error.innerHTML = "<p>Something went wrong, please try again later.</p>";
    }
}