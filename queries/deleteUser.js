
const mysql = require('mysql');
/*

deleteUser() 
- @params: 
    dbconn, the connection to the database,
    data, the user provided contact information to be deleted

- will remove contact(s) from contacts table if present

- return: array of results

*/

async function deleteUser( dbconn, data ){

    let del_contacts = 'DELETE FROM contacts WHERE phoneNum=?';

    //let add_contacts = "INSERT INTO contacts (firstName, lastName, phoneNum, fk_contact_num) VALUES (?,?,?, (SELECT phoneNum FROM users WHERE phoneNum=11111111110))";
    await dbconn.query(del_contacts, [data.contacts.phoneNum], ( res, err ) => {
        if(err){
            throw err;
        }
        console.log(res);
        return res;
    });

}

module.exports.deleteUser = deleteUser;