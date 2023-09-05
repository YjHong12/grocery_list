const express = require('express');
const router = express.Router();

const {
    models: { User },
} = require("../db");

router.post("/login", async (req, res, next) => {
    try {
        res.send({ token: await User.authenticate(req.body) });
    } catch (error) {
        next(error);
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.send({ token: await user.generateToken() });
    } catch (error) {
        next(error);
    }
});

router.get("/profile", async (req, res, next) => {
    try {
        res.send(await User.findByToken(req.headers.authorization));
    } catch (error) {
        next(error);
    }
})