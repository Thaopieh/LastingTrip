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
    // alert(ownerId);
    // alert(userId);
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
          tableHtml += user.birthDate;
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
          tableHtml += user.gender;
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
          tableHtml +=
            '<button class= "updateInfo" value ="' +
            user.id +
            '">Chỉnh sửa thông tin</button>';
          tableHtml +=
            '<button class= "deleteUser" value ="' +
            user.id +
            '">Xóa tài khoản</button>';

          tableHtml += "    </div>";
          tableHtml += "</div>";
          $(".body_right").html(tableHtml);
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

  $(document).on("click", ".updateInfo", function () {
    var id = $(this).val();
    // alert(id);

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
          <label>Số điện thoại</label>
          <input type="text" id="numberPhone-user" name="numberPhone" placeholder="Số điện thoại *" value="${data.numberPhone}"required />

  
          <label>Email</label>
          <input type="text" id="email-user" name="email" placeholder="Email *" value="${data.email}"required />

  
          <label>Loại người dùng</label>
          <select class="form-select" name="type-user" id="type-user">
              <option value="">Chọn loại</option>
              <option value="owner">Owner</option>
              <option value="client">Client</option>
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
          const type = $("#type-user").val();

          $.ajax({
            url: `http://localhost:3030/api/v1/users/editUser/${id}`,
            method: "PUT",
            data: {
              name: name,
              numberPhone: numberPhone,
              email: email,
              type: type,
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

  $(document).on("click", ".deleteUser", function () {
    let id = $(this).val();
    console.log(id);
    // Gửi yêu cầu xóa người dùng
    $(".popup-overlay-delete").show();
    $(".popup-delete").show();
    $(".popup-delete").attr("data-id", id);
  }); // end of click delete user

  $(".confirm-password").click(function () {
    // Lấy ID người dùng từ thuộc tính data
    let id = $(".popup-delete").attr("data-id");
    // var password = $(#confirm - password).val();

    if (password == user.password) {
      $.ajax({
        url: `http://localhost:3030/api/v1/users/deleteUser/${id}`,
        method: "DELETE",
        success: function (data) {
          // Xử lý thành công
          $(".popup-overlay-delete").hide();
          $(".popup-delete").hide();
          renderPage();
        },
        error: function (error) {
          console.log("Lỗi khi xóa người dùng", error);
        },
      });
    } else {
      alert("Mật khẩu không đúng, vui lòng thử lại sau!");
    }
  });
  $(document).on("click", ".confirm-delete", function () {
    let id = $(".popup-delete").attr("data-id");

    // Gửi yêu cầu xóa người dùng
    $(".popup-overlay-confirm-pass").show();
    $(".popup-confirm-pass").show();
  });

  $(document).on("click", ".cancel-delete", function () {
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });
  $(document).on("click", ".cancel-confirm-password", function () {
    alert("hi");
    $(".popup-overlay-confirm-pass").hide();
    $(".popup-confirm-pass").hide();
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    window.location.href = "/signin";
  });
});
