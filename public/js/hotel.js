// hotel.js

$(document).ready(function () {
  // Lấy id khách sạn từ URL
  var url = window.location.pathname;
  var hotelId = url.substring(url.lastIndexOf("/") + 1);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  $.ajax({
    url: "http://localhost:3030/api/v1/hotels/" + hotelId,
    method: "GET",

    success: function (data) {
      // Cập nhật nội dung trang khách sạn
      const formattedCost = numberWithCommas(data.cost);
      const beforeCost = numberWithCommas((data.cost * 120) / 100);

      const amenities = data.HotelAmenities.map((item) => {
        return {
          name: item.Amenity.name,
          class: item.Amenity.class,
        };
      });

      // Tạo HTML cho từng cặp tiện nghi từ dữ liệu khách sạn
      let amenitiesHTML = "";
      for (let i = 0; i < amenities.length; i += 2) {
        const amenity1 = amenities[i];
        const amenity2 = amenities[i + 1];

        let rowHTML = `
          <tr>
            <td><i class="${amenity1.class}"></i><span>${amenity1.name}</span></td>
            <td><i class="${amenity2.class}"></i><span>${amenity2.name}</span></td>
          </tr>
        `;

        amenitiesHTML += rowHTML;
      }

      // Chèn HTML vào trong bảng tiện nghi trong phần của trang web
      $(".col-6.amenties table").append(amenitiesHTML);

      $(".amen table").append(amenitiesHTML);
      $(".row#hotel-details-container").html(`
      <div class="col-7 left-sry">
      <h2>${data.name} </h2>
      <p><i class="fa-solid fa-location-dot"></i> ${data.map}
        <button class="btn" data-bs-toggle="modal" onclick="redirectToMap('${data.name}')" style="color: blue">Xem bản đồ</button>
      </p>
      <p class="intro"><i class="bi bi-buildings-fill"></i>Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại
        khách sạn này, nơi có Wi-Fi miễn phí trong tất cả các phòng.
        <button class="btn" data-bs-toggle="modal" data-bs-target="#introductionModal" style="color: blue">Xem thêm</button>
      </p>

      <!-- Map Modal -->
      <div class="modal fade" id="mapModal" tabindex="-1" aria-labelledby="mapModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="mapModalLabel">Bản đồ</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            </div>
          </div>
        </div>
      </div>

      <!-- Introduction modal -->
      <div class="modal fade" id="introductionModal" tabindex="-1" aria-labelledby="introductionModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="introductionModalLabel">Giới thiệu về khách sạn</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại khách sạn này, nơi có Wi-Fi miễn
              phí trong tất cả các phòng. Nằm ở vị trí trung tâm tại Quận 7 của Hồ Chí Minh, chỗ nghỉ này đặt quý
              khách ở gần các điểm thu hút và tùy chọn ăn uống thú vị. Đừng rời đi trước khi ghé thăm Bảo tàng
              Chứng tích chiến tranh nổi tiếng. Được xếp hạng 4 sao, chỗ nghỉ chất lượng cao này cho phép khách
              nghỉ sử dụng bể bơi ngoài trời và spa ngay trong khuôn viên. </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-5 right-sumary">
      <div class="row">
        <div class="col-3 deleted-price">
          ${beforeCost} VND
        </div>
        <div class="col-4 real-price">
          ${formattedCost} VND
        </div>
        <div class="col-5 select-rooms">
          <button class="btn room">Chọn phòng</button>
        </div>
      </div>
    </div>
    <a href="#" data-bs-toggle="modal" data-bs-target="#imgModal" onclick="showContent('hotel-upload')">
    <div id="detailed-img" class="row detailed-img">
      <table id="img-carousel">

      </table>
    </div>
  </a>

  <div class="modal fade" id="imgModal" tabindex="-1" aria-labelledby="imgModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="imgModalLabel">
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="hotel-upload" class="content">
            <div class="row">
              <div class="col-4">
                <div id="list-hotel-upload" class="list-group">
                  <a class="list-group-item list-group-item-action" href="#feature">Nổi bật</a>
                  <a class="list-group-item list-group-item-action" href="#room">Phòng</a>
                </div>
              </div>
              <div class="col-8">
                <div data-bs-spy="scroll" data-bs-target="#list-hotel-upload" data-bs-smooth-scroll="true"
                  class="scrollspy-example" tabindex="0" style="overflow-x: hidden;">
                  <p id="feature">Nổi bật</p>
                  <div class="row" id="clickHotel">
                    
                  </div>
                    <p id="room">Phòng</p>
                      <div class="row" id="clickRoom">

                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>`);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
});

$(document).ready(() => {
  var url = window.location.pathname;
  var hotelId = url.substring(url.lastIndexOf("/") + 1);
  $.ajax({
    url: "http://localhost:3030/api/v1/reviews?hotelId=" + hotelId,
    method: "GET",
    success: (data) => {
      data.forEach((item, index) => {
        let activeClass = index == 0 ? "active" : "";
        const createdAtDate = new Date(item.createdAt);
        const formattedDate = createdAtDate.toLocaleDateString();
        const card = `<div class="carousel-item ${activeClass}">
          <a href="#">
            <div class="card">
              <div class="card-head">
                <div class="card-avatar">
                  <img src="../img/BecomeSupplier/content01.jpg" alt="...">
                </div>
                <div class="card-info">
                  <h5 class="card-title">${item.guestName}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${formattedDate}</h6>
                </div>
              </div>
              <div class="card-body">
                <p class="card-text">
                  ${item.description}
                </p>
              </div>
            </div>
          </a>
        </div>`;

        $("#carousel-comment").append(card); // Đặt giá trị của #carousel-comment trong dấu ngoặc kép
      });
      if (data.length > 4) {
        $("#carousel-controls").show();
      }
    },
  });
});

$(document).ready(() => {
  var url = window.location.pathname;
  var hotelId = url.substring(url.lastIndexOf("/") + 1);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  $.ajax({
    url: "http://localhost:3030/api/v1/rooms?hotelId=" + hotelId,
    method: "GET",

    success: (data) => {
      data.forEach((item) => {
        const imgFeature = item.UrlImageRooms.map((item1) => {
          return item1.url;
        });

        let imgClickHTML = '<div class="col-6">\n';

        let imgRoom1, imgRoom2, imgRoom3;
        for (let i = 0; i <= 1; i++) {
          const imageURL = imgFeature[i];
          imgClickHTML += `  <img src="${imageURL}" alt="">\n`;
          imgRoom1 = imgFeature[0];
          imgRoom2 = imgFeature[1];
          imgRoom3 = imgFeature[2];
        }

        imgClickHTML += '</div>\n<div class="col-6">\n';

        for (let i = 2; i <= 3; i++) {
          const imageURL = imgFeature[i];
          imgClickHTML += `  <img src="${imageURL}" alt="">\n`;
        }

        imgClickHTML += "</div>\n";

        console.log(imgClickHTML);

        $("#clickRoom").append(imgClickHTML);

        const paymentType = item.Hotel.payment;

        const breakfast = numberWithCommas((item.price * 20) / 100);
        let amenities = "";
        if (item.roomServices && item.roomServices.length > 0) {
          item.roomServices.forEach((service) => {
            amenities += `<div class="item">
            <span class="material-symbols-outlined"> ${service.Amenity.class} </span>
            <span class="baseRoom_baseRoom-facility_title__4PawP">${service.Amenity.name}</span>
          </div>`;
          });
        } else {
          amenities = '<div class="item">No amenities available</div>';
        }

        let peope_num = `<i class="fa-solid fa-user"></i>`.repeat(
          item.quantity_people
        );

        const card = `<div class="select-hotel">
        <div class="container-fluid" id="room-id">
          <h2>${item.name}</h2>
          <div class="row">
            <div style="border-bottom : none" class="col-lg-2 ">
              <div class="baseroom">
              
                <div class="baseroom_img">
               <img src="${imgRoom1}" alt="" style="width: 100%;">
                </div>
                <div class="baseroom_img1">
                  <div class="row no-gutters">
                    <div style="margin : 0; padding : 0 3px 0 10px;" class="col-6"><img
                        src="${imgRoom2}" alt="" style="width: 100% ; height: 70px;">
                    </div>
                    <div style="margin : 0; padding : 0 10px 0 3px;" class="col-6"><img
                        src="${imgRoom3}" alt="" style="width: 100%; height: 70px;">
                    </div>
                  </div>
                </div>
                
                <div class="baseroom_bed">
                  <span class="material-symbols-outlined"> bed </span>
                  <span class="type-bed">1 giường ${item.type_bed}</span>
                </div>
                <div class="baseroom_item">
                ${amenities}


                </div>
              </div>
            </div>
            <div style="padding: 0;" class="col-lg-10  ">
              <div class="container">
                <div class="row" id="optioon">
                  <div id="import1" style="border: none;" class="col-lg-5">Lựa chọn của bạn</div>
                  <div id="import2" style="border: none; text-align : center" class="col-lg-2">Số lượng người</div>
                  <div id="import3" style="border: none; text-align : center" class="col-lg-5">Giá phòng hôm nay</div>
                </div>
                <div class="row">
                  <div class="col-lg-5">
                    <div class="hotel_room">
                      <div class="saleRoom_saleRoomItemBox-reservationNotesInfo_minPriceInfo__GkoVL">Giá tốt nhất
                        ngày!
                      </div>
                      <div class="info">
                        <span>Bữa sáng: VND ${breakfast}</span>
                      </div>
                      <div class="info">
                        <span>Không hoàn tiền</span>
                      </div>
                      <div class="info"><span>Xác nhận nhanh chóng</span></div>
                      <div class="info">
                        <span>Thanh toán ${paymentType} </span>
                      </div>
                      <div class="info"><span>Đặt tối đa ${
                        item.quantity
                      } phòng</span></div>
                      <div class="info" id="songuoi"><span>Có thể ở ${
                        item.quantity_people
                      } người trong một phòng</span></div>

                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="people">
                      ${peope_num}

                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div class="room-price">
                      <p>VND ${numberWithCommas(item.price)}</p>
                      <a href="#" class="btn btn-primary booking" data-room-id="${
                        item.id
                      }">Đặt phòng</a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-5">
                    <div class="hotel_room">
                      <div class="saleRoom_saleRoomItemBox-reservationNotesInfo_premiumInfo__80Cez">Giá tốt nhất bao
                        gồm
                        <span class="saleRoomItemBox-reservationNotesInfo_premiumTitle"
                          style="font-weight: bold;"> bữa sáng
                        </span>
                      </div>
                      <div class="hotel_info">
                        <div class="info">
                          <span>Bao gồm 2 bữa sáng</span>
                        </div>
                        <div class="info">
                          <span>Không hoàn tiền</span>
                        </div>
                        <div class="info">
                          <span>Xác nhận nhanh chóng</span>
                        </div>
                        <div class="info">
                          <span>Thanh toán ${paymentType}</span>
                        </div>
                        <div class="info"><span>Đặt tối đa 2 phòng</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="people">
                      <i class="fa-solid fa-user"></i>
                      <i class="fa-solid fa-user"></i>
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div class="room-price">
                      <p>VND 6,256,742</p>
                      <a href="#" class="btn btn-primary">Đặt phòng</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
        $(".room-booking").append(card);
      });
    },
  });
});

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

  const token = localStorage.getItem("token");
  if (token) {
    $(".send-review").show();
  }

  var url = window.location.pathname;
  var hotelId = url.substring(url.lastIndexOf("/") + 1);
  $.ajax({
    url: "http://localhost:3030/api/v1/hotels/" + hotelId,
    method: "GET",

    success: function (data) {
      const rating = $("#RatingVal");
      rating.text(data.userRating);
      // Kiểm tra nếu không có dữ liệu hoặc không có hình ảnh
      if (!data || !data.UrlImageHotels || data.UrlImageHotels.length === 0) {
        console.log("Không có dữ liệu hoặc không có hình ảnh.");
        return;
      }

      const imgFeature = data.UrlImageHotels.map((item) => {
        return item.url;
      });

      let imgHTML = "<tr>";

      // Lặp qua tối đa 7 ảnh đầu tiên
      for (let i = 0; i < Math.min(4, imgFeature.length); i++) {
        const imageURL = imgFeature[i];
        imgHTML += `
            <td style="width:25%" ${
              i === 0 ? 'rowspan="2" ' : 'class="img-active"'
            }>
                <img src="${imageURL}" alt="">
            </td>
        `;
      }

      imgHTML += "</tr><tr>";

      // Lặp qua các ảnh còn lại
      for (let i = 4; i < Math.min(7, imgFeature.length); i++) {
        const imageURL = imgFeature[i];
        imgHTML += `
            <td style="width:25%" class="img-active">
                <img src="${imageURL}" alt="">
            </td>
        `;
      }

      imgHTML += "</tr>";

      // console.log(imgHTML);

      // Thêm HTML vào bảng
      $("#img-carousel").append(imgHTML);

      let imgClickHTML = '<div class="col-6">\n';

      for (let i = 1; i <= 3; i++) {
        const imageURL = imgFeature[i];
        imgClickHTML += `  <img src="${imageURL}" alt="">\n`;
      }

      imgClickHTML += '</div>\n<div class="col-6">\n';

      for (let i = 4; i <= 6; i++) {
        const imageURL = imgFeature[i];
        imgClickHTML += `  <img src="${imageURL}" alt="">\n`;
      }

      imgClickHTML += "</div>\n";

      // console.log(imgClickHTML);

      $("#clickHotel").append(imgClickHTML);
    },

    error: function (xhr, status, error) {
      console.log("Lỗi khi gửi yêu cầu AJAX:", status, error);
    },
  });
});

$(document).on("click", ".booking", function () {
  var roomId = $(this).data("room-id");
  var url = window.location.pathname;
  var hotelId = url.substring(url.lastIndexOf("/") + 1);
  window.location.href = `http://localhost:3030/payment?hotelId=${hotelId}&roomId=${roomId}`;
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
