import sqlite from 'sqlite3';

const db = new sqlite.Database('./movie.db');



export async function getAll() {
	return new Promise(function(resolve, reject) {
		const queryCommand = 'SELECT * FROM Movies;'
		db.all(queryCommand, function(err, rows) {
			if (err) {
				reject({message: err.message})
			}else {
				resolve(rows)
			}
		})
	})
}

async function insert(movie) {
	return new Promise((resolve, reject) => {
		const queryCommand =  'INSERT INTO Movies(title, year) VALUES(?, ?);'
		db.run(queryCommand, [movie.title, movie.year], (err, result) => {
			if (err) {
				reject({message: err.message});
			}else {
				resolve(result);
			}
		})
	})
}

async function update(movie) {
	return new Promise((resolve, reject) => {
		const queryCommand = 'UPDATE Movies SET title = ?, year = ? WHERE id = ? ;'
		db.run(queryCommand, [movie.title, movie.year, movie.id], (err, result) => {
			if (err) {
				reject({message: err.message});
			}else {
				resolve(result);
			
			}
		})
	})
}

export async function get(id) {
	return new Promise((resolve, reject) => {
		const queryCommand = 'SELECT * FROM Movies WHERE id = ? ;';
		db.get(queryCommand, [id], (err, result) => {
			if (err) {
				reject({message: err.message});
			}else {
				resolve(result);
			}
		})
	})
}


export async function save(movie) {
	if(!movie.id) {
		insert(movie);
	}else {
		update(movie);
	}
}


export async function remove(id) {
	return new Promise((resolve, reject) => {
		const queryCommand = "DELETE FROM Movies WHERE id = ? ;"
		db.run(queryCommand, [id], (err, result) => {
			if (err) {
				reject({message: err.message})
			}else {
				resolve(result)
			}
		})
	})
}

