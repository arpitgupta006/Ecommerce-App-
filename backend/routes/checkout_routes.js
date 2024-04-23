const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const CheckoutModel = mongoose.model("CheckoutEcommModel");
const protectedRoute = require("../middleware/protectedResource");
const bodyparser = require('body-parser');

router.post("/addcheckout", protectedRoute, (req, res) => {
    const { quantity, amount } = req.body;
    if (!quantity || !amount ) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
else{
            req.user.password = undefined;
            var data = new CheckoutModel({ quantity, amount ,customer: req.user});
            data.save()
                .then((newCheckout) => {
                    res.status(201).json({ result: "Checkout added" });
                })
                .catch((err) => {
                    console.log(err);
                })
       
            .catch((err) => {
                console.log(err);
            })
}
        });

router.get("/getcheckout", protectedRoute, (req, res) => {
       CheckoutModel.find({ customer: req.user._id })
       .populate("customer", "fullName")
        .then((dbCheckout) => {
            res.status(200).json({ checkout: dbCheckout })
        })
        .catch((error) => {
            console.log(error);
        })
});


module.exports = router;