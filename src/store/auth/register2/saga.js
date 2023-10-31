import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { REGISTER2_LOGIN_USER } from "./actionTypes";
import {registerSuccess_login, registerFail_login} from "./actions";
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
        console.log("RESPONCE", response)
      if(response!=undefined && response!=null ){
        
          // localStorage.setItem("authUser", JSON.stringify(response.data.response));
          yield put(registerSuccess_login(response.data.success));   
          console.log("response.data.response", response.data.success) 
       

      }else{
        
        console.log("response.data", response, process.env.REACT_APP_DEFAULTAUTH)
        // alert(response.data.message);
        
        yield put(registerFail_login("fail"));   

        // window.alert("User already exists");
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
