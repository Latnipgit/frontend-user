import PropTypes from 'prop-types';
import React, { useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { layoutTypes } from "./constants/layout";
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
// import Loader from "../src/components/loader";
// Import scss
import "./assets/scss/theme.scss";
// import Loader from "./components/loader"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
// fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);


const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

function clearStorage() {

  let session = sessionStorage.getItem('register');

  if (session == null) {
  
    localStorage.clear();

  }
  sessionStorage.setItem('register', 1);
}
window.addEventListener('load', clearStorage);

const App = () => {

  const { layoutType, isLoading } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
    isLoading: state.isLoading,
  }));

  const Layout = getLayout(layoutType);
  const [isLoaded, setisLoaded] = useState(true)

//  const onTimeLoad=()=>{
//   if(isLoaded){
//     if(localStorage.getItem("authUser")== undefined){
//       window.location.href="/login"
//         }
//         setisLoaded(false)
//   }
 
    
//  }
//  useEffect(()=>{
//   if(isLoaded){
//   onTimeLoad()
//   }
//  },[])
  return (
    <React.Fragment>
      {/* <Loader/> */}
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

export default App;