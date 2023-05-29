const { request } = require('express');
const Todo = require('../models/todo_model');


// Display all todo Data
exports.getAllTodo = async (req, res) => {
    try {
        const id = req.query.activity_group_id;

        const result = await Todo.getAll(id);
        if (result.length != 0) {
            const formattedData = result.map(todo => ({
                id: todo.todo_id,
                activity_group_id: todo.activity_group_id,
                title: todo.title,
                is_active: todo.is_active == 1 ? true : false,
                priority: todo.priority,
                createdAt: todo.created_at,
                updatedAt: todo.updated_at
            }));
            res.send({
                status: "Success",
                message: "Success",
                data: formattedData
            });
        } else {
            res.status(200).send({
                status: "Success",
                message: `Todo with activity group id ${id} Not Found`,
                data: []
            });
        }


    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server Error!",
            data: {}
        });
    }
};

// Display a todo data
exports.findOneData = async (req, res) => {
    try {
        var id = req.params.id;
        const result = await Todo.getOne(id);
        if (result.length != 0) {
            var data = result[0];
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: {
                    id: data.todo_id,
                    activity_group_id: data.activity_group_id,
                    title: data.title,
                    is_active: data.is_active == 1 ? true : false,
                    priority: data.priority,
                    createdAt: data.created_at,
                    updatedAt: data.updated_at
                }

            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: `Todo with ID ${id} Not Found`,
                data: {}
            });
        }
    } catch (error) {
        res.status(500).send({
            "status": "Failed",
            "message": "Internal Server Error!",
            "data": {}
        })
    }
};

// Create a todo data
exports.createToDo = async (req, res) => {
    try {
        if (!req.body.title) {
            res.status(400).send({
                status: "Bad Request",
                message: "title cannot be null",
                data: {}
            });
        } else if (!req.body.activity_group_id) {
            res.status(400).send({
                status: "Bad Request",
                message: "activity_group_id cannot be null",
                data: {}
            });
        } else {
            let now = new Date();
            let createdAt = now.toISOString().slice(0, 19).replace('T', ' ');
            let updatedAt = createdAt;
            // Create a Todo
            const newTodo = new Todo({ title: req.body.title, activity_group_id: req.body.activity_group_id, priority: "very-high", is_active: req.body.is_active, createdAt: createdAt, updatedAt: updatedAt });
            // Save to database
            const result = await Todo.create(newTodo);
            res.status(201).send({
                status: "Success",
                message: "Success",
                data: {
                    "id": result.todo_id,
                    "title": result.title,
                    "activity_group_id": result.activity_group_id,
                    "is_active": true,
                    "priority": result.priority,
                    "updatedAt": result.updated_at,
                    "createdAt": result.created_at
                }
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server Error!",
            data: {}
        });
    }
}

// Update todo
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title != null ? req.body.title : 'todoTestingUpdated';
        const priority = req.body.priority != null ? req.body.priority : 'very-high';
        let data = await Todo.getOne(id);
        if (Array.isArray(data) && data.length != 0) {
            const newData = {
                "title": title,
                "priority": priority,
                "is_active": req.body.is_active,
                "status": "ok",
                "updated_at": new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
            let result = await Todo.update(id, newData);
            if (result.length != 0) {
                let data = result;
                res.status(200).send({
                    "status": "Success",
                    "message": "Success",
                    "data": {
                        "id": data.todo_id,
                        "title": title,
                        "activity_group_id": data.activity_group_id,
                        "is_active": data.is_active == 1 ? true : false,
                        "priority": priority,
                        "updatedAt": data.updated_at,
                        "createdAt": data.created_at
                    }
                });
            } else {
                res.status(500).send({
                    "status": "Failed",
                    "Message": "Oops.. Something went wrong",
                    "data": {}
                })
            }
        } else {
            res.status(404).send({
                "status": "Not Found",
                "message": `Todo with ID ${id} Not Found`,
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

// Delete todo
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        let selectedData = await Todo.getOne(id);
        if (selectedData.length != 0) {
            let result = await Todo.delete(id);
            if (result) {
                res.status(200).send({
                    "status": "Success",
                    "message": `Success delete Todo`,
                    "data": {}
                });
            } else {
                res.status(500).send({
                    "status": "Failed",
                    "message": "Oops.. something went wrong",
                    "data": {}
                });
            }
        } else {
            res.status(404).send({
                "status": "Not Found",
                "message": `Todo with ID ${id} Not Found`,
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







