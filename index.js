// express프레임워크 사용
const express = require('express')
const app = express()
const port = 3000

// moongoDB 접속설정
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@boilerplate.otrvi.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!~~ 안녕하세요')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})