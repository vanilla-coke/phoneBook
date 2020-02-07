
const mysql = require('mysql');
/*

addUser() 
- @params: 
    dbconn, the connection to the database,
    data, the user provided contact information to be added

- will insert into a table if the users are not present, else it will update the users

- return: array of results

*/

async function addUser( dbconn, data ){

    let add_contacts = 'INSERT INTO contacts (firstName, lastName, contactNum,  phoneNum) VALUES ? ON DUPLICATE KEY UPDATE phoneNum=?';

    //let add_contacts = "INSERT INTO contacts (firstName, lastName, phoneNum, fk_contact_num) VALUES (?,?,?, (SELECT phoneNum FROM users WHERE phoneNum=11111111110))";
    await dbconn.query(add_contacts, [data.contacts], ( res, err ) => {
        if(err){
            throw err;
        }
        console.log(res);
        return res;
    });

}

module.exports.addUser = addUser;