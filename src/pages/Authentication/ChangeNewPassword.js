import PropTypes from "prop-types";
import React ,{useState, useEffect}from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import { changeFirstPassword } from "../../store/actions";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

const changeNewPassword = props => {

const [password , setPassword]=useState('')
const [Cpassword , setCPassword]=useState('')
const [error , setError]=useState('')
const [passwordstr , setpasswordstr]=useState('')


  //meta title
  document.title = "Forget Password | Bafana - User & Dashboard ";

  const dispatch = useDispatch();
const token = localStorage.getItem("one-time-token")
const r4 = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
const r2 = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$');
const handleSubmit=(e)=>{
  console.log("password", password.length)
 
 

 if(password != '' && Cpassword != ''){

 
  if(password.length > 5){
    if(password !="" && password == Cpassword){
      const payload={
      "passwordChangeToken": token,
      "password": password
      }
      e.preventDefault()
      console.log("PAYLOAD", payload)
      dispatch(changeFirstPassword(payload))

  }
  else{
    toast.error('Password not match')

  }
  }
  else{
    toast.error('Password length should be more than 5')
  }
}
else{
  toast.error('Please enter Password')

}
  
    
    

}
  return (
    <React.Fragment>
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div> */}
      <div className="account-pages my-5 pt-sm-5">
        <Container>
         
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Bafana.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div>
                  <p className="text-danger text-center">
{
          error

}          </p>
                  </div>
                  <div className="p-2">
                  
                 

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        // validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter New Password"
                          type="password"
                          

                          onChange={(e)=>{
                            setPassword(e.target.value)
                            setError('')
                            setpasswordstr('')
                           setpasswordstr( r4.test(password) === true ? "Strong": r2.test(password) === true ? "medium":"week") 
                          }}
                    
                        />
                        <br/>
                        <Row className="text-end" style={{ marginTop:'-10px', fontWeight:"600"}}>
                      {passwordstr == "Strong"?
                    <span className="text-success">
                      Strong Password
                    </span>  
                    :passwordstr == "medium"?
                    <span className="" style={{ color:"#ffc266"}} >
                    Medium Password
                  </span> 
                  :
                  passwordstr == "week"?
                    <span className="text-danger">
                    Week Password
                  </span> 
                  :""
                    }
                    </Row>
                        <Label className="form-label">Confirm New Password</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Confirm New Password"
                          type="password"
                          onChange={(e)=>setCPassword(e.target.value)}

                        />
               
               
                      </div>
                     <br/>
                    </Form>
                 
                    <Row className="mb-3 mt-2">
                        <Col className="text-center">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                            onClick={(e)=>handleSubmit(e)}
                          >
                           submit
                          </button>
                        </Col>
                      </Row>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
               
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />

      </div>
    </React.Fragment>
  );
};



export default withRouter(changeNewPassword);
