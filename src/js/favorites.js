import { loadPartials } from "../utils/utils.mjs";
import Datasource from "./dataSource.mjs";
import favList from "./favList.mjs";

const targetElement = document.getElementById("favoriteslist");
const favoritesList = new favList(targetElement);
const info = new Datasource();
favoritesList.initialize(targetElement, info);

loadPartials(
  "header",
  "footer",
  "navigation",
  "/partials/header.html",
  "/partials/footer.html",
  "/partials/navigation.html",
);
