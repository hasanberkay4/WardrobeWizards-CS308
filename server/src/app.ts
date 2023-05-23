import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/dbConnection"
import cors from "cors"

// routers
import { authRouter } from "./routes/authRouter";
import { productRouter } from "./routes/productRouter"
import { imagesRouter } from "./routes/imagesRouter";
import { userRouter } from "./routes/userRouter";
import { commentRouter } from "./routes/commentRouter";
import { adminRouter } from './routes/adminRouter';
import { transactionRouter} from "./routes/transactionRouter"
import { upload } from "./middleware/adminMiddleware/productMiddleware";

dotenv.config()

connectDb();
export const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors());

app.use('/auth/', express.json(), authRouter);
app.use('/products/', express.json(), productRouter);
app.use('/images/', express.json(), imagesRouter);
app.use('/users/', express.json(), userRouter);
app.use('/comments/', express.json(), commentRouter);
app.use('/admin/', express.json(), adminRouter);
app.use('/transaction/', express.json(), transactionRouter);

// upload image
app.post('/upload', upload, (req, res) => {
    res.json({ file: req.file });
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
