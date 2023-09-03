import PropTypes from "prop-types";
import React, { useEffect, useState ,useRef } from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";
import Chart from "chart.js";

import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {
  const renderStarRating = (rating) => {
    const starCount = 5;
    const fullStarCount = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < fullStarCount; i++) {
        stars.push(<i key={i} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    const remainingStars = starCount - fullStarCount - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
};
  const [subscribemodal, setSubscribemodal] = useState(false);
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);
  const isPopupOpen = JSON.parse(localStorage.getItem("IspopupOpen"));
  useEffect(() => {
      
  if (isPopupOpen) {
      setTimeout(() => {
       
        setSubscribemodal(true);
        localStorage.setItem("IspopupOpen", JSON.stringify(false));
      }, 500);  
    }
  }, []);

  const handleSignUp = () => {
    setSubscribemodal(false);
  };

  useEffect(() => {
    if (chartRef1.current) {
      const ctx = chartRef1.current.getContext("2d");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Due Amount", "Paid Amount", "In-Disbute"],
          datasets: [
            {
              data: [40, 20, 15],
              backgroundColor: ["#FF5733", "#FFC300", "#C70039"],
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: "right",
          },
        },
      });
    }
  }, [chartRef1]);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Due Amount", "Paid Amount", "In-Disbute"],
          datasets: [
            {
              data: [40, 20, 15],
              backgroundColor: ["#FF5733", "#FFC300", "#C70039"],
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: "right",
          },
        },
      });
    }
  }, [chartRef]);

  const tableData = [
    { status: "Due", percentage: 40, outstanding: 10000, review: "4.5" },
    { status: "Paid", percentage: 20, outstanding: 5000, review: "3.5" },
    { status: "In-Disbute", percentage: 15, outstanding: 3750, review: "4.5" },
    // { status: "Issue", percentage: 10, outstanding: 2500, review: "2.5" },
    // { status: "In Court", percentage: 15, outstanding: 3750, review: "3.5" },
  ];
  //meta title
  document.title = "Dashboard | Bafana";

  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Row>
        <Col md="6">
            <Card>
            <div className="card-header">Debtors</div>
              <CardBody>
                <div className="chart-container">
                  <canvas ref={chartRef1}></canvas>
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Percentage</th>
                      <th>Outstanding</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.status}</td>
                        <td>{item.percentage}%</td>
                        <td>${item.outstanding}</td>
                        <td>
                        <div className="review-rating d-flex align-items-center " style={{ color: 'goldenrod', fontSize: '12px' }}>
                                    {renderStarRating(item.review)}
                                    <h5
                                        className="ml-2 mb-1 mt-2 mx-2"
                                        style={{ color: 'goldenrod', fontSize: '12px' }} // Inline CSS
                                    >
                                      {item.review}
                                    </h5>
                                </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
            <div className="card-header">Creditors</div>
              <CardBody>
                <div className="chart-container">
                  <canvas ref={chartRef}></canvas>
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Percentage</th>
                      <th>Outstanding</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.status}</td>
                        <td>{item.percentage}%</td>
                        <td>${item.outstanding}</td>
                        <td>
                        <div className="review-rating d-flex align-items-center " style={{ color: 'goldenrod', fontSize: '12px' }}>
                                    {renderStarRating(item.review)}
                                    <h5
                                        className="ml-2 mb-1 mt-2 mx-2"
                                        style={{ color: 'goldenrod', fontSize: '12px' }} // Inline CSS
                                    >
                                      {item.review}
                                    </h5>
                                </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
    setSubscribemodal(!subscribemodal);
  }}
>
  <div>
    <ModalHeader
      className="border-bottom-0"
      toggle={() => {
        setSubscribemodal(!subscribemodal);
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
            By signing up, you agree not to post false information about any party and to take complete responsibility if your posts or reviews lead to defamation of any party.
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
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  // chartsData: PropTypes.any,
  // onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
