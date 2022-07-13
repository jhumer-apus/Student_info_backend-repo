var express = require('express')
var route = express()

//storing data to a database
var services = require('../services/service.js');
route.post("/students", (req,res) => {  
    services.postData(req.body).then(function(result) {
        res.status(201).send(result);  
    })
})


//getting data from a database
route.get("/students", (req,res) => {
    services.getData("undefined").then(function(result) {
        res.status(200).send(result);
    })
})
route.get("/students/:id", (req,res) => {
    services.getData(req.params.id).then(function(result) {
        res.status(200).send(result);
    })   

})

//updating data from a databse;
route.put("/students/:id",(req,res) => {
    const update_data = req.body;
    const updated_data = JSON.stringify(update_data);
    services.updateData(req.params.id, updated_data).then(function(){
        res.status(201).send({msg:"Updated Student"});
    })
})

//deleting data from a database;
route.delete("/students/:id",(req,res) =>{
    services.deleteData(req.params.id).then(function(){
        res.status(201).send({msg:"Deleted Student"});
    })
})

module.exports = route;