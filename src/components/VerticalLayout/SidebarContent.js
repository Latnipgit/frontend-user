import React, { useEffect, useRef, useCallback, useState } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import SimpleBar from "simplebar-react"
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { useMenu } from "./MenuContext"

import { useSelector, useDispatch } from "react-redux";
import { SelectCompnay } from "store/selectCompany/selectCompany.selecter"
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype"

const SidebarContent = props => {
  const dispatch = useDispatch();
  const [showMenuItems, setshowMenuItems] = useState(false)
  const [isShowEmployee, setisShowEmployee] = useState()
  const [isShowSales, setShowSales] = useState(false)
  const [currentPath, setCurrentpath] = useState('')

  const SelectCompnayOpen = useSelector(SelectCompnay)

  useEffect(() => {
    setCurrentpath(window.location.pathname)
    if (
      currentPath == "/companies" ||
      currentPath == "/documents" ||
      currentPath == "/profile" ||
      currentPath == "/notification"
    ) {
      dispatch(setSelectCopenOpen(false))
    } else {
      dispatch(setSelectCopenOpen(true))
    }
  }, [currentPath])
  const ref = useRef()
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    const sideMenu = new MetisMenu("#side-menu")
    activeMenu()
    return () => {
      sideMenu.dispose()
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }
  const employeeListshow = () => {
    // useisShowEmployee(true)
    if (isShowEmployee == undefined || isShowEmployee == true) {
      setisShowEmployee(false)
    } else {
      setisShowEmployee(true)
    }
  }
  const salesListShow = () => {
    if (isShowSales == undefined || isShowSales == true) {
      setShowSales(false)
    } else {
      setShowSales(true)
    }
  }
  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

            {SelectCompnayOpen == true ? (
              <>
                <li>
                  <Link to="/company-dashboard">
                    <i className="bx bxs-dashboard"></i>
                    {props.t("Dashboard")}
                  </Link>
                </li>
                <li>
                  <Link to="/Customer-list">
                    <i className="bx bxs-user"></i>
                    {props.t("Customer")}
                  </Link>
                </li>
                <li>
                  <Link to="/Report-defaulter">
                    <i className='bx bxs-report'></i>
                    {props.t("My Complaints")}
                  </Link>

                </li>
                <li>
                  <Link to="/Report-me-defaulter">
                    <i className='bx bx-shield-quarter'></i>
                    {props.t("Complaints Against Me")}
                  </Link>
                </li>
                <li>
                  <Link to="/company-search">
                    <i className="bx bx-search"></i>
                    {props.t("Company Search")}
                  </Link>
                </li>
                <li>
                  <Link to="/upload-pending-documents">
                    <i className="bx bx-cloud-upload"></i>
                    {props.t("Upload Pending File")}
                  </Link>
                </li>

                {/* <li>
                  <Link onClick={() => salesListShow()}>
                    <i className='bx bx-cart-alt'></i>
                    {props.t("Sales")}

                    {isShowSales != undefined && isShowSales != false ? (
                     <i className="bx bx-chevron-up" style={{ paddingLeft:'5px'}}></i>
                    ) : (
                      <i className="bx bx-chevron-down" style={{ paddingLeft:'5px'}}></i>
                    )}
                  </Link>
                </li> */}

                {isShowSales == true ?

                  <>
                    <li>
                      <Link to="/bad-debts">
                        <i className="bx bx-rupee" style={{ paddingLeft: '15px' }}></i>
                        {props.t("Bad debts")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/debtors">
                        <i className="bx bx-user" style={{ paddingLeft: '15px' }}></i>
                        {props.t("Debtors(buyers)")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/creditors">
                        <i className="bx bx-user" style={{ paddingLeft: '15px' }}></i>
                        {props.t("Creditors(Seller)")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/Invoice">
                        <i className="bx bx-search" style={{ paddingLeft: '15px' }}></i>
                        {props.t("Invoices")}
                      </Link>
                    </li>

                    {/* <li>
                  <Link to="/send-bill-transaction">
                    <i className="bx bx-send" style={{ paddingLeft:'15px'}}></i>
                    {props.t("Send Bill Transaction")}
                  </Link>
                </li> */}
                  </>
                  : ''
                }

                {/* <li>
                  <Link onClick={() => employeeListshow()}>
                    <i className="bx bxs-user-detail"></i>
                    {props.t("Employee")}

                    {isShowEmployee != undefined && isShowEmployee != false ? (
                     <i className="bx bx-chevron-up" style={{ paddingLeft:'5px'}}></i>
                    ) : (
                      <i className="bx bx-chevron-down" style={{ paddingLeft:'5px'}}></i>
                    )}
                  </Link>
                </li> */}
                {isShowEmployee != undefined && isShowEmployee != false ? (
                  <li>
                    <Link to="/employee">
                      <i className="bx bxs-notification" style={{ marginLeft: '15px' }}></i>

                      {props.t("Employee Registration")}
                    </Link>

                    <Link to="/EmployeeList">
                      <i className="bx bx-list-ul" style={{ marginLeft: '15px' }}></i>
                      {props.t("Employee List")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}


                <li>
                  <Link to="/Recieved-Payment">
                    <i className="bx bx-wallet"></i>
                    {props.t("Record Payment")}
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
                  <Link to="/documents">
                    <i className="bx bxs-file-plus"></i>

                    {props.t("Documents")}
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <i className="bx bx-user-circle"></i>

                    {props.t("Profile")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/notification">
                    <i className="bx bxs-notification"></i>

                    {props.t("Notification")}
                  </Link>
                </li> */}

              </>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  showMenuItems: PropTypes.bool,
}

export default withRouter(withTranslation()(SidebarContent))
