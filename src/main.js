import { updateSpeciesList, updatePages } from "./components/species-item.js";
import { setupAddButton } from "./components/add-button.js";
import { setupSearchButton } from "./components/search-button.js";
import { getReq } from "./api/api.js";

setupAddButton();
setupSearchButton();

await getReq();
updatePages();
updateSpeciesList();
