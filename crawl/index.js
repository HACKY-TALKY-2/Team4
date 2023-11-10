import * as fs from 'node:fs/promises';
import puppeteer from "puppeteer";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const targetUrl = "https://ko.wikipedia.org/wiki/수도권_전철역_목록";

async function crawlAndSave() {
    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: chromePath,
    });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2" });
    const stations = await page.$$eval("table.wikitable", (tables) => {
        return tables.map((table) => {
            const rows = Array.from(table.querySelectorAll("tr"));
            rows.shift(); // remove header
            const stations = [];
            while (rows.length > 0) {
                const row = rows.shift();
                const columns = Array.from(row.querySelectorAll("td"));
                const station = columns.map((column) => column.textContent.trim());
                station[station.length - 1] = [station[station.length - 1]];
                const rowSpan = parseInt(columns[0].getAttribute("rowspan")) ?? 1;
                for (let i = 0; i < rowSpan - 1; i++) {
                    const row = rows.shift();
                    const line = row.querySelector("td").textContent.trim();
                    station[station.length - 1].push(line);
                }
                stations.push(station);
            }
            return stations;
        });
    });

    await browser.close();
    fs.writeFile("stations.json", JSON.stringify(stations, null, 2));
}

async function sortByNameLength() {
    const stations = JSON.parse(await fs.readFile("stations.json", "utf-8"));
    const stationDict = new Map();
    for (const station of stations.flat()) {
        const name = station[0];
        if (!stationDict.has(name.length)) {
            stationDict.set(name.length, new Set([name]));
        }
        stationDict.get(name.length).add(name);
    }
    await fs.writeFile("sort.json", JSON.stringify([...stationDict].map(([length, nameSet]) => [length, [...nameSet]]), null, 2));
}

// crawlAndSave();
// sortByNameLength();