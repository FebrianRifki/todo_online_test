const { connection } = require('./db');

function Activity(activity) {
    this.title = activity.title;
    this.email = activity.email;
    this.created_at = activity.createdAt || new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.updated_at = activity.updatedAt || this.created_at;
}

Activity.create = async (newActivity) => {
    try {
        const result = await connection.query("INSERT INTO activities SET ?", [newActivity]);
        const insertedData = { ...newActivity, activity_id: result.insertId };
        return insertedData;
    } catch (error) {
        console.log(error);
    }
};

Activity.getAll = async () => {
    try {
        const [result] = await connection.query('SELECT * FROM activities');
        return result;
    } catch (error) {
        console.log(error);
    }
};

Activity.getOne = async (id) => {
    try {
        const [result] = await connection.query("SELECT * FROM activities WHERE activity_id = ?", [id]);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Activity.update = async (id, data) => {
    try {
        const result = await connection.query("UPDATE activities SET title = ?, updated_at = ? WHERE activity_id = ?", [data.title, data.updated_at, id]);
        if (result) {
            const updatedData = { activity_id: id, ...data };
            return updatedData;
        }
    } catch (error) {
        console.log(error);
    }
};

Activity.delete = async (id) => {
    try {
        const result = await connection.query("DELETE FROM activities WHERE activity_id = ?", [id]);
        return result;
    } catch (error) {
        console.log(error);
    }
};

module.exports = Activity;
