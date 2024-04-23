const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const OrderModel = mongoose.model("OrderEcommModel");
const protectedRoute = require("../middleware/protectedResource");
const bodyparser = require('body-parser');

router.post("/addorder", protectedRoute ,(req, res) => {
    const { fullName, address, product, quantity, amount } = req.body;
    if (!fullName || !address || !product || !quantity || !amount) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
else{
            req.user.password = undefined;
            var data = new OrderModel({ fullName, address, product, quantity, amount  });
            data.save()
                .then((newOrder) => {
                    res.status(201).json({ result: "Order added" });
                })
                .catch((err) => {
                    console.log(err);
                })
       
            .catch((err) => {
                console.log(err);
            })
}
        });

router.get("/getorder", protectedRoute, (req, res) => {
        OrderModel.find()
        .then((dbOrder) => {
            res.status(200).json({ order: dbOrder })
        })
        .catch((error) => {
            console.log(error);
        })
});


module.exports = router;