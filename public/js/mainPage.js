// Function to toggle collapse and button styles

function toggleCollapse(btnNumber) {
  const buttons = document.querySelectorAll(".btn-outline-info");
  buttons.forEach((button, index) => {
    if (index + 1 === btnNumber) {
      button.classList.add("active");
      button.style.color = "#fff"; // White text color
      button.style.backgroundColor = "#10294D"; // Blue background color
    } else {
      button.classList.remove("active");
      button.style.color = "#10294D"; // Blue text color
      button.style.backgroundColor = "#f0f2f5"; // White background color
    }
  });

  for (let i = 1; i <= 3; i++) {
    const collapseId = "noi-dung-collapse" + i;
    const collapseElement = document.getElementById(collapseId);
    if (i === btnNumber) {
      collapseElement.classList.add("show");
    } else {
      collapseElement.classList.remove("show");
    }
  }
}

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

toggleBtn.addEventListener("click", function () {
  // Kiểm tra trạng thái hiện tại của dropdown menu
  const isOpen = dropDownMenu.style.display === "block";

  // Nếu dropdown menu đang ẩn, hiển thị nó và chuyển đổi biểu tượng
  if (!isOpen) {
    dropDownMenu.style.display = "block";
    toggleBtnIcon.classList.add("fa-xmark");
    toggleBtnIcon.classList.remove("fa-bars");
  } else {
    // Nếu dropdown menu đang hiển thị, ẩn nó và chuyển đổi biểu tượng
    dropDownMenu.style.display = "none";
    toggleBtnIcon.classList.remove("fa-xmark");
    toggleBtnIcon.classList.add("fa-bars");
  }
});

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
    url: `http://localhost:3000/api/v1/hotels?map=${encodeURIComponent(
      location
    )}`,
    method: "GET",
    success: function (data) {
      // Cập nhật nội dung trang khách sạn
      localStorage.setItem("hotelData", JSON.stringify(data));
      window.location.href = `http://localhost:3000/hotelList?map=${encodeURIComponent(
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