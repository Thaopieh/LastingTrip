$(document).ready(function () {

  function getToken() {
    return localStorage.getItem("token"); // Thay 'token' bằng key lưu trữ token của bạn
  }
  function getUserId() {
    return localStorage.getItem("id");
  }

  const token = getToken();
  const userId = getUserId(); // Lấy ownerId từ hàm getUserId() của bạn
  if (token) {

  } else {
    alert("Vui lòng đăng nhập để xem thông tin người dùng!");
    window.location.href = "/signin";
  }

  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/users/getAllUser",
      method: "GET",
      success: function (data) {
        const user = data.find(function (h) {
          return h.id == userId;
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
          tableHtml += user.birthDate.slice(0, 10);
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
          if (user.gender)
            tableHtml += "Nam";
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
          tableHtml += '                    <i class="fa-solid fa-id-card"></i>';
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
          $(".body_right .user-info").html(tableHtml);
          console.log("Đang render page");
        } else {
          console.log("Không tìm thấy khách sạn có id là 4");
        }
      },
      error: function (xhr, status, error) {
        console.error(error);
        console.log("Lỗi khi render page agent");
      },
    });
  } // end of renderPage()

  renderPage();
  function findRoomById(roomId) {
    return fetch('http://localhost:3030/api/v1/rooms/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gọi API');
        }
        return response.json();
      })
      .then(rooms => {
        // Tìm khách sạn với slug tương ứng trong danh sách
        const room = rooms.find(room => room.id = roomId);
        return room.name;
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
        throw error;
      });
  }
  //Render boooking lisst off usser
  function renderBookingList() {
    $.ajax({
      url: `http://localhost:3030/api/v1/booking?user_id=${userId}`,
      method: "GET",
      success: function (data) {
        console.log(data);
        var tableHtml = "";
        if (data.length == 0) { //Trường hợp không có booking
          tableHtml += '<div class=row>';
          tableHtml += '<div class="col-5">';
          tableHtml += '    <img src="https://ak-d.tripcdn.com/images/05E6w12000cqchxs29CAB.gif">';
          tableHtml += '</div>';
          tableHtml += '<div class="col-7">';
          tableHtml += "<p>Bạn không có bất kỳ đặt chỗ nào hoặc chúng tôi không thể truy cập          các đặt chỗ của bạn vào lúc này.Bạn có thể tìm kiếm các đặt phòng bạn đã thực hiện với          tư cách là khách trong năm qua bằng địa chỉ email của mình.</p>";
          tableHtml += '</div>';
          $(".my-booking table").hide();
          $(".my-booking").html(tableHtml);

        }
        else {
          data.forEach(async function (booking, index) {
            // Tạo HTML cho từng hàng trong bảng

            tableHtml += "<tr>";
            tableHtml += '<td class="col1">' + (index + 1) + "</td>";
            // tableHtml += '<td class="col2">' + booking.us  er_id + "</td>";
            tableHtml += '<td class="col1">' + booking.full_name + "</td>";
            const roomName = await findRoomById(booking.room_id);
            tableHtml += '<td class="col2">' + roomName + "</td>";
            tableHtml += '<td class="col1">' + booking.check_in_date.slice(0, 10) + "</td>";
            tableHtml += '<td class="col1">' + booking.check_out_date.slice(0, 10) + "</td>";
            tableHtml += '<td class="col2">' + booking.total_price + "</td>";
            if (booking.status)
              tableHtml += '<td class="col1">' + "Đã thanh toán" + "</td>";
            else
              tableHtml += '<td class="col1">' + "Chưa thanh toán" + "</td>";

            tableHtml += '<td class="col1">' + booking.special_requests + "</td>";

            tableHtml += "</tr>";
            $(".my-booking table tbody").html(tableHtml);

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
          <input type="text" id="birthDate-user" name="birthDate" placeholder="Ngày sinh *" value="${data.birthDate}"required />
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


  //Thay đổi mật khẩu
  $(document).on("click", ".update-pass-btn", function () {
    var id = $(this).val();
    $(".popup-overlay-update-pass").show();
    $(".popup-overlay-update-pass").html(`
      <div class="popup-updateInfo"> 
        <span class="close-btn">&times;</span> 
        <h2>Thay đổi mật khẩu</h2> 
        <form id="updateForm"> 
          <label>Mật khẩu cũ</label>    
          <input type="text" id="old-pass" name="" placeholder="Nhập mật khẩu cũ" required />
          <p class="wrong-pass" style="color:red; font-style:italic; display:none">*Mật khẩu không đúng</p>
          <label>Mật khẩu mới</label>    
          <input type="text" id="new-pass" name="" placeholder="Nhập mật khẩu mới" required />        
          <div class="ebutton" id="update-pass"> 
            <input type="submit" value="Cập nhật"> 
          </div> 
        </form> 
      </div>`
    );

    $(".ebutton").click(function (e) {
      const oldPass = $("#old-pass").val();
      const newPass = $("#new-pass").val();

      // Gửi yêu cầu kiểm tra mật khẩu cũ
      $.ajax({
        url: `http://localhost:3030/api/v1/users/updatePassword`,
        method: "PUT",
        data: {
          userId: id,
          currentPassword: oldPass,
          newPassword: newPass
        },
        success: function (data) {
          renderPage();
          console.log("Cập nhật mật khẩu thành công");
        },
        error: function (error) {
          console.log("Lỗi khi cập nhật mật khẩu", error);
          alert("Mật khẩu không đúng! Xin vui lòng thử lại sau.");
        }
      });
    });

    $(".close-btn").click(function () {
      $(".popup-overlay-update-pass").hide();
    });
  });



  $(".user-info-item").click(function () {
    $(".user-info").show();
    $(".my-booking").hide();
    $(".log-out").hide();
  });
  $(".my-booking-item").click(function () {
    $(".user-info").hide();
    $(".my-booking").show();
    $(".log-out").hide();
  });
  $(".log-out-item").click(function () {
    $(".user-info").hide();
    $(".my-booking").hide();
    $(".log-out").show();
  });


  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    window.location.href = "/signin";
  });
});
