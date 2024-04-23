const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const ItemModel = mongoose.model("ItemEcommModel");

router.post("/additem", (req, res) => {
    const { name, description, price, image } = req.body;
    if (!name || !description || !price || !image) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
else{
            var data = new ItemModel({ name, description, price, image });
            data.save()
                .then((newItem) => {
                    res.status(201).json({ result: "Item added" });
                })
                .catch((err) => {
                    console.log(err);
                })
       
            .catch((err) => {
                console.log(err);
            })
}
        });

router.get("/getitem", (req, res) => {
        ItemModel.find()
        .then((dbItem) => {
            res.status(200).json({ item: dbItem })
        })
        .catch((error) => {
            console.log(error);
        })
});

router.post("/addreview", (req, res) => {
    const { reviewText, star } = req.body;
    if (!reviewText || !star ) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
else{
            const review = { reviewText: req.body.reviewText , star: req.body.star }
            ItemModel.findByIdAndUpdate(req.body.itemId, {
                $push: { reviews : review}
            }, {
                new: true //returns updated record
            }).populate("reviews", "reviewText star _id")
                .exec((error, result) => {
                    if (error) {
                        return res.status(400).json({ error: error });
                    } else {
                        res.json(result);
                    }
                })
}
        });

router.get("/getreview", (req, res) => {
       ItemModel.find()
       .populate("reviews", "reviewText star").find()
        .then((dbReview) => {
            res.status(200).json({ review: dbReview })
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = router;