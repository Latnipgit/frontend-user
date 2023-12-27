import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./login/Login.actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./login/Login.actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        userName: user.email,
        password: user.password,
        });
        console.log("responseRespo",response.data)
        if(response!=undefined && response!=null){
          if(response.data.success){
            localStorage.setItem("authUser", JSON.stringify(response.data.response));
            yield put(loginSuccess(response.data.response)); 
            console.log("CHECK RESPONCE", response.data.response.passwordChangeNeeded)   
            if(response.data.response.passwordChangeNeeded == false){
              history('/companies');

            }
            else{
              history('/changePassword');

            }
          }else{
            console.log("SUCCESS CHECK",response.data )
          if(response.data.passwordChangeNeeded == true){
            history('/changePassword');
            localStorage.setItem("one-time-token", response.data.passwordChangeToken)
            alert(response.data.message);


          }
          else{
            alert(response.data.message);
          }
        
        }
        
      }else{
        window.alert('Invalid Email / Password');
      }
    }
    
  } catch (error) {
    yield put(apiError(error));
  }
}

// function* logoutUser({ payload: { history } }) {
//   try {
//     localStorage.removeItem("authUser");

//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(fireBaseBackend.logout);
//       yield put(logoutUserSuccess(response));
//     }
//     console.log("history",history)
//     history("/login");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* logoutUser({ payload: { history } }) {
  try {
    

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
  
    }
    localStorage.removeItem("authUser");
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}


function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      );
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
