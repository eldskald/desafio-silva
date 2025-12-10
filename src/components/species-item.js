export default function getSpeciesItem(data) {
    const container = document.createElement("div");
    container.id = data.id;
    container.className = "max-w-full lg:max-w-5xl flex flex-col gap-2";

    // Common name
    const name = document.createElement("div");
    name.className = "text-xl text-sky-200";
    name.innerHTML = data.commonName;
    name.id = `species-${data.id}-common-name`;
    container.appendChild(name);

    // Scientific name
    const scientificNameContainer = document.createElement("div");
    scientificNameContainer.className = "flex flex-row gap-4";
    container.appendChild(scientificNameContainer);
    const scientificNameLabel = document.createElement("p");
    scientificNameLabel.className = "text-stone-500";
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
    biomesLabel.className = "text-stone-500";
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
    descriptionLabel.className = "text-stone-500";
    descriptionLabel.innerHTML = "Descrição:";
    descriptionContainer.appendChild(descriptionLabel);
    const descriptionContent = document.createElement("p");
    descriptionContent.className = "text-stone-300";
    descriptionContent.innerHTML = data.description;
    descriptionContent.id = `species-${data.id}-description`;
    descriptionContainer.appendChild(descriptionContent);

    return container;
}
