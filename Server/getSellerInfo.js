import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const carId = req.body.carId;
    pool.query(
        `SELECT * FROM sellers WHERE car_id = \'${carId}\'`,
        (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                console.log(results.length);
                console.log(results);

                if (results.length > 0) {
                    res.status(200).send({
                        info: results,
                        isSiteOwned: false,
                    });
                } else if (results.length == 0) {
                    res.status(200).send({
                        info: results,
                        isSiteOwned: true,
                    });
                }
            }
        }
    );
});

export default router;
