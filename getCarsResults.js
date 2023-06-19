import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const brand = req.body.brand;
    const model = req.body.model;
    const category = req.body.category;
    console.log(brand);
    console.log(model);
    console.log(category);
    pool.query(
        `SELECT * FROM cars WHERE brand = \'${brand}\' && model = \'${model}\' && category = \'${category}\' ORDER BY brand ASC`,
        (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                res.status(200).send({
                    cars: results,
                });
            }
        }
    );
});

export default router;
