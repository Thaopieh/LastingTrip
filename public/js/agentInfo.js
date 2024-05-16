$(document).ready(function () {
  function getToken() {
    return localStorage.getItem("token"); // Thay 'token' bằng key lưu trữ token của bạn
  }
  function getUserId() {
    return localStorage.getItem("id");
  }

  const token = getToken();
  const ownerId = getUserId(); // Lấy ownerId từ hàm getUserId() của bạn
  let hotelId;

  if (token) {
    // alert(ownerId);
  } else {
    alert("Vui lòng đăng nhập để xem thông tin khách sạn.");
    // Chuyển hướng đến trang login
    window.location.href = "/signin";
  }

  var url = window.location.pathname;
  var testId = url.substring(url.lastIndexOf("/") + 1);
  if (testId != ownerId) {
    alert("Bạn không có quyền truy cập!");
    window.location.href = `/agentInfo/${ownerId}`;
  }

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
          tableHtml += "<td><i class='fa-solid fa-image'></i></td>"; // Add icon
          tableHtml += "        </div>";
          tableHtml += '        <div class="col-6">';
          tableHtml += '            <div class="title-name">';
          tableHtml += '                <i class="fa-regular fa-map"></i>';
          tableHtml += "                <span>Tiện nghi</span>";
          tableHtml += "            </div>";
          tableHtml += "<td><i class='fa-solid fa-home'></i></td>";
          tableHtml += "        </div>";
          tableHtml += "    </div>";

          tableHtml +=
            '<button type="button" class="updateHotel" value="' +
            hotel.id +
            '">Chỉnh sửa</button>';
          tableHtml +=
            '<button type="button" class="deleteHotel" value="' +
            hotel.id +
            '">Xóa</button>';
          tableHtml +=
            '<button type="button" class="addRoom" value="' +
            hotel.id +
            '">Thêm phòng</button>';
          tableHtml += "</div>";

          // Render dữ liệu vào bảng
          // $(".agent-table table tbody").html(tableHtml);
          $(".mytable").html(tableHtml);
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
  }
  renderPage();

  // Sự kiện khi click vào nút "Thêm"
  $(".agent-search-create").click(function () {
    window.location.href = `/agent/addHotel`;
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

  // Sự kiện khi người dùng xác nhận xóa
  $(".confirm-btn").click(function () {
    // Lấy ID người dùng từ thuộc tính data
    let id = $(".popup-confirm").attr("data-id");

    // Gửi yêu cầu xóa người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels/deleteHotel/${id}`,
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
        console.log("Đã xảy ra lỗi khi xóa khách sạn:", error);
      },
    });
  });

  // Sự kiện khi người dùng hủy bỏ việc xóa
  $(".cancel-btn").click(function () {
    $(".popup-overlay-confirm").hide();
    $(".popup-confirm").hide();
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
    alert("hehe");
    var id = $(this).val();
    $(".popup-overlay-updateHotel").show();
    // Gửi yêu cầu để lấy chi tiết người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels/${id}`,
      method: "GET",
      success: function (data) {
        console.log("2");
        console.log(data);
        $(".popup-overlay-updateHotel").html(`
          <div class="popup">
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
                  `                <option value="${optionValue}" ${
                    optionValue.toString() === data.star.toString()
                      ? "selected"
                      : ""
                  }>${optionValue}</option>            `
              )
              .join("")}
              </select>
            <label>Địa chỉ</label>
            <input type="text" id="Hotelmap" name="map" placeholder="Địa chỉ *" value="${
              data.map
            }"required />

            <label>Loại khách sạn</label>
            <select class="form-select" name="HotelTypeHotel" id="HotelTypeHotel">
            ${["hotel", "resort", "homestay", "service apartment"]
              .map(
                (optionValue) => `
                <option value="${optionValue}" ${
                  optionValue.toString() === data.TypeHotel.toString()
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
                <option value="${optionValue1}" ${
                  optionValue1.toString() === data.payment.toString()
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

  $(document).on("click", ".fa-image", function () {
    var hotelId = $(this).data("id");
    localStorage.setItem("hotelId", hotelId);
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
  $(".close-btn").click(function () {
    $("#imagePopupOverlayHotel").hide();
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
        console.log(response); // In ra thông báo từ máy chủ
        alert("Delete Successful");
        renderPage();
        $.ajax({
          url:
            "http://localhost:3030/api/v1/urlImageHotel/?HotelId=" + hotelId1,
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
  $("#addImageButton").on("click", function () {
    // Khi người dùng nhấp vào nút "Add Image", kích hoạt sự kiện click cho input[type=file] ẩn
    $("#imageInput").click();
  });

  // Sự kiện change của input[type=file]
  $("#imageInput").on("change", function (e) {
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
  $("#confirm").on("click", function () {
    var fileInput = document.querySelector("input[type='file']");
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
    console.log(storedHotelId);
    console.log(formData);
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

  $(document).on("click", ".fa-home", function () {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf("/") + 1);
    localStorage.setItem("hotelId", id);
    window.location.href = `/ManageHotelService/${id}`;
  });

  // Khi người dùng nhấn vào nút "add-amenties"

  $(".personal-info-item").click(function () {
    $(".personal-info").show();
    $(".my-hotel").hide();
    $(".room-list").hide();
  });
  $(".my-hotel-item").click(function () {
    $(".personal-info").hide();
    $(".my-hotel").show();
    $(".room-list").hide();
  });
  $(".room-list-item").click(function () {
    $(".personal-info").hide();
    $(".my-hotel").hide();
    $(".room-list").show();
  });
});
