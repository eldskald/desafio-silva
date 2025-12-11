import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import species from "./mocks/species.js";

describe("display species", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should display data for each species correctly", () => {
        species.forEach((data) => {
            expect(
                document.getElementById(`species-${data.id}-common-name`)
                    .innerHTML,
            ).toBe(data.commonName);
            expect(
                document.getElementById(`species-${data.id}-scientific-name`)
                    .innerHTML,
            ).toBe(data.scientificName);
            expect(
                document.getElementById(`species-${data.id}-biomes`).innerHTML,
            ).toBe(data.biomes.join(", "));
            expect(
                document.getElementById(`species-${data.id}-description`)
                    .innerHTML,
            ).toBe(data.description);
        });
    });
});
