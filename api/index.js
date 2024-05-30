const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("../routes/auth");

mongoose.connect("mongodb+srv://adildevmate:exAivGCIU3iwzIBb@cluster1.e24qfkj.mongodb.net", {}).then(() => {
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
