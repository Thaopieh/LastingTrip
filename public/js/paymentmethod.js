$(document).ready(function () {
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const bookingID = getParameterByName("bookingId");
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
      totalP = data.total_price;
      hotelName = data.Room.Hotel.name;
    },
  });
  var requestData = {
    tmn_code: "DJ863C7C",
  };

  // Chuyển đổi đối tượng thành chuỗi query string
  var formData = $.param(requestData);

  // Gửi POST request đến endpoint API
  $.ajax({
    url: "https://sandbox.vnpayment.vn/qrpayauth/api/merchant/get_bank_list",
    type: "POST",
    contentType: "application/x-www-form-urlencoded",
    data: formData,
    success: (response) => {
      // Xử lý phản hồi thành công từ API và hiển thị dữ liệu lên trang web
      for (let i = 0; i < Math.min(response.length, 16); i++) {
        if(i==13) {i++};
        const bank = response[i];
        var bankElement = `<div class="bankItem">`;
        var logoLink = bank.logo_link.replace(
          "~",
          "https://sandbox.vnpayment.vn"
        );
        bankElement += `<input type="radio" name="bank" value="${bank.bank_code}" id="${bank.bank_code}">`;
        bankElement += `<label for="${bank.bank_code}">`;
        bankElement += `<img src="${logoLink}" alt="${bank.bank_name}" style="width: 100px; height: auto;">`;
        bankElement += `<p>${bank.bank_name}</p>`;
        bankElement += `</label></div>`;
        $("#bankList").append(bankElement);
      }
    },
    error: function (xhr, status, error) {
      // Xử lý lỗi khi gửi yêu cầu đến API
      console.error(error);
      $("#bankList").html("<p>Đã xảy ra lỗi khi lấy danh sách ngân hàng.</p>");
    },
  });

  $("#placeOrderButton").click(function () {
    // Gọi API khi nhấn nút "Place Order"
    var data = {
      orderId: bookingID,
      amount: totalP,
      orderInfo: `trả tiền ${hotelName}`,
      orderType: "OnlinePayment",
      bankCode: $("input[name='bank']:checked").val(),
    };
    console.log(data);

    $.ajax({
        url: "http://localhost:3030/api/v1/vnpay/create-vnpay-url",
        method: "POST",
        data: JSON.stringify(data), // Send data as JSON string
        contentType: "application/json",
        success: function (response) {
          // Chuyển hướng trang web tới URL nhận được từ API
           window.location.href = response.data.url;
          console.log(response.data.url);
        },
        error: function (xhr, status, error) {
          // Xử lý lỗi khi gọi API
          console.error("API call failed:", error);
        // Hiển thị thông báo lỗi cho người dùng nếu cần thiết
      },
    });
  });
});
