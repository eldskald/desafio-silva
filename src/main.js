import { updateSpeciesList } from "./components/species-container.js";
import { getReq } from "./api/api.js";

await getReq();
updateSpeciesList();
