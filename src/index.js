const app = require("../src/app");
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

//moongodb connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB Atlas")).catch((error) => console.log(error));

app.listen(port, () => console.log("server listening on port", port));