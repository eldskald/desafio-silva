import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { sleep } from "./utils/sleep.js";

describe("delete species on last page", () => {
    const newMockedDb = [];
    for (let i = 1; i <= 81; i++) {
        newMockedDb.push({
            id: i,
            commonName: `test ${i}`,
            scientificName: `sci name ${i}`,
            biomes: ["biome 1", "biome 2"],
            description: "Test description",
        });
    }

    beforeEach(async () => {
        await initDom(false, newMockedDb);
    });

    test("should delete species and change pages correctly", async () => {
        const pages = document.getElementById("pages");

        pages.children[2].click();
        await sleep(10);
        document.getElementById("species-81-delete-btn").click();
        document.getElementById("confirm-delete-btn").click();
        await sleep(10);
        expect(pages.children.length).toBe(2);
        expect(pages.children[0].disabled).toBe(false);
        expect(pages.children[1].disabled).toBe(true);
    });
});
