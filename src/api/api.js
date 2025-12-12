import { popupMessage } from "../utils/get-modal.js";

let db = [];

export async function getReq() {
    const res = await fetch("src/data/species.json");
    if (!res.ok) {
        popupMessage("Falha em obter as espécies.");
        return;
    }
    const content = await res.text();
    db = JSON.parse(content);
}

export async function deleteReq(id) {
    db = db.filter((item) => item.id !== id);
}

export async function putReq(data) {
    const id = db.length > 0 ? db[db.length - 1].id + 1 : 1;
    db.push({
        id,
        commonName: data.commonName,
        scientificName: data.scientificName,
        biomes: data.biomes
            .split(",")
            .map((biome) => biome.trim())
            .filter((biome) => biome.length > 0),
        description: data.description,
    });
}

export function getDb() {
    return db;
}
