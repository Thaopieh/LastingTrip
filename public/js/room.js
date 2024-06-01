$(document).ready(function () {
  var hotelId1 = localStorage.getItem("hotelId");
  console.log(hotelId1);
  function renderPage() {
    $.ajax({
      url: `http://localhost:3030/api/v1/rooms?hotelId=${hotelId1}`,
      method: "GET",
      data: { hotelId: hotelId1 },
      success: function (data) {
        console.log(data);
        var tableHtml = "";
        data.forEach(function (room, index) {
          // Tạo HTML cho từng hàng trong bảng
          tableHtml += "<tr>";
          tableHtml += `<td data-title="ID";>` + (index + 1) + "</td>";
          tableHtml += `<td data-title="Tên">` + room.name + "</td>";
          if (room.status == "1") {
            tableHtml += '<td data-title="Trạng thái">' + "Còn phòng" + "</td>";
          } else {
            tableHtml += `<td data-title="Trạng thái">` + "Hết phòng" + "</td>";
          }
          tableHtml += `<td data-title="Giá">` + room.price + "</td>";
          tableHtml += `<td data-title="Số lượng">` + room.quantity + "</td>";
          tableHtml +=
            `<td data-title="Số lượng người">` + room.quantity_people + "</td>";
          tableHtml += `<td data-title="Loại phòng">` + room.type_bed + "</td>";
          tableHtml += `<td data-title="Hotel_ID">` + room.hotelId + "</td>";

          tableHtml += `<td data-title="Chỉnh sửa/Xóa">`;
          tableHtml +=
            '<button type="button" class="deleteRoom" value="' +
            room.id +
            '">Xóa</button>';
          tableHtml +=
            '<button type="button" class="ManageRoomService" value="' +
            room.id +
            '">Quản Lý Dịch Vụ</button>';
          tableHtml += `<td data-title="Hình ảnh"><i class='fa-solid fa-image' data-id='${room.id}'></i></td>`; // Add icon with data-id attribute

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
    $(".popup-overlay-addRoom").show();
    $(".popup-addRoom").show();
  });

  // Sự kiện khi click vào nút "Đóng" trong popup
  $(".custom-close-btn").click(function () {
    $(".popup-overlay-addRoom").hide();
    $(".popup-addRoom").hide();
  });
  $(document).on("click", ".deleteRoom", function () {
    // Hiển thị overlay và popup
    console.log("Delete room button clicked");
    console.log($(this).val());
    $(".confirm-delete").val($(this).val());
    $(".popup-overlay-delete").show();
    $(".popup-delete").show();
  });
  // Sự kiện khi click vào nút "Đóng" trong popup thông báo xóa
  $(document).on("click", ".close-btn1", function () {
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });
  $(document).on("click", ".cancel-delete", function () {
    // Ẩn đi overlay và popup
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });

  // Sự kiện khi click vào nút "Xóa"
  $(document).on("click", ".confirm-delete", function () {
    let id = $(this).val();
    console.log(id);
    // Gửi yêu cầu xóa người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/rooms/${id}`,
      method: "DELETE",
      success: function (data) {
        renderPage();
        $(".popup-overlay-delete").hide();
        $(".popup-delete").hide();
      },
      error: function (error) {
        console.log("Lỗi khi xóa người dùng", error);
      },
    });
  });

  $(".addRoombtn").click(function () {
    var formData = new FormData();
    var name = $("#name").val();
    var status = $("#status").val();
    var price = $("#price").val();
    var quantity = $("#quantity").val();
    var quantity_people = $("#quantity_people").val();
    var type_bed = $("#type_bed").val();
    var hotelId = localStorage.getItem("hotelId");

    // var fileInput = document.getElementById("ImageRoom");
    // if (fileInput.files.length === 0) {
    //   console.log(fileInput.files.length);
    //   alert("sai");
    // }
    // for (var i = 0; i < fileInput.files.length; i++) {
    //   formData.append("room", fileInput.files[i]); // Use 'files[]' to send as an array
    // }
    var fileInput = document.querySelector("input[type='file']");
    var files = fileInput.files; // Danh sách các file đã chọn

    // Create FormData object and append form data

    formData.append("name", name);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("quantity_people", quantity_people);
    formData.append("type_bed", type_bed);
    formData.append("hotelId", hotelId);

    // Lặp qua từng file đã chọn và thêm vào formData
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append("room", file); // Sử dụng '[]' để gửi dưới dạng mảng trên máy chủ
    }

    // Make AJAX request
    $.ajax({
      url: "http://localhost:3030/api/v1/rooms/",
      method: "POST",
      data: formData,
      contentType: false, // Important for FormData
      processData: false, // Important for FormData
      success: function (data) {
        renderPage();
        alert("Thêm phòng thành công!");
        $(".popup-overlay-addRoom").hide();
        $(".popup-addRoom").hide();
        console.log("Room created:", data);
      },
      error: function (error) {
        console.error("Error creating room:", error);
      },
    });
  });

  // Sự kiện khi click vào nút "Sửa"
  $(document).on("click", ".updateRoom", function () {
    var id = $(this).val();
    $(".popup-overlay-addRoom").show();
    // Gửi yêu cầu để lấy chi tiết người dùng
    $.ajax({
      url: `http://localhost:3030/api/v1/rooms/${id}`,
      method: "GET",
      success: function (data) {
        console.log(data);
        const hotelId = localStorage.getItem("hotelId");
        $(".popup-overlay-addRoom").html(`
          <div class="popup-addRoom"> 
          <span class="close-btn">&times;</span> 
          <h2>Chỉnh sửa</h2> 
          <form id="updateForm"> 
          <label>Loại phòng</label>
            <select class="form-select" name="name" id="name">
          ${[
            "Standard Room",
            "Grand Suite",
            "Deluxe Room",
            "Executive Suite",
            "Family Room",
            "Triple Room",
            "Twin Room",
            "Superior Room",
            "Suite",
            "Junior Suite",
            "Penthouse",
          ]
            .map(
              (optionValue) =>
                `<option value="${optionValue}" ${
                  optionValue.toString() === data.name.toString()
                    ? "selected"
                    : ""
                }>${optionValue}</option>            `
            )
            .join("")}
              </select>
          <label>Trạng thái</label>
          <select
          class="form-select"
          name="status"
          id="status"
          placeholder="Trạng thái *"
        >
          <option value="1">Còn phòng</option>
          <option value="0">Hết phòng</option>
        </select>
            <label>Giá phòng</label>
          <input type="text" id="price" name="price" placeholder="Giá" value="${
            data.price
          }" required> 
          <label>Số lượng phòng1</label>
          <select
            class="form-select"
            name="quantity"
            id="quantity"
            placeholder="Số lượng phòng *"
          >
            <option value="1">1 phòng</option>
            <option value="2">2 phòng</option>
            <option value="3">3 phòng</option>
            <option value="4">4 phòng</option>
            <option value="5">5 phòng</option>
            <option value="6">6 phòng</option>
          </select>
          <label>Số lượng người</label>
          <select
          class="form-select"
          name="quantity_people"
          id="quantity_people"
          placeholder="Số lượng người *"
        >
          <option value="1">1 người</option>
          <option value="2">2 người</option>
          <option value="3">3 người</option>
          <option value="4">4 người</option>
        </select>

          <labeL>Loại giường</label>
          <select
          class="form-select"
          name="type_bed"
          id="type_bed"
          placeholder="Loại giường *"
        >
          <option value="King">King</option>
          <option value="Queen">Queen</option>
          <option value="Double">Double</option>
          <option value="Single">Single</option>
          <option value="Three Single">Three Single</option>
        </select>
         
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
          const hotelId = localStorage.getItem("hotelId");

          $.ajax({
            url: `http://localhost:3030/api/v1/rooms/${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
              name: name,
              status: status,
              price: price,
              quantity: quantity,
              quantity_people: quantity_people,
              type_bed: type_bed,
              hotelId: hotelId,
            }),

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
          $(".popup-overlay-addRoom").hide();
        });
      },
    });
  });

  // JavaScript to show the modal
  // Event listener for close button

  // Example: Open the modal when clicking a button

  $(document).on("click", ".fa-image", function () {
    var IdRoom = $(this).data("id");
    console.log(IdRoom);
    var hotelId = localStorage.getItem("hotelId");
    localStorage.setItem("IdRoom", IdRoom);
    $("#imagePopupOverlay").css("display", "block");
    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageRoom/?IdRoom=" + IdRoom,
      method: "GET",
      success: function (data) {
        console.log(data);
        // Xử lý khi nhận được danh sách các ảnh từ server
        if (data && data.length > 0) {
          // Xóa bất kỳ nội dung HTML cũ nào trong phần hiển thị ảnh
          $(".image-container").empty();

          // Duyệt qua danh sách ảnh và hiển thị từng ảnh trong popup overlay
          data.forEach(function (image) {
            var imageElement = $("<div class='image-item'></div>");
            var img = $("<img src='" + image.url + "' class='popup-image' />");
            imageElement.append(img);
            var deleteButton = $(
              "<button class='delete-image-btn'>Delete</button>"
            );

            // Set data attributes for delete button
            deleteButton.data("image-id", image.id);
            deleteButton.data("image-url", image.url);
            imageElement.append(deleteButton);

            // Append image item to container
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
    var id = $(this).data("image-id");
    // Lấy imageId từ data của nút delete
    var url = $(this).data("image-url");
    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageRoom/" + id,
      method: "DELETE",
      contentType: "application/json",
      data: JSON.stringify({ url: url }),
      success: function (response) {
        console.log(response); // In ra thông báo từ máy chủ

        // Đóng popup overlay sau khi xóa thành công
        $("#imagePopupOverlay").css("display", "none");

        // Thực hiện render lại trang hoặc cập nhật danh sách ảnh
        renderImages(); // Giả sử có hàm renderImages() để load lại danh sách ảnh
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
    $("#imagePopupOverlay").css("display", "none");
  });

  // Event listener for edit button
  $(document).on("click", "#editImageBtn", function () {
    // Handle edit functionality here
    console.log("Edit image");
  });

  // Event listener for delete button

  // Hàm để render lại danh sách ảnh sau khi thực hiện thay đổi
  function renderImages() {
    // Gọi lại hàm renderPage để cập nhật trang
    renderPage(); // Giả sử renderPage() là hàm để load lại danh sách người dùng
  }
  $("#addImageButton2").on("click", function () {
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

  $(document).on("click", ".ManageRoomService", function () {
    let id = $(this).val();
    localStorage.setItem("roomId", id);
    window.location.href = `/ManageRoomService/${id}`;
  });

  // Hàm hiển thị xem trước các tệp đã chọn

  // Sự kiện click cho nút "Confirm"
  $("#confirm").on("click", function () {
    var fileInput = document.querySelector(".dienmau input[type='file']");
    var file = fileInput.files;
    console.log("file", file);
    var formData = new FormData();
    var storedRoomId = localStorage.getItem("IdRoom");

    // Nếu không có tệp nào được chọn, không thực hiện gì cả
    if (file.length === 0) {
      alert("Vui lòng chọn ít nhất một tệp ảnh.");
      return;
    }

    // Tạo FormData để chứa các tệp đã chọn

    for (var i = 0; i < file.length; i++) {
      formData.append("room", file[i]); // Thêm từng tệp vào FormData
    }
    formData.append("IdRoom", storedRoomId);
    console.log(storedRoomId);
    console.log(formData);
    // Gửi yêu cầu AJAX POST lên server
    $.ajax({
      url: "http://localhost:3030/api/v1/urlImageRoom",
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
