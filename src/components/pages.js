import { getCurrentPage, getPagesTotal, changePageReq } from "../api/api.js";
import { updateSpeciesList } from "./species-item.js";

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
