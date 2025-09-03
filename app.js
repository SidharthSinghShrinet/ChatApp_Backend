require('dotenv').config();
const express = require('express');
const error = require('./src/middlewares/error.middlewares');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/user.routes');
const messageRoutes = require('./src/routes/message.routes');
const app = express();

app.use(cookieParser());

const corsOption={
    origin:[process.env.CLIENT_URL,"http://localhost:5173"],
    credentials:true
};
app.use(cors(corsOption)); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/messages',messageRoutes);

app.use(error);

module.exports = app;