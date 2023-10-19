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
import TableContainer from "../../components/Common/TableContainer";

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
  const [activeChart, setActiveChart] = useState("totalDebtors");
  const [activeChartCreditors, setActiveChartCreditors] = useState("totalCreditors");
  //Debtors
  const chartRef = useRef(null)
  const chartRef2 = useRef(null)
  const chartRef3 = useRef(null)
  const chartRef4 = useRef(null)
  //Credtiors
  const chartRef1 = useRef(null)
  const chartRefCreditorAgeWise = useRef(null);
  const chartRefCreditorTop10 = useRef(null);
  const chartRefCreditorDaysWise = useRef(null);
  //const chartRef1 = useRef(null)
  const isPopupOpen = JSON.parse(localStorage.getItem("IspopupOpen"))
  //debtors
  const sampleData = [
    { city: "New York", amountDue: 5000, daysCount: 10, name: "Name A" },
    { city: "Los Angeles", amountDue: 3000, daysCount: 15, name: "Name B" },
    { city: "Chicago", amountDue: 7000, daysCount: 5, name: "Name C" },
    { city: "Houston", amountDue: 2500, daysCount: 20, name: "Name D" },
    { city: "Miami", amountDue: 6000, daysCount: 8, name: "Name E" },
    { city: "San Francisco", amountDue: 4500, daysCount: 12, name: "Name F" },
    { city: "Boston", amountDue: 3500, daysCount: 18, name: "Name G" },
    { city: "Seattle", amountDue: 8000, daysCount: 31, name: "Name H" },
    { city: "Dallas", amountDue: 4000, daysCount: 45, name: "Name I" },
    { city: "Atlanta", amountDue: 5500, daysCount: 36, name: "Name J" },
    // Add more data as needed
  ];
  
  //Creditors
  const sampleDataCreditors = [
    { city: "New York", name: "Creditor 1", amountOwed: 8000, daysCount: 10 },
    { city: "Los Angeles", name: "Creditor 2", amountOwed: 3500, daysCount: 5 },
    { city: "Chicago", name: "Creditor 3", amountOwed: 6000, daysCount: 15 },
    { city: "Houston", name: "Creditor 4", amountOwed: 2500, daysCount: 20 },
    { city: "Miami", name: "Creditor 5", amountOwed: 4500, daysCount: 8 },
    { city: "San Francisco", name: "Creditor 6", amountOwed: 7000, daysCount: 12 },
    { city: "Boston", name: "Creditor 7", amountOwed: 5500, daysCount: 7 },
    { city: "Seattle", name: "Creditor 8", amountOwed: 3000, daysCount: 14 },
    { city: "Dallas", name: "Creditor 9", amountOwed: 6500, daysCount: 18 },
    { city: "Atlanta", name: "Creditor 10", amountOwed: 4000, daysCount: 4 },
    { city: "Philadelphia", name: "Creditor 11", amountOwed: 3000, daysCount: 10 },
    { city: "Phoenix", name: "Creditor 12", amountOwed: 6000, daysCount: 15 },
    { city: "Denver", name: "Creditor 13", amountOwed: 4500, daysCount: 5 },
    { city: "Minneapolis", name: "Creditor 14", amountOwed: 5500, daysCount: 20 },
    { city: "Portland", name: "Creditor 15", amountOwed: 2500, daysCount: 8 },
    { city: "San Diego", name: "Creditor 16", amountOwed: 3500, daysCount: 12 },
    { city: "Washington, D.C.", name: "Creditor 17", amountOwed: 7000, daysCount: 7 },
    { city: "Detroit", name: "Creditor 18", amountOwed: 8000, daysCount: 45 },
    { city: "Raleigh", name: "Creditor 19", amountOwed: 4000, daysCount: 40 },
    { city: "Tampa", name: "Creditor 20", amountOwed: 6500, daysCount: 35 },
    // Add more data as needed to reach a total of 20 records
  ];
  

// Table for Repeted ddebtors

const sampleRepetedDebtors = [
  { "Refnumber": "#BF-001", "Buyer": "Rohan", "Amount": "8000", "DueFrom": "20 january 2022" , "status":"Pending"},
  { "Refnumber": "#BF-002", "Buyer": "harshit", "Amount": "15000", "DueFrom": "12 march 2022" , "status":"Complete"},
  { "Refnumber": "#BF-003", "Buyer": "akshay", "Amount": "8500", "DueFrom": "21 july 2022" , "status":"Pending"},
  { "Refnumber": "#BF-004", "Buyer": "ram", "Amount": "9400", "DueFrom": "20 january 2022" , "status":"Complete"},
  { "Refnumber": "#BF-005", "Buyer": "shyan", "Amount": "9900", "DueFrom": "20 january 2022" , "status":"Pending"},

];
const columns = useMemo(
  () => [
    {
      Header: "#",
      filterable: false,
      disableFilters: true,
      Cell: cellProps => {
        return <input type="checkbox" className="form-check-input" />;
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
{cellProps.row.original.status == 'Complete'? <span className="text-success">{cellProps.row.original.status}</span>:<span className="text-danger">{cellProps.row.original.status}</span>}
</div>
        )}
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
        )}
    },
   
  ],
  []
);




  // Use the sampleDataCreditors array for your creditor-related charts and components
  


//data sorting for Top 10 debtors
  const sortedData = sampleData
  .slice()
  .sort((a, b) => b.amountDue - a.amountDue)
  .slice(0, 10);

  const totalAmountDue = sampleData.reduce(
    (total, item) => total + item.amountDue,0
  )
  const totalAmountDueCreditors = sampleDataCreditors.reduce(
    (total, item) => total + item.amountOwed,0
  )
  const sortedDataCreditors = sampleDataCreditors
  .slice()
  .sort((a, b) => b.amountDue - a.amountDue)
  .slice(0, 10);

 
//Initial for debtors
  const [chartData, setChartData] = useState([
    { label: "Total Amount Due", value: totalAmountDue },
  ])
  //Initial for creditors
  const [chartDatacreditors, setChartDatacreditors] = useState([
    { label: "Total Amount deposit", value: totalAmountDueCreditors },
  ])
//debtors age wise
  const chartDataAgewise = sampleData.map((item, index) => ({
    label: item.city,
    value: item.amountDue,
    backgroundColor: getRandomColor(index),
  }));
  //creditors 
  const chartDataCreditorAgewise = sampleDataCreditors.map((item, index) => ({
    label: item.city,
    value: item.amountOwed,
    backgroundColor: getRandomColorCreditors(index),
  }));
//Top 10 debtors 
const chartDataTop10debtors = sortedData.map((item) => ({
  label: item.name,
  value: item.amountDue,
  backgroundColor: getRandomColor(),
}));
//Top 10 creditors
const chartDataTop10Creditors = sortedDataCreditors.map((item) => ({
  label: item.name,
  value: item.amountOwed,
  backgroundColor: getRandomColorCreditors(),
}));
//debtors intial 
useEffect(() => {
  console.log(chartData)
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
}, [chartRef, chartData, activeChart])
//Debtors age wise 
useEffect(() => {
  if (chartRef2.current) {
    const ctx = chartRef2.current.getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartDataAgewise.map((item) => item.label),
        datasets: [
          {
            data: chartDataAgewise.map((item) => item.value),
            backgroundColor: chartDataAgewise.map((item) => item.backgroundColor),
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
}, [chartRef2, chartDataAgewise]);
//Debtors Top 10 debtors
useEffect(() => {
  if (chartRef3.current) {
    const ctx = chartRef3.current.getContext("2d");

    // Calculate the total amount for the center text
    const totalAmount = chartDataTop10debtors.reduce((total, item) => total + item.value, 0);

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartDataTop10debtors.map((item) => item.label),
        datasets: [
          {
            data: chartDataTop10debtors.map((item) => item.value),
            backgroundColor: chartDataTop10debtors.map((item) => item.backgroundColor),
          },
        ],
      },
      options: {
       // cutoutPercentage: 30, // Adjust the size of the center hole
        legend: {
          display: true,
          position: "right",
        },
        plugins: {
          datalabels: {
            display: false, // Hide the data labels (optional)
          },
          doughnutlabel: {
            labels: [
              {
                text: totalAmount.toFixed(2), // Display the total amount
                font: {
                  size: "20", // Adjust the font size
                },
                color: "#000", // Add text color (e.g., black)
              },

            ],
          },
        },
      },
    });
  }
}, [chartRef3, chartDataTop10debtors]);
//days count for debtors 
useEffect(() => {
  if (chartRef4.current) {
    const ctx = chartRef4.current.getContext("2d");

    // Define the bins for days
    const bins = [
      { label: "0-15 days", minDays: 0, maxDays: 15 },
      { label: "16-30 days", minDays: 16, maxDays: 30 },
      { label: "31-45 days", minDays: 31, maxDays: 45 },
      // Add more bins as needed
    ];

    // Initialize an array to store the total amounts for each bin
    const binAmounts = new Array(bins.length).fill(0);

    // Group the data into bins and calculate total amounts
    sampleData.forEach((item) => {
      const daysCount = item.daysCount;
      for (let i = 0; i < bins.length; i++) {
        if (daysCount >= bins[i].minDays && daysCount <= bins[i].maxDays) {
          binAmounts[i] += item.amountDue;
          break; // Stop checking other bins once the bin is found
        }
      }
    });

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: bins.map((bin) => bin.label),
        datasets: [
          {
            data: binAmounts,
            backgroundColor: bins.map((bin, index) => getRandomColor(index)),
          },
        ],
      },
      options: {
        //cutoutPercentage: 70, // Adjust the size of the center hole
        legend: {
          display: true,
          position: "right",
        },
        plugins: {
          datalabels: {
            display: false, // Hide the data labels (optional)
          },
          doughnutlabel: {
            labels: [
              {
                text: "Days Count", // Center text for days count chart
                font: {
                  size: "20", // Adjust the font size
                },
                color: "#000", // Add text color (e.g., black)
              },
            ],
          },
        },
      },
    });
  }
}, [chartRef4, sampleData]);
console.log("CHART", chartRef1, chartRef2, chartRef3, chartRef4)
// Creditor Age Wise
useEffect(() => {
  if (chartRefCreditorAgeWise.current) {
    const ctx = chartRefCreditorAgeWise.current.getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartDataCreditorAgewise.map((item) => item.label),
        datasets: [
          {
            data: chartDataCreditorAgewise.map((item) => item.value),
            backgroundColor: chartDataCreditorAgewise.map((item) => item.backgroundColor),
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
}, [chartRefCreditorAgeWise, chartDataCreditorAgewise]);

// Creditor Top 10 Creditors
useEffect(() => {
  if (chartRefCreditorTop10.current) {
    const ctx = chartRefCreditorTop10.current.getContext("2d");

    // Calculate the total amount for the center text
    const totalAmount = chartDataTop10Creditors.reduce((total, item) => total + item.value, 0);

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartDataTop10Creditors.map((item) => item.label),
        datasets: [
          {
            data: chartDataTop10Creditors.map((item) => item.value),
            backgroundColor: chartDataTop10Creditors.map((item) => item.backgroundColor),
          },
        ],
      },
      options: {
        legend: {
          display: true,
          position: "right",
        },
        plugins: {
          datalabels: {
            display: true, // Hide the data labels (optional)
          },
          doughnutlabel: {
            labels: [
              {
                text: totalAmount.toFixed(2), // Display the total amount
                font: {
                  size: "20", // Adjust the font size
                },
                color: "#000", // Add text color (e.g., black)
              },
            ],
          },
        },
      },
    });
  }
}, [chartRefCreditorTop10, chartDataTop10Creditors]);

// Creditor Days Count
useEffect(() => {
  if (chartRefCreditorDaysWise.current) {
    const ctx = chartRefCreditorDaysWise.current.getContext("2d");

    // Define the bins for days
    const bins = [
      { label: "0-15 days", minDays: 0, maxDays: 15 },
      { label: "16-30 days", minDays: 16, maxDays: 30 },
      { label: "31-45 days", minDays: 31, maxDays: 45 },
      // Add more bins as needed
    ];

    // Initialize an array to store the total amounts for each bin
    const binAmounts = new Array(bins.length).fill(0);

    // Group the data into bins and calculate total amounts
    sampleDataCreditors.forEach((item) => {
      const daysCount = item.daysCount;
      for (let i = 0; i < bins.length; i++) {
        if (daysCount >= bins[i].minDays && daysCount <= bins[i].maxDays) {
          binAmounts[i] += item.amountOwed;
          break; // Stop checking other bins once the bin is found
        }
      }
    });

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: bins.map((bin) => bin.label),
        datasets: [
          {
            data: binAmounts,
            backgroundColor: bins.map((bin, index) => getRandomColorCreditors(index)),
          },
        ],
      },
      options: {
        legend: {
          display: true,
          position: "right",
        },
        plugins: {
          datalabels: {
            display: false, // Hide the data labels (optional)
          },
          doughnutlabel: {
            labels: [
              {
                text: "Days Count", // Center text for days count chart
                font: {
                  size: "20", // Adjust the font size
                },
                color: "#000", // Add text color (e.g., black)
              },
            ],
          },
        },
      },
    });
  }
}, [chartRefCreditorDaysWise, sampleDataCreditors]);


//creditors intial 
useEffect(() => {
  if (chartRef1.current) {
    const ctx = chartRef1.current.getContext("2d")

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartDatacreditors.map(item => item.label),
        datasets: [
          {
            data: chartDatacreditors.map(item => item.value),
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
}, [chartRef1, chartDatacreditors, activeChartCreditors])
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
const handleChartChange = (chartType) => {
  setActiveChart(chartType);
  console.log(chartType)
};

const handleChartCreditorsChange = (chartType) => {
  setActiveChartCreditors(chartType);
};



  function getRandomColor(index) {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  function getRandomColorCreditors(index) {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
          <Col md="6">
        <Card>
          <div className="card-header display-6 fw-bold">
            Debtors
          </div>
          <CardBody>
          <div className="btn-group float-right mb-5"role="group" aria-label="Chart Type Buttons">
              <button
                type="button"
                className={`btn btn-secondary ${activeChart === "totalDebtors" ? "active" : ""}`}
                onClick={() => handleChartChange("totalDebtors")}
              >
                Total Debts
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${activeChart === "citywise" ? "active" : ""}`}
                onClick={() => handleChartChange("citywise")}
              >
                City Wise
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${activeChart === "top10Debtors" ? "active" : ""}`}
                onClick={() => handleChartChange("top10Debtors")}
              >
                Top Debtors
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${activeChart === "daysWise" ? "active" : ""}`}
                onClick={() => handleChartChange("daysWise")}
              >
                Days Wise
              </button>
            </div>
            {activeChart === "totalDebtors" && (
              <div className="chart-container">
                {/* Render your Total Debtors chart */}
                <canvas ref={chartRef}></canvas>
              </div>
            )}
            {activeChart === "citywise" && (
              <div className="chart-container">
                {/* Render your Age Wise chart */}
                <canvas ref={chartRef2}></canvas>
              </div>
            )}
            {activeChart === "top10Debtors" && (
              <div className="chart-container">
                {/* Render your Top 10 Debtors chart */}
                <canvas ref={chartRef3}></canvas>
              </div>
            )}
            {activeChart === "daysWise" && (
              <div className="chart-container">
                {/* Render your Days Wise chart */}
                <canvas ref={chartRef4}></canvas>
              </div>
            )}
             
          </CardBody>
        </Card>
      </Col>
            <Col md="6">
              <Card>
                <div className="card-header display-6 fw-bold">Creditors</div>

                <CardBody>
                <div className="btn-group float-right mb-5"role="group" aria-label="Chart Type Buttons">
              <button
                type="button"
                className={`btn btn-secondary ${activeChartCreditors === "totalCreditors" ? "active" : ""}`}
                onClick={() => handleChartCreditorsChange("totalCreditors")}
              >
                Total Credits
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${activeChartCreditors === "citywise" ? "active" : ""}`}
                onClick={() => handleChartCreditorsChange("citywise")}
              >
                City Wise
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${activeChartCreditors === "top10Debtors" ? "active" : ""}`}
                onClick={() => handleChartCreditorsChange("top10Debtors")}
              >
                Top Creditors
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${activeChartCreditors === "daysWise" ? "active" : ""}`}
                onClick={() => handleChartCreditorsChange("daysWise")}
              >
                Days Wise
              </button>
            </div>
            {activeChartCreditors === "totalCreditors" && (
              <div className="chart-container">
                {/* Render your Total Debtors chart */}
                <canvas ref={chartRef1}></canvas>
              </div>
            )}
            {activeChartCreditors === "citywise" && (
              <div className="chart-container">
                {/* Render your Age Wise chart */}
                <canvas ref={chartRefCreditorAgeWise}></canvas>
              </div>
            )}
            {activeChartCreditors === "top10Debtors" && (
              <div className="chart-container">
                {/* Render your Top 10 Debtors chart */}
                <canvas ref={chartRefCreditorTop10}></canvas>
              </div>
            )}
            {activeChartCreditors === "daysWise" && (
              <div className="chart-container">
                {/* Render your Days Wise chart */}
                <canvas ref={chartRefCreditorDaysWise}></canvas>
              </div>
            )}
                </CardBody>
              </Card>
            </Col>
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
