import express, {json } from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./resources/utils/db.js";
import SECRETS from "./resources/configs/config.js";

import IndexRouter from  "./resources/routes/index.js";

const app = express();
const PORT = SECRETS.PORT || 3000;


app.use(json());
app.use(cors());
app.use(morgan("dev"));


const successString = '<div style="display : flex;justify-content:center"><h1><i>Server is Running!</i></h1></div>';
app.get("/",(req,res)=>res.status(200).send(successString));
app.use("/api", IndexRouter);



app.use((err, req, res,next)=>{
    const { status = 500, message = "Internal Server Error" } = err;
    res.status(status).send({status, message});
  })


const start = async () => {
try {
    await connect();
    app.listen(PORT, () => {
    if (SECRETS.NODE_ENV === "development") {
        console.log(`REST API on http://localhost:${PORT}/`);
    }
    });
} catch (err) {
    console.error(err, "This is the error in starting the server");
}
};
start();