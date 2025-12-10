import getSpeciesItem from "./species-item.js";

export default function setSpeciesList(data) {
    const container = document.getElementById("species-container");
    container.innerHTML = "";
    data.forEach((species) => container.appendChild(getSpeciesItem(species)));
}
