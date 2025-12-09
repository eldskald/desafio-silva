import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("hello world", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should have hello world written in a span", () => {
        expect(document.querySelector("span").innerHTML).toBe("Hello world!");
    });
});
