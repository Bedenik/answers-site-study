const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 7143;
const connection = require("./database/db.js");
const Question = require("./Database/Question")
const Answer = require("./Database/Answer")
connection
    .authenticate()
    .then(()=>{
        console.log('conectou');
    })
    .catch((msgError)=>{
        console.log('N conectou');
    })

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    Question.findAll({ raw: true, order:[
        ['id','DESC']
    ] }).then(questions=>{
        res.render("index",{
            questions: questions
        });
    })

});
app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/savequestion",(req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(()=>{
        res.redirect("/");
    })
});


app.get("/question/:id",(req,res)=>{
    var id = req.params.id;
    Question.findOne({
        where: {id:id}
    }).then(question =>{
        if(question != undefined){

            Answer.findAll({
                where: {questionId: question.id},
                order: [['id','DESC']]
            }).then(answers =>{
                res.render("question",{
                    question: question,
                    answers: answers
                });
            });

        }else{
            res.redirect("/")
        }
    })
});

app.post("/answer",(req,res)=>{
    var body = req.body.body;
    var questionId = req.body.question;
    Answer.create({
        body: body,
        questionId: questionId
    }).then(()=>{
        res.redirect("/question/"+questionId);
    });
});


app.use("/",Question);

app.listen(PORT,()=>{console.log("depressao rodando")});

