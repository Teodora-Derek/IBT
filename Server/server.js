import mysql from "mysql";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getBrandsRouter from "./getBrands.js";
import getModelsRouter from "./getModels.js";
import getCategoriesRouter from "./getCategories.js";
import getCarsResultsRouter from "./getCarsResults.js";
import signUp from "./signUp.js";
import login from "./login.js";
import addOfferTwo from "./addOfferTwo.js";
import getSellerInfo from "./getSellerInfo.js";
import topOffers from "./topOffers.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/getBrands", getBrandsRouter);
app.use("/getModels", getModelsRouter);
app.use("/getCategories", getCategoriesRouter);
app.use("/getCarsResults", getCarsResultsRouter);
app.use("/signUp", signUp);
app.use("/login", login);
app.use("/addOfferTwo", addOfferTwo);
app.use("/getSellerInfo", getSellerInfo);
app.use("/topOffers", topOffers);
app.listen(port);
