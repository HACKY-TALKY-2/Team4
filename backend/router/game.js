import { Router } from "express";
import { prisma } from "../index.js";
import { makeQuiz } from "../util.js";

const router = Router();

router.post("/create", async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    if (id === undefined || !name) {
        res.status(400).send("Bad Request");
        return;
    }
    const { problem, answer } = makeQuiz();
    const game = await prisma.game.create({ data: {}, include: { rounds: true } });
    const round = await prisma.round.create({
        data: {
            gameId: game.id,
            roundNum: game.rounds.length + 1,
            problems: problem,
            answers: answer,
            time: Date.now() + 15 * 1000
        }
    });
    res.json({
        id: game.id,
        round: round.roundNum,
        problem: round.problems,
        time: round.time
    });
});

router.post("/guess", async (req, res) => {
    res.send("Hello, Game!");
});

router.post("/register", async (req, res) => {
    res.send("Hello, Game!");
});


export default router;