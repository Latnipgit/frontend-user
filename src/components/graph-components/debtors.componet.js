import React, { useEffect, useState, useRef, useMemo } from "react"
import { Col, Card, CardBody } from "reactstrap"
import Chart from "chart.js"

export const sampleRepetedDebtors = [
  {
    Refnumber: "#BF-001",
    Buyer: "Rohan",
    Amount: "8000",
    DueFrom: "20 january 2022",
    status: "Pending",
  },
  {
    Refnumber: "#BF-002",
    Buyer: "harshit",
    Amount: "15000",
    DueFrom: "12 march 2022",
    status: "Complete",
  },
  {
    Refnumber: "#BF-003",
    Buyer: "akshay",
    Amount: "8500",
    DueFrom: "21 july 2022",
    status: "Pending",
  },
  {
    Refnumber: "#BF-004",
    Buyer: "ram",
    Amount: "9400",
    DueFrom: "20 january 2022",
    status: "Complete",
  },
  {
    Refnumber: "#BF-005",
    Buyer: "shyan",
    Amount: "9900",
    DueFrom: "20 january 2022",
    status: "Pending",
  },
]

export const DebtorsGraph = () => {
  const [activeChart, setActiveChart] = useState("totalDebtors")

  const chartRef = useRef(null)
  const chartRef2 = useRef(null)
  const chartRef3 = useRef(null)
  const chartRef4 = useRef(null)

  const isPopupOpen = JSON.parse(sessionStorage.getItem("IspopupOpen"))

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
  ]

  const sortedData = sampleData
    .slice()
    .sort((a, b) => b.amountDue - a.amountDue)
    .slice(0, 10)

  const totalAmountDue = sampleData.reduce(
    (total, item) => total + item.amountDue,
    0
  )

  const [chartData, setChartData] = useState([
    { label: "Total Amount Due", value: totalAmountDue },
  ])

  const chartDataAgewise = sampleData.map((item, index) => ({
    label: item.city,
    value: item.amountDue,
    backgroundColor: getRandomColor(index),
  }))

  const chartDataTop10debtors = sortedData.map(item => ({
    label: item.name,
    value: item.amountDue,
    backgroundColor: getRandomColor(),
  }))

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
  }, [chartRef, chartData, activeChart])
  //Debtors age wise
  useEffect(() => {
    if (chartRef2.current) {
      const ctx = chartRef2.current.getContext("2d")

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartDataAgewise.map(item => item.label),
          datasets: [
            {
              data: chartDataAgewise.map(item => item.value),
              backgroundColor: chartDataAgewise.map(
                item => item.backgroundColor
              ),
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
  }, [chartRef2, chartDataAgewise])
  //Debtors Top 10 debtors
  useEffect(() => {
    if (chartRef3.current) {
      const ctx = chartRef3.current.getContext("2d")

      // Calculate the total amount for the center text
      const totalAmount = chartDataTop10debtors.reduce(
        (total, item) => total + item.value,
        0
      )

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartDataTop10debtors.map(item => item.label),
          datasets: [
            {
              data: chartDataTop10debtors.map(item => item.value),
              backgroundColor: chartDataTop10debtors.map(
                item => item.backgroundColor
              ),
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
      })
    }
  }, [chartRef3, chartDataTop10debtors])
  //days count for debtors
  useEffect(() => {
    if (chartRef4.current) {
      const ctx = chartRef4.current.getContext("2d")

      // Define the bins for days
      const bins = [
        { label: "0-15 days", minDays: 0, maxDays: 15 },
        { label: "16-30 days", minDays: 16, maxDays: 30 },
        { label: "31-45 days", minDays: 31, maxDays: 45 },
        // Add more bins as needed
      ]

      // Initialize an array to store the total amounts for each bin
      const binAmounts = new Array(bins.length).fill(0)

      // Group the data into bins and calculate total amounts
      sampleData.forEach(item => {
        const daysCount = item.daysCount
        for (let i = 0; i < bins.length; i++) {
          if (daysCount >= bins[i].minDays && daysCount <= bins[i].maxDays) {
            binAmounts[i] += item.amountDue
            break // Stop checking other bins once the bin is found
          }
        }
      })

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: bins.map(bin => bin.label),
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
      })
    }
  }, [chartRef4, sampleData])

  const handleChartChange = chartType => {
    setActiveChart(chartType)
  }

  function getRandomColor(index) {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  document.title = "Dashboard | Bafana"

  return (
    <Col md="6">
      <Card>
        <div className="card-header display-6 fw-bold">Debtors</div>
        <CardBody>
          <div
            className="btn-group float-right mb-5"
            role="group"
            aria-label="Chart Type Buttons"
          >
            <button
              type="button"
              className={`btn btn-secondary ${activeChart === "totalDebtors" ? "active" : ""
                }`}
              onClick={() => handleChartChange("totalDebtors")}
            >
              Total Debts
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${activeChart === "citywise" ? "active" : ""
                }`}
              onClick={() => handleChartChange("citywise")}
            >
              City Wise
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${activeChart === "top10Debtors" ? "active" : ""
                }`}
              onClick={() => handleChartChange("top10Debtors")}
            >
              Top Debtors
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${activeChart === "daysWise" ? "active" : ""
                }`}
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
  )
}
