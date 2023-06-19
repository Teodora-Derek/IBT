import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    pool.query(
        `SELECT * FROM cars ORDER BY id DESC LIMIT 5`,
        (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                console.log(results.length);
                console.log(results);

                if (results.length > 0) {
                    res.status(200).send({
                        info: results,
                        isSuccessful: true,
                    });
                } else if (results.length <= 0) {
                    res.status(200).send({
                        info: results,
                        isSuccessful: false,
                    });
                }
            }
        }
    );
});

export default router;
