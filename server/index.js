

import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from 'cors';
import  Color  from "colors";
import authRouter from './routes/authRoute.js'
import morgan from "morgan"
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'


const app = express();
const port = process.env.PORT || 8080;
dotenv.config();


// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("dev"))
// app.use(cors({
//   origin: ['http://localhost:5173'], // Allow requests from this origin
//   methods:["POST","GET","DELETE","PUT"]
 
// }));
app.use(cors())


app.get("/",(req,res)=>{
  res.send("hello")
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
   
  });

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgBlack.red);
});
