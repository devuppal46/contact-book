const express = require("express");
const path = require("path");

const staticRoute = require("./routes/home");
const contactsRoute = require("./routes/contacts");

const app =express();
const PORT = 8001;

app.use(express.json()); // lets me  read req.body as json
app.use(express.urlencoded({ extended: true })); // handles form data

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use("/", staticRoute);
app.use("/contacts", contactsRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

