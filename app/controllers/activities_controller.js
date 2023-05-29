const { request } = require('express');
const Activity = require('../models/activities_model');
const { connection } = require('../models/db');


// Display all activity Data
exports.getAllActivity = async (req, res) => {
    try {
        const result = await Activity.getAll();
        const formattedData = result.map(activity => ({
            id: activity.activity_id,
            title: activity.title,
            email: activity.email,
            createdAt: activity.created_at,
            updatedAt: activity.updated_at
        }));
        res.send({
            status: "Success",
            message: "Success",
            data: formattedData
        });

    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: error.message,
            data: {}

        });
    }
};

// Display an activity data
exports.findOneData = async (req, res) => {
    try {
        var id = req.params.id;
        const result = await Activity.getOne(id);
        var data = result[0];
        if (result.length != 0) {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: {
                    id: data.activity_id,
                    title: data.title,
                    email: data.email,
                    createdAt: data.created_at,
                    updatedAt: data.updated_at
                }

            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: `Activity with ID ${id} Not Found`,
                data: {}
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server Error",
            data: {}

        });
    }
};

// Create an activity data
exports.createActivity = async (req, res) => {
    try {
        let now = new Date();
        let createdAt = now.toISOString().slice(0, 19).replace('T', ' ');
        let updatedAt = createdAt;
        if (req.body.title) {
            // Create a activity
            const newActivity = new Activity({ title: req.body.title, email: req.body.email, createdAt: createdAt, updatedAt: updatedAt });
            // Save to database
            const result = await Activity.create(newActivity);
            if (result.length != 0) {
                res.status(201).send({
                    status: "Success",
                    message: "Success",
                    data: {
                        id: result.activity_id,
                        title: result.title,
                        email: result.email,
                        createdAt: result.created_at,
                        updatedAt: result.updated_at
                    }
                });
            }
        } else {
            res.status(400).send({
                "status": "Bad Request",
                "message": "title cannot be null",
                "data": {}
            });
        }

    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server Error",
            data: {}

        });
    }
}

// Update Activity
exports.updateActivity = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Activity.getOne(id);
        if (data.length != 0) {
            const newData = {
                "title": req.body.title,
                "updated_at": new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
            let result = await Activity.update(id, newData);
            if (result.length != 0) {
                let data = result;
                res.status(200).send({
                    "status": "Success",
                    "message": "Success",
                    "data": {
                        "id": data.activity_id,
                        "title": data.title,
                        "email": data.email,
                        "createdAt": data.created_at,
                        "updatedAt": data.updated_at
                    }
                })
            } else {
                res.status(500).send({
                    "status": "Failed",
                    "message": "Oops.. Something went",
                    "data": {}
                })
            }
        } else {
            res.status(404).send({
                "status": "Not Found",
                "message": `Activity with ID ${id} Not Found`,
                "data": {}
            })
        }


    } catch (error) {
        res.status(500).send({
            "status": "Failed",
            "message": error.message,
            "data": {}
        })
    }
}

// Delete activity
exports.deleteActivity = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Activity.getOne(id);
        if (data.length != 0) {
            let result = await Activity.delete(id);
            if (result) {
                res.send({
                    "status": "Success",
                    "message": `Success delete Activity`,
                    "data": {}
                });
            } else {
                res.send({
                    "status": "Failed",
                    "message": "Oops something went wrong",
                    "data": {}
                });
            }
        } else {
            res.status(404).send({
                "status": "Not Found",
                "message": `Activity with ID ${id} Not Found`,
                "data": {}
            });
        }

    } catch (error) {
        res.status(500).send({
            "status": "Failed",
            "message": "Internal Server Error!",
            "data": {}
        })
    }
}







