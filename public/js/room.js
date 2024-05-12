$(document).ready(function () {
  var url = window.location.pathname;
  var hotelId = url.substring(url.lastIndexOf("/") + 1);
  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/rooms?hotelId=" + hotelId,
      method: "GET",
      success: function (data) {
        var tableHtml = "";
        data.forEach(function (room, index) {
          // Tạo HTML cho từng hàng trong bảng
          tableHtml += "<tr>";
          tableHtml += "<td>" + (index + 1) + "</td>";
          tableHtml += "<td>" + room.name + "</td>";
          tableHtml += "<td>" + room.status + "</td>";
          tableHtml += "<td>" + room.price + "</td>";
          tableHtml += "<td>" + room.quantity + "</td>";
          tableHtml += "<td>" + room.quantity_people + "</td>";
          tableHtml += "<td>" + room.type_bed + "</td>";
          tableHtml += "<td>" + room.hotelId + "</td>";

          tableHtml += "<td>";
          tableHtml +=
            '<button type="button" class="updateRoom" value="' +
            room.id +
            '">Chỉnh sửa</button>';
          tableHtml +=
            '<button type="button" class="deleteRoom" value="' +
            room.id +
            '">Xóa</button>';
          tableHtml += "<td><i class='fa-solid fa-image'></i></td>"; // Add icon

          tableHtml += "</td>";
          tableHtml += "</tr>";
        });
        // Render dữ liệu vào bảng
        $(".room-table table tbody").html(tableHtml);
      },
      error: function (xhr, status, error) {
        console.error(error);
        console.log("Lỗi khi render page room");
      },
    });
  }

  renderPage();

  // Sự kiện khi click vào nút "Thêm"
  $(".room-search-create").click(function () {
    $(".custom-popup-overlay").show();
    $(".custom-popup").show();
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
  $(document).on("click", ".deleteRoom", function () {
    let id = $(this).val();
    console.log(id);
    // Gửi yêu cầu xóa người dùng
    $(".popup-overlay-delete").show();
    $(".popup-delete").show();
    $(".popup-delete").attr("data-id", id);
  });

  // Sự kiện khi người dùng xác nhận xóa
  $(".confirm-delete").click(function () {
    // Lấy ID người dùng từ thuộc tính data
    let id = $(".popup-delete").attr("data-id");

    $.ajax({
      url: `http://localhost:3030/api/v1/rooms/${id}`,
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
  });

  $(".dkbutton").click(function () {
    var name = $("#name").val();
    var status = $("#status").val();
    var price = $("#price").val();
    var quantity = $("#quantity").val();
    var quantity_people = $("#quantity_people").val();
    var type_bed = $("#type_bed").val();
    // var hotelId = $("#hotelid").val();

    var dataT = {
      name: name,
      status: status,
      price: price,
      quantity: quantity,
      quantity_people: quantity_people,
      hotelId: hotelId,
      type_bed: type_bed,
    };

    $.ajax({
      url: `http://localhost:3030/api/v1/rooms/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(dataT),
      success: function (data) {
        renderPage();
        console.log("Phòng đã được tạo.");
      },
      error: function (error) {
        // Xử lý lỗi
        console.log("Đã xảy ra lỗi khi tạo phòng", error);
      },
    });
  });

  // Sự kiện khi click vào nút "Sửa"
  $(document).on("click", ".updateRoom", function () {
    var id = $(this).val();
    $(".popup-overlay").show();
    // Gửi yêu cầu để lấy chi tiết người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/rooms/getDetailRoom/${id}`,
      method: "GET",
      success: function (data) {
        console.log(data);
        $(".popup-overlay").html(`
          <div class="popup"> 
          <span class="close-btn">&times;</span> 
          <h2>Chỉnh sửa</h2> 
          <form id="updateForm"> 
          <input type="text" id="name" name="name" placeholder="Tên khách sạn" value="${data.name}" required>
          <input type="text" id="status" name="status" placeholder="Trạng thái" value="${data.status}"
             required> 
          <input type="text" id="price" name="price" placeholder="Giá" value="${data.price}" required> 
          <input type="text" id="quantity" name="quantity" placeholder="Số lượngn" value="${data.quantity}"
             required> 
          <input type="text" id="quantity_people" name="quantity_peopole" placeholder="Số lượng người"
             value="${data.quantity_people}" required> 
          <input type="text" id="type_bed" name="type_bed" placeholder="Loại giường" value="${data.type_bed}"
             required> 
          <input type="text" id="hotelid" name="hotelid" placeholder="ID của khách sạn"
             value="${data.hotelId}" required> 
              <div class="ebutton"> 
                  <input type="submit" value="Cập nhật"> 
                  </div> 
              </form> 
          </div> `);

        $(".ebutton").click(function () {
          console.log(id);
          const name = $("#name").val();
          const status = $("#status").val();
          const price = $("#price").val();
          const quantity = $("#quantity").val();
          const quantity_people = $("#quantity_people").val();
          const type_bed = $("#type_bed").val();
          const hotelid = $("#hotelid").val();

          $.ajax({
            url: `http://localhost:3030/api/v1/rooms/updateRoom/${id}`,
            method: "PUT",
            data: {
              name,
              status,
              price,
              quantity,
              quantity_people,
              type_bed,
              hotelid,
            },
            success: function (data) {
              renderPage();
              console.log("Chỉnh sửa phòng thành công");
            },
            error: function (error) {
              console.log("Lỗi khi chỉnh sửa phòng", error);
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
      url: "http://localhost:3030/api/v1/urlImageRoom/?RoomId=48",
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
      url: "http://localhost:3030/api/v1/urlImageRoom/?id=" + id,
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
