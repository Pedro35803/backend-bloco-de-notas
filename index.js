import express from "express";
import "express-async-errors";
import cors from "cors";

import session from "express-session";
import cookieParser from "cookie-parser";

import handleError from "./src/middleware/handleError.js";
import router from "./src/router.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const originString = process.env.HOST_ALLOW;
const whiteListHost = originString.split(",");

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteListHost.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use(
//     session({
//         secret: process.env.SECRET_KEY,
//         resave: false,
//         saveUninitialized: false,
//         cookie: { maxAge: 30 * 60 * 1000 },
//         secure: true,
//     })
// );

app.use("/api/v1", router);
app.use(handleError);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`API iniciada na porta ${port}`));
