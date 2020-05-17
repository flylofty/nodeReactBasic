const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        Maxlenth: 50
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
        Maxlenth:  50
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
});

//유저 정보를 save하기 전에 암호화 하기 위한 방편.
userSchema.pre('save', function( next ){
    
    var user = this;

    //유저의 패스워드가 변경될 때에만 암호화를 해준다.
    if(user.isModified('password')) {

        //비밀번호를 bcypt를 통해 암호화 한다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            // Store hash in your password DB.

            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);

                //암호화된 비밀번호를 만드는데 성공!!
                //유저 패스워드를 해시로 변경.
                user.password = hash;
                next();
            });
        });
    } else { //비밀번호가 아닌 다른 것을 바꿀 때
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, callBack) {

    //plainPassword ex) 1234567 암호화된 비밀번호를 확인해야함.
    //복호화 해서 확인하는 것보다 1234567을 암호화해서 확인하는게 나음.
    //따라서 bcrypt를 이용함.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callBack(err)
        callBack(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callBack) {

    var user = this;

    // jsonwebtoken을 이용해서 token을 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    // user._id + 'secretToken' = token
    // ->
    // 'secretToekn' -> user._id
    user.token = token;
    user.save(function(err, user){
        if(err) return callBack(err);
        callBack(null, user);
    });
}

userSchema.statics.findByToken = function(token, callBack) {
    var user = this;

    //user._id + '' = token
    //토큰을 decode한다. npm jwt참고
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 후에 클라이언트에서 가져온 토큰과
        //디비에 포함된 토큰이 일치하는지 확인.
        user.findOne({"_id": decoded, "token": token}, function(err, user){

            if(err) return callBack(err);
            callBack(null, user)

        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }