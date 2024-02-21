import { getParams } from "../utils/utils.mjs";
import Datasource from "./dataSource.mjs";
import CatDetails from "./catDetails.mjs";
import { loadPartials } from "../utils/utils.mjs";

const data = new Datasource();
const catSelect = getParams("cat");
const catDetails = new CatDetails(catSelect, data);
catDetails.initialize();

loadPartials(
  "header",
  "footer",
  "navigation",
  "../public/partials/header.html",
  "../public/partials/footer.html",
  "../public/partials/navigation.html"
);
