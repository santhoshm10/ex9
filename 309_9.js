var mongo = require('mongodb');
var MongoClient=require('mongodb').MongoClient; 
var url="mongodb://localhost:27017/"; 
const prompt=require('prompt'); 
prompt.start(); 
console.log("1.Insert\n2.Update\n3.Delete\n4.Exit\n"); 
prompt.get(['choice'],function(err,result){ 
	if(err) { 
		return onErr(Err); 
	} 
	switch(result.choice) { 
		case "1": console.log("INSERT"); 
		prompt.get(['Rno','Name','Age','Department'],function(err,result){ 
			if(err) { return onErr(Err);} 
			console.log('Data from user :');
			console.log('Rno - ' + result.Rno);
			console.log('Name - ' + result.Name); 
			console.log('Age - ' + result.Age); 
			console.log('Department - ' + result.Department); 
			MongoClient.connect(url,{useUnifiedTopology: true},function(err,db) { 
				if(err) throw err; 
				var dbo=db.db("student_db"); 
				var obj={Rno: result.Rno , Name:result.Name, Age: result.Age , Department :result.Department}; 
				dbo.collection("students").insertOne(obj,function(err,res){ 
					if(err) throw err; 
					console.log("Inserted 1 student document !! "); 
					db.close(); 
				}); 
			}); 
		}); 
		break; 
		case "2": 
			console.log("UPDATE"); 
			prompt.get(['Rno','Name','Age','newDepartment'],function(err,result){ 
				if(err) { return onErr(Err);} 
				MongoClient.connect(url,{useUnifiedTopology: true},function(err,db) { 
					if(err) throw err; 
						var dbo=db.db("student_db"); 
						var query={Rno:result.Rno}; 
						var upd_val={$set: {Rno: result.Rno , Name:result.Name , Age: result.Age ,Department:result.newDepartment}}; 
						dbo.collection("students").updateOne(query,upd_val,function(err,res){ 
							if(err) throw err; 
							if(res.result=="0") 
								console.log("Key not found !! "); 
							else { console.log(res.result+ " student document Updated!! "); 
								db.close(); 
							} 
						}); 
					}); 
				}); 
				break; 
				case "3": 
					console.log("DELETE"); prompt.get(['Rno'],function(err,result){
						if(err) { 
							return onErr(Err);} 
						MongoClient.connect(url,{useUnifiedTopology: true},function(err,db) { 
							if(err) throw err; 
							var dbo=db.db("student_db"); 
							var query={Rno:result.Rno}; 
							dbo.collection("students").deleteOne(query,function(err,res){ 
								if(err) throw err; 
								if(res.result=="0") 
									console.log("Key not found !! "); 
								else { 
									console.log(res.result+ " student document Deleted!! "); 
									db.close(); 
								} 
							}); 
						}); 
					}); 
					break; 
					default: 
						console.log("EXIT") 
				} 
				}); 
				function onErr(err){ 
					console.log(err); 
					return 1; 
				}