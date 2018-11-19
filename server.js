var express = require("express");
var fs = require("fs");
var app = express();

const port = process.env.PORT || 3000;

var jsonData =  fs.readFileSync("data.json", "UTF-8");
var objData = JSON.parse(jsonData);

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send('hello world')
});

app.get("/api/all", (req, res) => {
    res.send(objData);
});

app.post("/api/add", (req, res) => {
    console.log(req.body);

    const todo =  req.body.todo;
    objData.push(todo);

    fs.writeFile("data.json", JSON.stringify(objData, null, 2), () => {
        console.log("data saved");
    });
    res.send(objData);
});


app.listen(port, () => {
    console.log(`listening ${port}`);
});
