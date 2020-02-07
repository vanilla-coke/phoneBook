const express = require( 'express' );
const mysql = require('mysql');
const app = express();
const search = require("./queries/getContact");
const add = require("./queries/addUser");
const del = require("./queries/deleteUser");
const initialize = require("./queries/initdb");

const DEV_PORT = 8080;
app.use( express.json() );

initialize.initializeDB();

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
  
  });

/*

END POINT: GET /user/contact/

- enables users to search for one or many contacts given a first name
- will return exact person, and or person(s) containing search parameters


*/
app.get("/:user/contacts",  ( req, res ) => {

     search.getContacts( con , req.query, req.params.user).then(( response, err ) => {
         if( err ) throw err;
         console.log( response );
         res.status(200).send( { message: response } );
     });
});

/*

END POINT: POST /user/contact/

- enables users to create or update a particular contact in their list of contacts

*/

app.post("/:user/contacts", ( req, res )  => {


    if( req.body.contacts.length == 0 ){
        res.status(200).send({ message: ""});
    }

    add.addUser( con , req.body.contacts[0], req.params.user ).then( ( response, err ) => {
        if(err) throw err;
        console.log( response );
    });

    res.status(200).send({ message: "Contacts successfully updated"});

})

/*

END POINT: DELETE /user/contact/

- enables users to delete a specific contact
- to delete multiple, should POST with items to be deleted, then return URL to user to be able to check status, and then batch delete or one by one

*/

app.delete("/:user/contacts", ( req, res )  => {

    if( req.query.phoneNum.length < 11 ){
        res.status(404).send({ message: "content not found" });
    }
     else {
         del.deleteUser( con, req.query.phoneNum, req.params.user ).then( (res, err) => {
             if(err) throw err;
             console.log(res);
             res.status(204).send({ message: "no content" });
         });
     }
    
})

app.listen( DEV_PORT, () => {
    console.log(`API is running and listening on port ${DEV_PORT}`);
})