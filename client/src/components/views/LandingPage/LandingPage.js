import React,{ useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    //랜딩 페이지에 들어오자 마자 useEffect 를 실행.

    useEffect(() => {
        //get request를 server에 보냄 // //돌아오는 response를 콘솔로 보임.
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    //서버와 클라이언트의 포트가 다르기 때문에 CORS Policy문제가 발생.
    //Cross-Origin Resource Sharing
    //해결방법 ==> 개발자도구 이용, Json P라는 방식이용 등등이 있지만
    //Proxy를 이용하여 해결!
    //https://create-react-app.dev/docs/proxying-api-requests-in-development
    //에서 Configuring the Proxy Manually 부분 참고!!
    //프록시를 설정

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success) {
                    props.history.push("/login")
                }
                else {
                    alert('로그아웃 실패')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>

        </div>
    )
}

export default withRouter(LandingPage)
