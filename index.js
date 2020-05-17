const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log(`MongoDB Connected...`))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요 새해복 많이 받으세요.'));

//회원가입을 위한 라우터.
app.post('/api/users/register', (req, res) => {
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    //req.body 안에 id나 passwor와 같은 property가 들어있음.
    //body-parser가 있기 때문에 가능한 것임!!
    //정보들을 model에 넣어줌.
    const user = new User(req.body)

    //save를 하기 전에 비밀번호를 암호화 해줘야함.
    user.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

//로그인 기능, 로그인 라우터.
app.post('/api/users/login', (req, res) => {

    //요청된 이메일을 데이터베이스에 있는지 우선 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        
        //DB 조회 결과 user가 없는 경우
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        //user가 있는 경우
        //요청된 이메일이 베이터베이스에 있다면 비밀번호가 맞는지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            
            //비밀번호까지 맞다면 토큰을 만든다.
            user.generateToken((err, user) => {

                if(err) return res.status(400).send(err);

                //토큰을 쿠키 또는 localstorage에 저장
                //우선은 쿠키에 저장. cookieparser필요.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            });
        });
    });
});

//auth 라우터, auth라는 middleware를 추가함.
//end point에 request를 받은 다음에 CallBack 하기 전에
//중간에서 무엇인가를 해줌.
app.get('/api/users/auth', auth, (req, res) => {

    // role 1 Admin, role 2 특정 부서 Admin으로 정책을 정할 수 있음
    // 현재는 role 0 -> 일반 유저, role != 0 관리자.

    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
    //이렇게 정보를 주면 어떠한 페이지에서든지 유저 정보를 사용할 수 있어서 편함.
})

app.get('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""}
        ,(err, user) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));