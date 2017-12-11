var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var connection = mysql.createConnection(config)
connection.connect();

router.post('/addTask',(req,res)=>{
	const taskName = req.body.taskName
	const taskDate = req.body.taskDate

	var thePromise = new Promise((resolve, reject)=>{
		const insertQuery = `INSERT INTO TASKS (taskName, taskDate)
		VALUES (?,?);`

		connection.query(insertQuery, [taskName, taskDate],(error)=>{
			if(error){
				reject(error)
			}else{
				resolve({msg: "success"})
			}
		})
	})
	thePromise.then((promiseResponse)=>{
		const selectQuery = `SELECT * FROM tasks;`
		connection.query(selectQuery,(error, results)=>{
			if(error){
				throw error
			}else{
				res.json(results);

			}
		})
	})
});



/* GET home page. */
router.get('/getStudents', function(req, res, next) {
	const selectQuery = `SELECT * FROM students`;
	connection.query(selectQuery,(error, results)=>{
		if(error){
			throw error;
		}else{
			res.json(results)
		}
	})

});

router.get('/getTask', function(req, res, next) {
	const selectQuery = `SELECT * FROM tasks`;
	connection.query(selectQuery,(error, results)=>{
		if(error){
			throw error;
		}else{
			res.json(results)
		}
	})

});

router.post('/addStudent',(req,res)=>{
	console.log("---------")
	studentName = req.body.studentName;
	var insertQuery = `INSERT INTO students (name)
	 VALUES
	 (?);`;
	 var PromiseOne = new Promise((resolve, reject)=>{
		connection.query(insertQuery,[studentName],(error)=>{
	 	
	 	if(error){
	 		reject(error);
	 	}else{

	 		resolve({msg:"Success"});
	 		}

	 	})
	 });

	router.post('/deleteTask',(req,res)=>{
	console.log("+++++++")
	taskId = req.body.id;
	console.log(taskId)

	var deleteQuery = `DELETE FROM tasks WHERE id=14
	 VALUES
	 (?);`;
	 var PromiseOne = new Promise((resolve, reject)=>{
		connection.query(deleteQuery,[id],(error)=>{
	 	
	 	if(error){
	 		reject(error);
	 	}else{

	 		resolve({msg:"Success"});
	 		}

	 	})
	 });
	})


	PromiseOne.then((data)=>{
		console.log("..........")
		var PromiseTwo = new Promise((resolve, reject)=>{
		const query = `SELECT * FROM students;`
		connection.query(query,(error, results)=>{
			console.log("..........")
			if(error){
				reject(error);

			}else{
				resolve(results)
			}

		})
		
	})

	PromiseTwo.then((studentsList)=>{
		
		res.json(studentsList)
	})

	})

	// res.json(req.body);

})


module.exports = router;
