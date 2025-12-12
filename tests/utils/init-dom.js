import fs from "fs";
import { jest } from "@jest/globals";
import species from "../mocks/species.js";

export let hasCalledFetch = false;

export async function initDom(failToFetch = false, mockedDb = species) {
    // Load index.html and removes the first two and the last lines,
    // leaving only the head and body elements.
    const data = fs.readFileSync("./index.html", { encoding: "utf8" });
    const lines = data.split("\n");
    lines.pop();
    lines.shift();
    lines.shift();

    // Jest has no support the dialog element yet, so we have to implement it
    HTMLDialogElement.prototype.showModal = jest.fn(
        () => (document.querySelector("dialog").hidden = false),
    );
    HTMLDialogElement.prototype.close = jest.fn(
        () => (document.querySelector("dialog").hidden = true),
    );

    // Put it on the DOM
    document.documentElement.innerHTML = lines.join("\n");

    // Mock the fetch function to return mocked data directly
    window.fetch = jest.fn(() => {
        hasCalledFetch = !failToFetch;
        return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockedDb)),
        });
    });

    // Load the scripts. Keep in mind <script> tags don't work on JSDOM,
    // so we load scripts directly which works in the same way because
    // they're manipulating the DOM in the same variables JSDOM did.
    await import("../../src/main.js");
}
