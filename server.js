import express, {json } from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./resources/utils/db.js";
import SECRETS from "./resources/configs/config.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

//Router Import
import IndexRouter from  "./resources/routes/index.js";

//Declaratons
const app = express();
const PORT = SECRETS.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : "BiP to-do App",
            description : "A simple to-do App",
            contact : {
                name : "Aditya Pandey"
            },
            servers : ["http://localhost:3000"]
        }
    },
    apis : ["server.js","./routes/index.js","./resources/routes/item_router.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
//Middleware
app.use(json());
app.use(cors());
app.use(morgan("dev"));


//Routes
const successString = '<div style="display : flex;justify-content:center"><h1><i>Server is Running!</i></h1></div>';
app.get("/",(req,res)=>res.status(200).send(successString));
app.use("/api", IndexRouter);


//Error Handler
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