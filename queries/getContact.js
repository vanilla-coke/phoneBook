
const mysql = require('mysql');
/*

addUser() 
- @params: 
    dbconn, the connection to the database,
    data, the user provided contact information to be queried
    userID, id of user who's contacts we wish to manipulate

- return: array of results (i.e. contacts found)

*/

async function getContacts( dbconn, data, userId){

    if( Object.keys(data).length == 0 ){
        return {};
    }

    let query = "SELECT firstName, lastName, phoneNum FROM contacts WHERE firstName LIKE ?" + mysql.escape('%' + data.firstName + '%') + " AND lastName LIKE ?" + mysql.escape('%' + data.lastName + '%') + " AND userId=" + userId; 
    await dbconn.query(query , ( err, res ) => {
        
        if(err){
            throw err;
        }
        console.log(res);
        return res;
       
    })

}

module.exports.getContacts = getContacts;