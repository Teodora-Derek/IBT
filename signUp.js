import pool from "./databasePool.js";
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const username = req.body.username;
    const userpass = req.body.userpass;
    console.log(username);
    console.log(userpass);
    pool.query(
        `SELECT username, password FROM users WHERE username = \'${username}\' && password = \'${userpass}\';`,
        (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                console.log(results.length);
                if (results.length == 0) {
                    pool.query(
                        `INSERT INTO users (\`username\`, \`password\`) VALUES (\'${username}\',\'${userpass}\');`
                    );
                    res.status(200).send({
                        msg: "Register successful!",
                    });
                } else {
                    res.status(403).send({
                        msg: "User allready exists. Use different username or if the data is correct, go to Log in.",
                    });
                }
            }
        }
    );
});

export default router;
