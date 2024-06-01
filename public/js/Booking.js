$(document).ready(function () {
  // Hàm để render lại trang sau khi nhận dữ liệu mới từ server
  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/booking",
      method: "GET",
      success: function (data) {
        console.log(data);
        var tableHtml = "";
        data.forEach(function (booking, index) {
          // Tạo HTML cho từng hàng trong bảng
          tableHtml += "<tr>";
          tableHtml += '<td class="col1">' + booking.id + "</td>";
          tableHtml += '<td class="col2">' + booking.room_id + "</td>";
          tableHtml += '<td class="col1">' + booking.full_name + "</td>";
          tableHtml += '<td class="col2">' + booking.user_id + "</td>";
          tableHtml += '<td class="col2">' + booking.total_price + "</td>";
          if (booking.status)
            tableHtml += '<td class="col1">' + "Đã thanh toán" + "</td>";
          else tableHtml += '<td class="col1">' + "Chưa thanh toán" + "</td>";

          tableHtml +=
            '<td class="col1">' + booking.check_in_date.slice(0, 10) + "</td>";
          tableHtml +=
            '<td class="col1">' + booking.check_out_date.slice(0, 10) + "</td>";
          tableHtml += '<td class="col1">' + booking.special_requests + "</td>";
          tableHtml += "<td>";

          // Thêm button Chỉnh sửa

          // Thêm button Xóa và lưu ID của khách sạn trong thuộc tính data-id của icon
          tableHtml +=
            '<button type="button" class="deleteBooking" value="' +
            booking.id +
            '">Xóa</button>';

          tableHtml += "</td>";
          tableHtml += "</tr>";
        });
        // Render dữ liệu vào bảng
        $(".booking-table table tbody").html(tableHtml);
        console.log("Đang render page");
      },
      error: function (xhr, status, error) {
        console.error(error);
        console.log("Lỗi khi render page booking");
      },
    });
  }

  renderPage();

  // Sự kiện khi click vào nút "Thêm"
  $(".booking-search-create").click(function () {
    window.location.href = `/booking/addHotel`;
  });
  $(document).on("click", ".ManageService", function () {
    // Handle edit functionality here
    var id = $(this).val();
    localStorage.setItem("hotelId", id);
    window.location.href = `/booking/hotel/Service`;
  });

  // Sự kiện khi click vào nút "Đóng" trong popup
  $(".custom-close-btn").click(function () {
    $(".custom-popup-overlay").hide();
    $(".custom-popup").hide();
  });

  // Sự kiện khi click vào nút "Đóng" trong popup thông báo xóa
  $(".close-btn1").click(function () {
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });

  // Sự kiện khi click vào nút "Xóa"
  $(document).on("click", ".deleteBooking", function () {
    let id = $(this).val();

    // Hiển thị hộp thoại xác nhận xóa
    $(".popup-overlay-delete").show();
    $(".popup-delete").show();

    // Lưu ID người dùng vào một thuộc tính data để sử dụng sau này
    $(".popup-delete").attr("data-id", id);
  });

  // Sự kiện khi người dùng xác nhận xóa
  $(".confirm-delete").click(function () {
    // Lấy ID người dùng từ thuộc tính data
    let id = $(".popup-delete").attr("data-id");
    console.log("id booking", id);

    // Gửi yêu cầu xóa người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/booking/${id}`,
      method: "DELETE",
      success: function (data) {
        // Xử lý thành công
        $(".popup-overlay-delete").hide();
        $(".popup-delete").hide();

        // Gọi lại hàm renderPage để cập nhật trang
        renderPage();
      },
      error: function (error) {
        // Xử lý lỗi
        console.log("Đã xảy ra lỗi khi xóa booking:", error);
      },
    });
  });

  // Sự kiện khi người dùng hủy việc xóa
  $(".cancel-delete").click(function () {
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });

  $(".dkbutton").on("click", function () {
    var name = $("#name").val();
    var star = $("#star").val();
    var map = $("#map").val();
    var TypeHotel = $("#TypeHotel").val();
    var cost = $("#cost").val();
    var payment = $("#payment").val();
    var fileInput = document.querySelector("input[type='file']");
    var files = fileInput.files; // Danh sách các file đã chọn

    var formData = new FormData();
    formData.append("name", name);
    formData.append("star", star);
    formData.append("map", map);
    formData.append("TypeHotel", TypeHotel);
    formData.append("cost", cost);
    formData.append("payment", payment);

    // Lặp qua từng file đã chọn và thêm vào formData
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append("hotel", file); // Sử dụng '[]' để gửi dưới dạng mảng trên máy chủ
    }

    // Gửi yêu cầu thêm khách sạn với các files ảnh
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels`,
      method: "POST",
      processData: false, // Ngăn jQuery xử lý dữ liệu
      contentType: false, // Ngăn jQuery đặt loại nội dung
      data: formData,
      success: function (data) {
        renderPage();
        console.log("Khách sạn đã được tạo.");
        alert("Thành công!");
        window.location.href = `/booking`;
      },
      error: function (error) {
        // Xử lý lỗi
        console.log("Đã xảy ra lỗi khi tạo khách sạn:", error);
      },
    });
  });

  // Sự kiện khi click vào nút "Sửa"
  $(document).on("click", ".updatehotel", function () {
    var id = $(this).val();
    console.log("id:", id);

    // Display the popup overlay
    $(".popup-overlay").show();

    // Send request to fetch booking details
    $.ajax({
      url: `http://localhost:3030/api/v1/booking/${id}`,
      method: "GET",
      success: function (data) {
        console.log(data);
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          return `${year}-${month}-${day}`;
        };

        const checkInDate = formatDate(data.check_in_date);
        const checkOutDate = formatDate(data.check_out_date);

        // Populate the popup overlay with the booking details form
        $(".popup-overlay").html(`
          <div class="popup"> 
            <span class="close-btn">&times;</span> 
            <h2>Chỉnh sửa đơn đặt phòng</h2> 
            <form id="updateForm"> 
 
                <input type="text" id="roomId" name="roomId" value="${data.room_id}" required>


                <input type="text" id="fullName" name="fullName" value="${data.full_name}" required>
                <input type="text" id="userId" name="userId" value="${data.user_id}" required>

                <input type="text" id="price" name="price" value="${data.total_price}" required>
                <input type="text" id="status" name="status" value="${data.status}" required>
                <input type="text" id="checkInDate" name="checkInDate" value="${checkInDate}" required>
                <input type="text" id="checkOutDate" name="checkOutDate" value="${checkOutDate}" required>
                <input type="text" id="specialRequests" name="specialRequests" value="${data.special_requests}" required>
              <div class="ebutton"> 
         
                <input type="submit" value="Cập nhật"> 
              </div> 
            </form> 
          </div>`);

        // Handle form submission for updating booking
        $(".ebutton").click(function () {
          console.log("ok");
          if (1) return;

          // Gather updated data from form fields
          const roomId = $("#roomId").val();
          const fullName = $("#fullName").val();
          const userId = $("#userId").val();
          const price = $("#price").val();
          const status = $("#status").val();
          const checkInDate = $("#checkInDate").val();
          const checkOutDate = $("#checkOutDate").val();
          const specialRequests = $("#specialRequests").val();

          // Make AJAX request to update booking
          $.ajax({
            url: `http://localhost:3030/api/v1/booking/${id}`,
            method: "PUT",
            data: {
              room_id: roomId,
              full_name: fullName,
              user_id: userId,
              total_price: price,
              status: status,
              check_in_date: checkInDate,
              check_out_date: checkOutDate,
              special_requests: specialRequests,
            },
            success: function (updatedData) {
              console.log("Booking updated successfully:", updatedData);
              // Refresh the page after successful update
              renderPage(); // Assuming renderPage() function exists to refresh booking data
              $(".popup-overlay").hide();
            },
            error: function (error) {
              console.log("Error updating booking:", error);
              // Handle error scenarios appropriately
            },
          });
        });

        // Close popup when close button is clicked
        $(".close-btn").click(function () {
          $(".popup-overlay").hide();
        });
      },
      error: function (error) {
        console.log("Error fetching booking details:", error);
        // Handle error scenarios appropriately
      },
    });
  });
  $(".close-btn").click(function () {
    $("#imagePopupOverlay").hide();
  });
});
