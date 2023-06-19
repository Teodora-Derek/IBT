import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const model = req.body.modelId;
    console.log(model);
    pool.query(`SELECT DISTINCT category FROM cars WHERE model = \'${model}\' ORDER BY category ASC`, (error, results, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.status(200).send({
                categories: results,
            });
        }
    });
});

export default router;
