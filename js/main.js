(() => {
  const movieBox = document.querySelector("#movie-box");
  const reviewCon = document.querySelector("#review-con");
  const spinner = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="281px" height="281px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="translate(50 50) scale(0.73) translate(-50 -50)">
        <g>
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" calcMode="spline" dur="4s" values="0 50 50;90 50 50;180 50 50;270 50 50;360 50 50" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 1 0 1;0 1 0 1;0 1 0 1;0 1 0 1"></animateTransform>
          <g>
            <animateTransform attributeName="transform" type="scale" dur="1s" repeatCount="indefinite" calcMode="spline" values="1;1;0.5" keyTimes="0;0.5;1" keySplines="1 0 0 1;1 0 0 1"></animateTransform>
            <g transform="translate(25 25)">
              <rect x="-25" y="-25" width="52" height="52" fill="#e15b64">
                <animate attributeName="fill" dur="4s" repeatCount="indefinite" calcMode="spline" values="#e15b64;#f47e60;#f8b26a;#abbd81;#e15b64" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 1 0 1;0 1 0 1;0 1 0 1;0 1 0 1"></animate>
              </rect>
            </g>
            <g transform="translate(25 75)">
              <rect x="-25" y="-25" width="52" height="50" fill="#e15b64">
                <animateTransform attributeName="transform" type="scale" dur="1s" repeatCount="indefinite" calcMode="spline" values="0;1;1" keyTimes="0;0.5;1" keySplines="1 0 0 1;1 0 0 1"></animateTransform>
                <animate attributeName="fill" dur="4s" repeatCount="indefinite" calcMode="spline" values="#e15b64;#f47e60;#f8b26a;#abbd81;#e15b64" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 1 0 1;0 1 0 1;0 1 0 1;0 1 0 1"></animate>
              </rect>
            </g>
            <g transform="translate(75 25)">
              <rect x="-25" y="-25" width="50" height="52" fill="#e15b64">
                <animateTransform attributeName="transform" type="scale" dur="1s" repeatCount="indefinite" calcMode="spline" values="0;1;1" keyTimes="0;0.5;1" keySplines="1 0 0 1;1 0 0 1"></animateTransform>
                <animate attributeName="fill" dur="4s" repeatCount="indefinite" calcMode="spline" values="#e15b64;#f47e60;#f8b26a;#abbd81;#e15b64" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 1 0 1;0 1 0 1;0 1 0 1;0 1 0 1"></animate>
              </rect>
            </g>
            <g transform="translate(75 75)">
              <rect x="-25" y="-25" width="50" height="50" fill="#e15b64">
                <animateTransform attributeName="transform" type="scale" dur="1s" repeatCount="indefinite" calcMode="spline" values="0;1;1" keyTimes="0;0.5;1" keySplines="1 0 0 1;1 0 0 1"></animateTransform>
                <animate attributeName="fill" dur="4s" repeatCount="indefinite" calcMode="spline" values="#e15b64;#f47e60;#f8b26a;#abbd81;#e15b64" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 1 0 1;0 1 0 1;0 1 0 1;0 1 0 1"></animate>
              </rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `;

  function displaySpinner(element) {
    const spinnerDiv = document.createElement('div');
    spinnerDiv.classList.add('custom-spinner');
    spinnerDiv.innerHTML = spinner;
    element.appendChild(spinnerDiv);
  }

  function removeSpinner(element) {
    const spinnerDiv = element.querySelector(".custom-spinner");
    if (spinnerDiv) {
      spinnerDiv.remove();
    }
  }

  function displayCharacters() {
    displaySpinner(movieBox);
    fetch('https://swapi.dev/api/people/?format=json')
      .then(response => response.json())
      .then(data => {
        removeSpinner(movieBox);
        const characterList = document.createElement("ul");
        data.results.forEach(character => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.textContent = character.name;
          link.href = "#";

          // Randomly select a film URL from the character's film list
          const filmIndex = Math.floor(Math.random() * character.films.length);
          link.dataset.filmUrl = character.films[filmIndex];

          link.addEventListener("click", (e) => {
            e.preventDefault();
            displayMovieDetails(link.dataset.filmUrl);
          });
          listItem.appendChild(link);
          characterList.appendChild(listItem);
        });
        movieBox.appendChild(characterList);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
        removeSpinner(movieBox);
      });
  }


  function displayMovieDetails(filmUrl) {
    reviewCon.innerHTML = '';  // Clear previous content
    displaySpinner(reviewCon);

    fetch(filmUrl)
      .then(response => response.json())
      .then(filmData => {
        const movieImage = `images/image${filmData.episode_id}.jpg`; // Image name matches the episode_id
        reviewCon.innerHTML = `
          <h3>${filmData.title}</h3>
          <div>
            <p>${filmData.opening_crawl}</p>
            <img src="${movieImage}" alt="Movie Poster: ${filmData.title}">
          </div>`;
        removeSpinner(reviewCon);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        removeSpinner(reviewCon);
      });
  }

  displayCharacters();
})();
