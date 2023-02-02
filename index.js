const express = require ("express");
const mysql = require ("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eccare"

})

db.connect((err) =>{
    if(err){
        throw err;
    };
    console.log("Database Connected");
});
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.send("Connected");
});

//table DEPARTMENT

//insert
app.post("/department/insert", function(req, res){

   // console.log(req.params);insert
    let post = {departmentName: "test1", departmentDescription: "test", status: "test", createdAt: "2000-01-02", updatedAt: "2000-01-02", deletedAt: "2000-01-02", authBy: 3};
    let sql = `INSERT INTO ec_care_department SET ?`;
    db.query(sql, post, (err, results) =>{
        if(err){    
            throw err;
        }
        res.send(results);
    })
});

//select
app.get("/department/retrieve", function(req, res){
    let sql = `SELECT * FROM ec_care_department`;
    db.query(sql, (err,results) =>{
        if(err){
            throw err;
        }
        res.send(results);
    });
});

//update
app.get("/department/update/:id", (req, res) =>{
    let newAuthby = "2";
    let sql = `UPDATE ec_care_department SET authBy = '${newAuthby}' WHERE id = ${req.params.id} `;
    db.query(sql, (err,results) =>{
        if(err){
            throw err;
        }
        res.send(results);
    });
});

app.get("/department/delete/:id", (req,res) =>{
    let sql = `DELETE FROM ec_care_department WHERE id = ${req.params.id}`;
    db.query(sql, (err,results) =>{
        if(err){
            throw err;
        }
        res.send(results);
    });
});





//login
app.post("/login", function(req,res){
    console.log(req);
    let username = req.body.username;
    let password = req.body.password;

    //let username = "alyn";
    //let password = "test";


    if(username && password){
        db.query(`SELECT * FROM ec_care_user WHERE username = ? AND password = ?`, [username,password], function(error, results, fields){
            if(error) throw error;
            if(results.length > 0){
                res.send(results);
                console.log(results);
            }else{
                res.send("Incorrect Email/Password");
            }
            res.end();
        });
    }else{
        res.send("Enter valid username and password");
        res.end();
    }
});

app.post("/user/insert", function(req, res){

    // console.log(req.params);insert
     let post = {firstName: "test", lastName: "test", middleName: "test", userName: "alyn", email: "test", emailVerifiedAt: "test", password: "test", rememberToken: "test", userType: "test", status: "test", createdAt: "2000/01/01", updatedAt: "2000/01/01", deletedAt: "2000/01/01", authBy: "1"};
     let sql = `INSERT INTO ec_care_user SET ?`;
     db.query(sql, post, (err, results) =>{
         if(err){    
             throw err;
         }
         res.send(results);
     })
 });


app.listen("3000", () =>{
    console.log("Connected to port");
});

