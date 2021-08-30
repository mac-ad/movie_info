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

const pagination = document.querySelector(".pagination");

// for pagination

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
  if (!movie.release_date || !movie.poster_path) return;
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
            <div class="type">movie</div>
            </div>
            </div>
            </div>`;

  return movieBlock;
};

let addDott = () => {
  dott = document.createElement("span");
  dott.innerHTML = "...";
  dott.classList.add("dott");
  return dott;
};

let createPagination = (type, query, totalPages, page_no) => {
  pagination.innerHTML = "";
  let active = page_no;
  let beforePage = page_no - 1;
  let afterPage = parseInt(page_no) + 1;

  if (active < 3) {
    for (let i = 1; i <= 3; i++) {
      let btn = document.createElement("span");
      btn.setAttribute("data-page_no", i);
      btn.innerHTML = i;
      pagination.append(btn);
    }

    pagination.append(addDott());
    let btn = document.createElement("span");
    btn.setAttribute("data-page_no", totalPages);
    btn.innerHTML = totalPages;
    pagination.append(btn);
  }

  if (active >= 3 && active < parseInt(totalPages) - 3) {
    let btn = document.createElement("span");
    btn.setAttribute("data-page_no", 1);
    btn.innerHTML = 1;
    pagination.append(btn);
    pagination.append(addDott());

    // before
    btn = document.createElement("span");
    btn.setAttribute("data-page_no", beforePage);
    btn.innerHTML = beforePage;
    pagination.append(btn);
    //active
    btn = document.createElement("span");
    btn.setAttribute("data-page_no", active);
    btn.innerHTML = active;
    pagination.append(btn);

    // after
    btn = document.createElement("span");
    btn.setAttribute("data-page_no", afterPage);
    btn.innerHTML = afterPage;
    pagination.append(btn);

    pagination.append(addDott());

    // last
    btn = document.createElement("span");
    btn.setAttribute("data-page_no", totalPages);
    btn.innerHTML = totalPages;
    pagination.append(btn);
  }

  if (active >= parseInt(totalPages) - 3) {
    let btn = document.createElement("span");
    btn.setAttribute("data-page_no", 1);
    btn.innerHTML = 1;
    pagination.append(btn);
    pagination.append(addDott());

    // before
    btn = document.createElement("span");
    btn.setAttribute("data-page_no", beforePage);
    btn.innerHTML = beforePage;
    pagination.append(btn);
    //active
    btn = document.createElement("span");
    btn.setAttribute("data-page_no", active);
    btn.innerHTML = active;
    pagination.append(btn);
    if (parseInt(page_no) <= totalPages - 2) {
      pagination.append(addDott());
    }
    if (parseInt(totalPages) != parseInt(page_no)) {
      // last
      btn = document.createElement("span");
      btn.setAttribute("data-page_no", totalPages);
      btn.innerHTML = totalPages;
      pagination.append(btn);
    }
  }

  let buttons = pagination.querySelectorAll("span");
  console.log(buttons);
  buttons.forEach((btn) => {
    if (parseInt(btn.dataset.page_no) == active) {
      btn.classList.add("active");
    }
  });

  const paginationBtns = pagination.querySelectorAll("span");

  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (type == "trending") {
        getData(type, "no-query", event.target.dataset.page_no);
      } else if (type == "searching") {
        getData(type, query, event.target.dataset.page_no);
      }
      window.scrollTo(0, 0);
    });
  });
};

// getting data
function getData(type, query, page_no) {
  const api_key = "917d4a4bdb767099d63b1be403c4f192";
  let Base_url = "https://api.themoviedb.org/3/";
  if (main.querySelector(".main-container")) {
    main.removeChild(main.querySelector(".main-container"));
  }
  // loadingSpinner.style.display = "block";
  let api_url;
  if (type === "trending") {
    api_url = `${Base_url}trending/movie/week?api_key=${api_key}&page=${page_no}`;
  } else if (type === "searching") {
    api_url = `${Base_url}search/movie?api_key=${api_key}&query=${query}&page=${page_no}`;
  }

  fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      // mainContainer.innerHTML = "";
      if (main.querySelector(".main-container")) {
        main.remove(main.querySelector(".main-container"));
      }
      let movies = data.results;
      // if (parseInt(page_no) === 1) {
      createPagination(type, query, data.total_pages, page_no);
      // }
      console.log(data);
      mainContainer = document.createElement("div");
      mainContainer.classList.add("main-container");
      movies.forEach((movie) => {
        m = construct_movie_container(Base_url, movie);
        if (m != undefined) {
          mainContainer.append(m);
        }
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
getData("trending", "no-query", 1);

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
