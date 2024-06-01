$(document).ready(function () {
  // Hàm để render lại trang sau khi nhận dữ liệu mới từ server
  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/hotels/",
      method: "GET",
      success: function (data) {
        var tableHtml = "";
        data.forEach(function (hotel, index) {
          // Tạo HTML cho từng hàng trong bảng
          tableHtml += "<tr>";
          tableHtml += '<td class="col1">' + (index + 1) + "</td>";
          tableHtml += '<td class="col2" >' + hotel.name + "</td>";
          tableHtml += '<td class="col1">' + hotel.star + "</td>";
          // tableHtml += '<td class="col2">' + hotel.map + "</td>";
          // console.log(hotel.map);
          var text = hotel.map;
          const cityList = [
            "Đà Nẵng",
            "TP.HCM",
            "Quảng Ninh",
            "Bắc Giang",
            "Lâm Đồng",
            "Hà Nội",
            "Khánh Hòa",
            "Kiên Giang",
            "Thừa Thiên-Huế",
            "Bà Rịa-Vũng Tàu",
          ];

          cityList.forEach((tu) => {
            if (text && text.includes(tu)) {
              text = tu;
              tableHtml += '<td class="col2">' + text + "</td>";
            }
          });

          tableHtml += '<td class="col2">' + hotel.TypeHotel + "</td>";
          tableHtml += '<td class="col2">' + hotel.cost + "</td>";
          tableHtml += '<td class="col2">' + hotel.payment + "</td>";
          tableHtml += '<td class="col1">' + hotel.ownerId + "</td>";
          tableHtml += "<td>";

          // Thêm button Chỉnh sửa
          tableHtml +=
            '<button type="button" class="updateHotel" value="' +
            hotel.id +
            '">Chỉnh sửa</button>';

          // Thêm button Xóa và lưu ID của khách sạn trong thuộc tính data-id của icon
          tableHtml +=
            '<button type="button" class="deleteHotel" value="' +
            hotel.id +
            '">Xóa</button>';
          tableHtml +=
            '<button type="button" class="addRoom" value="' +
            hotel.id +
            '">Phòng</button>';
          tableHtml +=
            '<button type="button" class="ManageHotelService" value="' +
            hotel.id +
            '">Dịch Vụ</button>';

          // Thêm icon với thuộc tính data-id chứa ID của khách sạn
          tableHtml +=
            '<td><i class="fa-solid fa-image" data-id="' +
            hotel.id +
            '"></i></td>';

          tableHtml += "</td>";
          tableHtml += "</tr>";
        });
        // Render dữ liệu vào bảng
        $(".agent-table table tbody").html(tableHtml);
        console.log("Đang render page");
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
    // window.location.href = `/admin/addHotel`;
    $("#contentAddHotel").show();
    $("#content1").hide();
    $("#content2").hide();
  });

  $(document).on("click", ".ManageHotelService", function () {
    let id = $(this).val();
    localStorage.setItem("hotelId", id);
    window.location.href = `/ManageHotelService/${id}`;
  });

  // Sự kiện khi click vào nút "Đóng" trong popup
  $(".close-btn").click(function () {});

  // Sự kiện khi click vào nút "Đóng" trong popup thông báo xóa
  $(".close-btn1").click(function () {
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });

  // Sự kiện khi click vào nút "Xóa"
  $(document).on("click", ".deleteHotel", function () {
    let id = $(this).val();
    console.log("hotel id" + id);

    // Hiển thị hộp thoại xác nhận xóa
    $(".popup-overlay-delete").show();
    $(".popup-delete").show();

    // Lưu ID người dùng vào một thuộc tính data để sử dụng sau này
    $(".popup-delete").attr("data-id", id);
  });

  // Sự kiện khi người dùng xác nhận xóa
  $(".confirm-delete-hotel").click(function () {
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

  $(document).on("click", ".addRoom", function () {
    let id = $(this).val();
    console.log(id);
    localStorage.setItem("hotelId", id);
    window.location.href = `/ManageRoom/${id}`;
  });

  $(".dkbutton").on("click", function () {
    var name = $("#name").val();
    var star = $("#star").val();
    var map = $("#map").val();
    var TypeHotel = $("#TypeHotel").val();
    // var cost = $("#cost").val();
    var ownerId = localStorage.getItem("id");
    var payment = $("#payment").val();

    var fileInput = document.querySelector("input[type='file']");
    var files = fileInput.files; // Danh sách các file đã chọn

    var formData = new FormData();
    formData.append("name", name);
    formData.append("star", star);
    formData.append("map", map);
    formData.append("TypeHotel", TypeHotel);
    // formData.append("cost", cost);
    formData.append("ownerId", ownerId);
    formData.append("payment", payment);

    // Lặp qua từng file đã chọn và thêm vào formData
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append("hotel", file); // Sử dụng '[]' để gửi dưới dạng mảng trên máy chủ
    }

    // Gửi yêu cầu thêm khách sạn với các files ảnh
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels/`,
      method: "POST",
      processData: false, // Ngăn jQuery xử lý dữ liệu
      contentType: false, // Ngăn jQuery đặt loại nội dung
      data: formData,
      success: function (data) {
        renderPage();
        console.log("Khách sạn đã được tạo.");
        alert("Thành công!");
        window.location.href = `/agentInfo`;
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
                <label>Chủ sở hữu</label>
                <input type="text" id="HotelOwnerId"  placeholder="Chủ sở hữu *" value="${
                  data.ownerId
                }"required />                <div class="ebutton">
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
          const ownerId = $("#HotelOwnerId").val();
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
              ownerId: ownerId,
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

  $(".close-btn").click(function () {
    $("#imagePopupOverlayHotel").hide();
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
  $("#confirm1").on("click", function () {
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
});
