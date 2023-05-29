const sql = require('./db');

const Activity = function (activity) {
    this.title = activity.title;
    this.email = activity.email;
    this.created_at = activity.createdAt || new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.updated_at = activity.updatedAt || this.createdAt;
}

Activity.create = (newActivity) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO activities SET ?", newActivity, (error, result) => {
            if (error) {
                console.log("error: ", error);
                reject(error);
            }
            const insertedData = { ...newActivity, activity_id: result.insertId };
            resolve(insertedData);
        });
    });
}

Activity.getAll = () => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM activities", (error, data) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

Activity.getOne = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM activities WHERE activity_id = ?", [id], (error, data) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

Activity.update = (id, data) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE activities SET title = ?, updated_at = ? WHERE activity_id = ?", [data.title, data.updated_at, id], (error, res) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                sql.query("SELECT * FROM activities WHERE activity_id = ?", [id], (err, result) => {
                    resolve(result);
                });
            }
        });
    });
}

Activity.delete = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM activities WHERE activity_id = ?", id, (error, result) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = Activity;

