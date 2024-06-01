$(document).ready(function () {
  function getBookingIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("bookingId");
  }

  // Sử dụng hàm để lấy giá trị bookingId

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const bookingID = getBookingIdFromUrl();

  alert(bookingID);

  let totalP;
  let hotelName;
  // Helper function to extract a query parameter
  $.ajax({
    url: "http://localhost:3030/api/v1/booking/getDetail/" + bookingID,
    method: "GET",
    success: (data) => {
      $("#RoomName").html("Loại phòng" + "<br>" + data.Room.name);
      const checkInDate = new Date(data.check_in_date);
      const checkInDateString = formatDate(checkInDate);
      const checkOutDate = new Date(data.check_out_date);
      const checkOutDateString = formatDate(checkOutDate);
      $("#checkIn").text("Từ: " + checkInDateString);
      $("#checkOut").text("Đến: " + checkOutDateString);
      $("#fullName").text(data.full_name);
      $("#totalPrice").text(numberWithCommas(data.total_price) + " VND");
      $("#hotelName").text(data.Room.Hotel.name);
      $("#email").text(data.User.email);
      $("#numberphone").text(data.User.numberPhone);
      $("#NumberRoom").text(data.quantity);
      totalP = data.total_price;
      hotelName = data.Room.Hotel.name;
    },
  });
  $(".return").click(function () {
    window.location.href = "http://localhost:3030/";
  });
});
