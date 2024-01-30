(() => {
  const movieBox = document.querySelector("#movie-box");
  const reviewTemplate = document.querySelector("#review-template");
  const reviewCon = document.querySelector("#review-con");
  const baseUrl = 'https://swapi.dev/api/';
  const imagesFolder = 'images/';
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



  function getRandomFilmUrl(films) {
    if (films && films.length > 0) {
      const randomIndex = Math.floor(Math.random() * films.length);
      return films[randomIndex];
    } else {
      return `${baseUrl}films/1/?format=json`;
    }
  }

  function downloadAndStoreImage(imageUrl, imageName) {
    // Implement code to download and store the image
    // Placeholder - you need to implement this part based on your requirements
  }

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

  function getStarWarsCharacters() {
    const charactersHeading = document.querySelector("#movie-box h2");
    displaySpinner(charactersHeading);

    fetch(`${baseUrl}people/?format=json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const characters = data.results;
        const ul = document.createElement("ul");

        characters.forEach(character => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = character.name;
          a.href = "#";
          a.dataset.characterUrl = character.url;
          li.appendChild(a);
          ul.appendChild(li);
        });

        removeSpinner(charactersHeading);
        charactersHeading.insertAdjacentElement("afterend", ul);
      })
      .then(() => {
        movieBox.addEventListener("click", function (e) {
          if (e.target.tagName === 'A') {
            e.preventDefault();
            getCharacterFirstMovieDetails(e.target.dataset.characterUrl);
          }
        });
      })
      .catch(error => {
        console.error(error);
        removeSpinner(charactersHeading);
      });
  }

  function getCharacterFirstMovieDetails(characterUrl) {
    let characterData;
    reviewCon.innerHTML = spinner;

    fetch(characterUrl)
      .then(response => {
        reviewCon.innerHTML = spinner;
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        characterData = data;
        const randomFilmUrl = getRandomFilmUrl(characterData.films);
        return fetch(randomFilmUrl);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(filmData => {
        const template = document.importNode(reviewTemplate.content, true);
        const reviewHeading = template.querySelector(".review-heading");
        const reviewDescription = template.querySelector(".review-description");
        const moviePoster = template.querySelector(".movie-poster");

        reviewHeading.textContent = characterData.name;
        reviewDescription.innerHTML = `
          <h4>${filmData.title}</h4>
          <p>${filmData.opening_crawl}</p>`;

        const imageName = `image${filmData.episode_id}.jpg`;
        downloadAndStoreImage(`${imagesFolder}${imageName}`, imageName);

        moviePoster.src = `${imagesFolder}${imageName}`;

        reviewCon.innerHTML = '';
        reviewCon.appendChild(template);
      })
      .catch(error => {
        console.error(error);
        reviewCon.innerHTML = '';
      });
  }

  getStarWarsCharacters();
})();
