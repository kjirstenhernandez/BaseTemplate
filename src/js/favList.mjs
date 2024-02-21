import {
  getLocalStorage,
  renderListWithTemplate,
  getStorageKey,
  getImageList,
  setLocalStorage,
  removeFromLocalStorage,
} from "../utils/utils.mjs";

export default class favList {
  constructor(parentElement) {
    this.cartkey = getStorageKey();
    this.parentElement = parentElement;
  }

  async initialize() {
    let imageList = await getImageList();
    console.log(imageList);
    this.renderList(imageList);
  }

  // bind the remove button to each cat card
  bindRemovebuttons() {
    let array = document.querySelectorAll(".remove");
    array.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        this.removeFromFavorites(event.target.getAttribute("data-id"));
      });
    });
  }

  // Populate the cat card list through Local Storage
  getList() {
    return getLocalStorage(this.cartkey);
  }

  //
  renderList(imageList) {
    let list = this.getList();
    if (list != null && list.length != 0) {
      renderListWithTemplate(
        favCatCard,
        this.parentElement,
        this.getList(),
        "afterbegin",
        imageList,
      );
    } else {
      document.querySelector(".favDetail").innerHTML =
        "<h2>Looks like you're a little short on Cats</h2><h4>Go back and find some!</h4>";
    }
    this.bindRemovebuttons();
  }

  removeFromFavorites(id) {
    let catList = document.getElementById("favoriteslist");
    let catItem = document.getElementById(id);
    removeFromLocalStorage(this.cartkey, id);
    catList.removeChild(catItem);
    this.renderList();
  }
}

function favCatCard(cat, image) {
  let photo = image[cat.id];
  return `<li class="favCard" id=${cat.id}>
  <img class="thumb" src="${photo[0].url}" alt="photo of ${cat.name}">
  <h3>${cat.name}</h3>
  <div class="favInfo">
      <p>${cat.origin}</p>
      <p>${cat.temperament}</p>
      <a href="${cat.wikipedia_url}">Wiki Page</a>
  </div>
  <br>
  <button class="remove" data-id="${cat.id}">Remove</button>
  </li>`;
}
