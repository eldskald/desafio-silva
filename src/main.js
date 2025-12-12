import { updateSpeciesList } from "./components/species-item.js";
import { setupAddButton } from "./components/add-button.js";
import { getReq } from "./api/api.js";

setupAddButton();

await getReq();
updateSpeciesList();
