const express = require('express')
const app = express()
const port = 4000
const path= require('path')
const mongoose = require('mongoose')
app.use(express.json())

mongoose.connect('mongodb+srv://youshalaby:Youssef98%2E@arthub-xqxau.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection.once('open', function(){
  console.log('Conection has been made!');
}).on('error', function(error){
    console.log('Error is: ', error);
});

app.get('/', (req, res) => res.json({msg:'Hello World'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

