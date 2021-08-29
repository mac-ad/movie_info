// search result quick realtime
searchInput.addEventListener("keyup", () => {
  let count = 0;
  console.log("sdfd");
  let query = event.target.value;
  query = query.replaceAll(" ", "+");
  console.log(query);
  let Base_url = "https://api.themoviedb.org/3/";
  const api_key = "917d4a4bdb767099d63b1be403c4f192";
  const api_url = `${Base_url}search/movie?api_key=${api_key}&query=${query}`;

  // /search/multi
  fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      searchResultItemsContainer.innerHTML = " ";
      // searchResultContainer.style.display = "block";
      data.results.forEach((datum) => {
        if (datum.release_date) {
          release_date = datum.release_date.substring(0, 4);
        }
        console.log(release_date);
        if (data.results != null && count < 5) {
          count++;
          let image_url;
          image_url = datum.poster_path;
          const item = document.createElement("div");
          item.classList.add("item");
          item.innerHTML = `
            <a href = "" ><div class="image">
            <img src="https://image.tmdb.org/t/p/w92/${image_url}" alt="">
            </div>
            <div class="details">
              <div class="title">${datum.title}</div>
            <div class="rating">
              <i class="fas fa-star"></i>
              <span class="count">${datum.vote_average}</span>
            </div>
            <div class="release-date">${release_date}</div>
          </div></a>
      `;
          searchResultItemsContainer.append(item);
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
