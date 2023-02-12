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
app.get("/total_booking", function (req, res) {
  let sql = `SELECT COUNT(bookingId) FROM ec_care_services_booking`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//total booking per day
app.get("/total_booking_per_day", function (req, res) {
  //let bookingDate = new Date();
  //console.log(bookingDate);
  let bookingDate = "2023-02-04 21:56:32";
  let sql = `SELECT COUNT(bookingId) FROM ec_care_services_booking WHERE bookingDate = '${bookingDate}' `;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//total sales
app.get("/total_sales", function (req, res) {
  let sql = `SELECT SUM(amountDue) FROM ec_care_sales `;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//re-order
app.get("/reorder", function (req, res) {
  let sql = `SELECT * FROM ec_care_products WHERE quantityOnHand > 10`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.listen("3000", () => {
  console.log("Connected to port");
});

//patient TABLE
//log-in PATIENT
app.post("/patient/login", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    db.query(
      `SELECT * FROM ec_care_patient WHERE username = ? and password = ?`,
      [username, password],
      function (err, results, fields) {
        if (err) {
          throw err;
        }
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

//insert PATIENT

app.post("/patient/insert", function (req, res) {
  let post = {
    firstName: "qwerty",
    lastName: "test1",
    middleName: "test1",
    username: "alyn1",
    password: "test1",
    age: 12,
    gender: "female",
    birthday: "2000/01/01",
    currentAddress: "test",
    permanentAddress: "tets",
    motherName: "test",
    fatherName: "test",
    occupation: "test",
    dateOfVisit: "2000/01/01",
    billingDate: "2023-02-11",
    nationality: "tets",
    maritalStatus: "test",
    doctorId: 1,
    status: 1,
    createdAt: "2000/01/01",
    updatedAt: "2000/01/01",
    deletedAt: "2000/01/01",
    authBy: 1,
  };
  let sql = `INSERT INTO ec_care_patient SET ?`;
  db.query(sql, post, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//registration PATIENT

app.post("/patient/registration", function (req, res) {
  console.log(req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let middleName = req.body.middleName;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let age = req.body.age;
  let gender = req.body.gender;
  let birthday = req.body.birthday;
  let currentAddress = req.body.currentAddress;
  let permanentAddress = req.body.permanentAddress;
  let motherName = req.body.motherName;
  let fatherName = req.body.fatherName;
  let occupation = req.body.occupation;
  let dateOfVisit = req.body.dateOfVisit;
  let billingDate = req.body.billingDate;
  let nationality = req.body.nationality;
  let maritalStatus = req.body.maritalStatus;
  let doctorId = req.body.doctorId;
  let status = req.body.status;
  let createdAt = req.body.createdAt;
  let updatedAt = req.body.updatedAt;
  let deletedAt = req.body.deletedAt;
  let authBy = req.body.authBy;

  if (firstName && lastName && middleName && username && password) {
    db.query(
      `INSERT INTO ec_care_patient  (firstName , lastName , middleName , username , password , email, age , gender , birthday , 
        currentAddress , permanentAddress, motherName , fatherName , occupation , dateOfVisit , billingDate , nationality , 
        maritalStatus , doctorId, status , createdAt , updatedAt , deletedAt , authBy) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        firstName,
        lastName,
        middleName,
        username,
        password,
        email,
        age,
        gender,
        birthday,
        currentAddress,
        permanentAddress,
        motherName,
        fatherName,
        occupation,
        dateOfVisit,
        billingDate,
        nationality,
        maritalStatus,
        doctorId,
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

//sign-up PATIENT
app.post("/patient/signup", function (req, res) {
  console.log(req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  if (firstName && lastName && username && password) {
    db.query(
      `SELECT * FROM ec_care_patient WHERE username = ? AND email = ?`,
      [username, email],
      function (error, results, fields) {
        if (results.length() > 0) {
          console.log("here");
          db.query(
            `INSERT INTO ec_care_patient(firstName, lastName, username, password, email) VALUES (?,?,?,?,?)`,
            [firstName, lastName, email, username, password],
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
