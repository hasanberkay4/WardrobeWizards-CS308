import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/dbConnection"

// routers
import { authRouter } from "./routes/authRouter";
import { productRouter } from "./routes/productRouter"
import { imagesRouter } from "./routes/imagesRouter";
import { userRouter } from "./routes/userRouter";

dotenv.config()

connectDb();
const app = express()
const port = process.env.PORT || 5000

app.use(express.json());
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/images', imagesRouter);
app.use('/users/', userRouter);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
