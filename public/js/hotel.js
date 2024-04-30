// hotel.js

$(document).ready(function () {
  // Lấy id khách sạn từ URL
  var url = window.location.pathname;
  var hotelId = url.substring(url.lastIndexOf("/") + 1);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  $.ajax({
    url: "http://localhost:3000/api/v1/hotels/" + hotelId,
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
        <button class="btn" data-bs-toggle="modal" data-bs-target="#mapModal" style="color: blue">Xem bản đồ</button>
      </p>
      <p><i class="bi bi-buildings-fill"></i>Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.${data.embedMap}!5m2!1sen!2s"
                width="450" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
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
      <table>
        <tr>
          <td rowspan="2" style="width:25%">
            <img src="/image/min_item/feature-img/feature-img-1.jpg" alt="">
          </td>
          <td style="width:25%">
            <img src="/image/min_item/feature-img/feature-img-2.jpg" alt="">
          </td>
          <td style="width:25%">
            <img src="/image/min_item/feature-img/feature-img-3.jpg" alt="">
          </td>
          <td style="width:25%">
            <img src="/image/min_item/feature-img/feature-img-4.jpg" alt="">
          </td>
        </tr>
        <tr>
          <td> <img src="/image/min_item/feature-img/feature-img-5.jpg" alt="">
          </td>
          <td> <img src="/image/min_item/feature-img/feature-img-6.jpg" alt="">
          </td>
          <td> <img src="/image/min_item/feature-img/feature-img-7.jpg" alt="">
          </td>
        </tr>
      </table>
    </div>
  </a>

  <div class="modal fade" id="imgModal" tabindex="-1" aria-labelledby="imgModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="imgModalLabel">
            <div class="tabs">
              <button class="btn" onclick="showContent('hotel-upload')">Khách sạn đăng tải</button>
              <button class="btn" onclick="showContent('user-upload')">Khách hàng đăng tải</button>
            </div>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="hotel-upload" class="content">
            <div class="row">
              <div class="col-4">
                <div id="list-hotel-upload" class="list-group">
                  <a class="list-group-item list-group-item-action" href="#feature">Nổi bật</a>
                  <a class="list-group-item list-group-item-action" href="#exterior">Ngoại thất</a>
                  <a class="list-group-item list-group-item-action" href="#room">Phòng</a>
                  <a class="list-group-item list-group-item-action" href="#dining">Ăn uống</a>
                  <a class="list-group-item list-group-item-action" href="#leisure">Giải trí</a>
                  <a class="list-group-item list-group-item-action" href="#near-hotel">Gần đây</a>
                  <a class="list-group-item list-group-item-action" href="#other">Khác</a>
                </div>
              </div>
              <div class="col-8">
                <div data-bs-spy="scroll" data-bs-target="#list-hotel-upload" data-bs-smooth-scroll="true"
                  class="scrollspy-example" tabindex="0">
                  <p id="feature">Nổi bật</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/feature/feature-1.jpg" alt="">
                      <img src="/image/min_item/list-img/feature/feature-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/feature/feature-3.jpg" alt="">
                      <img src="/image/min_item/list-img/feature/feature-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="exterior">Ngoại thất</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="room">Phòng</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="dining">Ăn uống</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="leisure">Giải trí</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="near-hotel">Gần đây</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="other">Khác</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div id="user-upload" class="content">
            <div class="row">
              <div class="col-4">
                <div id="list-hotel-upload" class="list-group">
                  <a class="list-group-item list-group-item-action" href="#feature">Nổi bật</a>
                  <a class="list-group-item list-group-item-action" href="#exterior">Ngoại thất</a>
                  <a class="list-group-item list-group-item-action" href="#room">Phòng</a>
                  <a class="list-group-item list-group-item-action" href="#dining">Ăn uống</a>
                  <a class="list-group-item list-group-item-action" href="#leisure">Giải trí</a>
                  <a class="list-group-item list-group-item-action" href="#near-hotel">Gần đây</a>
                  <a class="list-group-item list-group-item-action" href="#other">Khác</a>
                </div>
              </div>
              <div class="col-8">
                <div data-bs-spy="scroll" data-bs-target="#list-hotel-upload" data-bs-smooth-scroll="true"
                  class="scrollspy-example" tabindex="0">
                  <p id="feature">Nổi bật</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/feature/feature-1.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/feature/feature-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="exterior">Ngoại thất</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="room">Phòng</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="dining">Ăn uống</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="leisure">Giải trí</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="near-hotel">Gần đây</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
                  <p id="other">Khác</p>
                  <div class="row">
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-1.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-2.jpg" alt="">
                    </div>
                    <div class="col-6">
                      <img src="/image/min_item/list-img/exterior/exterior-3.jpg" alt="">
                      <img src="/image/min_item/list-img/exterior/exterior-4.jpg" alt="">
                    </div>
                  </div>
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
    url: "http://localhost:3000/api/v1/reviews?hotelId=" + hotelId,
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
  $.ajax({
    url: "http://localhost:3000/api/v1/rooms?hotelId=" + hotelId,
    method: "GET",

    success: (data) => {
      data.forEach((item) => {
        const breakfast = (item.price * 20) / 100;
        let amenities = "";
        if (item.roomServices && item.roomServices.length > 0) {
          item.roomServices.forEach((service) => {
            // amenities += `<div class="item">
            //                 <i class="fa-solid ${service.Amenity.class}"></i>
            //                 <span>${service.Amenity.name}</span>
            //               </div>`;
            amenities += `<div class="item">
            <span class="material-symbols-outlined"> ${service.Amenity.class} </span>
            <span class="baseRoom_baseRoom-facility_title__4PawP">${service.Amenity.name}</span>
          </div>`;
          });
        } else {
          amenities = '<div class="item">No amenities available</div>';
        }
        const card = `<div class="select-hotel">
        <div class="container-fluid" id="room-id">
          <h2>${item.name}</h2>
          <div class="row">
            <div style="border-bottom : none" class="col-lg-2 ">
              <div class="baseroom">
                <div class="baseroom_img">
                  <img src="../img/min_item/list-img/room/standard_4.webp" alt="" style="width: 100%;">
                </div>
                <div class="baseroom_img1">
                  <div class="row no-gutters">
                    <div style="margin : 0; padding : 0 3px 0 10px;" class="col-6"><img
                        src="../img/min_item/list-img/room/standard_5.webp" alt="" style="width: 100%;">
                    </div>
                    <div style="margin : 0; padding : 0 10px 0 3px;" class="col-6"><img
                        src="../img/min_item/list-img/room/standard_6.webp" alt="" style="width: 100%;">
                    </div>
                  </div>
                </div>
                <div class="baseroom_bed">
                  <span class="material-symbols-outlined"> bed </span>
                  <span class="type-bed">1 giường King</span>
                </div>
                <div class="baseroom_item">
                ${amenities}


                </div>
              </div>
            </div>
            <div style="padding: 0;" class="col-lg-10  ">
              <div class="container">
                <div class="row">
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
                        <span>Thanh toán online</span>
                      </div>
                      <div class="info"><span>Đặt tối đa 10 phòng</span></div>
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
                      <p>VND 5,234,753</p>
                      <a href="#" class="btn btn-primary">Đặt phòng</a>
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
                          <span>Thanh toán online</span>
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
});
