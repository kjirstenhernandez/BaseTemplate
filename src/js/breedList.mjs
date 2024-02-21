import { renderListWithTemplate, getTextFromHTML } from "../utils/utils.mjs";
import CatDetails from "./catDetails.mjs";

export default class BreedList {
  constructor(data, parentElement) {
    this.dataSource = data;
    this.element = parentElement;
  }

  async initialize() {
    const catData = await this.dataSource.getData();
    this.buildCatList(catData);
  }

  // Renders the list of Cat Breeds for the Breed Page
  buildCatList(catData) {
    //renders the template for the site
    renderListWithTemplate(basicCatCardTemplate, this.element, catData);

    // Starts the "catDetails" module upon clicking on a breed to populate the window
    document.querySelectorAll(".cat-card").forEach((item) => {
      item.addEventListener("click", (event) => {
        const catName = event.target.innerHTML;
        const catDetails = new CatDetails(catName, this.dataSource);
        catDetails.initialize();
      });
    });
  }
}

// basic template for each cat card (used for "Breeds")
function basicCatCardTemplate(cat) {
  return `<li class="cat-card">${cat.name}</li>`;
}
