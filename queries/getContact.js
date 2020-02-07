
const mysql = require('mysql');
/*

where firstname like * or like info provided
&& lastname like * or info provided

*/

async function getContacts( dbconn, params ){

    if( Object.keys(params).length == 0 ){
        return {};
    }

    let query = 'SELECT firstName, lastName, phoneNum FROM users WHERE lastName= ' + mysql.escape(params.lastName) + ' firstName= ' + mysql.escape(params.firstName);

    await dbconn.query(query , ( err, res ) => {
        
        if(err){
            throw err;
        }
        console.log(res);
        return res;
       
    })

}

module.exports.getContacts = getContacts;