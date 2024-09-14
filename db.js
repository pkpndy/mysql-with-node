import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

//pool creates a pool of connections to the database
const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    })
    .promise();
/*
this .promise() will help us use promise api 
version of mysql instead of old callback 
functions version, so we will be using async await
*/



// await pool.query("CREATE DATABASE IF NOT EXISTS notes_app");

// await pool.query("USE notes_app");

// await pool.query(`
//     CREATE TABLE IF NOT EXISTS notes(
//         id INTEGER PRIMARY KEY AUTO_INCREMENT,
//         title VARCHAR(255) NOT NULL,
//         contents TEXT NOT NULL,
//         created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
// `);



export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
}

export async function getNote(id) {
    const [row] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
    return row[0];
}

export async function createNote(title, contents) {
    const [result] = await pool.query(
        `
            INSERT INTO notes(title, contents)
            VALUES (?,?)
        `,
        [title, contents]
    );
    const id = result.insertId;
    return getNote(id);
}

// console.log(await getNote(2));
// console.log(await getNotes());
// console.log(await createNote("pi", "po"));
