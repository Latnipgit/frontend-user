import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { REGISTER2_LOGIN_USER } from "./actionTypes";
import {registerSuccess_login} from "./actions";
import {apiError} from "../login/actions"
import {postFakeRegister} from "../../../helpers/fakebackend_helper";

function* registerUser_login_2({ payload: { user, history } }) {

  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        
      const response = yield call(postFakeRegister, { 
        name: user.name,
        password: user.password,
        companyName:user.companyName,
        gstin:user.gstNumber,
        aadharCardNo:user.aadharNumber,
        companyPan:user.panNumber,
        emailId:user.email,
        mobile: user.mobile    });
      if(response!=undefined && response!=null ){
        
          // localStorage.setItem("authUser", JSON.stringify(response.data.response));
          // yield put(registerSuccess_login(response.data.response));    
          // window.location.pathname('/login');
          const newPageUrl ='/login'
          window.location.href = newPageUrl;

      }else{
        
        console.log("response.data", response.data)
        window.alert(response.data.message);
      }
    }
    
  } catch (error) {
    yield put(apiError(error));
  }
}



function* registerAuthSaga() {
  yield takeEvery(REGISTER2_LOGIN_USER, registerUser_login_2);
}

export default registerAuthSaga;
