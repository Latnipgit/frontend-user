import React, { useEffect, useState, useRef } from "react"
import { Col, Card, CardBody } from "reactstrap"
import Chart from "chart.js"

export const CreditorsGraph = () => {
  const [activeChartCreditors, setActiveChartCreditors] =
    useState("totalCreditors")

  const chartRef1 = useRef(null)
  const chartRefCreditorAgeWise = useRef(null)
  const chartRefCreditorTop10 = useRef(null)
  const chartRefCreditorDaysWise = useRef(null)
  const isPopupOpen = JSON.parse(sessionStorage.getItem("IspopupOpen"))

  const sampleDataCreditors = [
    { city: "New York", name: "Creditor 1", amountOwed: 8000, daysCount: 10 },
    { city: "Los Angeles", name: "Creditor 2", amountOwed: 3500, daysCount: 5 },
    { city: "Chicago", name: "Creditor 3", amountOwed: 6000, daysCount: 15 },
    { city: "Houston", name: "Creditor 4", amountOwed: 2500, daysCount: 20 },
    { city: "Miami", name: "Creditor 5", amountOwed: 4500, daysCount: 8 },
    {
      city: "San Francisco",
      name: "Creditor 6",
      amountOwed: 7000,
      daysCount: 12,
    },
    { city: "Boston", name: "Creditor 7", amountOwed: 5500, daysCount: 7 },
    { city: "Seattle", name: "Creditor 8", amountOwed: 3000, daysCount: 14 },
    { city: "Dallas", name: "Creditor 9", amountOwed: 6500, daysCount: 18 },
    { city: "Atlanta", name: "Creditor 10", amountOwed: 4000, daysCount: 4 },
    {
      city: "Philadelphia",
      name: "Creditor 11",
      amountOwed: 3000,
      daysCount: 10,
    },
    { city: "Phoenix", name: "Creditor 12", amountOwed: 6000, daysCount: 15 },
    { city: "Denver", name: "Creditor 13", amountOwed: 4500, daysCount: 5 },
    {
      city: "Minneapolis",
      name: "Creditor 14",
      amountOwed: 5500,
      daysCount: 20,
    },
    { city: "Portland", name: "Creditor 15", amountOwed: 2500, daysCount: 8 },
    { city: "San Diego", name: "Creditor 16", amountOwed: 3500, daysCount: 12 },
    {
      city: "Washington, D.C.",
      name: "Creditor 17",
      amountOwed: 7000,
      daysCount: 7,
    },
    { city: "Detroit", name: "Creditor 18", amountOwed: 8000, daysCount: 45 },
    { city: "Raleigh", name: "Creditor 19", amountOwed: 4000, daysCount: 40 },
    { city: "Tampa", name: "Creditor 20", amountOwed: 6500, daysCount: 35 },
    // Add more data as needed to reach a total of 20 records
  ]

  const totalAmountDueCreditors = sampleDataCreditors.reduce(
    (total, item) => total + item.amountOwed,
    0
  )

  const sortedDataCreditors = sampleDataCreditors
    .slice()
    .sort((a, b) => b.amountDue - a.amountDue)
    .slice(0, 10)

  const [chartDatacreditors, setChartDatacreditors] = useState([
    { label: "Total Amount deposit", value: totalAmountDueCreditors },
  ])

  const chartDataCreditorAgewise = sampleDataCreditors.map((item, index) => ({
    label: item.city,
    value: item.amountOwed,
    backgroundColor: getRandomColorCreditors(index),
  }))

  const chartDataTop10Creditors = sortedDataCreditors.map(item => ({
    label: item.name,
    value: item.amountOwed,
    backgroundColor: getRandomColorCreditors(),
  }))

  // Creditor Age Wise
  useEffect(() => {
    if (chartRefCreditorAgeWise.current) {
      const ctx = chartRefCreditorAgeWise.current.getContext("2d")

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartDataCreditorAgewise.map(item => item.label),
          datasets: [
            {
              data: chartDataCreditorAgewise.map(item => item.value),
              backgroundColor: chartDataCreditorAgewise.map(
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
  }, [chartRefCreditorAgeWise, chartDataCreditorAgewise])

  // Creditor Top 10 Creditors
  useEffect(() => {
    if (chartRefCreditorTop10.current) {
      const ctx = chartRefCreditorTop10.current.getContext("2d")

      // Calculate the total amount for the center text
      const totalAmount = chartDataTop10Creditors.reduce(
        (total, item) => total + item.value,
        0
      )

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartDataTop10Creditors.map(item => item.label),
          datasets: [
            {
              data: chartDataTop10Creditors.map(item => item.value),
              backgroundColor: chartDataTop10Creditors.map(
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
      })
    }
  }, [chartRefCreditorTop10, chartDataTop10Creditors])

  // Creditor Days Count
  useEffect(() => {
    if (chartRefCreditorDaysWise.current) {
      const ctx = chartRefCreditorDaysWise.current.getContext("2d")

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
      sampleDataCreditors.forEach(item => {
        const daysCount = item.daysCount
        for (let i = 0; i < bins.length; i++) {
          if (daysCount >= bins[i].minDays && daysCount <= bins[i].maxDays) {
            binAmounts[i] += item.amountOwed
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
              backgroundColor: bins.map((bin, index) =>
                getRandomColorCreditors(index)
              ),
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
      })
    }
  }, [chartRefCreditorDaysWise, sampleDataCreditors])

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
        sessionStorage.setItem("IspopupOpen", JSON.stringify(false))
      }, 500)
    }
  }, [])

  const handleChartCreditorsChange = chartType => {
    setActiveChartCreditors(chartType)
  }

  function getRandomColorCreditors(index) {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
  document.title = "Dashboard | Bafana"

  return (
    <Col md="6">
      <Card>
        <div className="card-header display-6 fw-bold">Creditors</div>

        <CardBody>
          <div
            className="btn-group float-right mb-5"
            role="group"
            aria-label="Chart Type Buttons"
          >
            <button
              type="button"
              className={`btn btn-secondary ${activeChartCreditors === "totalCreditors" ? "active" : ""
                }`}
              onClick={() => handleChartCreditorsChange("totalCreditors")}
            >
              Total Credits
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${activeChartCreditors === "citywise" ? "active" : ""
                }`}
              onClick={() => handleChartCreditorsChange("citywise")}
            >
              City Wise
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${activeChartCreditors === "top10Debtors" ? "active" : ""
                }`}
              onClick={() => handleChartCreditorsChange("top10Debtors")}
            >
              Top Creditors
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${activeChartCreditors === "daysWise" ? "active" : ""
                }`}
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
  )
}
