import {
  getLocalStorage,
  setLocalStorage,
  getStorageKey,
} from "../utils/utils.mjs";

export default class CatDetails {
  constructor(catName, dataSource) {
    this.catName = catName;
    this.dataSource = dataSource;
    this.cat = [];
  }

  async initialize() {
    this.cat = await this.dataSource.findCatByName(this.catName);
    const image = await this.dataSource.findImagebyId(this.cat[0].id);
    const imageList = await this.dataSource.getImageList();
    this.renderCatDetails("detailPage", image);
  }

  // Renders the pop-up window with the cat information
  renderCatDetails(elementId, imageURL) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "afterBegin",
      catDetailTemplate(this.cat[0], imageURL),
    );

    // Close Button functionality
    document.getElementById("close").addEventListener("click", (event) => {
      const div = document.querySelector(".cat-detail");
      div.innerHTML = "";
    });

    // Event Listener to add the cat to the favorites
    document
      .getElementById("addFav")
      .addEventListener("click", this.addToFavorites.bind(this.cat[0]));
  }

  // Function to use Local Storage to add the cat to a favorites page
  addToFavorites() {
    console.log(this);
    const added = document.querySelector("#added");
    let key = getStorageKey();
    let favorites = getLocalStorage(key);
    let list = [];
    if (favorites != null || favorites[0] != null) {
      //Check to see if favorites already has the cat on it
      favorites.forEach((item) => {
        if (item.id != this.id) {
          list.push(item);
          added.innerHTML = "<p>Added to Favorites</p>";
        } else {
          added.innerHTML = "<p>Already on Favorites</p>";
        }
      });
    }
    list.push(this);
    setLocalStorage(key, list);
  }
}

// Template for each "Cat Detail" window
function catDetailTemplate(cat, image) {
  return `<div class=cat-detail>
    <div id="closeButton"><button id="close">X</button></div>
    <h1>${cat.name} Cat</h1>
    <a href="${cat.wikipedia_url}" target="_blank">Wiki Page</a>
    <div class=catDetailGrid>
    <div class=gridLeft>
          <img src="${image}" alt="${cat.name}">
    </div>
    <div class=gridRight>
          <p><strong>Origin:</strong> ${cat.origin}</p>
          <p><strong>Weight:</strong> ${cat.weight.imperial} pounds</p>
          <p><strong>Temperament:</strong> ${cat.temperament}</p>
          <p><strong>Lifespan:</strong> ${cat.life_span} years
          <br>
          <p>${cat.description}</p>
      </div
    </div>
    <div class="favoritesAdd"><button id=addFav data-id="${cat.id}">Add to Favorites</button><div id="added"></div></div>
   
    `;
}
