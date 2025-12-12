import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { sleep } from "./utils/sleep.js";
import { getModal } from "../src/utils/modal.js";
import { getDb } from "../src/api/api.js";

describe("adding species", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should add species", async () => {
        const modal = getModal();
        const addBtn = document.getElementById("add-btn");

        addBtn.click();
        expect(modal.hidden).toBe(false);

        document.getElementById("cancel-add-btn").click();
        expect(modal.hidden).toBe(true);

        addBtn.click();
        document.getElementById("new-species-common-name").value = "com name";
        document.getElementById("new-species-scientific-name").value =
            "sci name";
        document.getElementById("new-species-biomes").value = "biome1, biome2";
        document.getElementById("new-species-description").value =
            "test description";
        document.getElementById("confirm-add-btn").click();
        await sleep(10);
        expect(modal.childNodes[0].nodeValue).toBe(
            "Espécie criada com sucesso.",
        );
        expect(getDb().length).toBe(4);
        expect(getDb()[3].id).toBe(4);
        expect(getDb()[3].commonName).toBe("com name");
        expect(getDb()[3].scientificName).toBe("sci name");
        expect(getDb()[3].biomes).toEqual(["biome1", "biome2"]);
        expect(getDb()[3].description).toBe("test description");
    });
});
