const express = require('express');
const router = express.Router();
const userModel = require('../model/model');
module.exports = router;

//post
router.post('/add', (req, res) => {
    console.log('POST IS WORKING!');
    if (req.body.data) {
        const user = userModel({
            id: req.body.data.id,
            name: req.body.data.name,
            age: req.body.data.age,
            country: req.body.data.country
        });
        user.save((err, result) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            } else if (result) {
                res.status(200).send({sucess: true,  message : "Data added successfully"});
            }
        });
    } else {
        res.status(400).json({
            message: 'Please Enter any DATA!'
        });
    }
});

router.get('/:id', (req, res) => {
    res.send('GET IS WORKING!');
    userModel.findById({ id: req.params.id }, (err, result) => {
        if (err || result === null) {
            res.status(404).send({ success: false, message: 'User not found' })
        } else {
            res.status(200).send({ success: true, message: 'Success!', result })
        }
    })
});

router.patch('/:id', (req, res) => {
    console.log('PATCH IS WORKING!');
    userModel.findById({ id: req.params.id }, req.body.data, { new: true }, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "unable to fetch!"
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Success!",
                result
            })
        }
    })
});

router.delete('/:id', (req, res) => {
    console.log('DELETE IS WORKING!');
    userModel.findByIdAndRemove({ id: req.params.id }, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Not found"
            });
        } else
            res.status(200).send({
                success: true,
                message: "Success!!",
                result
            });
    });
});