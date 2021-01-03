// express프레임워크 사용
const express = require('express')
const app = express()
const port = 3000


const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require("./config/key");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());



// moongoDB 접속설정
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello World!~~ 안녕하세요 nodemon을 이용해보기')
})



app.post('/register', (req, res) => {
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그서들을 테이터베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success:false, err })
        return res.status(200).json({
            success: true
        })
    })
})





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})