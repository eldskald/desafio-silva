import {
    getDb,
    putReq,
    deleteReq,
    getCurrentPage,
    changePageReq,
    getPagesTotal,
} from "../api/api.js";
import { getModal, popupMessage } from "../utils/modal.js";

function setEditModal(data) {
    const modal = getModal();
    modal.innerHTML = `Editando ${data.commonName}.`;

    // Common name
    const commonNameRow = document.createElement("div");
    commonNameRow.className = "w-full flex flex-row gap-4 mt-4";
    modal.appendChild(commonNameRow);
    const commonNameLabel = document.createElement("p");
    commonNameLabel.className = "text-stone-300 mt-1";
    commonNameLabel.innerHTML = "Nome comum:";
    commonNameRow.appendChild(commonNameLabel);
    const commonNameInput = document.createElement("input");
    commonNameInput.id = `editing-${data.id}-common-name`;
    commonNameInput.className = "grow";
    commonNameInput.value = data.commonName;
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
    scientificNameInput.id = `editing-${data.id}-scientific-name`;
    scientificNameInput.className = "grow";
    scientificNameInput.value = data.scientificName;
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
    biomesInput.id = `editing-${data.id}-biomes`;
    biomesInput.className = "grow";
    biomesInput.value = data.biomes.join(", ");
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
    descriptionInput.id = `editing-${data.id}-description`;
    descriptionInput.className = "grow h-16";
    descriptionInput.value = data.description;
    descriptionRow.appendChild(descriptionInput);

    // Buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className =
        "w-full flex flex-row justify-between mt-4 gap-4";
    modal.appendChild(buttonsContainer);
    const confirmBtn = document.createElement("button");
    confirmBtn.id = `editing-${data.id}-confirm-btn`;
    confirmBtn.innerHTML = "Confirmar";
    confirmBtn.onclick = async () => {
        await putReq({
            id: data.id,
            commonName: commonNameInput.value,
            scientificName: scientificNameInput.value,
            biomes: biomesInput.value,
            description: descriptionInput.value,
        });
        modal.close();
        updateSpeciesList();
        popupMessage("Espécie editada com sucesso.");
    };
    buttonsContainer.appendChild(confirmBtn);
    const cancelBtn = document.createElement("button");
    cancelBtn.id = `editing-${data.id}-cancel-btn`;
    cancelBtn.innerHTML = "Cancelar";
    cancelBtn.className = "text-stone-400";
    cancelBtn.onclick = () => modal.close();
    buttonsContainer.appendChild(cancelBtn);

    modal.showModal();
}

function setDeleteModal(data) {
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
        changePageReq(getCurrentPage());
        updatePages();
        updateSpeciesList();
    };
    buttonsContainer.appendChild(confirmBtn);
    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-delete-btn";
    cancelBtn.innerHTML = "Cancelar";
    cancelBtn.onclick = () => modal.close();
    buttonsContainer.appendChild(cancelBtn);

    modal.showModal();
}

export function getSpeciesItem(data) {
    const container = document.createElement("div");
    container.id = data.id;
    container.className = "max-w-full lg:max-w-5xl flex flex-col gap-2";

    // Common name, edit and delete buttons
    const nameRow = document.createElement("div");
    nameRow.className = "flex flex-row gap-4";
    container.appendChild(nameRow);
    const name = document.createElement("p");
    name.className = "text-xl text-sky-200 grow";
    name.innerHTML = data.commonName;
    name.id = `species-${data.id}-common-name`;
    nameRow.appendChild(name);
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏";
    editBtn.onclick = () => setEditModal(data);
    editBtn.id = `species-${data.id}-edit-btn`;
    nameRow.appendChild(editBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.onclick = () => setDeleteModal(data);
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

export function updateSpeciesList() {
    const container = document.getElementById("species-container");
    container.innerHTML = "";
    getDb().forEach((species) =>
        container.appendChild(getSpeciesItem(species)),
    );
}

export function updatePages() {
    const pagesContainer = document.getElementById("pages");
    pagesContainer.innerHTML = "";
    for (let i = 1; i <= getPagesTotal(); i++) {
        const page = document.createElement("button");
        page.innerHTML = `${i}`;
        if (i === getCurrentPage()) page.disabled = true;
        page.onclick = async () => {
            await changePageReq(i);
            updateSpeciesList();
            updatePages();
        };
        pagesContainer.appendChild(page);
    }
}
