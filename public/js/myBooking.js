$(document).ready(function () {
  let userId = localStorage.getItem("id");
  // Lấy userId từ local storage hoặc từ nguồn dữ liệu khác
  if (userId) {
    fetchUserBookings(userId);
  } else {
    console.error("User ID not found in local storage.");
  }

  // Hàm gửi yêu cầu AJAX để lấy thông tin booking của người dùng
  function fetchUserBookings(userId) {
    $.ajax({
      url: `http://localhost:3030/api/v1/booking?user_id=` + userId, // Đường dẫn tới API hoặc endpoint để lấy thông tin booking
      type: "GET", // Loại yêu cầu là GET
      contentType: "application/json",
      success: function (data) {
        renderBookings(data);
      },
      error: function (xhr, status, error) {
        // Xử lý lỗi khi yêu cầu không thành công

        console.error("Error fetching user bookings:", error);
      },
    });
  }
  // Hàm render thông tin booking
  function renderBookings(bookings) {
    if (bookings.length === 0) {
      console.log(userId);
      // Nếu không có booking, hiển thị thông báo
      $(".online-empty-container").html(`
                <div class="empty-image-con"></div>
                <div class="empty-content-con">
                    <div class="empty-title">Bạn không có bất kỳ đặt chỗ nào hoặc chúng tôi không thể truy cập
                        các đặt chỗ của bạn vào lúc này. Bạn có thể tìm kiếm các đặt phòng bạn đã thực hiện với
                        tư cách là khách trong năm qua bằng địa chỉ email của mình.</div>
                </div>
            `);
      $(".online-empty-container").show();
      return;
    }

    // Nếu có booking, hiển thị thông tin mỗi booking
    bookings.forEach(function (booking) {
      const room = booking.Room;
      const hotel = booking.Hotels;
      const checkInDateString = booking.check_in_date;
      const checkOutDateString = booking.check_out_date;

      // Chuyển đổi chuỗi thành đối tượng ngày
      const checkInDateObject = new Date(checkInDateString);
      const checkOutDateObject = new Date(checkOutDateString);

      // Lấy ngày, tháng và năm từ đối tượng ngày
      const checkInDay = checkInDateObject.getDate();
      const checkInMonth = checkInDateObject.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
      const checkInYear = checkInDateObject.getFullYear();

      const checkOutDay = checkOutDateObject.getDate();
      const checkOutMonth = checkOutDateObject.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
      const checkOutYear = checkOutDateObject.getFullYear();

      // Tạo chuỗi ngày tháng thông thường
      const formattedCheckInDate = `${checkInDay}/${checkInMonth}/${checkInYear}`;
      const formattedCheckOutDate = `${checkOutDay}/${checkOutMonth}/${checkOutYear}`;
      // Xây dựng HTML cho mỗi booking
      const html = `
                <div class="row img-adjust g-0">
                    
                    <div class="col-md-8 content">
                        <div class="card-body">
                            <div class="head-title">
                                <h5 class="card-title">
                                    <a href="/hotel/${
                                      room.id
                                    }" class="hotel-link">${room.name}</a>
                                </h5>
                                <div class="card-describle">
                                    <p>Ngày nhận phòng:${formattedCheckInDate}  </p>
                                    <p> Ngày trả phòng:${formattedCheckOutDate}</p>
                                    <p>Loại phòng:${room.type_bed}</p>
                                </div>
                            </div>
                            <div class="room-type">
                            Yêu cầu đặc biệt: ${
                              booking.special_requests
                                ? booking.special_requests
                                : ""
                            }
                            <div class="room-type-price">
                              
                                <div class="room-price">
                                    <p>VND ${booking.total_price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      // Thêm HTML vào container
      $(".booking-container").append(html);
    });
  }
});
