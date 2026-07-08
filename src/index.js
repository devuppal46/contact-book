const express = require("express");
const staticRoute = require("./routes/home");
const contactsRoute = require("./routes/contacts");

const app =express();
const PORT = 8001;

app.use(express.json()); // lets me  read req.body as json
app.use(express.urlencoded({ extended: true })); // handles form data

app.use("/", staticRoute);
app.use("/contacts", contactsRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

