const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');


const userRouter = require('./routes/user');
const prodRouter =  require('./routes/product');
const imgRouter = require('./routes/image');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const staticPath = path.join(__dirname,"../public");
app.use(express.static(staticPath));
app.use(userRouter);
app.use(prodRouter);
app.use(imgRouter);


app.listen(3000,()=>{
    console.log("App is listeing on 3000");
})