const express = require("express");
const staticRoute = require("./routes/staticRouter");

const app =express();
const PORT = 8001;

app.use("/", staticRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

