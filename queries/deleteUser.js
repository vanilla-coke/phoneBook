
const mysql = require('mysql');
/*

deleteUser() 
- @params: 
    dbconn, the connection to the database,
    data, the user provided contact information to be deleted
    userID, id of user who's contacts we wish to manipulate

- will remove contact(s) from contacts table if present

- return: array of results

*/

async function deleteUser( dbconn, data, userId ){

    let del_contacts = 'DELETE FROM contacts WHERE phoneNum=? AND userID=?';
    await dbconn.query(del_contacts, [data, userId], ( res, err ) => {
        if(err){
            throw err;
        }
        console.log(res);
        return res;
    });

}

module.exports.deleteUser = deleteUser;