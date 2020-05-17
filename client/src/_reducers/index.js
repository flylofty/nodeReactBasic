import { combineReducers } from 'redux';
// import user from './user_reducer';
//import comment from './comment_reducer';

//combineReducers는 store가 있고 그 중에 여러가지 reducer가 있을 수 있는데..
//reducer 안에서 하는 일은 어떻게 state가 변하는 것을 보여준 다음에
// 변한 마지막 값을 return해줌.
//여러가지 state가 있는 중에 그에 맞는 reducer가 있게되고 그것들을 CombineReducer를
//이용해서 Root Reducer에서 하나로 합침
//로그인, 등록 등등 인증에 관한 기능을 만들면 user reducer를 만들고
//또한 comment 기능을 만든다 하면 아래 아직은 주석이지만 하나로 합쳐진 모습을 볼 수 있음.

const rootReducer = combineReducers({
    // user, 
    //comment
})

export default rootReducer;