import { popupMessage } from "../utils/modal.js";

const speciesPerPage = 40;
const searchData = {
    commonName: "",
    scientificName: "",
    biomes: [],
};

let db = [];
let currentPage = 1;

function biomesStrToArr(biomesStr) {
    return biomesStr
        .split(",")
        .map((biome) => biome.trim())
        .filter((biome) => biome.length > 0);
}

function getFilteredDb() {
    const commonNamePattern = new RegExp(
        searchData.commonName.split("").join(".*"),
        "i",
    );
    const scientificNamePattern = new RegExp(
        searchData.scientificName.split("").join(".*"),
        "i",
    );
    const biomePatterns = [];
    searchData.biomes.forEach((biome) => {
        biomePatterns.push(new RegExp(biome.split("").join(".*"), "i"));
    });
    return db
        .filter((species) => commonNamePattern.test(species.commonName))
        .filter((species) => scientificNamePattern.test(species.scientificName))
        .filter((species) => {
            if (biomePatterns.length === 0) return true;
            let matches = 0;
            species.biomes.forEach((biome) => {
                biomePatterns.forEach((pattern) => {
                    if (pattern.test(biome)) matches++;
                });
            });
            return matches > 0;
        });
}

export async function getReq() {
    const res = await fetch("src/data/species.json");
    if (!res.ok) {
        popupMessage("Falha em obter as espécies.");
        return;
    }
    const content = await res.text();
    db = JSON.parse(content);
}

export async function postReq(data) {
    const id = db.length > 0 ? db[db.length - 1].id + 1 : 1;
    db.push({
        id,
        commonName: data.commonName,
        scientificName: data.scientificName,
        biomes: biomesStrToArr(data.biomes),
        description: data.description,
    });
}

export async function putReq(data) {
    const target = db.find((species) => (species.id = data.id));
    target.commonName = data.commonName;
    target.scientificName = data.scientificName;
    target.biomes = biomesStrToArr(data.biomes);
    target.description = data.description;
}

export async function deleteReq(id) {
    db = db.filter((item) => item.id !== id);
}

export async function searchReq(data) {
    searchData.commonName = data.commonName;
    searchData.scientificName = data.scientificName;
    searchData.biomes = biomesStrToArr(data.biomes);
}

export async function changePageReq(newPage) {
    if (newPage <= 0) currentPage = 1;
    else if (newPage > getPagesTotal()) currentPage = getPagesTotal();
    else currentPage = newPage;
}

export function getDb() {
    const page = getFilteredDb().slice(
        (currentPage - 1) * speciesPerPage,
        Math.min(currentPage * speciesPerPage, db.length),
    );
    return page;
}

export function getPagesTotal() {
    const filtered = getFilteredDb();
    return (
        filtered.length / speciesPerPage +
        (filtered.length % speciesPerPage > 0 ? 1 : 0)
    );
}

export function getCurrentPage() {
    return currentPage;
}

export function getSearchData() {
    return searchData;
}
