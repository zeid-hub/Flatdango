document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movie-list");
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieDescription = document.getElementById("movie-description");
    const movieRuntime = document.getElementById("movie-runtime");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketBtn = document.getElementById("buy-ticket-btn");
  
    fetch("http://localhost:3000/films")
      .then((res) => res.json())
      .then((movies) => {
        updateMovieList(movies);
        if (movies.length > 0) {
          updateMovieDetails(movies[0]);
        }
      })
      .catch((error) => console.error("Error fetching movie data", error));
  
    function updateMovieList(movies) {
      movieList.innerHTML = "";
      movies.forEach((movie, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = ${index + 1}. ${movie.title};
        listItem.addEventListener("click", () => {
          updateMovieDetails(movie);
        });
        movieList.appendChild(listItem);
      });
    }
  
    function updateMovieDetails(movie) {
      moviePoster.style.backgroundImage = url('${movie.poster}');
      movieTitle.innerText = movie.title;
      movieDescription.innerText = movie.description;
      movieRuntime.innerText = movie.runtime;
      const remainingTickets = Math.max(0, movie.capacity - movie.tickets_sold);
      availableTickets.innerText = remainingTickets;
    }
  
    buyTicketBtn.addEventListener("click", () => {
      buyTicket();
    });
  
    function buyTicket() {
      const remainingTickets = parseInt(availableTickets.innerText);
      if (remainingTickets > 0) {
        availableTickets.innerText = remainingTickets - 1;
        alert("Ticket bought successfully!");
      } else {
        alert("Sorry, no more tickets left!");
      }
    }
  });