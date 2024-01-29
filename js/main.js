(() => {
  const characterBox = document.querySelector("#movie-box");
  const reviewTemplate = document.querySelector("#review-template");
  const reviewCon = document.querySelector("#review-con");
  const baseUrl = 'https://swapi.dev/api/';

  function fetchStarWarsCharacters() {
    fetch(`${baseUrl}people/?format=json`)
      .then((response) => response.json())
      .then(function (data) {
        const characters = data.results;
        const ul = document.createElement("ul");
        characters.forEach((character) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = character.name;
          a.href = "#";
          a.dataset.characterUrl = character.url; // Store character URL
          li.appendChild(a);
          ul.appendChild(li);
        });
        characterBox.appendChild(ul);
      })
      .then(function () {
        const links = document.querySelectorAll("#movie-box li a");
        links.forEach((link) => {
          link.addEventListener("click", fetchCharacterDetails);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchCharacterDetails(e) {
    e.preventDefault();
    const characterUrl = e.currentTarget.dataset.characterUrl;
    fetch(characterUrl)
      .then((response) => response.json())
      .then(function (characterData) {
        // Display character details in the #review-con section
        reviewCon.innerHTML = '';
        const template = document.importNode(reviewTemplate.content, true);
        const reviewHeading = template.querySelector(".review-heading");
        const reviewDescription = template.querySelector(".review-description");
        reviewHeading.textContent = characterData.name;
        reviewDescription.textContent = `Height: ${characterData.height} cm\nMass: ${characterData.mass} kg\nHair Color: ${characterData.hair_color}`;
        reviewCon.appendChild(template);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchStarWarsCharacters();
})();
