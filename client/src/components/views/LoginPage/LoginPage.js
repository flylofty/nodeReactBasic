import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
//import { response } from 'express';
import { withRouter } from 'react-router-dom'

function LoginPage(props) {

    const dispatch = useDispatch();

    //return에서 데이터를 바꾸려면 state를 변화를 시켜서 바꿀 수 있음.
    const [Email, setEmail] = useState(""); //Email == state
    const [Password, setPassword] = useState(""); // Password == state

    //타이핑을 할 때 state를 바꿔주면 value가 바뀜
    //타이핑을 할 때 onChange라는 이벤트를 발생시켜서 state를 바꿔줌.
    //state가 바뀌면 value가 바뀜
    const onEmailHandler = (event) => {
        //setEmail을 통해서 state를 바꿈
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        //setPassword 통해서 state를 바꿈
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('Email', Email);
        console.log('Password', Password);

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error~')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
