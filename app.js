const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express() // создание приложения
// app.use('/static', express.static(__dirname + '/public'));

app.use(express.static(path.join(__dirname,'static')))
app.get('/',  (req,res)=>{
    res.render('index.html')
})



app.listen(PORT, ()=>{
    console.log('server started 3000')

})

