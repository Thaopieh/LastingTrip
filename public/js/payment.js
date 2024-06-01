$(document).ready(function () {
  // Helper function to extract a query parameter
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    var value = decodeURIComponent(results[2].replace(/\+/g, " "));
    var intValue = parseInt(value, 10);
    return isNaN(intValue) ? value : intValue;
  }

  function getNumberOfNights(checkIn, checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffInDays = Math.round(diffInTime / millisecondsPerDay);
    return diffInDays + 1;
  }

  const data = localStorage.getItem("searchData");
  let numberOfNights = 1;
  let numberOfRooms = 1;
  let numberOfChildren;
  let totalPrice = 0;
  let newTotalPrice = 0;

  if (data) {
    var hotelData = JSON.parse(data);
    $("#checkIn").text("Từ: " + hotelData.checkInDate);
    $("#checkOut").text("Đến: " + hotelData.checkOutDate);
    $("#manyRooms").text(hotelData.numberOfRooms);
    numberOfNights = getNumberOfNights(
      hotelData.checkInDate,
      hotelData.checkOutDate
    );
    numberOfRooms = hotelData.numberOfRooms;
    numberOfChildren = hotelData.numberOfChildren || 0;
  } else {
    console.log("No data found in Local Storage");
  }
  let all = numberOfNights * numberOfRooms;
  var hotelId = getParameterByName("hotelId");
  var roomId = getParameterByName("roomId");

  $.ajax({
    url: "http://localhost:3030/api/v1/hotels/" + hotelId,
    method: "GET",
    success: (data) => {
      $("#hotelName").text(data.name);
    },
  });

  // AJAX call to fetch hotel and room data
  $.ajax({
    url: "http://localhost:3030/api/v1/rooms/" + roomId,
    method: "GET",
    success: (data) => {
      const discountRate = 0.1 * numberOfChildren;
      const discountedPrice = Math.ceil(data.price * (1 - discountRate));
      totalPrice = discountedPrice * all;
      newTotalPrice = totalPrice;
      $("#totalPrice").text(numberWithCommas(totalPrice) + " VND");
      $("#Price").text(numberWithCommas(data.price) + " VND");
    },
  });

  function updateTotalPrice(discountPercent) {
    const discountAmount = totalPrice * (discountPercent / 100);
    newTotalPrice = totalPrice - discountAmount;
    $("#totalPrice").text(numberWithCommas(newTotalPrice.toFixed(2)) + " VND");
  }

  // Event listener for the apply button click event
  $("#applyCoupon").click(function () {
    const couponCode = $("#Coupon").val();
    if (couponCode) {
      $.ajax({
        url: "http://localhost:3030/api/v1/coupon/getByCode/" + couponCode,
        method: "GET",
        success: function (coupon) {
          if (coupon && coupon.percent) {
            updateTotalPrice(coupon.percent);
          } else {
            alert("Mã giảm giá không hợp lệ.");
          }
        },
        error: function () {
          alert("Không thể xác thực mã giảm giá.");
        },
      });
    } else {
      alert("Vui lòng nhập mã giảm giá.");
    }
  });

  const userID = localStorage.getItem("id");
  $.ajax({
    url: "http://localhost:3030/api/v1/users/getDetailUser/" + userID, // Endpoint to fetch user data
    method: "GET",
    success: (data) => {
      if (data) {
        $("#phoneNumber").val(data.numberPhone); // Phone number in placeholder if empty
        $("#emailAddress").val(data.email); // Adjusted the name attribute in HTML to `email`
      }
    },
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function validateAndSendBookingRequest() {
    if (
      $("#fname").val() === "" ||
      $("#phoneNumber").val() === "" ||
      $("#emailAddress").val() === "" ||
      $("#yearOfBirth").val() === "" ||
      $("#cccd").val() === "" ||
      $("#address").val() === "" ||
      !roomId ||
      !userID ||
      !hotelData.checkInDate ||
      !hotelData.checkOutDate ||
      !newTotalPrice
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    var data = {
      room_id: roomId,
      user_id: userID,
      hotel_id: hotelId,
      check_in_date: hotelData.checkInDate,
      check_out_date: hotelData.checkOutDate,
      total_price: newTotalPrice, // Use newTotalPrice here
      full_name: $("#fname").val(),
      special_requests: $("#specialRequest").val(),
      quantity: numberOfRooms,
      status: false,
    };
    console.log(data);

    $.ajax({
      url: "http://localhost:3030/api/v1/booking/",
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (response) {
        var bookingId = response.id;
        var paymentMethod = $("input[name='dbt']:checked").val();
        console.log(response);

        if (paymentMethod === "dbt") {
          window.location.href = `http://localhost:3030/paymentmethod?bookingId=${bookingId}`;
        } else if (paymentMethod === "cd") {
          window.location.href = `http://localhost:3030/resultTT?bookingId=${bookingId}`;
        } else {
          alert("Vui lòng chọn phương thức thanh toán!");
        }
      },
      error: function (err) {
        console.log("Thanh toán thất bại", err);
      },
    });
  }

  $("#Order1").click(validateAndSendBookingRequest);
  $("#Order").click(validateAndSendBookingRequest);

  $(".return").click(function () {
    window.location.href = "http://localhost:3030/";
  });
  $(".confirm").click(function () {
    console.log(200);
    $(".Yorder").hide();
    $("form").show();
  });
});
