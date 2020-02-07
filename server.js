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
app.get("/user/contacts",  ( req, res ) => {

       // let results = tempData.contacts.map( contact => (  contact.contact_fname,  contact.contact_lname, contact.num ));

     search.getContacts( con , req.query).then(( response, err ) => {
         if( err ) throw err;
         console.log( response );
         res.status(200).send( { message: response } );
     });
       //let results = tempData.contacts.filter( contact => contact.contact_fname == req.query.contact ).map( contact => ({ "first_name" : contact.contact_fname, "last_name" : contact.contact_lname, "phoneNum" : contact.num }));
        //let results = tempData.contacts.map( contact => ({ "first_name" : contact.contact_fname, "last_name" : contact.contact_lname, "phoneNum" : contact.num }));

});

/*

END POINT: POST /user/contact/

- enables users to create or update a particular contact in their list of contacts

*/

app.post("/user/contacts", ( req, res )  => {

    //call addUser to add new user

    if( req.body.contacts.length == 0 ){
        res.status(200).send({ message: ""});
    }

    add.addUser( con , req.body.contacts ).then( ( response, err ) => {
        if(err) throw err;
        console.log( response );
    })

    res.status(200).send({ message: "Contacts successfully updated"});

    /*
    if( req.body.number == tempData.myNum ) {
        // let results = tempData.contacts.map( contact => (  contact.contact_fname,  contact.contact_lname, contact.num ));

        if( req.body.firstname.length > 2 ){
             
       // let results = tempData.contacts.filter( contact => contact.contact_fname == req.body.firstname)

            for( let contact of tempData.contacts ){
                if( contact.contact_fname == req.body.firstname && contact.contact_lname == req.body.lastname) {
                    console.log("here");
                    contact.num = req.body.phonenum;
                }
            }
            console.log(req.body.firstname, req.body.lastname, req.body.phonenum);
            let results = tempData.contacts.filter( contact => contact.contact_fname == req.body.firstname  && contact.contact_lname == req.body.lastname );
        

         //let results = tempData.contacts.map( contact => ({ "first_name" : contact.contact_fname, "last_name" : contact.contact_lname, "phoneNum" : contact.num }));
         res.status(200).send({ message: `${req.body.firstname} contact info was successfully updated ` , results });

        }
     }
     */
})

/*

END POINT: DELETE /user/contact/

- enables users to delete a specific contact
- to delete multiple, should POST with items to be deleted, then return URL to user to be able to check status, and then batch delete or one by one

*/

app.delete("/user/contacts", ( req, res )  => {

    if( req.query.contactNumber.length < 11 ){
        res.status(404).send({ message: "content not found" });
    }
     else {
         del.deleteUser( con, req.query.contactNumber ).then( (res, err) => {
             if(err) throw err;
             console.log(res);
             res.status(204).send({ message: "no content" });
         })
     }
        
        /*
        // let results = tempData.contacts.filter( contact => contact.contact_fname == req.body.firstname)
            let count = 0;
             for( let contact of tempData.contacts ){
                 if( contact.contact_fname == req.body.firstname && contact.contact_lname == req.body.lastname) {
                     tempData.contacts.splice(count, 1);
                     console.log("this");
                 }
                 count++;
             }
             
             let results = tempData.contacts.filter( contact => contact.contact_fname == req.body.firstname  && contact.contact_lname == req.body.lastname );
         
 
          //let results = tempData.contacts.map( contact => ({ "first_name" : contact.contact_fname, "last_name" : contact.contact_lname, "phoneNum" : contact.num }));
          res.status(200).send({ message: `${req.body.firstName} contact info was successfully deleted ` , results });
 */
    
})

app.listen( DEV_PORT, () => {
    console.log(`API is running and listening on port ${DEV_PORT}`);
})