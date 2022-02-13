const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {mongoURI} = require("../src/config/keys");

const app = express();
dotenv.config();

mongoose.connect(mongoURI)
    .then(value => {
        console.log(`Connected to MongoDB on database ${value.connection.db.databaseName}`)
    }).catch(error => {
    console.log(`Error connecting to Mongo DB: ${error.message}`);
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));


const PORT = process.env.PORT || 7003;
app.listen(PORT, () => {
    console.log(`Connected to server in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
