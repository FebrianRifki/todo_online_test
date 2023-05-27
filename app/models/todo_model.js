const sql = require('./db');

const Todo = function (todo) {
    this.title = todo.title;
    this.activity_group_id = todo.activity_group_id;
    this.priority = todo.priority;
    this.is_active = todo.is_active || true;
    this.created_at = todo.createdAt || new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.updated_at = todo.updatedAt || this.createdAt;
}

Todo.create = (newTodo) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO todos SET ?", newTodo, (error, result) => {
            if (error) {
                console.log("error: ", error);
                reject(error);
            }
            const insertedData = { ...newTodo, todo_id: result.insertId };
            resolve(insertedData);
        });
    });
}

Todo.getAll = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM todos WHERE activity_group_id = ?", id, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

Todo.getOne = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM todos WHERE todo_id = ?", id, (error, data) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};


Todo.update = (id, data) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE todos SET title = ?, priority= ?, is_active= ?, updated_at = ? WHERE todo_id = ?", [data.title, data.priority, data.is_active, data.updated_at, id], (error, res) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                sql.query("SELECT * FROM todos WHERE todo_id = ?", id, (err, result) => {
                    resolve(result);
                });
            }
        });
    });
}

Todo.delete = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM todos WHERE todo_id = ?", id, (error, result) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = Todo;