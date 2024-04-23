const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const AddressModel = mongoose.model("AddressEcommModel");
const protectedRoute = require("../middleware/protectedResource");
const bodyparser = require('body-parser');

router.post("/addaddress", protectedRoute ,(req, res) => {
    const { fullName, address, city, postalcode, country } = req.body;
    if (!fullName || !address || !city || !postalcode || !country) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
else{
            req.user.password = undefined;
            var data = new AddressModel({ fullName, address, city, postalcode, country ,customer: req.user  });
            data.save()
                .then((newAddress) => {
                    res.status(201).json({ result: "Address added" });
                })
                .catch((err) => {
                    console.log(err);
                })
       
            .catch((err) => {
                console.log(err);
            })
}
        });

router.get("/getaddress", protectedRoute, (req, res) => {
        AddressModel.find({ customer: req.user._id })
        .populate("customer", "fullName")
        .then((dbAddress) => {
            res.status(200).json({ address: dbAddress })
        })
        .catch((error) => {
            console.log(error);
        })
});


module.exports = router;