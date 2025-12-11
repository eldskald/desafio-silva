import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom, hasCalledFetch } from "./utils/init-dom.js";

describe("fetches at start", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should fetch data at start", () => {
        expect(hasCalledFetch).toBe(true);
    });
});
