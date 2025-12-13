import { changePageReq, getSearchData, searchReq } from "../api/api.js";
import { getModal } from "../utils/modal.js";
import { updateSpeciesList, updatePages } from "./species-item.js";

export function setupSearchButton() {
    const modal = getModal();
    const btn = document.getElementById("search-btn");

    btn.onclick = () => {
        modal.innerHTML = "Filtrar resultados.";
        const search = getSearchData();

        // Common name
        const commonNameRow = document.createElement("div");
        commonNameRow.className = "w-full flex flex-row gap-4 mt-4";
        modal.appendChild(commonNameRow);
        const commonNameLabel = document.createElement("p");
        commonNameLabel.className = "text-stone-300 mt-1";
        commonNameLabel.innerHTML = "Nome comum:";
        commonNameRow.appendChild(commonNameLabel);
        const commonNameInput = document.createElement("input");
        commonNameInput.id = "search-common-name";
        commonNameInput.className = "grow";
        commonNameInput.value = search.commonName;
        commonNameRow.appendChild(commonNameInput);

        // Scientific name
        const scientificNameRow = document.createElement("div");
        scientificNameRow.className = "w-full flex flex-row gap-4 mt-2";
        modal.appendChild(scientificNameRow);
        const scientificNameLabel = document.createElement("p");
        scientificNameLabel.className = "text-stone-300 mt-1";
        scientificNameLabel.innerHTML = "Nome científico:";
        scientificNameRow.appendChild(scientificNameLabel);
        const scientificNameInput = document.createElement("input");
        scientificNameInput.id = "search-scientific-name";
        scientificNameInput.className = "grow";
        scientificNameInput.value = search.scientificName;
        scientificNameRow.appendChild(scientificNameInput);

        // Biomes
        const biomesRow = document.createElement("div");
        biomesRow.className = "w-full flex flex-row gap-4 mt-2";
        modal.appendChild(biomesRow);
        const biomesLabel = document.createElement("p");
        biomesLabel.className = "text-stone-300 mt-1";
        biomesLabel.innerHTML = "Biomas:";
        biomesRow.appendChild(biomesLabel);
        const biomesInput = document.createElement("input");
        biomesInput.id = "search-biomes";
        biomesInput.className = "grow";
        biomesInput.value = search.biomes.join(", ");
        biomesRow.appendChild(biomesInput);

        // Buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.className =
            "w-full flex flex-row justify-between mt-4 gap-4";
        modal.appendChild(buttonsContainer);
        const confirmBtn = document.createElement("button");
        confirmBtn.id = "search-confirm-btn";
        confirmBtn.innerHTML = "Confirmar";
        confirmBtn.onclick = async () => {
            await searchReq({
                commonName: commonNameInput.value,
                scientificName: scientificNameInput.value,
                biomes: biomesInput.value,
            });
            modal.close();
            changePageReq(0);
            updatePages();
            updateSpeciesList();
        };
        buttonsContainer.appendChild(confirmBtn);
        const clearBtn = document.createElement("button");
        clearBtn.id = "search-clear-btn";
        clearBtn.innerHTML = "Resetar";
        clearBtn.onclick = async () => {
            await searchReq({
                commonName: "",
                scientificName: "",
                biomes: "",
            });
            modal.close();
            changePageReq(0);
            updatePages();
            updateSpeciesList();
        };
        buttonsContainer.appendChild(clearBtn);
        const cancelBtn = document.createElement("button");
        cancelBtn.id = "search-cancel-btn";
        cancelBtn.innerHTML = "Cancelar";
        cancelBtn.className = "text-stone-400";
        cancelBtn.onclick = () => modal.close();
        buttonsContainer.appendChild(cancelBtn);

        modal.showModal();
    };
}
