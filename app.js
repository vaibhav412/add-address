const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let addresses = [];

mongoose.connect("mongodb://localhost:27017/addressDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);
mongoose.set("useCreateIndex", true);

const addressSchema = new mongoose.Schema({
    name: String,
    mobile_no: Number,
    pincode: Number,
    locality: String,
    address: String,
    city: String,
    state: String,
    landmark: String,
    alt_phone: Number,
    add_type: String
});

const User = new mongoose.model("User", addressSchema);

app.get("/", function (req, res) {

    User.find({}, function (err, users) {
        res.render("home", {
            users: users
        });
    });
});

app.get("/address", function (req, res) {
    res.render("address");
});

app.post("/address", function (req, res) {
    const newUser = new User(
        {
            name: req.body.name,
            mobile_no: req.body.mobile_no,
            pincode: req.body.pincode,
            locality: req.body.locality,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            landmark: req.body.landmark,
            alt_phone: req.body.alt_phone,
            add_type: req.body.optradio
        });
    newUser.save(function (err) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});



let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function () {
    console.log("Server started at port 3000.");
});