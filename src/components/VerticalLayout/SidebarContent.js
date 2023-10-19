import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useMenu } from './MenuContext';

const SidebarContent = (props) => {
  var { showMenuItems } = useMenu();
  const [isShowEmployee, setisShowEmployee]= useState()
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    if (currentPath === '/companies' || currentPath === '/documents' || currentPath === '/profile' ||currentPath === '/notification') {
      showMenuItems=false;
    } else {
      showMenuItems=true;
    }
  }, []);
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    const sideMenu = new MetisMenu("#side-menu");
    activeMenu();
    return () => {
      sideMenu.dispose();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }
  const employeeListshow=()=>{
    // useisShowEmployee(true)
    if ( isShowEmployee == undefined || isShowEmployee == true){
      setisShowEmployee(false)
    }
    else{
      setisShowEmployee(true)
    }
  }
  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

        {showMenuItems ? (
          <>
            <li>
              <Link to="/company-dashboard">
                <i className="bx bxs-dashboard"></i>
                {props.t("Dashboard")}
              </Link>
            </li>
            <li>
              <Link to="/Report-defaulter">
                <i className="bx bx-search"></i>
                {props.t("Report A Defaulter")}
              </Link>
            </li>
            <li>
              <Link to="/bad-debts">
                <i className="bx bx-rupee"></i>
                {props.t("Bad debts")}
              </Link>
            </li>
            <li>
              <Link to="/company-search">
                <i className="bx bx-search"></i>
                {props.t("Company Search")}
              </Link>
            </li>
            <li>
            <Link to="/debtors">
                <i className="bx bx-user"></i>
                {props.t("Debtors(buyers)")}
              </Link>
            </li>
            <li>
            <Link to="/creditors">
                <i className="bx bx-user"></i>
                {props.t("Creditors(Seller)")}
              </Link>
            </li>
            <li>
              <Link to="/Invoice">
                <i className="bx bx-search"></i>
                {props.t("Invoices")}
              </Link>
            </li>
          
            <li>
            <Link to="/send-bill-transaction">
                <i className="bx bx-send"></i>
                {props.t("Send Bill Transaction")}
              </Link>
            </li>
            <li>
            <Link to="/recieved-payment">
                <i className="bx bx-money"></i>
                {props.t("Recieved Payment")}
              </Link>
            </li>
          </>
        ) : (
          <>
              <li>
              <Link to="/companies">
                <i className="bx bx-group"></i>
                {props.t("Companies")}
              </Link>
            </li>
             <li>
              <Link to="/documents" >
                <i className="bx bxs-file-plus"></i>
                
                {props.t("Documents")}
              </Link>
            </li>
            <li>
              <Link to="/profile" >
                <i className="bx bx-user-circle"></i>
                
                {props.t("Profile")}
              </Link>
            </li>
            <li>
              <Link to="/notification" >
                <i className="bx bxs-notification"></i>
                
                {props.t("Notification")}
              </Link>
            </li>
            <li>
              
            <Link onClick={()=>employeeListshow()} >
            <i className='bx bxs-user-detail'></i>                
                {props.t("Employee")}
            
{isShowEmployee != undefined && isShowEmployee != false
?    <i className='bx bx-chevron-up'></i>   :
<i className='bx bx-chevron-down'></i> 
        }
                        </Link>

            </li>
{

  isShowEmployee != undefined && isShowEmployee != false
?
            <li>
        
            
<Link to="/employee" >
                <i className="bx bxs-notification"></i>
                
                {props.t("Employee Registration")}
              </Link>

              <Link to="/EmployeeList" >
              <i className='bx bx-list-ul'></i>                
                {props.t("Employee List")}
              </Link>
            </li>
            :""}
          </>
        )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  showMenuItems: PropTypes.bool,
};

export default withRouter(withTranslation()(SidebarContent));
