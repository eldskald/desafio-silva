import setSpeciesList from "./components/species-container.js";
import getData from "./api/get-data.js";

const species = await getData();
setSpeciesList(species);
