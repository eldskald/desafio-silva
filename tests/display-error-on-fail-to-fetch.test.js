import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { getModal } from "../src/utils/get-modal.js";

describe("display error on fail to fetch", () => {
    beforeEach(async () => {
        await initDom(true);
    });

    test("should display error modal", () => {
        expect(getModal().hidden).toBe(false);
    });
});
