const Sequelize = require('sequelize')
const connection = require("./db.js")

const Question = connection.define('pergunta',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force:false}).then(()=>{
    console.log("Table created")
})


module.exports = Question;