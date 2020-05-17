import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
//https://ant.design/ 참고!
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promisMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers/index.js';

// 원래는 createStore만 해서 store를 redux에서 생성하는 것인데, 그냥 store는 객체밖에
// 못받기 때문에 promise와 function도 받을 수 있게 promisMiddleware와 ReduxThunk
// 두 미들웨어와 함께 만들어 준다.
const createStoreWithMiddleware = applyMiddleware(promisMiddleware, ReduxThunk)(createStore)

ReactDOM.render(

  //redux extension
  <Provider
      store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        Window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
  >
      <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
