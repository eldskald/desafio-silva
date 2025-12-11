import { popupMessage } from "../utils/get-modal.js";

export let db = [];

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
    await new Promise((r) => setTimeout(r, 10));
    db = db.filter((item) => item.id !== id);
}
