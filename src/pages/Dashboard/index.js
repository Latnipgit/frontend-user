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
import {
  DebtorsGraph,
  sampleRepetedDebtors,
} from "components/graph-components/debtors.componet"
import { searchCompany as onsearchCompany} from "../../../src/store/actions";

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
// import { Creditor } from "pages/admin/DisputedBillings/disputedCol";

const Dashboard = props => {
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

  const [subscribemodal, setSubscribemodal] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />
        },
      },
      {
        Header: "Ref No",
        accessor: "Refnumber",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Buyer Name",
        accessor: "Buyer",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Amount",
        accessor: "Amount",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Due From",
        accessor: "DueFrom",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "status",
        accessor: "status",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div>
              {cellProps.row.original.status == "Complete" ? (
                <span className="text-success">
                  {cellProps.row.original.status}
                </span>
              ) : (
                <span className="text-danger">
                  {cellProps.row.original.status}
                </span>
              )}
            </div>
          )
        },
      },

      {
        Header: "Action",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div>
              <Button className="btn btn-danger btn-sm" disabled>
                Report a Defaulter
              </Button>
            </div>
          )
        },
      },
    ],
    []
  )

  useEffect(()=>{
    const companyid = localStorage.getItem("COMPANY-ID")
    console.log("COMPANY-ID", companyid)
    dispatch(onsearchCompany(companyid));

  })
  const handleSignUp = () => {
    setSubscribemodal(false)
  }

  document.title = "Dashboard | Bafana"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md="12">
              <div className="mb-4 h4 card-title">Reported Debtors</div>
              <TableContainer
                columns={columns}
                data={sampleRepetedDebtors}
                isGlobalFilter={false}
                isAddOptions={false}
                customPageSize={6}
              />
            </Col>
          </Row>

          <Row>
            <DebtorsGraph />
            <CreditorsGraph />
          </Row>
          <Row>
            <Col md="6">
              <Card>
                {/* <div className="card-header">Debtors</div> */}
                <CardBody>
                  <Debtors />
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                {/* <div className="card-header">Creditors</div> */}
                <CardBody>
                  <Creditors />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal)
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubscribemodal(!subscribemodal)
            }}
          ></ModalHeader>
        </div>
        <div className="modal-body">
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light rounded-circle text-primary h1">
                <i className="mdi mdi-email-open"></i>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-10">
                <h4 className="text-primary">Confirmation</h4>
                <p className="text-muted font-size-14 mb-4">
                  By signing up, you agree not to post false information about
                  any party and to take complete responsibility if your posts or
                  reviews lead to defamation of any party.
                </p>

                <Button color="primary" type="button" onClick={handleSignUp}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  // chartsData: PropTypes.any,
  // onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
