import { updateSpeciesList } from "./components/species-item.js";
import { updatePages } from "./components/pages.js";
import { setupAddButton } from "./components/add-button.js";
import { getReq } from "./api/api.js";

setupAddButton();

await getReq();
updatePages();
updateSpeciesList();
