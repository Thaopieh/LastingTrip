// Arrays to hold data
var profit = [];
var profitLabels = []; // Array to hold dates

var hotelCounts = [];
var hotelLabels = []; // Array to hold hotel names

// Function to fetch data using AJAX
function getDummyData() {
    return $.ajax({
        type: "GET",
        url: "http://localhost:3030/api/v1/booking/",
        success: (data) => {
            let profitByDate = {};
            let hotelBookingCounts = {};

            data.forEach(booking => {
                // Extract profit by date
                let date = booking.createdAt.split('T')[0]; // Extract only the date part
                let totalPrice = booking.total_price;
                let calculatedProfit = totalPrice * 0.05; // 5% of total_price
                console.log(totalPrice, calculatedProfit);
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
            });

            // Populate profit data
            for (let date in profitByDate) {
                profitLabels.push(date);
                profit.push(profitByDate[date]);
            }

            // Populate hotel booking count data
            for (let hotel in hotelBookingCounts) {
                hotelLabels.push(hotel);
                hotelCounts.push(hotelBookingCounts[hotel]);
            }
        },
        error: (error) => {
            console.error('Error fetching data:', error);
        }
    });
}

// Function to create the profit chart
async function dummyChart() {
    await getDummyData();

    const ctx = document.getElementById('myChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line', // The type of chart we want to create
        data: {
            labels: profitLabels,
            datasets: [
                {
                    label: 'Profit',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderColor: 'blue',
                    data: profit,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Profit'
                    }
                }
            },
            tooltips: {
                mode: 'index'
            }
        }
    });
}

// Function to create the hotel booking count chart
async function hotelBookingChart() {
    await getDummyData();

    const ctx = document.getElementById('hotelChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar', // The type of chart we want to create
        data: {
            labels: hotelLabels,
            datasets: [
                {
                    label: 'Number of Bookings',
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'green',
                    data: hotelCounts,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Hotel'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Bookings'
                    },
                    min: 0, // Ensure y-axis begins at 0
                    stepSize: 1, // Ensure y-axis only displays integers
                    ticks: {
                        callback: function(value) {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                            return null;
                        },
                        maxTicksLimit: 10 // Limit the number of ticks on y-axis
                    }
                }
            },
            tooltips: {
                mode: 'index'
            }
        }
    });
}

// Call the functions to create the charts
dummyChart();
hotelBookingChart();
