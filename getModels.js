import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const brand = req.body.brandId;
    pool.query(`SELECT DISTINCT model FROM cars WHERE brand = \'${brand}\' ORDER BY model ASC`, (error, results, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.status(200).send({
                models: results,
            });
        }
    });
});

export default router;