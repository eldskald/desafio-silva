import { popupMessage } from "../utils/get-modal.js";

const speciesPerPage = 40;

let db = [];
let currentPage = 1;

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

export async function changePageReq(newPage) {
    if (newPage <= 0) currentPage = 1;
    else if (newPage > getPagesTotal()) currentPage = getPagesTotal();
    else currentPage = newPage;
}

export function getDb() {
    const page = db.slice(
        (currentPage - 1) * speciesPerPage,
        Math.min(currentPage * speciesPerPage, db.length),
    );
    return page;
}

export function getPagesTotal() {
    return (
        db.length / speciesPerPage + (db.length % speciesPerPage > 0 ? 1 : 0)
    );
}

export function getCurrentPage() {
    return currentPage;
}
