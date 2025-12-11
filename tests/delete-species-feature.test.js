import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { sleep } from "./utils/sleep.js";
import { getModal } from "../src/utils/get-modal.js";
import { getDb } from "../src/api/api.js";
import species from "./mocks/species.js";

describe("delete species feature", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should delete species", async () => {
        const modal = getModal();
        const target = species[0];
        const delBtn = document.getElementById(
            `species-${target.id}-delete-btn`,
        );

        delBtn.click();
        expect(modal.hidden).toBe(false);

        document.getElementById("cancel-delete-btn").click();
        expect(modal.hidden).toBe(true);

        delBtn.click();
        document.getElementById("confirm-delete-btn").click();
        await sleep(10);
        expect(modal.hidden).toBe(true);
        expect(getDb().length).toBe(2);
        expect(document.getElementById(target.id)).toBeNull();
    });
});
