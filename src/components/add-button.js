import { getModal } from "../utils/get-modal.js";
import { putReq } from "../api/api.js";
import { updateSpeciesList } from "./species-item.js";

export function setupAddButton() {
    const modal = getModal();
    const btn = document.getElementById("add-btn");
    const speciesContainer = document.getElementById("species-container");

    btn.onclick = () => {
        modal.innerHTML = "Adicionar nova espécie";

        // Common name
        const commonNameRow = document.createElement("div");
        commonNameRow.className = "w-full flex flex-row gap-4 mt-4";
        modal.appendChild(commonNameRow);
        const commonNameLabel = document.createElement("p");
        commonNameLabel.className = "text-stone-300 mt-1";
        commonNameLabel.innerHTML = "Nome comum:";
        commonNameRow.appendChild(commonNameLabel);
        const commonNameInput = document.createElement("input");
        commonNameInput.id = "new-species-common-name";
        commonNameInput.className = "grow";
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
        scientificNameInput.id = "new-species-scientific-name";
        scientificNameInput.className = "grow";
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
        biomesInput.id = "new-species-scientific-name";
        biomesInput.className = "grow";
        biomesRow.appendChild(biomesInput);

        // Description
        const descriptionRow = document.createElement("div");
        descriptionRow.className = "w-full flex flex-row gap-4 mt-2";
        modal.appendChild(descriptionRow);
        const descriptionLabel = document.createElement("p");
        descriptionLabel.className = "text-stone-300 mt-1";
        descriptionLabel.innerHTML = "Descrição:";
        descriptionRow.appendChild(descriptionLabel);
        const descriptionInput = document.createElement("textarea");
        descriptionInput.id = "new-species-scientific-name";
        descriptionInput.className = "grow h-16";
        descriptionRow.appendChild(descriptionInput);

        // Buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.className =
            "w-full flex flex-row justify-between mt-4 gap-4";
        modal.appendChild(buttonsContainer);
        const confirmBtn = document.createElement("button");
        confirmBtn.id = "confirm-add-btn";
        confirmBtn.innerHTML = "Confirmar";
        confirmBtn.onclick = async () => {
            await putReq({
                commonName: commonNameInput.value,
                scientificName: scientificNameInput.value,
                biomes: biomesInput.value,
                description: descriptionInput.value,
            });
            modal.close();
            updateSpeciesList();
            speciesContainer.scrollTop = speciesContainer.scrollHeight;
        };
        buttonsContainer.appendChild(confirmBtn);
        const cancelBtn = document.createElement("button");
        cancelBtn.id = "cancel-delete-btn";
        cancelBtn.innerHTML = "Cancelar";
        cancelBtn.className = "text-stone-400";
        cancelBtn.onclick = () => modal.close();
        buttonsContainer.appendChild(cancelBtn);

        modal.showModal();
    };
}
