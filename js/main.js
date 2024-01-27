(() => {
  const movieBox = document.querySelector("#movie-box");
  const reviewTemplate = document.querySelector("#review-template");
  const reviewCon = document.querySelector("#review-con");
  const baseUrl = `https://search.imdbot.workers.dev/`;
  // const baseUrl = `https://swapi.dev/api/films/2/`;

  function getMovies() {
    fetch(`${baseUrl}?q=The Dark Knight`)
      .then((response) => response.json())
      .then(function (response) {
        // console.log(response.description);
        const movies = response.description;
        const ul = document.createElement("ul");
        movies.forEach((movie) => {
          //   console.log(movie["#TITLE"]);
          //   console.log(movie["#IMDB_ID"]);
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = movie["#TITLE"];
          // a.href = movie["Url"];
          a.dataset.review = movie["#IMDB_ID"];
          li.appendChild(a);
          ul.appendChild(li);
        });
        movieBox.appendChild(ul);
      })
      .then(function () {
        const links = document.querySelectorAll("#movie-box li a");
        links.forEach((link) => {
          link.addEventListener("click", getReview);
        });
      })
      .catch((error) => {
        console.log(error);
        // ideally we would write to the DOM andd ket user know, something is wrong
      });
  }

  function getReview(e) {
    // console.log("getReview Called");
    // console.log(e.currentTarget.dataset.review);
    // console.log(this.dataset.review);
    const reviewID = e.currentTarget.dataset.review;
    //  https://search.imdbot.workers.dev/?tt=tt0111257
    fetch(`${baseUrl}?tt=${reviewID}`)
      .then((response) => response.json())
      .then(function (response) {
        reviewCon.innerHTML = "";
        console.log(response.short.review.reviewBody);
        const template = document.importNode(reviewTemplate.content, true);
        const reviewBody = template.querySelector(".review-description");
        reviewBody.innerHTML = response.short.review.reviewBody;
        reviewCon.appendChild(template);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMovies();
})();
