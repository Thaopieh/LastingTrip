$(document).ready(function () {
  // Hàm để render lại trang sau khi nhận dữ liệu mới từ server
  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/users/getAllUser",
      method: "GET",
      success: function (data) {
        var tableHtml = "";
        data.forEach(function (user) {
          // Tạo HTML cho từng hàng trong bảng
          tableHtml += "<tr>";
          tableHtml += "<td>" + user.id + "</td>";
          tableHtml += "<td>" + user.name + "</td>";
          tableHtml += "<td>" + user.email + "</td>";
          tableHtml += "<td>" + user.password + "</td>";
          tableHtml += "<td>" + user.numberPhone + "</td>";
          tableHtml += "<td>" + user.type + "</td>";
          tableHtml += "<td>";
          tableHtml +=
            '<button type="button" class="editUser" value="' +
            user.id +
            '">Edit</button>';
          tableHtml +=
            '<button type="button" class="deleteUser" value="' +
            user.id +
            '">Delete</button>';
          tableHtml += "</td>";
          tableHtml += "<td><i class='fa-solid fa-image'></i></td>"; // Add icon
          tableHtml += "</tr>";
        });
        // Render dữ liệu vào bảng
        $(".users-table table tbody").html(tableHtml);
      },
      error: function (xhr, status, error) {
        console.error(error);
        // Xử lý lỗi nếu có
      },
    });
  }

  // Gọi hàm renderPage khi trang được tải
  renderPage();

  // Sự kiện khi click vào nút "Thêm"
  // $(".users-search-create").click(function () {
  //   $(".custom-popup-overlay").show();
  //   $(".custom-popup").show();
  // });

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
  $(document).on("click", ".deleteUser", function () {
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
      url: `http://localhost:${port}/api/v1/users/deleteUser/${id}`,
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

  // Sự kiện khi người dùng xác nhận xóa
  $(".confirm-btn").click(function () {
    // Lấy ID người dùng từ thuộc tính data
    let id = $(".popup-confirm").attr("data-id");

    // Gửi yêu cầu xóa người dùng
    $.ajax({
      url: `http://localhost:${port}/api/v1/users/deleteUser/${id}`,
      method: "DELETE",
      success: function (data) {
        // Xử lý thành công
        $(".popup-overlay-confirm").hide();
        $(".popup-confirm").hide();

        // Gọi lại hàm renderPage để cập nhật trang
        renderPage();
      },
      error: function (error) {
        // Xử lý lỗi
        console.log("Đã xảy ra lỗi khi xóa người dùng:", error);
      },
    });
  });

  // Sự kiện khi người dùng hủy bỏ việc xóa
  $(".cancel-btn").click(function () {
    $(".popup-overlay-confirm").hide();
    $(".popup-confirm").hide();
  });

  // Sự kiện khi click vào nút "Đăng ký"
  $(".dkbutton").click(function () {
    var name = $("#name").val(); // Lấy giá trị từ trường nhập liệu Name
    var email = $("#email").val();
    var password = $("#password").val(); // Lấy giá trị từ trường nhập liệu Email
    var numberPhone = $("#numberPhone").val();
    var type = $("#typeSelect").val(); // Lấy giá trị từ trường select
    console.log(type);
    if (!name || !email || !password || !numberPhone || !type) {
      // Kiểm tra xem các trường đã được điền đầy đủ hay chưa
      // alert("Vui lòng điền đầy đủ thông tin.");
      return; // Dừng lại nếu có trường không được nhập
    }
    var dataT = {
      name: name,
      email: email,
      password: password,
      numberPhone: numberPhone,
      type: type,
    };
    // Gửi yêu cầu thêm người dùng
    $.ajax({
      url: `http://localhost:${port}/api/v1/users/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(dataT),
      success: function (data) {
        // Xử lý thành công, sau khi thêm, gọi lại hàm renderPage để cập nhật trang
        renderPage();
        console.log("Người dùng đã được tạo.");
      },
      error: function (error) {
        // Xử lý lỗi
        console.log("Đã xảy ra lỗi khi tạo người dùng:", error);
      },
    });
  });

  // Sự kiện khi click vào nút "Sửa"
  // $(document).on("click", ".editUser", function () {
  //   var id = $(this).val();
  //   $(".popup-overlay").show();
  //   // Gửi yêu cầu để lấy chi tiết người dùng
  //   $.ajax({
  //     url: `http://localhost:${port}/api/v1/users/getDetailUser/${id}`,
  //     method: "GET",
  //     success: function (data) {
  //       console.log("2");
  //       console.log(data);
  //       $(".popup-overlay").html(`
  //           <div class="popup">
  //             <span class="close-btn">&times;</span>
  //             <h2>Cập nhật</h2>
  //             <p>admin</p>
  //             <form id="updateForm">
  //               <input type="text" id="name" name="name" placeholder="Name" value="${data.name}" required>
  //               <input type="email" id="email" name="email" placeholder="Email" value="${data.email}" required>
  //               <div class="input-group">
  //                 <input type="text" id="numberPhone" name="numberPhone" placeholder="number phone" value="${data.numberPhone}" style="flex: 80%;">
  //                 <select id="typeSelect" name="type">
  //               <option value="">Chọn loại</option>
  //               <option value="admin">admin</option>
  //               <option value="agent">agent</option>
  //                <option value="client">client</option>
  //             <!-- Thêm các tùy chọn khác nếu cần -->
  //           </select>
  //               </div>
  //               <div class="ebutton">
  //                 <input type="submit" value="Cập nhật">
  //               </div>
  //             </form>
  //           </div>`);
  //       $(".ebutton").click(function () {
  //         console.log(id);
  //         var name = $("#name").val(); // Lấy giá trị từ trường nhập liệu Name
  //         var email = $("#email").val(); // Lấy giá trị từ trường nhập liệu Email
  //         var numberPhone = $("#numberPhone").val();
  //         var type = $("#type").val(); // Lấy giá trị từ trường nhập liệu NumberPhone
  //         if (!name || !email || !password || !numberPhone || !type) {
  //           // Kiểm tra xem các trường đã được điền đầy đủ hay chưa
  //           // alert("Vui lòng điền đầy đủ thông tin.");
  //           return; // Dừng lại nếu có trường không được nhập
  //         }

  //         var dataT = {
  //           name: name,
  //           email: email,
  //           numberPhone: numberPhone,
  //           type: type,
  //         };

  //         $.ajax({
  //           url: `http://localhost:${port}/api/v1/users/editUser/${id}`,
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           data: JSON.stringify(dataT),
  //           success: function (data) {
  //             // Xử lý thành công, sau khi sửa, gọi lại hàm renderPage để cập nhật trang
  //             renderPage();
  //             console.log("Người dùng đã được sửa.");
  //           },
  //           error: function (error) {
  //             console.log("Đã xảy ra lỗi khi sửa người dùng:", error);
  //           },
  //         });
  //       });
  //       $(".close-btn").click(function () {
  //         $(".popup-overlay").hide();
  //       });
  //     },
  //   });
  // });
});
