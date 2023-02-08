const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eccare",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connected");
});
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Connected");
});

//table DEPARTMENT

//insert
app.post("/department/insert", function (req, res) {
  // console.log(req.params);insert
  let post = {
    departmentName: "test1",
    departmentDescription: "test",
    status: 1,
    createdAt: "2000-01-02",
    updatedAt: "2000-01-02",
    deletedAt: "2000-01-02",
    authBy: 3,
  };
  let sql = `INSERT INTO ec_care_department SET ?`;
  db.query(sql, post, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//select
app.get("/department/retrieve", function (req, res) {
  let sql = `SELECT * FROM ec_care_department`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//update
app.get("/department/update/:id", (req, res) => {
  let newAuthby = "2";
  let sql = `UPDATE ec_care_department SET authBy = '${newAuthby}' WHERE id = ${req.params.id} `;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/department/delete/:id", (req, res) => {
  let sql = `DELETE FROM ec_care_department WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//login
app.post("/login", function (req, res) {
  console.log(req);
  let username = req.body.username;
  let password = req.body.password;

  //let username = "alyn";
  //let password = "test";

  if (username && password) {
    db.query(
      `SELECT * FROM ec_care_user WHERE username = ? AND password = ?`,
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
          console.log(results);
        } else {
          res.send("Incorrect Email/Password");
        }
        res.end();
      }
    );
  } else {
    res.send("Enter valid username and password");
    res.end();
  }
});

app.post("/user/insert", function (req, res) {
  // console.log(req.params);insert
  let post = {
    firstName: "test",
    lastName: "test",
    middleName: "test",
    userName: "alyn",
    email: "test",
    emailVerifiedAt: "test",
    password: "test",
    rememberToken: "test",
    userType: "test",
    status: 1,
    createdAt: "2000/01/01",
    updatedAt: "2000/01/01",
    deletedAt: "2000/01/01",
    authBy: 1,
  };
  let sql = `INSERT INTO ec_care_user SET ?`;
  db.query(sql, post, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//registration
app.post("/registration", function (req, res) {
  console.log(req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let middleName = req.body.middleName;
  let userName = req.body.userName;
  let email = req.body.email;
  let emailVerifiedAt = req.body.emailVerifiedAt;
  let password = req.body.password;
  let rememberToken = req.body.rememberToken;
  let userType = req.body.userType;
  let status = req.body.status;
  let createdAt = req.body.createdAt;
  let updatedAt = req.body.updatedAt;
  let deletedAt = req.body.deletedAt;
  let authBy = req.body.authBy;

  if (firstName && lastName && middleName && userName && email && password) {
    db.query(
      `INSERT INTO ec_care_user (firstName, lastName, middleName, userName, 
                email, emailVerifiedAt, password, rememberToken, userType, status, createdAt, updatedAt, 
                deletedAt, authBy) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        firstName,
        lastName,
        middleName,
        userName,
        email,
        emailVerifiedAt,
        password,
        rememberToken,
        userType,
        status,
        createdAt,
        updatedAt,
        deletedAt,
        authBy,
      ],
      function (error, results, fields) {
        if (error) {
          throw error;
        } else {
          res.send(results);
          console.log(results);
        }
      }
    );
  } else {
    res.send("Please input fields");
    res.end();
  }
});

//sign-up
app.post("/signup", function (req, res) {
  console.log(req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;

  if (firstName && lastName && userName && email && password) {
    db.query(
      "SELECT * FROM ec_care_user WHERE userName = ? && email = ?",
      [userName, email],
      function (error, results, fields) {
        if (results) {
            db.query(
                `INSERT INTO ec_care_user (firstName, lastName, userName, email, password) VALUES (?,?,?,?,?)`,
            [firstName, lastName, userName, email, password],
            function (error, results, fields) {
                if (error) {
                    throw error;
              } else {
                  res.send(results);
                  console.log(results);
              }
            }
          );
        } else {
            console.log("Data already exists");
        }
      }
    );
  } else {
    res.send("Please input fields");
    res.end();
  }
});

//total booking
app.get("/total_booking", function(req, res){
  let sql = (`SELECT COUNT(bookingId) FROM ec_care_product_booking`);
  db.query(sql, (err, results) => {
    if(err){
      throw err;
    }
    res.send(results);
  })
});

//total booking per day
app.get("/total_booking_per_day", function(req, res){
  let bookingDate = "2023-02-04 21:56:32";
  let sql = (`SELECT COUNT(bookingId) FROM ec_care_product_booking WHERE bookingDate = '${bookingDate}' `)
  db.query(sql, (err, results) =>{
    if(err){throw err;}
    res.send(results);
  })
});

//total sales
app.get("/total_sales", function(req, res){
  let sql = (`SELECT SUM(amountDue) FROM ec_care_sales `);
  db.query(sql, (err, results) => {
    if (err){throw err;}
    res.send(results);
  })
})

app.listen("3000", () => {
  console.log("Connected to port");
});
