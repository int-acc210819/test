require('dotenv').config();
const mysql = require('mysql');

const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
});

conn.connect(err => {
	if (err) throw err;

	console.log('Connected!');

	conn.query(sqlDrop, (err, result) => {
		if (err) throw err;

		console.log('Database removed!')
	})

	conn.query(sqlCreate, (err, result) => {
		if (err) throw err;

		console.log('Database created!')
	})
});

const sqlDrop = `DROP DATABASE IF ESISTS ${process.env.DB_NAME};`;
const sqlCreate = `CREATE DATABASE ${process.env.DB_NAME}
character SET UTF8;`;