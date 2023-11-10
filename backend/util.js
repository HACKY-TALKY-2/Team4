import * as fs from "fs";

const sortJSON = JSON.parse(fs.readFileSync("./data/sort.json", "utf-8"));
const stationDict = new Map(sortJSON.map(station => [station[0].toString(), new Set(station[1])]));
const num2 = stationDict.get("2").size;
const num3 = stationDict.get("3").size;
const num4 = stationDict.get("4").size;
const num5 = stationDict.get("5").size;

const num234 = num2 * num3 * num4;
const num333 = num3 * (num3 - 1) * (num3 - 2);
const num225 = num2 * (num2 - 1) * num5;


function getRandom(n, l) {
    return [...stationDict.get(n.toString())].sort(() => 0.5 - Math.random()).splice(0, l);
}

export function makeQuiz() {
    const rand = Math.random() * (num234 + num333 + num225);
    const randomType = [num234, num234 + num333, num234 + num333 + num225].findIndex(el => rand <= el);
    let stations;
    switch (randomType) {
        case 0:
            stations = [getRandom(2, 1), getRandom(3, 1), getRandom(4, 1)];
        case 1:
            stations = [getRandom(3, 3)];
        case 2:
            stations = [getRandom(2, 2), getRandom(5, 1)];
    }
    return {
        problem: stations.flat().join("").split("").sort(() => 0.5 - Math.random()),
        answer: stations.flat()
    };
}