(() => {
  const movieBox = document.querySelector("#movie-box");
  const reviewTemplate = document.querySelector("#review-template");
  const reviewCon = document.querySelector("#review-con");
  const baseUrl = 'https://swapi.dev/api/';
  const imagesFolder = 'images/';

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

  function getStarWarsCharacters() {
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

        movieBox.appendChild(ul);
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
      });
  }

  function getCharacterFirstMovieDetails(characterUrl) {
    let characterData;

    fetch(characterUrl)
      .then(response => {
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

        reviewHeading.textContent = characterData.name;
        reviewDescription.innerHTML = `
          <h4>${filmData.title}</h4>
          <p>${filmData.opening_crawl}</p>`;

        const imageName = `movie_poster_${filmData.episode_id}.jpg`;
        downloadAndStoreImage(`${baseUrl}images/${imageName}`, imageName);

        reviewCon.innerHTML = '';
        reviewCon.appendChild(template);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getStarWarsCharacters();
})();
