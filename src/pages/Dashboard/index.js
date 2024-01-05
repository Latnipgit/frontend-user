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

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
// import { Creditor } from "pages/admin/DisputedBillings/disputedCol";

const Dashboard = props => {
  const [subscribemodal, setSubscribemodal] = useState(false)
  const dispatch = useDispatch();

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
  }, [])

  useEffect(() => {
    const companyid = localStorage.getItem("COMPANY-ID")
    console.log("COMPANY-ID", companyid)
    dispatch(onsearchCompany(companyid));

  })
  const handleSignUp = () => {
    setSubscribemodal(false)
  }

  document.title = "Dashboard | Bafana"
  const companiesURL = "/companies"

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />


          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Report a Defaulter</h5>
            </Col>
            <Col md={2}>
              <Button className="btn btn-md btn-info" onClick={() => handleReportDefaulter()}>Report a Defaulter</Button>
              {/* <div data-tip="msg to show" data-for='toolTip1' data-place='top'>Tooltip</div>
<ReactTooltip id="toolTip1" /> */}
            </Col>
          </Row>

          <Row className="p-4  ml-5">
            {/* <br/> */}

            {/* <ReactTable
              data={GetAllInvoice != undefined ? GetAllInvoice : []}
              columns={columns}
              showPagination={true}
              defaultPageSize={5}
            /> */}

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company Name</th>
                  {/* <th scope="col">Refrence Number</th> */}
                  <th scope="col">Invoice Number</th>
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Address</th>
                  <th scope="col">Due Amount</th>
                  <th scope="col">Due From</th>
                  <th scope="col">Action</th>
                  {/* <th scope="col">Upload Document</th> */}
                </tr>
              </thead>
              <tbody>
                {/* {GetAllInvoice != undefined ? GetAllInvoice.map((item, index)=>{ */}
                {GetAllInvoice != undefined ? GetAllInvoice.map((item, index) => {

                  let newDate = moment.utc(item.invoices[0].dueDate).format('DD-MM-YY');
                  return <tr key={item}>
                    {console.log("NEW TABLE ", item)}

                    <th scope="row" className="pt-4">{index + 1}</th>
                    {/* <td className="pt-4 text-capitalize">{item.debtor.companyName}</td> */}
                    <td className="pt-4 text-capitalize">{item.debtor.companyName}</td>
                    {/* <td className="pt-4">{item.referenceNumber}</td> */}
                    <td className="pt-4">{item.invoices[0].invoiceNumber}</td>
                    {/* <td className="pt-4 d-flex text-capitalize">{item.debtor.companyName}
    <br/>
    {item.debtor.address1} {item.debtor.address2}, {item.debtor.city}</td> */}
                    <td>
                      {item.debtor.address1}, {item.debtor.address2}
                    </td>
                    <td className="pt-4">{item.totalAmount}</td>
                    {/* <td className="pt-4 text-end">
      <CurrencyFormat value={item.remainingAmount} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} />

    </td> */}

                    {/* <td >
   
    <div className="" style={{ padding:"2px 15px"}}>
      
  <div className=" text-center bg-success rounded text-light">
    <div className="text-capitalize">
      
       {getDaysArray[index]}  &nbsp;


       <span className="ml-1">Days</span> </div>
    <div className="text-capitalize" >{moment(item.dueDate).format("MM-DD-YY")}</div>
  </div>
</div>
           
    </td> */}
                    <td>
                      {newDate}
                    </td>
                    <td>
                      <td className={item.status == undefined ? 'text-success' : 'text-danger'}>{item.status == undefined ? "Approved" : item.status}</td>
                    </td>
                    {/* <td>
                              <span className="text-success">
                  {cellProps.row.original.status}
                </span>
              ) : (
                <span className="text-danger">
                  {cellProps.row.original.status}
                </span>
    <div className="pt-2">
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModels()
               
              }
            >
           Upload Document
            </Button>
  
          </div>
    </td> */}
                  </tr>
                }) : ''}


              </tbody>
            </table>

          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  // chartsData: PropTypes.any,
  // onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
