require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const db=require('./config/dbConfig')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use('/api/users' , userRoute)
app.use('/api/products' , productsRoute)




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});