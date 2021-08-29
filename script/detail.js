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
                </div>`;
      const casts = document.createElement("div");
      casts.classList.add("casts");
      //   let titleDiv = document.createElement("div");
      //   titleDiv.innerHTML = `Casts`;
      //   casts.append(titleDiv);
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
