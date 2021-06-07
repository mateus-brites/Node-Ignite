const express = require("express");
 
const app = express();

app.get("/", (request, response) => {
    response.json({Message: "Hello Word"})
})

app.listen(3333, () => console.log("server started on port 3333"));