const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');

module.exports = router;

router.post('/add_data', (req, res) => {
    if (req.body.data) {
        const user = new userModel({
            first_Name: req.body.data.first_Name,
            last_Name: req.body.data.last_Name,
            email: req.body.data.email,
            gender: req.body.data.gender,
            city: req.body.data.city,
            country: req.body.data.country,
            phoneNumber: req.body.data.phoneNumber,
            currentAddress: req.body.data.currentAddress,
            permanentAddress: req.body.data.permanentAddress
        });
        user.save((err, result) => {
            if(err){
                res.status(500).send({success: false, message: err.message});
            }else{
                res.status(200).json({
                    success: true,
                    message: 'User Data Added Succefully',
                    result
                });
            }
        });

    } else {
        res.status(400).json({
            message: 'Please Enter any Data!'
        });
    }
});

router.get('/:name', (req, res) => {
    userModel.findOne({first_Name: req.params.name}, (err, result) => {
        if (err || result === null) {
            res.status(404).send({sucees: false, message: "User Not Found"})
        } else {
            res.status(200).send({sucess: true, message: "Succesfully fetched user details", result});
        }
    })
})

router.patch('/:name', (req, res) => {    
    userModel.findOneAndUpdate({first_Name: req.params.name}, req.body.data,{new: true}, (err, doc) => {
        if (err) {
            res.status(500).send({success: false, message: "Unable to update data"})            
        } else {
            res.status(200).send({success: true ,message: "Succesfully updated the data", result: doc});
        }
 })
}); 

router.delete('/:name', (req, res) =>{
    userModel.remove({first_Name: req.params.name}, (err, doc) => {
        if (err) {
            res.status(500).send({success: false, message: "Unable to delete the user"});
        } else {
            res.status(200).send({success: true, message: "Succesfully deleted the user", result: doc});
        }
    })
});