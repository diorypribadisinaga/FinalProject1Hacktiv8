const pool = require("./../../config/pool");

const { hash, compare } = require("./../helpers/hash");

class User {
    constructor(id, email, username, password) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    static async FindOne(email){
        return await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    }
    static async FindOneUsername(username){
        return await pool.query("SELECT * FROM users WHERE username=$1",[username])
    }

    static register(email, username, password) {
        return new Promise((resolve, reject) => {
            const hashedPassword = hash(password);
            pool
                .query(
                    `INSERT INTO users (email, username, password) 
                    VALUES ($1, $2, $3) 
                    RETURNING *;`,
                    [email, username, hashedPassword]
                )
                .then(({ rows }) => {
                    const user = new User(rows[0].id, rows[0].email, rows[0].username);
                    resolve(user);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    static login(email, password) {
        return new Promise((resolve, reject) => {
            pool
                .query(`SELECT id, email, username, password FROM users WHERE email = $1;`, [
                    email,
                ])
                .then(({ rows }) => {
                    if (!rows.length) throw { name: "UserNameNotFound" };
                    if (!compare(password, rows[0].password))
                        throw { name: "PasswordInvalid" };
                    const user = new User(rows[0].id, rows[0].email, rows[0].username, rows[0].password);
                    resolve(user);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

module.exports = User;
