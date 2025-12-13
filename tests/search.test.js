import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { sleep } from "./utils/sleep.js";
import { getModal } from "../src/utils/modal.js";

describe("search", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should filter results", async () => {
        const modal = getModal();
        const searchBtn = document.getElementById("search-btn");

        searchBtn.click();
        expect(modal.hidden).toBe(false);

        document.getElementById("search-cancel-btn").click();
        expect(modal.hidden).toBe(true);

        searchBtn.click();
        document.getElementById("search-common-name").value = "1";
        document.getElementById("search-confirm-btn").click();
        await sleep(10);
        expect(modal.hidden).toBe(true);
        expect(document.getElementById("1")).not.toBeNull();
        expect(document.getElementById("2")).toBeNull();
        expect(document.getElementById("3")).toBeNull();

        searchBtn.click();
        document.getElementById("search-common-name").value = "";
        document.getElementById("search-scientific-name").value = "dos";
        document.getElementById("search-confirm-btn").click();
        await sleep(10);
        expect(modal.hidden).toBe(true);
        expect(document.getElementById("1")).toBeNull();
        expect(document.getElementById("2")).not.toBeNull();
        expect(document.getElementById("3")).toBeNull();

        searchBtn.click();
        document.getElementById("search-scientific-name").value = "";
        document.getElementById("search-biomes").value = "5";
        document.getElementById("search-confirm-btn").click();
        await sleep(10);
        expect(modal.hidden).toBe(true);
        expect(document.getElementById("1")).toBeNull();
        expect(document.getElementById("2")).toBeNull();
        expect(document.getElementById("3")).not.toBeNull();

        searchBtn.click();
        document.getElementById("search-biomes").value = "2, 5";
        document.getElementById("search-confirm-btn").click();
        await sleep(10);
        expect(modal.hidden).toBe(true);
        expect(document.getElementById("1")).not.toBeNull();
        expect(document.getElementById("2")).toBeNull();
        expect(document.getElementById("3")).not.toBeNull();

        searchBtn.click();
        document.getElementById("search-clear-btn").click();
        await sleep(10);
        expect(modal.hidden).toBe(true);
        expect(document.getElementById("1")).not.toBeNull();
        expect(document.getElementById("2")).not.toBeNull();
        expect(document.getElementById("3")).not.toBeNull();
    });
});
