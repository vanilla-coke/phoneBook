const express = require( 'express' );
const app = express();

app.use( express.json() );

const DEV_PORT = 8080;
const PROD_PORT = 3000;

/*

user_fname = min length 3 //optional
user_lname = min length 3 //optional

contact_fname = min length 3
contact_lname = min length 3


user_number  = min and max 11 digits

contact_number = min and max 11 digits



*/

// user or 

const tempData = {
    myNum : 11111111111,
    my_fname : "darren",
    my_lname : "pankoff",
    contacts : [
        {   
            num : 12312312312,
            contact_fname : "jeff",
            contact_lname : "peter"

        },
        {   
            num : 32112332112,
            contact_fname : "george",
            contact_lname : "mikes"
        },
        
        {   
            num : 12345678910,
            contact_fname : "mike",
            contact_lname : "michaels"
        },
        
        {   
            num : 98765432100,
            contact_fname : "george",
            contact_lname : "smith"
        }

    ]
};


app.get("/user/contact", ( req, res ) => {


    if( req.query.number == tempData.myNum ) {
       // let results = tempData.contacts.map( contact => (  contact.contact_fname,  contact.contact_lname, contact.num ));

       let results = tempData.contacts.filter( contact => contact.contact_fname == req.query.contact ).map( contact => ({ "first_name" : contact.contact_fname, "last_name" : contact.contact_lname, "phoneNum" : contact.num }));
  
       console.log()
        //let results = tempData.contacts.map( contact => ({ "first_name" : contact.contact_fname, "last_name" : contact.contact_lname, "phoneNum" : contact.num }));
        res.send( results );
    }
    else {
        res.status(400).send({ message: "invalid GET request" });
    }


});


app.post("/user/contact", ( req, res )  => {

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
     else {
         res.status(400).send({ message: "invalid POST request" });
     }

    
})

app.delete("/user/contact", ( req, res )  => {

    if( req.body.firstname.length > 2 ){
             
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
          res.status(200).send({ message: `${req.body.firstname} contact info was successfully deleted ` , results });
 
    }
    else {
        res.status(400).send({ message: "invalid DELETE request" });
    }
    
})


app.listen( DEV_PORT, () => {
    console.log(`API is running and listening on port ${DEV_PORT}`);
})