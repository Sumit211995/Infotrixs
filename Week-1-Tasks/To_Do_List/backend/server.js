const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser");
const connection=require("./db");

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks",(req, res)=>{
        const FETCH_QUERY=`select * from tasklist`;
        connection.query(FETCH_QUERY, (err, response)=>{
            if(err)console.log("err", err)
            else res.send(response)
        })
        
})

app.post("/addtask", (req, res)=>{
    const ADD_QUERY=`insert into tasklist (task) values ('${req.body.task}');`
    connection.query(ADD_QUERY, (err)=>{
        if(err)console.log("err", err)
        else res.send("task has been added")
    })
    
})

app.delete("/deletetask/:taskid",(req,res)=>{
    const DELETE_QUERY=`delete from tasklist where taskid=${req.params.taskid};`
    connection.query(DELETE_QUERY, (err)=>{
        if(err)console.log("err", err)
        else res.send("task has been deleted") 
    })
    
})

app.put("/update/:taskid",(req,res)=>{
    const UPDATE_QUERY=`update tasklist set task='${req.body.task}' where taskid=${req.params.taskid};`
    connection.query(UPDATE_QUERY,(err)=>{
        if(err)console.log("err", err)
        else res.send("task has been updated") 
    })
    
})

app.listen(3000, ()=>{
    console.log("port is running");
})