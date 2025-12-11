import { getSpeciesItem } from "./species-item.js";
import { db } from "../api/api.js";

export function updateSpeciesList() {
    const container = document.getElementById("species-container");
    container.innerHTML = "";
    db.forEach((species) =>
        container.appendChild(getSpeciesItem(species, updateSpeciesList)),
    );
}
