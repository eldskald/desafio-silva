import { beforeEach, describe, expect, test } from "@jest/globals";
import { sleep } from "./utils/sleep.js";
import { initDom } from "./utils/init-dom.js";

describe("test pages", () => {
    const newMockedDb = [];
    for (let i = 1; i <= 90; i++) {
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

    test("should display page buttons and change pages correctly", async () => {
        const pages = document.getElementById("pages");
        const species = document.getElementById("species-container");

        expect(pages.children.length).toBe(3);

        expect(pages.children[0].disabled).toBe(true);
        expect(pages.children[1].disabled).toBe(false);
        expect(pages.children[2].disabled).toBe(false);
        expect(species.children.length).toBe(40);
        for (let i = 0; i < 40; i++) {
            expect(species.children[i].id).toBe(`${i + 1}`);
        }

        pages.children[1].click();
        await sleep(10);
        expect(pages.children[0].disabled).toBe(false);
        expect(pages.children[1].disabled).toBe(true);
        expect(pages.children[2].disabled).toBe(false);
        expect(species.children.length).toBe(40);
        for (let i = 0; i < 40; i++) {
            expect(species.children[i].id).toBe(`${i + 41}`);
        }

        pages.children[2].click();
        await sleep(10);
        expect(pages.children[0].disabled).toBe(false);
        expect(pages.children[1].disabled).toBe(false);
        expect(pages.children[2].disabled).toBe(true);
        expect(species.children.length).toBe(10);
        for (let i = 0; i < 10; i++) {
            expect(species.children[i].id).toBe(`${i + 81}`);
        }
    });
});
