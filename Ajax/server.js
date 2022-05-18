// step 1: import express
const { response } = require('express');
const express = require('express');
const { clearScreenDown } = require('readline');

//step 2: create application instance
const app = express();

// step 3:create route rule. request: to clients' request,
app.all('/server',(request,Response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send("Hello express Ajax");
    const data = {name: 'Norcan'}
    response.send(JSON.stringify(data));
});

// step 4: listen to port and start server
app.listen(8001, ()=>{
    console.log("Serceive started at 127.0.0.1 port 8001")
});