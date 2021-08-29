const body = document.querySelector("body");

const searchBar = document.querySelector(".search");
const searchToggler = searchBar.querySelector("i.search-toggler");
const searchForm = searchBar.querySelector("form");
const searchInput = searchForm.querySelector('input[type="text"]');

const navMenuBar = document.querySelector("nav #menu");
const navMenuToggler = navMenuBar.querySelector(".toggler i");
const navMenu = navMenuBar.querySelector("nav #menu .menu");

const ulContentsAll = navMenu.querySelectorAll("li ul.contents");
const menuNavHeadlines = navMenuBar.querySelectorAll(".nav-headlines > li");

const searchResultContainer = searchBar.querySelector(".search-results");
const searchResultItemsContainer =
  searchResultContainer.querySelector(".items");

const main = document.querySelector("section#main");
const loadingSpinner = main.querySelector(".loading-spinner");

if (window.innerWidth < "768") {
  window.addEventListener("click", () => {
    if (event.target.tagName.toLowerCase() === "html") {
      searchForm.style.display = "none";
      const allCheckboxes = document.querySelectorAll(
        '#menu input[type="checkbox"]'
      );
      allCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
} else {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.disabled = true;
  });
}

let construct_movie_container = (Base_url, movie) => {
  movieBlock = document.createElement("div");
  movieBlock.classList.add("movie");
  movieBlock.innerHTML = `<div class="movie" data-url = "${Base_url}movie/${
    movie.id
  }" title = "${movie.title}" >
            <div class="movie-image">
            <img
            src="https://image.tmdb.org/t/p/w154/${movie.poster_path}"
            alt=""
            />
            </div>
            <div class="info__short">
            <div class="title">${movie.title}</div>
            <div class="rest__info">
            <span class="release_data"> ${movie.release_date.substring(
              0,
              4
            )} </span>
            <i class = "fas fa-circle"></i>
            <span class="running_time">
            <span class="figure"><i class = "fas fa-star"></i></span>
            <span class="timeUnit">${movie.vote_average}</span>
            </span>
            <div class="type">${movie.media_type}</div>
            </div>
            </div>
            </div>`;

  return movieBlock;
};

// getting data
function getData() {
  const api_key = "917d4a4bdb767099d63b1be403c4f192";
  let Base_url = "https://api.themoviedb.org/3/";
  if (main.querySelector(".main-container")) {
    main.removeChild(main.querySelector(".main-container"));
  }
  // loadingSpinner.style.display = "block";
  let api_url;
  api_url = `${Base_url}trending/movie/week?api_key=${api_key}`;

  fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      let movies = data.results;
      console.log(movies);
      mainContainer = document.createElement("div");
      mainContainer.classList.add("main-container");
      movies.forEach((movie) => {
        m = construct_movie_container(Base_url, movie);
        mainContainer.append(m);
      });
      main.append(mainContainer);
      loadingSpinner.style.display = "none";
      movies = main.querySelectorAll(".movie");
      movies.forEach((movie) => {
        movie.addEventListener("click", () => {
          viewMovieDetail();
        });
      });
    })
    .catch((err) => {
      console.log("error occures", err);
    });
}
getData();

// getting genre
// const genreContainer = navMenu.querySelector("ul.genre-contents");
// let Base_url = "https://api.themoviedb.org/3/";
// const api_key = "917d4a4bdb767099d63b1be403c4f192";
// api_url = `${Base_url}/genre/movie/list?api_key=${api_key}`;

// fetch(api_url)
//   .then((res) => res.json())
//   .then((genres) => {
//     genres.genres.forEach((genre) => {
//       li = document.createElement("li");
//       li.setAttribute("data-genreId", genre.id);
//       li.innerHTML = `
//           <a href="" title="">${genre.name}</a>
//       `;
//       genreContainer.append(li);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
