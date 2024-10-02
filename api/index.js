const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("../routes/auth");

mongoose.connect("mongodb+srv://adil:UCEBX4czTK6NRQNA@fyp.rpm3t.mongodb.net/?retryWrites=true&w=majority&appName=Fyp", {}).then(() => {
	console.log("DB CONNECTED");
});

app.use(bodyParser.json());
app.use(cors());

app.use("/api", auth);

app.get("/", (req, res) => {
	res.status(200).send({msg: "sever running..."})
})

const port = 2000;

app.listen(port, () => {
	console.log(`app is running at port ${port}`);
});
