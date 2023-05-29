const { connection } = require('./db');

const Todo = function (todo) {
    this.title = todo.title;
    this.activity_group_id = todo.activity_group_id;
    this.priority = todo.priority;
    this.is_active = todo.is_active || true;
    this.created_at = todo.createdAt || new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.updated_at = todo.updatedAt || this.createdAt;
}

Todo.create = async (newTodo) => {
    try {
        const result = await connection.query("INSERT INTO todos SET ?", [newTodo]);
        const insertedData = { ...newTodo, activity_id: result.insertId };
        return insertedData;
    } catch (error) {
        console.log(error);
    }
};

Todo.getAll = async (id) => {
    try {
        const [result] = await connection.query('SELECT * FROM todos WHERE activity_group_id = ?', [id]);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Todo.getOne = async (id) => {
    try {
        const [result] = await connection.query("SELECT * FROM todos WHERE todo_id = ?", [id]);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Todo.update = async (id, data) => {
    try {
        const result = await connection.query("UPDATE todos SET title = ?, priority= ?, is_active= ?, updated_at = ? WHERE todo_id = ?", [data.title, data.priority, data.is_active, data.updated_at, id]);
        if (result) {
            const updatedData = { todo_id: id, ...data };
            return updatedData;
        }
    } catch (error) {
        console.log(error);
    }
};

Todo.delete = async (id) => {
    try {
        const result = await connection.query("DELETE FROM todos WHERE todo_id = ?", [id]);
        return result;
    } catch (error) {
        console.log(error);
    }
};

module.exports = Todo;