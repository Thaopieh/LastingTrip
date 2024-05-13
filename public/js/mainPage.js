// Function to toggle collapse and button styles

// loading hotel data

$(document).ready(function () {
  // Xử lý sự kiện khi người dùng nhấp vào một liên kết khách sạn
  $(".hotel-link").click(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

    // Lấy href của liên kết
    var href = $(this).attr("href");

    // Lấy id khách sạn từ href
    var hotelId = href.split("/").pop();

    // Chuyển hướng đến trang khách sạn và truyền id khách sạn qua URL
    window.location.href = "/hotel/" + hotelId;
  });
});

const findhotel = () => {
  // Lấy giá trị của ô input có id là "hotel-destination"
  var location = $("#hotel-destination").val();

  // Gửi yêu cầu Axios tới API để tìm khách sạn với địa điểm đã nhập
  $.ajax({
    url: `http://localhost:3030/api/v1/hotels?map=${encodeURIComponent(
      location
    )}`,
    method: "GET",
    success: function (data) {
      // Cập nhật nội dung trang khách sạn
      localStorage.setItem("hotelData", JSON.stringify(data));
      window.location.href = `http://localhost:3030/hotelList?map=${encodeURIComponent(
        location
      )}`;
    },
  });
};
// Gắn sự kiện click cho nút có id là "search-btn"
$("#search-hotel").on("click", function () {
  console.log("successfull");
  // Gọi hàm findhotel() khi nút được nhấp
  findhotel();
});
localStorage.removeItem("searchData");
