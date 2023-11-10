import { Router } from "express";
import { prisma } from "../index.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const games = await prisma.game.findMany({
            include: {
                rounds: true,
            }
        });

        const formattedGames = games
        .filter(game => game.finishedAt !== null) // finishedAt이 null이 아닌 게임만 필터링
        .map(game => {
        // games.map(game => {
            // 밀리초 단위의 duration 계산
            const durationMs = game.finishedAt && game.createdAt 
                ? game.finishedAt.getTime() - game.createdAt.getTime() 
                : 0;
            
            // 분과 초로 변환
            const minutes = Math.floor(durationMs / 60000);
            const seconds = Math.floor((durationMs % 60000) / 1000);
            const date = game.finishedAt.toISOString().split('T')[0]; 

            return {
                name: game.name,
                date: date,
                round: game.rounds.length,
                duration: `${minutes}분 ${seconds}초`, // 분과 초 형태의 문자열
                durationMs: durationMs
            };
        }).sort((a, b) => {
            // 먼저 round 수에 따라 정렬
            if (b.round !== a.round) {
                return b.round - a.round;
            }
            // round 수가 같으면 duration으로 정렬
            return a.durationMs - b.durationMs;
        }).slice(0, 9).map((game) => {return {...game, durationMs:undefined}});

        res.json(formattedGames);
    } catch (error) {
        res.status(500).send({ message: "Error fetching data" });
    }
});

export default router;
