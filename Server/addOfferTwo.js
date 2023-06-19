import pool from "./databasePool.js";
import express from "express";
import multer from "multer";

const router = express.Router();

router.post("/", multer().single("image"), (req, res) => {
    const file = req.file; // Uploaded image file
    const brandData = JSON.parse(req.body.brandData);
    const modelData = JSON.parse(req.body.modelData);
    const priceData = JSON.parse(req.body.priceData);
    const manufacture_dateData = JSON.parse(req.body.manufacture_dateData);
    const engineData = JSON.parse(req.body.engineData);
    const litersData = JSON.parse(req.body.litersData);
    const transmissionData = JSON.parse(req.body.transmissionData);
    const categoryData = JSON.parse(req.body.categoryData);
    const mileageData = JSON.parse(req.body.mileageData);

    const userIdData = JSON.parse(req.body.userIdData);
    const phoneData = JSON.parse(req.body.phoneData);
    const cityData = JSON.parse(req.body.cityData);
    const regionData = JSON.parse(req.body.regionData);
    const countryData = JSON.parse(req.body.countryData);

    //Execute the first query
    pool.query(
        `INSERT INTO cars (image, brand, model, price, manufacture_date, engine, liters, transmission, category, mileage) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            file.buffer,
            brandData.brand,
            modelData.model,
            priceData.price,
            manufacture_dateData.manufacture_date,
            engineData.engine,
            litersData.liters,
            transmissionData.transmission,
            categoryData.category,
            mileageData.mileage,
        ],
        (queryError2, result2) => {
            if (queryError2) {
                console.error(queryError2);
                return res.status(500).send({msg: "Error inserting data"});
            }

            // Execute the second query
            pool.query(`SELECT MAX(id) AS last_id FROM cars`, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ msg: "Error in getting car id."});
                }
                const insertedId = result[0].last_id;

                // Execute the third query
                pool.query(
                    `INSERT INTO sellers (user_id, car_id, phone_number, city, region, country) 
                    VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        userIdData.userId,
                        insertedId,
                        phoneData.phone,
                        cityData.city,
                        regionData.region,
                        countryData.country,
                    ],
                    (queryError1, result1) => {
                        if (queryError1) {
                            console.error(queryError1);
                            return res.status(500).send({msg: "Error inserting data"});
                        }

                        return res
                            .status(200)
                            .send({ msg: "Data inserted successfully" });
                    }
                );
            });
        }
    );
});

export default router;
