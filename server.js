"use strict";

const port = 8080;
const express = require("express");
const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});