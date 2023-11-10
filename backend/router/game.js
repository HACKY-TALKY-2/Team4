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
    const game = await prisma.game.create({ data: { name: name }, include: { rounds: true } });
    const round = await prisma.round.create({
        data: {
            gameId: game.id,
            roundNum: game.rounds.length + 1,
            problems: problem.map(el => [el, 0]),
            answers: answer,
            time: new Date(Date.now() + 15 * 1000)
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
    const id = req.body.id;
    const guess = req.body.guess;
    if (!id || !guess) {
        res.status(400).send("Bad Request");
        return;
    }
    const game = await prisma.game.findUnique({ where: { id: id }, include: { rounds: true } });
    if (!game) {
        res.status(404).send("Not Found");
        return;
    }
    const lastRound = game.rounds[game.rounds.length - 1];
    const isCorrect = lastRound.answers.includes(guess);
    let newRound;
    if (isCorrect) {
        let problems = lastRound.problems;
        const answerNum = Math.max(lastRound.problems.map(el => el[1])) + 1;
        for (const iterator of guess) {
            const index = problems.findIndex(el => (el[1] === 0) && (el[0] === iterator));
            problems[index] = [iterator, answerNum];
        }
        newRound = await prisma.round.update({
            where: { id: lastRound.id },
            data: { problems }
        });
    } else {
        newRound = await prisma.round.update({
            where: { id: lastRound.id },
            data: {
                time: new Date(lastRound.time.getTime() - 5 * 1000)
            }
        });
    }
    const time = Date.now();
    const isTimeout = time > newRound.time;
    const getAllAnswer = Math.max(newRound.problems.every(el => el[1])) === 3;
    res.json({
        id: game.id,
        round: newRound.roundNum,
        problem: newRound.problems,
        time: newRound.time,
        isGameOver: isTimeout,
        goToNewRound: !isTimeout && getAllAnswer
    });
    if (isTimeout) {
        await prisma.game.update({
            where: { id: game.id },
            data: { finishedAt: newRound.time }
        });
    }
});

export default router;