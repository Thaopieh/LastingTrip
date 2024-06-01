$(document).ready(function () {
  function getToken() {
    return localStorage.getItem("token"); // Thay 'token' bằng key lưu trữ token của bạn
  }
  function getUserId() {
    return localStorage.getItem("id");
  }

  const token = getToken();
  const ownerId = getUserId();
  console.log(ownerId);
  let hotelId;

  if (token) {
    // alert(ownerId);
  } else {
    alert("Vui lòng đăng nhập để xem thông tin khách sạn.");
    // Chuyển hướng đến trang login
    window.location.href = "/signin";
  }
  function renderPersonalInfo() {
    $.ajax({
      url: "http://localhost:3030/api/v1/users/getAllUser",
      method: "GET",
      success: function (data) {
        const user = data.find(function (h) {
          return h.id == ownerId;
        });

        if (user) {
          var tableHtml = "";
          tableHtml += '<div class="account-secure">';
          tableHtml += "    <h2>Bảo mật tài khoản</h2>";
          tableHtml += '    <div class="account">';
          tableHtml += '        <div class="account-email ">';
          tableHtml += '            <div class="email-info ">';
          tableHtml += '                <div class="email-head">';
          tableHtml +=
            '                    <i class="fa-regular fa-envelope"></i>';
          tableHtml += "                    <span>Email</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="email-acc">';
          tableHtml += "                    <span>" + user.email + "</span>";
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="account-numberPhone ">';
          tableHtml += '            <div class="numberPhone-info ">';
          tableHtml += '                <div class="numberPhone-head">';
          tableHtml += '                    <i class="fa fa-phone"></i>';
          tableHtml += "                    <span>Số điện thoại</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="email-acc">';
          tableHtml +=
            "                    <span>" + user.numberPhone + "</span>";
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="account-pass">';
          tableHtml += '            <div class="pass-info">';
          tableHtml += '                <div class="pass-head">';
          tableHtml += '                    <i class="fa-solid fa-lock"></i>';
          tableHtml += "                    <span>Password</span>";
          tableHtml +=
            '<button class= "update-pass-btn" value ="' +
            user.id +
            '">Cập nhật</button>';
          tableHtml += "                </div>";
          tableHtml += '                <div class="pass-acc">';
          tableHtml += "                    <span>" + "******" + "</span>";
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += "    </div>";
          tableHtml += "</div>";
          tableHtml += '<div class="profile">';
          tableHtml += "    <h2>Thông tin cá nhân</h2>";
          tableHtml += '    <div class="profile-detail ">';
          tableHtml += '        <div class="profile1">';
          tableHtml += '            <div class="name col-6">';
          tableHtml += '                <div class="title-name">';
          tableHtml += '                    <i class="fa-regular fa-user"></i>';
          tableHtml += "                    <span>Tên</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="user-name">';
          tableHtml += user.name;
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="name col-6">';
          tableHtml += '                <div class="title-name">';
          tableHtml +=
            '                    <i class="fa-regular fa-calendar"></i>';
          tableHtml += "                    <span>Ngày sinh</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="user-name">';
          if (user.birthDate == null) tableHtml += user.birthDate;
          else tableHtml += user.birthDate.slice(0, 10);
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="profile2">';
          tableHtml += '            <div class="birth col-6">';
          tableHtml += '                <div class="title-name">';
          tableHtml += '                    <i class="fa fa-venus-mars"></i>';
          tableHtml += "                    <span>Giới tính</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="user-name">';
          if (user.gender) tableHtml += "Nam";
          else tableHtml += "Nữ";
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="birth col-6">';
          tableHtml += '                <div class="title-name">';
          tableHtml += '                    <i class="fa-solid fa-users"></i>';
          tableHtml += "                    <span>Loại người dùng</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="user-name">';
          tableHtml += user.type;
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += "        </div>";

          tableHtml += '        <div class="profile2">';
          tableHtml += '            <div class="birth col-6">';
          tableHtml += '                <div class="title-name">';
          tableHtml +=
            '                    <i class="fa-solid fa-id-card"></i>';
          tableHtml += "                    <span>CCCD</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="user-name">';
          tableHtml += user.cccd;
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="birth col-6">';
          tableHtml += '                <div class="title-name">';
          tableHtml += '                    <i class="fa-solid fa-map"></i>';
          tableHtml += "                    <span>Địa chỉ</span>";
          tableHtml += "                </div>";
          tableHtml += '                <div class="user-name">';
          tableHtml += user.address;
          tableHtml += "                </div>";
          tableHtml += "            </div>";
          tableHtml += "        </div>";

          tableHtml +=
            '<button class= "updateInfo" value ="' +
            user.id +
            '">Chỉnh sửa thông tin</button>';
          tableHtml += "    </div>";
          tableHtml += "</div>";
          $(".body_right .personal-info").html(tableHtml);
          var tableHtml1 = "";
          tableHtml1 += '<div class="avatar-container">';
          tableHtml1 +=
            '<img src="' + user.url + '" alt="Avatar" class="avatar">';
          tableHtml1 +=
            ' <button id="updateAvatarButton" class="edit-button">✎</button>';
          tableHtml1 += "</div>";
          tableHtml1 +=
            '<input type="file" name="user" id="avatarInput" accept="image/*" style="display: none;">';
          tableHtml1 +=
            '<button id="confirmAvatarButton" style="display: none;">Confirm</button>';
          $(".member").html(tableHtml1);
          console.log("Đang render page");
          $("#updateAvatarButton").on("click", function () {
            // Trigger the file input when the edit button is clicked
            $("#avatarInput").click();
          });
          if (user.authType == "google") {
            $("#hienpass").hide();
          }
          // Event listener for the confirmAvatarButton
          $("#avatarInput").on("change", function (e) {
            var file = e.target.files[0]; // Lấy file ảnh được chọn
            if (file) {
              var formData = new FormData();
              formData.append("user", file);

              // Gửi ajax request lên server
              $.ajax({
                url:
                  "http://localhost:3030/api/v1/users/updateImage/" + user.id, // Thay YOUR_USER_ID bằng ID thực của người dùng
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                  console.log("Upload thành công:", response);
                  // Cập nhật ảnh mới vào avatar
                  $(".avatar").attr("src", URL.createObjectURL(file));
                },
                error: function (xhr, status, error) {
                  console.error("Lỗi khi upload ảnh:", error);
                },
              });
            } else {
              console.error("Không có file nào được chọn.");
            }
          });
        } else {
          console.log("Lỗi render user");
        }
      },
      error: function (xhr, status, error) {
        console.error(error);
        console.log("Lỗi khi render page agent");
      },
    });
  } // end of renderPage()

  renderPersonalInfo();

  //render hotel information
  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/hotels",
      method: "GET",
      success: function (data) {
        const hotel = data.find(function (h) {
          return h.ownerId == ownerId;
        });

        if (hotel) {
          var tableHtml = "";
          localStorage.setItem("hotelId", hotel.id);

          tableHtml += '<div class="my-hotel-body">';
          tableHtml += "<h2>Quản lý khách sạn</h2>";
          tableHtml += '    <div class="row">';
          tableHtml += '        <div class="col-4">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-regular fa-user"></i>';
          tableHtml += "                <span>Tên khách sạn</span>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="data">';
          tableHtml += hotel.name;
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="col-6">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-regular fa-map"></i>';
          tableHtml += "                <span>Địa chỉ</span>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="data">';
          tableHtml += hotel.map;
          tableHtml += "            </div>";
          tableHtml += "        </div>";

          tableHtml += '        <div class="col-4">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-solid fa-star"></i>';
          tableHtml += "                <span>Số sao</span>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="data">';
          for (var i = 0; i < hotel.star; i++) {
            tableHtml +=
              '            <i class="fa-solid fa-star fa-star-yellow"></i>';
          }

          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="col-6">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-solid fa-home"></i>';
          tableHtml += "                <span>Loại</span>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="data">';
          tableHtml += hotel.TypeHotel;
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="col-4">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-solid fa-usd"></i>';
          tableHtml += "                <span>Giá</span>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="data">';
          tableHtml += hotel.cost;
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="col-6">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-solid fa-money"></i>';
          tableHtml += "                <span>Hình thức thanh toán</span>";
          tableHtml += "            </div>";
          tableHtml += '            <div class="data">';
          tableHtml += hotel.payment;
          tableHtml += "            </div>";
          tableHtml += "        </div>";
          tableHtml += '        <div class="col-4">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-regular fa-user"></i>';
          tableHtml += "                <span>Hình ảnh</span>";
          tableHtml += "            </div>";
          tableHtml +=
            "<td><i class='fa-solid fa-camera hotel-img-icon-cc'></i></td>"; // Add icon
          tableHtml += "        </div>";
          tableHtml += '        <div class="col-6">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-regular fa-map"></i>';
          tableHtml += "                <span>Tiện nghi</span>";
          tableHtml += "            </div>";
          tableHtml +=
            "<td><i class='fa-solid fa-home ManageHotelService'></i></td>";
          tableHtml += "        </div>";
          tableHtml += "    </div>";

          tableHtml +=
            '<button type="button" class="updateHotel" value="' +
            hotel.id +
            '">Chỉnh sửa</button>';
          // tableHtml +=
          //   '<button type="button" class="deleteHotel" value="' +
          //   hotel.id +
          //   '">Xóa</button>';
          tableHtml +=
            '<button type="button" class="addRoom" value="' +
            hotel.id +
            '">Thêm phòng</button>';
          tableHtml += "</div>";

          // Render dữ liệu vào bảng
          // $(".agent-table table tbody").html(tableHtml);
          $(".my-hotel").html(tableHtml);
          console.log("Đang render page");
        } else {
          var tableHtml = "";
          tableHtml += "<span>Bạn chưa có khách sạn.</span><br>";
          tableHtml +=
            '<span>Nhấn vào <span class="addHotel">đây</span> để đăng kí!</span>';
          $(".my-hotel").html(tableHtml);
        }
      },
      error: function (xhr, status, error) {
        console.error(error);
        console.log("Lỗi khi render page agent");
      },
    });
  }
  renderPage();

  // Sự kiện khi click vào nút "Thêm"
  $(document).on("click", ".addHotel", function () {
    // alert("ê");
    window.open("/agent/addHotel", "_blank");
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

  $(".close-btn-img").click(function () {
    $(".popup-overlay-hotel-img").hide();
    $(".popup-content-hotel-img").hide();
  });

  // Sự kiện khi click vào nút "Xóa"
  $(document).on("click", ".deleteHotel", function () {
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

    // Gửi yêu cầu xóa người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels/deleteHotel/${id}`,
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
        console.log("Đã xảy ra lỗi khi xóa người dùng:", error);
      },
    });
  });

  // Sự kiện khi người dùng hủy việc xóa
  $(".cancel-delete").click(function () {
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });

  $(document).on("click", ".addRoom", function () {
    let id = $(this).val();
    $(".personal-info").hide();
    $(".my-hotel").hide();
    $(".room-list").show();
  });

  // Sự kiện khi click vào nút "Thêm khách sạn"
  $(".dkbutton").on("click", function () {
    var name = $("#name").val();
    var star = $("#star").val();
    var map = $("#map").val();
    var TypeHotel = $("#TypeHotel").val();
    var cost = $("#cost").val();
    var payment = $("#payment").val();
    var fileInput = document.querySelector("input[type='file']");
    var file = fileInput.files[0]; // Select only the first file
    var formData = new FormData();
    formData.append("name", name);
    formData.append("star", star);
    formData.append("map", map);
    formData.append("TypeHotel", TypeHotel);
    formData.append("cost", cost);
    formData.append("payment", payment);
    formData.append("hotel", file);

    // Gửi yêu cầu thêm người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels`,
      method: "POST",
      processData: false, // Prevent jQuery from processing data
      contentType: false, // Prevent jQuery from setting content type
      data: formData,
      success: function (data) {
        renderPage();
        console.log("Khách sạn đã được tạo.");
        alert("Thành công!");
        window.location.href = `/agent`;
      },
      error: function (error) {
        // Xử lý lỗi
        console.log("Đã xảy ra lỗi khi tạo khách sạn:", error);
      },
    });
  });

  // Sự kiện khi click vào nút "Sửa"
  $(document).on("click", ".updateHotel", function () {
    var id = $(this).val();
    console.log(id);
    $(".popup-overlay-updateHotel").show();
    // Gửi yêu cầu để lấy chi tiết người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels/${id}`,
      method: "GET",
      success: function (data) {
        console.log(data);
        $(".popup-overlay-updateHotel").html(`
          <div class="popup-updateHotel">
          <span class="close-btn">&times;</span>
          <h2>Chỉnh sửa</h2>
          <form id="updateForm">
          <label>Tên khách sạn</label>
            <input type="text" id="Hotelname" name="name" placeholder="Tên khách sạn *"
            value="${data.name}" required />

            <label>Số sao</label>
            <select class="form-select" name="Hotelstar" id="Hotelstar">
            ${[1, 2, 3, 4, 5]
            .map(
              (optionValue) =>
                `                <option value="${optionValue}" ${optionValue.toString() === data.star.toString()
                  ? "selected"
                  : ""
                }>${optionValue}</option>            `
            )
            .join("")}
              </select>
            <label>Địa chỉ</label>
            <input type="text" id="Hotelmap" name="map" placeholder="Địa chỉ *" value="${data.map
          }"required />

            <label>Loại khách sạn</label>
            <select class="form-select" name="HotelTypeHotel" id="HotelTypeHotel">
            ${["hotel", "resort", "homestay", "service apartment"]
            .map(
              (optionValue) => `
                <option value="${optionValue}" ${optionValue.toString() === data.TypeHotel.toString()
                  ? "selected"
                  : ""
                }>${optionValue}</option>
            `
            )
            .join("")}
            </select>

            <label>Hình thức thanh toán</label>
            <select class="form-select" name="payment" id="Hotelpayment">
            ${["offline", "online"]
            .map(
              (optionValue1) => `
                <option value="${optionValue1}" ${optionValue1.toString() === data.payment.toString()
                  ? "selected"
                  : ""
                }>${optionValue1}</option>
            `
            )
            .join("")}
            </select>

                <div class="ebutton">
                    <input type="submit" value="Cập nhật">
                </div>
            </form>
            </div> `);

        $(".ebutton").click(function () {
          const name = $("#Hotelname").val();
          const star = $("#Hotelstar").val();
          const map = $("#Hotelmap").val();
          const TypeHotel = $("#HotelTypeHotel").val();
          const cost = $("#Hotelcost").val();
          const apayment = $("#Hotelpayment").val();
          // alert(apayment);
          $.ajax({
            url: `http://localhost:3030/api/v1/hotels/updateHotel/${id}`,
            method: "PUT",
            data: {
              name: name,
              star: star,
              map: map,
              TypeHotel: TypeHotel,
              payment: apayment,
              cost: cost,
            },
            success: function (data) {
              renderPage();
              console.log("Chỉnh sửa khách sạn thành công");
            },
            error: function (error) {
              alert("khong");
              console.log("Lỗi khi chỉnh sửa khách sạn", error);
            },
          });
        });
        $(".close-btn").click(function () {
          $(".popup-overlay-updateHotel").hide();
        });
      },
    });
  });

  // Hàm hiển thị xem trước các tệp đã chọn

  // Sự kiện click cho nút "Confirm"

  $(document).on("click", ".updateInfo", function () {
    var id = $(this).val();
    $(".popup-overlay-updateInfo").show();
    // Gửi yêu cầu để lấy chi tiết người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/users/getDetailUser/${id}`, //getDetailHotel
      method: "GET",
      success: function (data) {
        $(".popup-overlay-updateInfo").html(`
          <div class="popup-updateInfo"> 
          <span class="close-btn">&times;</span> 
          <h2>Chỉnh sửa thông tin người dùng</h2> 
          <form id="updateForm"> 
          <label>Tên người dùng</label>    
          <input type="text" id="name-user" name="name" placeholder="Tên người dùng *" value="${data.name}" required />
          <label>Ngày sinh</label>
          <input type="date" id="birthDate-user" name="birthDate" placeholder="Ngày sinh *" value="${data.birthDate}"required />
          <div class="row">
          <div class="col-6">
          <label>Số điện thoại</label>
          <input type="text" id="numberPhone-user" name="numberPhone" placeholder="Số điện thoại *" value="${data.numberPhone}"required />
          </div>
          <div class="col-6">
          <label>Email</label><br>
          <input type="text" id="email-user" name="email" placeholder="Email *" value="${data.email}"required />
          </div>
          </div>
          
          <div class="row">
          <div class="col-6">
          <label>CCCD</label><br>
          <input type="text" id="cccd-user" name="CCCD" placeholder="CCCD *" value="${data.cccd}"required />
          </div>
          <div class="col-6">
          <label>Địa chỉ</label><br>
          <input type="text" id="address-user" name="address" placeholder="address *" value="${data.address}"required />
          </div>
          </div>

          <label>Giới tính</label>
          <select class="form-select" name="gender-user" id="gender-user">
          <option value="">Chọn giới tính</option>
          <option value="1">Nam</option>
          <option value="0">Nữ</option>
          </select>

                   
              <div class="ebutton"> 
                  <input type="submit" value="Cập nhật"> 
              </div> 
          </form> 
          </div> `);

        $(".ebutton").click(function () {
          console.log(id);
          const name = $("#name-user").val();
          const numberPhone = $("#numberPhone-user").val();
          const email = $("#email-user").val();
          const birthDate = $("#birthDate-user").val();
          const gender = $("#gender-user").val();
          const cccd = $("#cccd-user").val();
          const address = $("#address-user").val();

          $.ajax({
            url: `http://localhost:3030/api/v1/users/editUser/${id}`,
            method: "PUT",
            data: {
              name: name,
              numberPhone: numberPhone,
              email: email,
              birthDate: birthDate,
              gender: gender,
              cccd: cccd,
              address: address,
            },
            success: function (data) {
              renderPage();
              console.log("Chỉnh sửa thông tin người dùng thành công");
            },
            error: function (error) {
              console.log("Lỗi khi chỉnh sửa thông tin người dùng", error);
            },
          });
        });

        $(".close-btn").click(function () {
          $(".popup-overlay-updateInfo").hide();
        });
      },
    });
  }); //   end of update user info

  //Booking list section
  function renderBookingList() {
    var hotelId = localStorage.getItem("hotelId");
    // let roomIds = [];
    // fetch(`http://localhost:3030/api/v1/rooms?hotelId=${localStorage.getItem("hotelId")}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     data.forEach(room => {
    //       roomIds.push(room.id);
    //     });
    //     console.log(roomIds);
    //   })
    //   .catch(error => {
    //     console.error('Lỗi khi lấy danh sách các room:', error);
    //   });

    $.ajax({
      url: `http://localhost:3030/api/v1/booking?hotel_id=${hotelId}`,
      method: "GET",
      success: function (data) {
        console.log(data);
        var tableHtml = "";
        if (data.length == 0) {
          tableHtml += "<div class=row>";
          tableHtml += '<div class="col-5">';
          tableHtml +=
            '    <img src="https://ak-d.tripcdn.com/images/05E6w12000cqchxs29CAB.gif">';
          tableHtml += "</div>";
          tableHtml += '<div class="col-7">';
          tableHtml += "<span>Bạn chưa có đơn đặt hàng nào!</span>";
          tableHtml += "</div>";
          $(".booking-table table").hide();
          $(".booking-table").html(tableHtml);
        } else {
          data.forEach(function (booking, index) {
            // Tạo HTML cho từng hàng trong bảng
            tableHtml += "<tr>";
            tableHtml += '<td class="col1">' + (index + 1) + "</td>";
            tableHtml += '<td class="col2">' + booking.room_id + "</td>";
            tableHtml += '<td class="col1">' + booking.full_name + "</td>";
            tableHtml += '<td class="col2">' + booking.user_id + "</td>";
            tableHtml += '<td class="col2">' + booking.total_price + "</td>";
            tableHtml += '<td class="col1">' + booking.status + "</td>";
            tableHtml += '<td class="col1">' + booking.check_in_date + "</td>";
            tableHtml += '<td class="col1">' + booking.check_out_date + "</td>";
            tableHtml +=
              '<td class="col1">' + booking.special_requests + "</td>";
            tableHtml += "<td>";

            // Thêm button Chỉnh sửa
            tableHtml +=
              '<button type="button" class="updatehotel" value="' +
              booking.id +
              '">Chỉnh sửa</button>';

            // Thêm button Xóa và lưu ID của khách sạn trong thuộc tính data-id của icon
            tableHtml +=
              '<button type="button" class="deleteHotel" value="' +
              booking.id +
              '">Xóa</button>';

            tableHtml += "</td>";
            tableHtml += "</tr>";
            $(".booking-table table tbody").html(tableHtml);
          });
        }

        // Render dữ liệu vào bảng
        console.log("Đang render page");
      },
      error: function (xhr, status, error) {
        console.error(error);
        console.log("Lỗi khi render page booking");
      },
    });
  }

  renderBookingList();

  $(document).on("click", ".hotel-img-icon-cc", function () {
    var hotelId = localStorage.getItem("hotelId");
    console.log(hotelId);
    $("#imagePopupOverlayHotel").css("display", "block");
    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageHotel/?HotelId=" + hotelId,
      method: "GET",
      success: function (data) {
        console.log(data);
        // Xử lý khi nhận được danh sách các ảnh từ server
        if (data && data.length > 0) {
          // Xóa bất kỳ nội dung HTML cũ nào trong phần hiển thị ảnh
          $(".image-container").empty();

          // Duyệt qua danh sách ảnh và hiển thị từng ảnh trong popup overlay
          data.forEach(function (image) {
            // Tạo phần tử HTML cho mỗi ảnh
            var imageElement = $("<div class='image-item'></div>");
            imageElement.append(
              "<img src='" + image.url + "' class='popup-image' />"
            );

            // Tạo nút delete cho mỗi ảnh
            var deleteButton = $(
              "<button class='delete-image-btn'>Delete</button>"
            );
            deleteButton.data("image-url", image.url);
            deleteButton.data("image-id", image.id);
            console.log(image.id); // Lưu đường dẫn ảnh vào data của nút delete
            imageElement.append(deleteButton);

            // Thêm ảnh vào phần hiển thị danh sách ảnh trong popup overlay
            $(".image-container").append(imageElement);
          });
        } else {
          console.log("Không có ảnh nào để hiển thị.");
        }
      },
      error: function (error) {
        console.log("Đã xảy ra lỗi khi lấy danh sách ảnh:", error);
        $(".image-container").empty();
      },
    });
  });

  $(document).on("click", ".delete-image-btn", function () {
    var hotelId1 = localStorage.getItem("hotelId"); // Lấy hotelId từ localStorage
    var id = $(this).data("image-id"); // Lấy imageId từ data của nút delete
    var url = $(this).data("image-url");
    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageHotel/?id=" + id,
      method: "DELETE",
      contentType: "application/json",
      data: JSON.stringify({ url: url }),
      success: function (response) {
        // console.log(response); // In ra thông báo từ máy chủ
        alert("Delete Successful");
        renderPage();
        $.ajax({
          url:
            "http://localhost:3030/api/v1/urlImageHotel/?HotelId=" + hotelId1,
          method: "GET",
          success: function (data) {
            // console.log(data);
            // Xử lý khi nhận được danh sách các ảnh từ server
            if (data && data.length > 0) {
              // Xóa bất kỳ nội dung HTML cũ nào trong phần hiển thị ảnh
              $(".image-container").empty();

              // Duyệt qua danh sách ảnh và hiển thị từng ảnh trong popup overlay
              data.forEach(function (image) {
                // Tạo phần tử HTML cho mỗi ảnh
                var imageElement = $("<div class='image-item'></div>");
                imageElement.append(
                  "<img src='" + image.url + "' class='popup-image' />"
                );

                // Tạo nút delete cho mỗi ảnh
                var deleteButton = $(
                  "<button class='delete-image-btn'>Delete</button>"
                );
                deleteButton.data("image-url", image.url);
                deleteButton.data("image-id", image.id);
                console.log(image.id); // Lưu đường dẫn ảnh vào data của nút delete
                imageElement.append(deleteButton);

                // Thêm ảnh vào phần hiển thị danh sách ảnh trong popup overlay
                $(".image-container").append(imageElement);
              });
            } else {
              window.location.reload(); // Reload trang
            }
          },
          error: function (error) {
            window.location.reload(); // Reload trang
          },
        });
      },
      error: function (error) {
        console.log("Đã xảy ra lỗi khi xóa ảnh:", error);
        $(".image-container").empty();
      },
    });
  });
  $("#addImageButton1").on("click", function () {
    alert("dcmm");
    // Khi người dùng nhấp vào nút "Add Image", kích hoạt sự kiện click cho input[type=file] ẩn
    $("#imageInputCc").click();
  });

  // Sự kiện change của input[type=file]
  $("#imageInputCc").on("change", function (e) {
    var files = e.target.files; // Lấy danh sách các tệp đã chọn
    console.log(files);

    // Xử lý các tệp đã chọn ở đây (ví dụ: hiển thị trên giao diện)
    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log(
          "Tên tệp: " + file.name + ", Kích thước: " + file.size + " bytes"
        );
        // Thực hiện xử lý mỗi tệp ở đây (ví dụ: hiển thị trên giao diện)
      }
    }
  });

  // Hàm hiển thị xem trước các tệp đã chọn

  // Sự kiện click cho nút "Confirm"
  $("#confirm1").on("click", function () {
    var fileInput = document.querySelector(".bucminh input[type='file']");
    var file = fileInput.files;
    console.log("file", file);
    var formData = new FormData();
    var storedHotelId = localStorage.getItem("hotelId");

    // Nếu không có tệp nào được chọn, không thực hiện gì cả
    if (file.length === 0) {
      alert("Vui lòng chọn ít nhất một tệp ảnh.");
      return;
    }

    // Tạo FormData để chứa các tệp đã chọn

    for (var i = 0; i < file.length; i++) {
      formData.append("hotel", file[i]); // Thêm từng tệp vào FormData
    }
    formData.append("HotelId", storedHotelId);
    // console.log(storedHotelId);
    // console.log(formData);
    // Gửi yêu cầu AJAX POST lên server
    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageHotel",
      method: "POST",
      data: formData,
      processData: false, // Không xử lý dữ liệu
      contentType: false,
      success: function (response) {
        console.log("Yêu cầu thành công:", response);
        // Xử lý kết quả thành công nếu cần thiết
        alert("Tải ảnh lên thành công!");
        window.location.reload();
      },
      error: function (xhr, status, error) {
        console.error("Đã xảy ra lỗi:", error);
        // Xử lý lỗi nếu có
        alert("Đã xảy ra lỗi khi tải ảnh lên server.");
      },
    });
  });

  $(document).on("click", ".ManageHotelService", function () {
    let id = localStorage.getItem("hotelId");
    window.location.href = `/ManageHotelService/${id}`;
  });
  $(document).on("click", ".update-pass-btn", function () {
    var id = $(this).val();
    $(".popup-overlay-update-pass").show();
    $(".popup-overlay-update-pass").html(`
      <div class="popup-updateInfo"> 
        <span class="close-btn">&times;</span> 
        <h2>Thay đổi mật khẩu</h2> 
        <form id="updateForm"> 
          <label>Mật khẩu cũ</label>    
          <input type="password" id="old-pass" name="" placeholder="Nhập mật khẩu cũ" required />
          <p class="wrong-pass1" style="color:red; font-style:italic; display:none">* Mật khẩu không đúng</p>
          <label>Mật khẩu mới</label>    
          <input type="password" id="new-pass" name="" placeholder="Nhập mật khẩu mới" required /> 
          <label>Nhập lại mật khẩu mới</label>    
          <input type="password" id="confirm-new-pass" name="" placeholder="Nhập lại mật khẩu mới" required />  
          <p class="wrong-pass2" style="color:red; font-style:italic; display:none">* Mật khẩu không trùng khớp</p>
      
          <div class="ebutton" id="update-pass"> 
            <input type="submit" value="Cập nhật"> 
          </div> 
        </form> 
      </div>`);

    $(".ebutton").click(function (e) {
      e.preventDefault(); // Ngăn không cho form submit

      const oldPass = $("#old-pass").val();
      const newPass = $("#new-pass").val();
      const confirmNewPass = $("#confirm-new-pass").val();

      if (newPass === confirmNewPass) {
        $.ajax({
          url: `http://localhost:3030/api/v1/users/updatePassword`,
          method: "PUT",
          data: {
            userId: id,
            currentPassword: oldPass,
            newPassword: newPass,
          },
          success: function (data) {
            isUpdatePasswordSuccess = true;
            renderPage();
            console.log("Cập nhật mật khẩu thành công");
          },
          error: function (error) {
            isUpdatePasswordSuccess = false;
            $(".wrong-pass1").show();
          },
        });
      } else {
        isUpdatePasswordSuccess = false;
        $(".wrong-pass2").show();
      }

      if (!isUpdatePasswordSuccess) {
        // Popup vẫn hiển thị khi cập nhật mật khẩu không thành công
        return;
      } else {
        $(".popup-overlay-update-pass").hide();
      }
    });

    $(".close-btn").click(function () {
      $(".popup-overlay-update-pass").hide();
    });
  });

  $(".personal-info-item").click(function () {
    $(".personal-info").show();
    $(".my-hotel").hide();
    $(".room-list").hide();
    $(".booking-list").hide();
  });
  $(".my-hotel-item").click(function () {
    $(".personal-info").hide();
    $(".my-hotel").show();
    $(".room-list").hide();
    $(".booking-list").hide();
  });
  $(".room-list-item").click(function () {
    $(".personal-info").hide();
    $(".my-hotel").hide();
    $(".room-list").show();
    $(".booking-list").hide();
  });
  $(".booking-list-item").click(function () {
    $(".personal-info").hide();
    $(".my-hotel").hide();
    $(".room-list").hide();
    $(".booking-list").show();
  });
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/signin";
  });
});
