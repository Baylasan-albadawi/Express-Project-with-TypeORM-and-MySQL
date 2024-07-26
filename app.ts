import { Request, Response, Express } from "express";
import express from 'express'
import "dotenv/config"
import customerRouter from "./routes/customer.js"
import { customErrorHandler } from "./middleware/errorHandeller.js";
import dataSource from "./db/dbConfig.js"

const app: Express = express();
const PORT =  3000


app.use(express.json())
app.use("/customers", customerRouter)
app.use(customErrorHandler)

dataSource.initialize()
.then(()=>{
    console.log("Connected to DB");
})
.catch((error)=>{
    console.log("Faild to connect to DB"+error);
})

let Server = app.listen(PORT, () => {

    console.log(`Server is running on host :http://localhost:${PORT} `);
});
