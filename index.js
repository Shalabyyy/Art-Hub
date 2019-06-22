const express = require('express')
const app = express()
const port = 4000
const path= require('path')
const mongoose = require('mongoose')
app.use(express.json())

const users= require('./routes/api/users')
const products= require('./routes/api/products')
const orders= require('./routes/api/orders')


mongoose.connect('mongodb+srv://youshalaby:Youssef98%2E@arthub-xqxau.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection.once('open', function(){
  console.log('Conection has been made!');
}).on('error', function(error){
    console.log('Error is: ', error);
});

app.get('/', (req, res) => res.json({msg:'Hello World'}))

app.use('/api/users',users)
app.use('/api/products',products)
app.use('/api/orders',orders)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

