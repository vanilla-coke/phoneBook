const axios = require('axios');

axios.delete('localhost:8080/111/contacts?phoneNum=11111111111')
    .then(( response ) => {
        console.log(response.data);
    })
    .catch(( error ) => {
        console.log(error);
    })
    .finally( () => {
        console.log("delete user completed");
    })