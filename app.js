const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let items = ["15 mins Morning Workout"]; 
let workItems = [];

app.get("/",  (req, res) => {

    let today = new Date();
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", option);

    res.render("list", {
        listTitle: day,
        newItems: items
    })
});

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req,res) => {
    res.render("list", {
        listTitle: "Work List",
        newItems: workItems
    });
});

app.post("/work", (req, res)=> {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
});

app.listen(3000, () => {
    console.log("Server is up and running!");
}); 

