import { PrismaClient } from "@prisma/client";
import express from "express";
import gameRouter from "./router/game.js";
import leaderboardRouter from "./router/leaderboard.js";

export const prisma = new PrismaClient();

// create an object of the express module
const app = express();

// root 경로에 접근 시 다음 callback 함수 호출
app.get("/", (req, res) => {
    // send "Hello, World!" response to the browser
    res.send("Hello, Channel!");
});
app.use("/game", gameRouter);
app.use("/leaderboard", leaderboardRouter);

const PORT = 3000;

const handleListen = () => {
    console.log(`The server is running on the port ${PORT}`);
};

// make the server listen on port 3000
app.listen(PORT, handleListen);