import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const username = req.body.username;
    const userpass = req.body.userpass;

    pool.query(
        `SELECT * FROM users WHERE username = \'${username}\' && password = \'${userpass}\';`,
        (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                console.log(results.length);
                if (results.length == 1) {
                    res.status(200).send({
                        isSuccess: true,
                        userId: results[0].id,
                        msg: "Login successful!",
                    });
                } else if(results.length < 1) {
                    res.status(403).send({
                        isSuccess: false,
                        msg: "No match found in database! Please Sign Up first!",
                    });
                }
            }
        }
    );
});

export default router;