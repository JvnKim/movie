const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzRlYTY3NmQ4N2NlMDdlNThmZmMxYzk3YTA1YTJmYiIsInN1YiI6IjY2MjllNzRjOGQ3N2M0MDA5YTJkOTBkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Nly1A4A-vAAfwDBsU_T6039Q67jCPyRVkVA4Ky05e-I",
  },
};

const movieContainer = document.getElementById("movie-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const goToInitialState = () => {
  searchInput.value = "";
  fetchTopRatedMovies();
};

document.querySelector(".title").addEventListener("click", goToInitialState);

const createMovieElement = (movie) => {
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");
  movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-content">
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <p class="movie-rating">Rating: ${movie.vote_average}</p>
      </div>`;
  movieElement.addEventListener("mouseenter", () => {
    movieElement.classList.add("hovered");
  });
  movieElement.addEventListener("mouseleave", () => {
    movieElement.classList.remove("hovered");
  });
  movieElement.addEventListener("click", () => {
    alert(
      `Movie Name: ${movie.title}\nMovie ID: ${movie.id}\nRating: ${movie.vote_average}`
    );
  });
  return movieElement;
};

const fetchMovies = (url) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      renderMovies(movies);
    })
    .catch((err) => console.error(err));
};

const fetchTopRatedMovies = () => {
  fetchMovies(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  );
};

const searchMovies = () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    movieContainer.innerHTML = "";
    fetchMovies(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US&page=1`
    );
  } else {
    console.log("Please enter a search term.");
  }
};

const renderMovies = (movies) => {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieElement = createMovieElement(movie);
    movieContainer.appendChild(movieElement);
  });
};

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && event.target === searchInput) {
    event.preventDefault();
    searchMovies();
  }
});

searchButton.addEventListener("click", searchMovies);
searchButton.addEventListener("keyup", searchMovies);

searchInput.focus();
fetchTopRatedMovies();
