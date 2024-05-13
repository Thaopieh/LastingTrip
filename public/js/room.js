$(document).ready(function () {
    var hotelId1 = localStorage.getItem("hotelId");
    function renderPage() {
        $.ajax({
            url: "http://localhost:3030/api/v1/rooms/",
            method: "GET",
            data: { hotelId: hotelId1 },
            success: function (data) {
                console.log(data);
                var tableHtml = "";
                data.forEach(function (room) {
                    // Tạo HTML cho từng hàng trong bảng
                    tableHtml += "<tr>";
                    tableHtml += "<td>" + room.id + "</td>";
                    tableHtml += "<td>" + room.name + "</td>";
                    tableHtml += "<td>" + room.status + "</td>";
                    tableHtml += "<td>" + room.price + "</td>";
                    tableHtml += "<td>" + room.quantity + "</td>";
                    tableHtml += "<td>" + room.quantity_people + "</td>";
                    tableHtml += "<td>" + room.type_bed + "</td>";
                    tableHtml += `<td><i class='fa-solid fa-image' data-id='${room.id}'></i></td>`; // Add icon with data-id attribute
                    tableHtml += "<td>";
                    tableHtml +=
                        '<button type="button" class="updateRoom" value="' +
                        room.id + '">Chỉnh sửa</button>';
                    tableHtml +=
                        '<button type="button" class="deleteRoom" value="' +
                        room.id + '">Xóa</button>';
                    tableHtml +=
                        '<button type="button" class="ManageService" value="' +
                        room.id + '">Quản Lý Dịch Vụ</button>';
                    tableHtml += "</td>";
                    tableHtml += "</tr>";
                });
                // Render dữ liệu vào bảng
                $(".room-table table tbody").html(tableHtml);
            },
            error: function (xhr, status, error) {
                console.error(error);
                console.log('Lỗi khi render page room')
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


    $(".dkbutton").click(function () {
        event.preventDefault(); // Prevent default form submission

        var formData = new FormData();
        var name = $("#name").val();
        var status = $("#status").val();
        var price = $("#price").val();
        var quantity = $("#quantity").val();
        var quantity_people = $("#quantity_people").val();
        var type_bed = $("#type_bed").val();
        var hotelId = localStorage.getItem("hotelId");
      
        var fileInput = document.getElementById("ImageRoom");
        if(fileInput.files.length === 0)
            {
                console.log(fileInput.files.length);
                alert("sai");
            }
        for (var i = 0; i < fileInput.files.length; i++) {
            formData.append("room", fileInput.files[i]); // Use 'files[]' to send as an array
        }

        // Create FormData object and append form data
       
        formData.append("name", name);
        formData.append("status", status);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("quantity_people", quantity_people);
        formData.append("type_bed", type_bed);
        formData.append("hotelId", hotelId);

        
        // Make AJAX request
        $.ajax({
            url: "http://localhost:3030/api/v1/rooms/",
            method: "POST",
            data: formData,
            contentType: false, // Important for FormData
            processData: false, // Important for FormData
            success: function (data) {
                renderPage();
                $(".custom-popup-overlay").hide();
                $(".custom-popup").hide();
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
        $(".popup-overlay").show();
        // Gửi yêu cầu để lấy chi tiết người dùng
        $.ajax({
            url: `http://localhost:3030/api/v1/rooms/${id}`,
            method: "GET",
            success: function (data) {
                console.log(data);
                const hotelId = localStorage.getItem("hotelId")
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
             value="${hotelId}" required> 
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
                    const hotelId = localStorage.getItem("hotelId")

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
                    $(".popup-overlay").hide();
                });
            },
        });
    });

    // JavaScript to show the modal
    // Event listener for close button


    // Example: Open the modal when clicking a button

    $(document).on("click", ".fa-image", function () {
        var IdRoom = $(this).data("id");
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
                        var deleteButton = $("<button class='delete-image-btn'>Delete</button>");

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
                console.log("Tên tệp: " + file.name + ", Kích thước: " + file.size + " bytes");
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
            processData: false,  // Không xử lý dữ liệu
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
            }
        });
    });
});
