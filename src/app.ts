import express from "express"
import auth from "./routes/auth"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDb from "./config/dbConnection"
dotenv.config()

connectDb();
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(auth)


app.listen(port)
