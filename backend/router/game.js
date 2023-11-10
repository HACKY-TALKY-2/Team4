import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
    res.send("Hello, Game!");
});

router.post("/guess", async (req, res) => {
    res.send("Hello, Game!");
});

router.post("/register", async (req, res) => {
    res.send("Hello, Game!");
});


export default router;