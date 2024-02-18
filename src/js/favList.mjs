import {
  getLocalStorage,
  renderListWithTemplate,
  getStorageKey,
} from "../utils/utils.mjs";

export default class favList {
  constructor(parentElement, datasource) {
    this.cartkey = getStorageKey();
    this.parentElement = parentElement;
    this.data = datasource;
  }

  async initialize() {
    let imageList = await this.data.getImageList();
    this.renderList(imageList);
  }

  getList() {
    return getLocalStorage(this.cartkey);
  }

  renderList(imageList) {
    console.log(imageList);
    let list = this.getList();
    if (list != null && list.length != 0) {
      console.log(this.data);
      renderListWithTemplate(
        favCatCard,
        this.parentElement,
        this.getList(),
        "afterbegin",
        imageList,
      );
    } else {
      document.querySelector(".favDetail").innerHTML =
        "<h2>Looks like you're a little short on Cats</h2><br><h4>Go back and find some!</h4>";
    }
  }
}

function favCatCard(cat, data) {
  console.log(data);
  return `<li class="cat-card listItem">
    <img src=${image} class="thumb" alt="${cat.name}">
    <h3>${cat.name}</h3>
    <p>${cat.origin}</p>
    <p>${cat.temperament}</p>
    <p>${cat.wikipedia_url}</p>
    <button class="remove" data-id="${cat.id}">Remove</button>`;
}
