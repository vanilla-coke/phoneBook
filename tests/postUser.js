const axios = require('axios');

axios.post('localhost:8080/111/contacts', {
    "contacts": [ {
   "firstName":"george",
   "lastName":"smith",
   "phoneNum": "10910910912"
    }]}
    )
    .then(( response ) => {
        console.log(response.data);
    })
    .catch(( error ) => {
        console.log(error);
    })
    .finally( () => {
        console.log("post user completed");
    })