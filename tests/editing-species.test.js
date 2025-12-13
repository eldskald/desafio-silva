import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { sleep } from "./utils/sleep.js";
import { getModal } from "../src/utils/modal.js";
import { getDb } from "../src/api/api.js";

describe("editing species", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should edit species", async () => {
        const modal = getModal();
        const editBtn = document.getElementById("species-1-edit-btn");

        editBtn.click();
        expect(modal.hidden).toBe(false);

        document.getElementById("editing-1-cancel-btn").click();
        expect(modal.hidden).toBe(true);

        editBtn.click();
        document.getElementById("editing-1-common-name").value = "new com name";
        document.getElementById("editing-1-scientific-name").value =
            "new sci name";
        document.getElementById("editing-1-biomes").value = "new biome";
        document.getElementById("editing-1-description").value =
            "new description";
        document.getElementById("editing-1-confirm-btn").click();
        await sleep(10);
        expect(modal.childNodes[0].nodeValue).toBe(
            "Espécie editada com sucesso.",
        );
        expect(getDb().length).toBe(3);
        expect(getDb()[0].commonName).toBe("new com name");
        expect(getDb()[0].scientificName).toBe("new sci name");
        expect(getDb()[0].biomes).toEqual(["new biome"]);
        expect(getDb()[0].description).toBe("new description");
    });
});
