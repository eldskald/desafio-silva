import fs from "fs";
import { jest } from "@jest/globals";
import species from "../mocks/species.js";

export let hasCalledFetch = false;

export async function initDom() {
    // Load index.html and removes the first two and the last lines,
    // leaving only the head and body elements.
    const data = fs.readFileSync("./index.html", { encoding: "utf8" });
    const lines = data.split("\n");
    lines.pop();
    lines.shift();
    lines.shift();

    // Put it on the DOM
    document.documentElement.innerHTML = lines.join("\n");

    // Mock the fetch function to return mocked data directly
    window.fetch = jest.fn(() => {
        hasCalledFetch = true;
        return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(species)),
        });
    });

    // Load the scripts. Keep in mind <script> tags don't work on JSDOM,
    // so we load scripts directly which works in the same way because
    // they're manipulating the DOM in the same variables JSDOM did.
    await import("../../src/main.js");
}
