$(document).ready(function () {
  $(document).on("click", ".fa-image", function () {
    var imageUrl = $(this).data("image-url");
    $("#imagePreview").attr("src", imageUrl);
    $("#imagePopupOverlayUser").css("display", "block");
  });

  // Event listener for closing the popup
  $(document).on("click", ".close-btn", function () {
    $("#imagePopupOverlayUser").css("display", "none");
  });

  // Event listener for edit button
  $(document).on("click", "#editImageBtn", function () {
    // Handle edit functionality here
    console.log("Edit image");
  });

  // Event listener for delete button
  $(document).on("click", "#deleteImageBtn", function () {
    // Handle delete functionality here
    console.log("Delete image");
  });
  // Hàm để render lại trang sau khi nhận dữ liệu mới từ server
  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/users/getAllUser",
      method: "GET",
      success: function (data) {
        var tableHtml = "";
        data.forEach(function (user, index) {
          // Tạo HTML cho từng hàng trong bảng
          tableHtml += "<tr>";
          tableHtml += "<td>" + (index + 1) + "</td>";
          tableHtml += "<td>" + user.name + "</td>";
          tableHtml += "<td>" + user.email + "</td>";
          tableHtml += "<td>" + user.numberPhone + "</td>";
          tableHtml += "<td>" + user.type + "</td>";
          tableHtml += "<td>";
          tableHtml +=
            '<button type="button" class="editUser" value="' +
            user.id +
            '">Chỉnh sửa</button>';
          tableHtml +=
            '<button type="button" class="deleteUser" value="' +
            user.id +
            '">Xóa</button>';
          tableHtml += "</td>";
          // tableHtml += "<td><i class='fa-solid fa-image'></i></td>";
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
  $(".users-search-create").click(function () {
    $(".custom-popup-overlay-user").show();
    $(".custom-popup-user").show();
  });

  // Sự kiện khi click vào nút "Đóng" trong popup
  $(".custom-close-btn").click(function () {
    $(".custom-popup-overlay-user").hide();
    $(".custom-popup-user").hide();
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
  $(".confirm-delete-user").click(function () {
    // Lấy ID người dùng từ thuộc tính data
    let id = $(".popup-delete").attr("data-id");

    // Gửi yêu cầu xóa người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/users/deleteUser/${id}`,
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
      url: `http://localhost:3030/api/v1/users/deleteUser/${id}`,
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
      url: `http://localhost:3030/api/v1/users/register`,
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
  $(document).on("click", ".fa-image", function () {
    var imageUrl = $(this).data("image-url");
    $("#imagePreview").attr("src", imageUrl);
    $("#imagePopupOverlayUser").css("display", "block");
    $(".popup-content-user-img").show();

    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageHotel/?HotelId=48",
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
      },
    });
  });
  $("#addImageButton3").on("click", function () {
    alert("cc");
    // Khi người dùng nhấp vào nút "Add Image", kích hoạt sự kiện click cho input[type=file] ẩn
    $("#imageInput").click();
  });

  $(document).on("click", ".delete-image-btn", function () {
    var id = $(this).data("image-id"); // Lấy imageId từ data của nút delete
    var url = $(this).data("image-url");
    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageHotel/?id=" + id,
      method: "DELETE",
      contentType: "application/json",
      data: JSON.stringify({ url: url }),
      success: function (response) {
        console.log(response); // In ra thông báo từ máy chủ

        // Sau khi xóa thành công, có thể làm điều gì đó, ví dụ: làm mới danh sách ảnh
        // window.location.reload(); // Làm mới trang hoặc thực hiện các thao tác khác
      },
      error: function (error) {
        console.log("Đã xảy ra lỗi khi xóa ảnh:", error);
      },
    });
  });

  // Event listener for closing the popup
  $(document).on("click", ".close-btn", function () {
    $("#imagePopupOverlayUser").css("display", "none");
  });

  // Event listener for edit button
  $(document).on("click", "#editImageBtn", function () {
    // Handle edit functionality here
    console.log("Edit image");
  });

  // Event listener for delete button
  $(document).on("click", "#deleteImageBtn", function () {
    // Handle delete functionality here
    console.log("Delete image");

    // Lấy thông tin ảnh cần xóa từ popup overlay
    var imageUrl = $("#imagePreview").attr("src");

    // Gửi yêu cầu xóa ảnh đến server
    $.ajax({
      url: "http://localhost:3030/api/images/delete",
      method: "POST",
      data: { imageUrl: imageUrl }, // Gửi đường dẫn ảnh cần xóa
      success: function (data) {
        console.log("Image deleted successfully:", imageUrl);

        // Đóng popup overlay sau khi xóa thành công
        $("#imagePopupOverlayUser").css("display", "none");

        // Thực hiện render lại trang hoặc cập nhật danh sách ảnh
        renderImages(); // Giả sử có hàm renderImages() để load lại danh sách ảnh
      },
      error: function (error) {
        console.log("Error deleting image:", error);
      },
    });
  });

  // Hàm để render lại danh sách ảnh sau khi thực hiện thay đổi
  function renderImages() {
    // Gọi lại hàm renderPage để cập nhật trang
    renderPage(); // Giả sử renderPage() là hàm để load lại danh sách người dùng
  }
  // Sự kiện khi click vào nút "Sửa"
  $(document).on("click", ".editUser", function () {
    var id = $(this).val();
    $(".popup-overlay-update").show();
    // Gửi yêu cầu để lấy chi tiết người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/users/getDetailUser/${id}`,
      method: "GET",
      success: function (data) {
        console.log("2");
        console.log(data);
        $(".popup-overlay-update").html(`
              <div class="popup">
                <span class="close-btn">&times;</span>
                <h2>Cập nhật</h2>
                <form id="updateForm">
                <label>Tên</label>
                  <input type="text" id="name" name="name" placeholder="Name" value="${data.name}" required>
                <label>Địa chỉ mail</label>  
                  <input type="email" id="email" name="email" placeholder="Email" value="${data.email}" required>
              
                <label>Số điện thoại</label>
                    <input type="text" id="numberPhone" name="numberPhone" placeholder="number phone" value="${data.numberPhone}" style="flex: 80%;">
                <label>Loại người dùng</label>    
                    <select id="typeSelect" name="type">
                  <option value="">Chọn loại</option>
                  <option value="admin">admin</option>
                  <option value="owner">owner</option>
                   <option value="client">client</option>
              </select>
               
                  <div class="ebutton">
                    <input type="submit" value="Cập nhật">
                  </div>
                </form>
              </div>`);

        $(".ebutton").click(function () {
          console.log(id);
          var name = $("#name").val();
          var email = $("#email").val();
          var numberPhone = $("#numberPhone").val();
          var type = $("#typeSelect").val();
          // if (!name || !email || !password || !numberPhone || !type) {
          //   // Kiểm tra xem các trường đã được điền đầy đủ hay chưa
          //   // alert("Vui lòng điền đầy đủ thông tin.");
          //   return; // Dừng lại nếu có trường không được nhập
          // }

          var dataT = {
            name: name,
            email: email,
            numberPhone: numberPhone,
            type: type,
          };

          $.ajax({
            url: `http://localhost:3030/api/v1/users/editUser/${id}`,
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(dataT),
            success: function (data) {
              // Xử lý thành công, sau khi sửa, gọi lại hàm renderPage để cập nhật trang
              renderPage();
              console.log("Người dùng đã được sửa.");
            },
            error: function (error) {
              console.log("Đã xảy ra lỗi khi sửa người dùng:", error);
            },
          });
        });
        $(".close-btn").click(function () {
          $(".popup-overlay-update").hide();
        });
      },
    });
  });
});
