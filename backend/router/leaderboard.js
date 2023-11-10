import { Router } from "express";
import { prisma } from "../index.js";

const router = Router();

router.get("/", async (req, res) => {
    const games = await prisma.game.findMany();
    res.json(games);
});


export default router;