var mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
//  Establish connection
    mongoose.connect("mongodb://localhost/todoList",
        { useNewUrlParser: true,
        useUnifiedTopology: true
        }
    );
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
// Design Schema
var todoSchema = new mongoose.Schema({
    list: String
});
// Model database
var Todo = mongoose.model("Todo", todoSchema);
app.get("/", function(req, res){
    res.redirect("/index");
});
app.get("/index", function(req, res) {
    Todo.find({}, function(err, todos){
        if(err){
            console.log(err);
        }else {
            res.render("index",{todos: todos});
        }
    });
});
app.post("/index", function(req, res){
    var newtodo = req.body.newtodo;
    Todo.create({list: newtodo}, function(err, data){
        if(err) {
            console.log(err);
        }else {
            res.redirect("/index");
        }
    });
});
app.listen(3000, function(){
    console.log("Todo Server has started");
});