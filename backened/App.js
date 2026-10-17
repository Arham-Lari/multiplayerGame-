import express from "express"


const PORT = 8000;
const app = express();

app.use(express.static('../public'));

app.get('/',(_,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.listen(PORT,()=>{
  console.log("the server is listing on Port : ",PORT);
})
