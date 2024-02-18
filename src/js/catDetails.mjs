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
    // add event-listener later for the "add to favorites
  }

  renderCatDetails(elementId, imageURL) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "afterBegin",
      catDetailTemplate(this.cat[0], imageURL),
    );
    document
      .getElementById("addFav")
      .addEventListener("click", this.addToFavorites.bind(this.cat[0])); //Michael:  Why wouldn't this work without the bind?
  }

  addToFavorites() {
    console.log(this);
    let key = getStorageKey();
    let favorites = getLocalStorage(key);
    console.log(favorites);
    let list = [];
    if (favorites == null || favorites[0] == null) {
      list.push(this);
    } else {
      favorites.forEach((item) => {
        if (item.id != this.id) {
          list.push(item);
        }
      });
    }

    list.push(this);
    setLocalStorage(key, list);
  }
}

function catDetailTemplate(cat, image) {
  return `<div class=cat-detail>
    <h1>${cat.name} Cat</h3>
    <h3><a href="${cat.wikipedia_url}" target="_blank">Wiki Page</a>
    <img src="${image}" alt="${cat.name}">
    <br>
    <p>Origin: ${cat.origin}</p>
    <p>Weight: ${cat.weight.imperial} pounds</p>
    <p>Temperament: ${cat.temperament}</p>
    <p>Lifespan: ${cat.life_span} years
    <br>
    <p>${cat.description}</p>
    <br>
    <div class="favoritesAdd"><button id=addFav data-id="${cat.id}">Add to Favorites</button></div>
    `;
}
