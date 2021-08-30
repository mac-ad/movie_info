const detailOverlay = document.querySelector(".detail-overlay");
const removeOverlayBtn = detailOverlay.querySelector("i");
const movieImage = detailOverlay.querySelector(
  ".detail-overlay__movie-image img"
);
const detailContainer = detailOverlay.querySelector(".detail-container");

removeOverlayBtn.addEventListener("click", () => {
  detailOverlay.style.visibility = "hidden";
});

let constructCastsDiv = (data) => {
  let people = document.createElement("div");
  people.classList.add("person");
  people.innerHTML = ` <div class="image" title = "${data.name} as ${data.character}">
        <img
        src="https://image.tmdb.org/t/p/w154/${data.profile_path}"
        alt=""
        />
        </div>`;

  return people;
};

let createGenreContainer = (genre) => {
  let d = document.createElement("span");
  d.innerHTML = genre.name;
  return d;
};

let viewMovieDetail = () => {
  let api_key = "917d4a4bdb767099d63b1be403c4f192";
  const api_url = `${event.target.dataset.url}?api_key=${api_key}`;

  fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      detailOverlay.style.visibility = "visible";

      detailContainer.innerHTML = `<div class="detail-overlay__movie-image">
                <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="" />
                </div>
                <div class="movie-details">
                    <div class="movie-title">${data.title}(${data.original_language})</div>
                    <div class="synopsis">${data.overview}</div>
                    <div class = "small-details">
                        <div class = "rating">
                            <i class = 'fas fa-star'></i>
                            <span class = 'rating-value'>${data.vote_average}</span>
                        </div>
                        <div class = "runtime">
                            ${data.runtime} min
                        </div>
                        
                    </div>
                </div>`;
      const smallDetails = document.querySelector(".small-details");
      let genresContainer = document.createElement("div");
      genresContainer.classList.add("genres");
      const genres = data.genres;

      genres.forEach((g) => {
        genresContainer.append(createGenreContainer(g));
      });
      smallDetails.append(genresContainer);
      //   console.log("data.home_page = ", data.home_page);
      let link = document.createElement("a");
      link.setAttribute("href", data.homepage);
      link.classList.add("watch_link");
      link.innerHTML = "watch movie";
      console.log(link);
      smallDetails.append(link);

      const casts = document.createElement("div");
      casts.classList.add("casts");

      fetch(
        `https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=917d4a4bdb767099d63b1be403c4f192`
      )
        .then((res) => res.json())
        .then((data) => {
          all = data.cast;
          console.log(all);
          all.forEach((one) => {
            let item = constructCastsDiv(one);
            casts.append(item);
          });
        });
      //   console.log(casts);
      detailContainer.append(casts);
    });
};
