const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://ian:comp3123@labs.8mejgue.mongodb.net/?retryWrites=true&w=majority&appName=Labs&loadBalanced=true";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
})
.catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});