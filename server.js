const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/NoteRoutes.js');

const DB_URL = "mongodb+srv://ian:comp3123@labs.8mejgue.mongodb.net/?retryWrites=true&w=majority&appName=Labs&loadBalanced=true";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add this debugging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
    next();
});

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

console.log('About to register notes routes');
app.use('/notes', notesRoutes);
console.log('Notes routes registered');

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});