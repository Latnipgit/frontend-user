import PropTypes from "prop-types"
import React, { useEffect, useState, useRef, useMemo } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"
import Chart from "chart.js"
import Creditors from "./users/creditors"
import Debtors from "./users/debtors"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import TableContainer from "../../components/Common/TableContainer"

import { CreditorsGraph } from "components/graph-components/creditors.componet"
import { getAllInvoice } from "../../../src/store/actions"
import { selectInvoiceList } from "store/debtors/debtors.selecter"
import { selectInvoiceListMap } from "store/debtors/debtors.selecter"
import moment from 'moment'
import {
  DebtorsGraph,
  sampleRepetedDebtors,
} from "components/graph-components/debtors.componet"
import { searchCompany as onsearchCompany } from "../../../src/store/actions";
import { CompanySerchForm } from "pages/admin/ApprovedTransaction/companySearchComponet"

//i18n
import { withTranslation } from "react-i18next"
import './Dashboard.css'
//redux
import { useSelector, useDispatch } from "react-redux"
import CurrencyFormat from 'react-currency-format';
// import { Creditor } from "pages/admin/DisputedBillings/disputedCol";
import ReportMedefulterComponent from '../../pages/admin/ReportMeDefualter/ReportaMeDefaulter'

import { SelectCompnay } from "store/selectCompany/selectCompany.selecter";
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype";
import { numberFormat } from "pages/admin/uploadPendingDoucument/uploadPendingDoc"



const Dashboard = props => {
  const [subscribemodal, setSubscribemodal] = useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [isClickedToReported, setisClickedToReported] = useState(false);
  const dispatch = useDispatch();

  const SelectCompnayOpen = useSelector(SelectCompnay)

  const renderStarRating = rating => {
    const starCount = 5
    const fullStarCount = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = []

    for (let i = 0; i < fullStarCount; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>)
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }

    const remainingStars = starCount - fullStarCount - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }

    return stars
  }

  const GetAllInvoice = useSelector(selectInvoiceList)

  useEffect(() => {
    dispatch(getAllInvoice());
    getDays()
  }, [])

  useEffect(() => {
    const companyid = localStorage.getItem("COMPANY-ID")
    dispatch(onsearchCompany(companyid));

  })
  const handleSignUp = () => {
    setSubscribemodal(false)
  }

  const handleFilterdata = (filters) => {
    if (GetAllInvoice) {
      if (filters === "") {
        setFilteredData(GetAllInvoice)
      } else {
        const filteredResults = GetAllInvoice.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters);
        });
        setFilteredData(filteredResults);
      }
    }


  };

  const getDays = () => {
    GetAllInvoice != undefined ? GetAllInvoice.map((item) => {
      const a = moment(item.invoices[0].dueDate);
      const b = moment()
      const c = moment(b).diff(a)
      const d = moment.duration(c)
      if (getDaysArray.length != GetAllInvoice.length) {
        getDaysArray.push(d.days())

      }
    }) : []
  }

  document.title = "Dashboard | Bafana"


  const handleMainDashboard = () => {
    dispatch(setSelectCopenOpen(!SelectCompnayOpen))
  };

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />
          <Row>
            <Col md={8}>
              <h5 className="m-1">Company Dashboard</h5>
            </Col>
            <Col md={4}>
              <Link to="/companies">
                <Button style={{ float: 'right' }} className="'btn btn-info p-2 backtoHomeButton" onClick={() => {
                  handleMainDashboard()
                }}>
              <i className='bx bx-arrow-back'></i> Dashboard
                </Button>
              </Link>

            </Col>


          </Row>
          <br />
          <div style={{ border: "1px solid gray" }} className="p-3">


            <Row className="text-center" >
              <Col md={12}>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-info backtoHomeButton " style={{ background: isClickedToReported == false ? " #50a5f1" : "	 #707274", border: "none", width: "" }} onClick={() => setisClickedToReported(false)} >Reported Me As a Defaulter</button>
                  <button type="button" className="btn btn-info  backtoHomeButton" style={{ background: isClickedToReported != false ? "#50a5f1" : "	 #707274", border: "none", width: "" }} onClick={() => setisClickedToReported(true)} >Reported Defaulter</button>
                </div>


              </Col>
              <Col md={12} className="">
                <div className="btn-group" role="group" aria-label="Basic example">
                  <span style={{ width: '100px', height: "5px", background: isClickedToReported == false ? " #50a5f1" : "", marginRight: "110px" }}></span>
                  <span style={{ width: '100px', height: "5px", background: isClickedToReported != false ? " #50a5f1" : "", }}></span>
                </div>
                <br />

              </Col>



            </Row>
            <br />

            {isClickedToReported != true ?

              <Row style={{ marginTop: '-20px' }}>
                <ReportMedefulterComponent isClickedToReported={isClickedToReported} />

              </Row>
              : <>
                <Row>
                  <Col md={10} className="pl-3">
                    <h5 className="m-1">My Complaints</h5>
                  </Col>
                  <Col md={2}>
                    {/* <Button className="btn btn-md btn-info" >Report a Defaulter</Button> */}
                    {/* <div data-tip="msg to show" data-for='toolTip1' data-place='top'>Tooltip</div>
<ReactTooltip id="toolTip1" /> */}

                  </Col>
                </Row>
                {GetAllInvoice != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Buyer"} /> : ""}

                <Row className="p-4  ml-5">
                  {/* <br/> */}

                  {/* <ReactTable
    data={GetAllInvoice != undefined ? GetAllInvoice : []}
    columns={columns}
    showPagination={true}
    defaultPageSize={5}
  /> */}

                  <table className="table table-bordered table-responsive w-100hmm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Buyer Name</th>
                        {/* <th scope="col">Refrence Number</th> */}
                        <th scope="col">Invoice Number</th>
                        <th scope="col">Address</th>

                        <th scope="col">Due Amount</th>

                        <th scope="col">Due From</th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">Upload Document</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {/*    {<FilterData GetAllInvoicedata={GetAllInvoice} />} */}
                      {/* {GetAllInvoice != undefined ? GetAllInvoice.map((item, index)=>{ */}
                      <FilterData GetAllInvoicedata={filteredData} getDaysArray={getDaysArray} />
                    </tbody>
                  </table>

                </Row>
              </>

            }
          </div>



        </CardBody>
      </Card>
    </React.Fragment>
  )
}

const FilterData = ({ GetAllInvoicedata, getDaysArray }) => {
  return (
    <>
      {GetAllInvoicedata != undefined ? GetAllInvoicedata.map((item, index) => {
        return <tr key={item}>

          <th scope="row" className="pt-4">{index + 1}</th>
          <td className="pt-4 text-capitalize" style={{ width: "13%" }}>{item.debtor.companyName}</td>
          <td className="pt-4" style={{ width: "15%" }}>{item.invoices[0].invoiceNumber}</td>
          <td style={{ width: "35%" }}>
            {item.debtor.address1}, {item.debtor.address2}
          </td>
          <td className="pt-4">{numberFormat(item.totalAmount)}</td>

          <td>
            <div className="" style={{ padding: "2px 15px" }}>

              <div className=" text-center bg-danger p-2  rounded text-light">
                <div className="text-capitalize">

                  {getDaysArray[index]}  &nbsp;


                  <span className="ml-1">Days</span> </div>
                <div className="text-capitalize" >{moment(item.invoices[0].dueDate).format("DD-MM-YYYY")}</div>
              </div>
            </div>
            {/*  {newDate} */}
          </td>
          <td>
            <td className={item.status == undefined ? 'text-success h6' : 'text-danger h6'}>{item.status == undefined ? "Approved" : item.status}</td>
          </td>
        </tr>
      }) : ''}

    </>
  )

}


Dashboard.propTypes = {
  t: PropTypes.any,
  // chartsData: PropTypes.any,
  // onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
