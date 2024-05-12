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
          tableHtml += '<td class="col2">' + hotel.name + "</td>";
          tableHtml += '<td class="col1">' + hotel.star + "</td>";
          tableHtml += '<td class="col2">' + hotel.map + "</td>";
          // tableHtml += '<td class="col2">' + hotel.roomType + "</td>";
          tableHtml += '<td class="col2">' + hotel.TypeHotel + "</td>";
          // tableHtml += '<td class="col2">' + hotel.status + "</td>";
          tableHtml += '<td class="col2">' + hotel.cost + "</td>";
          // tableHtml += '<td class="col1">' + hotel.type + "</td>";
          tableHtml += '<td class="col2">' + hotel.payment + "</td>";
          tableHtml += "<td>";

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

          tableHtml += "<td><i class='fa-solid fa-image'></i></td>"; // Add icon

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
  // $(document).on("click", ".deleteHotel", function () {
  //     let id = $(this).val();
  //     // Gửi yêu cầu xóa người dùng
  //     $.ajax({
  //         url: `http://localhost:3030/api/v1/hotels/deleteHotel/${id}`,
  //         method: "DELETE",
  //         success: function (data) {
  //             renderPage();
  //             $(".popup-overlay-delete").show();
  //             $(".popup-delete").show();
  //         },
  //         error: function (error) {
  //             console.log("Lỗi khi xóa người dùng", error);
  //         },
  //     });
  // });

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
    window.location.href = `/agent/room/${id}`;
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
    $(".popup-overlay").show();
    // Gửi yêu cầu để lấy chi tiết người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/hotels/${id}`,
      method: "GET",
      success: function (data) {
        console.log("2");
        console.log(data);
        $(".popup-overlay").html(`
          <div class="popup"> 
          <span class="close-btn">&times;</span> 
          <h2>Chỉnh sửa</h2> 
          <form id="updateForm"> 
              <input type="text" id="name" name="name" placeholder="Tên khách sạn" value="${data.name}" required>
              <input type="text" id="star" name="star" placeholder="Đánh giá" value="${data.star}" required> 
              <input type="text" id="map" name="map" placeholder="Địa chỉ" value="${data.map}" required> 

              <input type="text" id="TypeHotel" name="TypeHotel" placeholder="Loại khách sạn" value="${data.TypeHotel}"
                 required>    
              <input type="text" id="cost" name="cost" placeholder="Giá" value="${data.cost}" required> 
              <input type="text" id="payment" name="payment" placeholder="Phương thức thanh toán" value="${data.payment}"
                 required> 
              <div class="ebutton"> 
                  <input type="submit" value="Cập nhật"> 
                  </div> 
              </form> 
          </div> `);

        $(".ebutton").click(function () {
          console.log(id);
          const name = $("#name").val();
          const star = $("#star").val();
          const map = $("#map").val();
          const TypeHotel = $("#TypeHotel").val();
          const cost = $("#cost").val();
          const payment = $("#payment").val();

          $.ajax({
            url: `http://localhost:3030/api/v1/hotels/updateHotel/${id}`,
            method: "PUT",
            data: {
              name,
              star,
              map,
              TypeHotel,
              cost,
              payment,
            },
            success: function (data) {
              renderPage();
              console.log("Chỉnh sửa khách sạn thành công");
            },
            error: function (error) {
              console.log("Lỗi khi chỉnh sửa khách sạn", error);
            },
          });
        });
        $(".close-btn").click(function () {
          $(".popup-overlay").hide();
        });
      },
    });
  });

  $(document).on("click", ".fa-image", function () {
    var imageUrl = $(this).data("image-url");
    $("#imagePreview").attr("src", imageUrl);
    $("#imagePopupOverlay").css("display", "block");
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
});
