const { User } = require('../models/User');

let auth = (req, res, next) => {

    //인증처리를 하는 곳.

    //클라이언트 쿠키에서 토큰을 가져온다.(쿠키파서 이용!)
    let token = req.cookies.x_auth;

    //토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        //없으면 인증 노!
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        //유저가 있으면 인증 오케이!
        //request에 token과 user를 넣는 이유는...
        //index.js에 auth라우터에서 request를 받을 때
        // 아래와 같이 token과 user를 request에 넣어줌으로 인해서
        //auth라우터에서 token과 user를 사용하기 위함.
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };