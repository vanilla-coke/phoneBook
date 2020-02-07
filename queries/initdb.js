'use strict';
const mysql = require('mysql');

const con = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"

});

function initializeDatabase(){

  con.connect(function(err) {

    if (err) throw err;
    console.log("Connected to database ");
    
   // drop tables upon initialization of testing and set-up
   
   
   con.query("DROP TABLE users, contacts", function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    /*
    - create users table
    */
    let create_users = "CREATE TABLE users ( firstName varchar(10) NOT NULL, lastName varchar(10) NOT NULL, phoneNum varchar(11) PRIMARY KEY)";
    con.query(create_users, function (err, result) {
      if (err) throw err;
      console.log("User table created");
    });

    /*
    - create contacts table
    */
    let create_contacts = "CREATE TABLE contacts ( CONSTRAINT fk_contact_num FOREIGN KEY (phoneNum) REFERENCES users(phoneNum), firstName varchar(10) NOT NULL, lastName varchar(10) NOT NULL, phoneNum varchar(11) NOT NULL PRIMARY KEY, contactNum varchar(11) NOT NULL UNIQUE )";
    con.query(create_contacts, function (err, result) {
      if (err) throw err;
      console.log("Contacts table created");
    });

    /*
    - add users to users table
    */

    let user = ['darren', 'mikes', 11111111110];
    let add_users = "INSERT INTO users (firstName, lastName, phoneNum) VALUES (?,?,?)";
    con.query(add_users, user, function (err, result) {
      if (err) throw err;
      console.log("Users successfully added");
    });

    /*
    - check to ensure users have been added to the users table
    */

    let find_users = "SELECT * FROM users";

    con.query(find_users, function (err, result) {
      if (err) throw err;
      console.log(result);
    });


    let contacts = [
    ['chris', 'jeff', '12312312312', '11111111110'],
    ['peter', 'stills', '45645645645', '11111111110'],
    ['steven', 'nash', '09809809809', '11111111110'],
    ['chris', 'mikes', '67867867867', '11111111110'],

    ];

    let add_contacts = 'INSERT INTO contacts SET firstName= ?, lastName = ?, contactNum = ?,  phoneNum = ?';
    con.query(add_contacts, [contacts], function (err, result) {
      if (err) throw err;
      console.log("Users successfully added");
    });

    /*
    - check to ensure users have been added to the contacts table
    */

    let find_contacts = "SELECT * FROM contacts";

    con.query(find_contacts, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });

    con.end( (err) => {
        if(err) throw err;
        console.log("closing db connection after initialization");
    })

  });

}

module.exports.initializeDB = initializeDatabase;


