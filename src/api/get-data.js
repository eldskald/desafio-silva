export default async function getData() {
    const res = await fetch("src/data/species.json");
    if (!res.ok) return [];
    const content = await res.text();
    return JSON.parse(content);
}
