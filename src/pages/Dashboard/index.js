import PropTypes from "prop-types"
import React, { useEffect, useState, useRef } from "react"
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

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
// import { Creditor } from "pages/admin/DisputedBillings/disputedCol";

const Dashboard = props => {
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
  const chartRef = useRef(null)
  const chartRef1 = useRef(null)
  const isPopupOpen = JSON.parse(localStorage.getItem("IspopupOpen"))
  const sampleData = [
    { city: "New York", amountDue: 5000, daysCount: 10 },
    { city: "Los Angeles", amountDue: 3000, daysCount: 15 },
    { city: "Chicago", amountDue: 7000, daysCount: 5 },
    { city: "Houston", amountDue: 2500, daysCount: 20 },
    { city: "Miami", amountDue: 6000, daysCount: 8 },
    { city: "San Francisco", amountDue: 4500, daysCount: 12 },
    { city: "Boston", amountDue: 3500, daysCount: 18 },
    { city: "Seattle", amountDue: 8000, daysCount: 4 },
    { city: "Dallas", amountDue: 4000, daysCount: 14 },
    { city: "Atlanta", amountDue: 5500, daysCount: 7 },
    // Add more data as needed
  ]

  const totalAmountDue = sampleData.reduce(
    (total, item) => total + item.amountDue,
    0
  )

  const [chartData, setChartData] = useState([
    { label: "Total Amount Due", value: totalAmountDue },
  ])
  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        setSubscribemodal(true)
        localStorage.setItem("IspopupOpen", JSON.stringify(false))
      }, 500)
    }
  }, [])

  const handleSignUp = () => {
    setSubscribemodal(false)
  }

  useEffect(() => {
    if (chartRef1.current) {
      const ctx = chartRef1.current.getContext("2d")

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartData.map(item => item.label),
          datasets: [
            {
              data: chartData.map(item => item.value),
              backgroundColor: ["#28a745"],
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: "right",
          },
        },
      })
    }
  }, [chartRef1, chartData])
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartData.map(item => item.label),
          datasets: [
            {
              data: chartData.map(item => item.value),
              backgroundColor: ["#28a745"],
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: "right",
          },
        },
      })
    }
  }, [chartRef, chartData])

  document.title = "Dashboard | Bafana"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md="6">
              <Card>
                <div className="card-header display-6 fw-bold">Debtors</div>

                <CardBody>
                  <div className="chart-container">
                    <canvas ref={chartRef}></canvas>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <div className="card-header display-6 fw-bold">Creditors</div>

                <CardBody>
                  <div className="chart-container">
                    <canvas ref={chartRef1}></canvas>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card>
                {/* <div className="card-header">Debtors</div> */}
                <CardBody>
                  <Creditors />
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                {/* <div className="card-header">Creditors</div> */}
                <CardBody>
                  <Debtors />
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
