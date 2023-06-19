import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    pool.query("SELECT DISTINCT brand FROM cars ORDER BY brand ASC", (error, results, fields) => {
        if (error) {
            console.error(error);
            // Handle the error appropriately
        } else {
            res.status(200).send({
                brands: results,
            });
            // Process the fetched data here
        }
    });
});

export default router;
