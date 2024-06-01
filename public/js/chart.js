// Arrays to hold data
var profit = [];
var profitLabels = []; // Array to hold dates

var hotelCounts = [];
var hotelLabels = []; // Array to hold hotel names

// Function to fetch data using AJAX
function getDummyData(selectedYearMonth) {
  return $.ajax({
    type: "GET",
    url: `http://localhost:3030/api/v1/booking`,
    success: (data) => {
      let profitByDate = {};
      let hotelBookingCounts = {};

      data.forEach((booking) => {
        // Extract profit by date
        let date = booking.createdAt.split("T")[0]; // Extract only the date part
        let yearMonth = date.slice(0, 7); // Extract year and month part (e.g., 2023-01)
        let totalPrice = booking.total_price;
        let calculatedProfit = totalPrice * 0.05; // 5% of total_price
        if (yearMonth === selectedYearMonth) {
          if (profitByDate[date]) {
            profitByDate[date] += calculatedProfit;
          } else {
            profitByDate[date] = calculatedProfit;
          }

          // Count bookings by hotel
          if (booking.Hotel && booking.Hotel.name) {
            let hotelName = booking.Hotel.name;
            if (hotelBookingCounts[hotelName]) {
              hotelBookingCounts[hotelName] += 1;
            } else {
              hotelBookingCounts[hotelName] = 1;
            }
          }
        }
      });

      // Populate profit data
      profit = [];
      profitLabels = [];
      for (let date in profitByDate) {
        profitLabels.push(date);
        profit.push(profitByDate[date]);
      }

      // Populate hotel booking count data
      hotelCounts = [];
      hotelLabels = [];
      for (let hotel in hotelBookingCounts) {
        hotelLabels.push(hotel);
        hotelCounts.push(hotelBookingCounts[hotel]);
      }
    },
    error: (error) => {
      console.error("Error fetching data:", error);
    },
  });
}
console.log(profit);
console.log(profitLabels);

// Function to create the profit chart
function createProfitChart() {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line", // The type of chart we want to create
    data: {
      labels: profitLabels,
      datasets: [
        {
          label: "Profit",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          borderColor: "blue",
          data: profit,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Profit",
          },
        },
      },
      tooltips: {
        mode: "index",
      },
    },
  });
}

// Function to create the hotel booking count chart as a pie chart
function createHotelBookingChart() {
  const ctx = document.getElementById("hotelChart").getContext("2d");

  new Chart(ctx, {
    type: "pie", // Change the type of chart to 'pie'
    data: {
      labels: hotelLabels,
      datasets: [
        {
          label: "Number of Bookings",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          data: hotelCounts,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label += context.parsed;
              }
              return label;
            },
          },
        },
      },
    },
  });
}

// Function to initialize charts
async function initializeCharts() {
  const selectedYearMonth = document.getElementById("monthPicker").value;
  await getDummyData(selectedYearMonth);
  createProfitChart();
  createHotelBookingChart();
}

// Function to set the default value of the month picker to the current month
function setDefaultMonth() {
  const monthPicker = document.getElementById("monthPicker");
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1 and pad with zero
  monthPicker.value = `${year}-${month}`;
}

// Set the default month and initialize the charts when the page loads
document.addEventListener("DOMContentLoaded", () => {
  setDefaultMonth();
  initializeCharts();
});

// Event listener for the month picker
document
  .getElementById("monthPicker")
  .addEventListener("change", initializeCharts);

var canvas = document.querySelector("#hotelChart");
var heightRatio = 1.5;

function adjustCanvasHeight() {
  canvas.height = canvas.width * heightRatio;
}

// Initial adjustment
adjustCanvasHeight();

// Adjust canvas height on window resize
window.addEventListener("resize", adjustCanvasHeight);
