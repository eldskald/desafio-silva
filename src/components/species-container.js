import { getSpeciesItem } from "./species-item.js";
import { getDb } from "../api/api.js";

export function updateSpeciesList() {
    const container = document.getElementById("species-container");
    container.innerHTML = "";
    getDb().forEach((species) =>
        container.appendChild(getSpeciesItem(species, updateSpeciesList)),
    );
}
