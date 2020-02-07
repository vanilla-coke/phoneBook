const mysql = require('mysql');

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"

  });

  con.connect(function(err) {

    if (err) throw err;
    console.log("Connected to database ");

    let user = ['darren', 'mikes', 12312312317];

    let create_users = "INSERT IGNORE INTO users (firstName, lastName, phoneNum) VALUES (?,?,?)";

    con.query(create_users, user, function (err, result) {
      if (err) throw err;
      console.log("Users successfully added");
    });

    let find_users = "SELECT * FROM users";

    con.query(find_users, function (err, result) {
      if (err) throw err;
      console.log(result);
    });

    con.end( (err) => {
        if(err) throw err;
        console.log("closing db connection after initialization");
    })

  });




