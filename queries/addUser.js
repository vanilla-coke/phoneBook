
const mysql = require('mysql');
/*

addUser() 
- @params: 
    dbconn, the connection to the database,
    data, the user provided contact information to be added
    userID, id of user who's contacts we wish to manipulate

- will insert into a table if the users are not present, else it will update the users

- return: array of results

*/

async function addUser( dbconn, data, userId ){

    let add_contacts = 'INSERT INTO contacts (firstName, lastName, userId,  phoneNum) VALUES ? ON DUPLICATE KEY UPDATE phoneNum=?';

    await dbconn.query(add_contacts, [data.firstName, data.lastName, userId, data.phoneNum], ( res, err ) => {
        if(err){
            throw err;
        }
        console.log(res);
        return res;
    });

}

module.exports.addUser = addUser;