(() => {
  const movieBox = document.querySelector("#movie-box");
  const reviewTemplate = document.querySelector("#review-template");
  const reviewCon = document.querySelector("#review-con");
  const baseUrl = 'https://swapi.dev/api/';
  const imagesFolder = 'images/';
  const spinner = `<svg id="custom-spinner" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
</svg>`;

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
    spinnerDiv.innerHTML = spinner;
    element.appendChild(spinnerDiv);
  }

  function removeSpinner(element) {
    const spinner = element.querySelector("#custom-spinner");
    if (spinner) {
      spinner.parentElement.remove();
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
    let characterData; reviewCon.innerHTML = spinner;

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
