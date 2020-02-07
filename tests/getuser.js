const axios = require('axios');

axios.get('localhost:8080/111/contacts?firstName=chris&lastName=jeff')
    .then(( response ) => {
        console.log(response.data);
    })
    .catch(( error ) => {
        console.log(error);
    })
    .finally( () => {
        console.log("get user completed");
    })