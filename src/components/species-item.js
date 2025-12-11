import { deleteReq } from "../api/api.js";
import { getModal } from "../utils/get-modal.js";

function setDeleteModal(data, updateFn) {
    const modal = getModal();
    modal.innerHTML = `Deletar ${data.commonName}?`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className =
        "w-full flex flex-row justify-between mt-4 gap-4";
    modal.appendChild(buttonsContainer);
    const confirmBtn = document.createElement("button");
    confirmBtn.id = "confirm-delete-btn";
    confirmBtn.className = "font-bold text-orange-300";
    confirmBtn.innerHTML = "Deletar";
    confirmBtn.onclick = async () => {
        await deleteReq(data.id);
        modal.close();
        updateFn();
    };
    buttonsContainer.appendChild(confirmBtn);
    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-delete-btn";
    cancelBtn.innerHTML = "Cancelar";
    cancelBtn.onclick = () => modal.close();
    buttonsContainer.appendChild(cancelBtn);

    modal.showModal();
}

export function getSpeciesItem(data, updateFn) {
    const container = document.createElement("div");
    container.id = data.id;
    container.className = "max-w-full lg:max-w-5xl flex flex-col gap-2";

    // Common name and delete button
    const nameRow = document.createElement("div");
    nameRow.className = "flex flex-row gap-4";
    container.appendChild(nameRow);
    const name = document.createElement("p");
    name.className = "text-xl text-sky-200 grow";
    name.innerHTML = data.commonName;
    name.id = `species-${data.id}-common-name`;
    nameRow.appendChild(name);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "text-orange-300";
    deleteBtn.innerHTML = "Deletar";
    deleteBtn.onclick = () => setDeleteModal(data, updateFn);
    deleteBtn.id = `species-${data.id}-delete-btn`;
    nameRow.appendChild(deleteBtn);

    // Scientific name
    const scientificNameContainer = document.createElement("div");
    scientificNameContainer.className = "flex flex-row gap-4";
    container.appendChild(scientificNameContainer);
    const scientificNameLabel = document.createElement("p");
    scientificNameLabel.className = "text-stone-400";
    scientificNameLabel.innerHTML = "Nome científico:";
    scientificNameContainer.appendChild(scientificNameLabel);
    const scientificNameContent = document.createElement("p");
    scientificNameContent.className = "text-stone-300";
    scientificNameContent.innerHTML = data.scientificName;
    scientificNameContent.id = `species-${data.id}-scientific-name`;
    scientificNameContainer.appendChild(scientificNameContent);

    // Biomes
    const biomesContainer = document.createElement("div");
    biomesContainer.className = "flex flex-row gap-4";
    container.appendChild(biomesContainer);
    const biomesLabel = document.createElement("p");
    biomesLabel.className = "text-stone-400";
    biomesLabel.innerHTML = "Biomas:";
    biomesContainer.appendChild(biomesLabel);
    const biomesContent = document.createElement("p");
    biomesContent.className = "text-stone-300";
    biomesContent.innerHTML = data.biomes.join(", ");
    biomesContent.id = `species-${data.id}-biomes`;
    biomesContainer.appendChild(biomesContent);

    // Description
    const descriptionContainer = document.createElement("div");
    descriptionContainer.className = "flex flex-row gap-4";
    container.appendChild(descriptionContainer);
    const descriptionLabel = document.createElement("p");
    descriptionLabel.className = "text-stone-400";
    descriptionLabel.innerHTML = "Descrição:";
    descriptionContainer.appendChild(descriptionLabel);
    const descriptionContent = document.createElement("p");
    descriptionContent.className = "text-stone-300";
    descriptionContent.innerHTML = data.description;
    descriptionContent.id = `species-${data.id}-description`;
    descriptionContainer.appendChild(descriptionContent);

    return container;
}
