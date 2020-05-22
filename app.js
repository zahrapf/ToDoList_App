const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let items = ["15 mins Morning Workout"]; 

app.get("/",  (req, res) => {

    let today = new Date();
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", option);

    res.render("list", {
        kindOfDay: day,
        newItems: items
    })
});

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});


app.listen(3000, () => {
    console.log("Server is up and running!");
}); 

