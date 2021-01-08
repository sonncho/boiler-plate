const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 유저 정보를 저장하기전에
userSchema.pre('save', function( next ){
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호를 함호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

// comparePassword라는 메서드를 생성
userSchema.methods.comparePassword = function(plainPassword, cb) {
    console.log("test2");
    //plainPassword 1234567     암호화된 비밀번호 $2$10$ㅣ492vQ0M
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        console.log("test3");
        cb(null, isMatch);
    })
}

// generateToken 메서드 생성
userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }