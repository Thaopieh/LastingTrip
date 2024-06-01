$(document).ready(function () {
  // Hàm để render lại trang sau khi nhận dữ liệu mới từ server
  function renderPage() {
    $.ajax({
      url: "http://localhost:3030/api/v1/coupon/getAllCoupon",
      method: "GET",
      success: function (data) {
        var tableHtml = "";
        data.forEach(function (coupon, index) {
          // Tạo HTML cho từng hàng trong bảng
          tableHtml += "<tr>";
          tableHtml += "<td>" + (index + 1) + "</td>";
          tableHtml += '<td class="col2" >' + coupon.code + "</td>";
          tableHtml += '<td class="col2" >' + coupon.percent + "</td>";
          tableHtml +=
            '<td class="col2" >' + coupon.begin.slice(0, 10) + "</td>";
          tableHtml += '<td class="col2" >' + coupon.end.slice(0, 10) + "</td>";
          tableHtml += "<td>";

          tableHtml +=
            '<button type="button" class="deleteCoupon" value="' +
            coupon.id +
            '">Xóa</button>';
          tableHtml += "</td>";
          tableHtml += "</tr>";
        });
        // Render dữ liệu vào bảng
        $(".coupon-table table tbody").html(tableHtml);
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
  $(".coupon-search-create").click(function () {
    $(".coupon-popup-overlay").show();
    $(".coupon-popup").show();
  });
  $("#close-add-coupon").click(function () {
    $(".coupon-popup-overlay").hide();
    $(".coupon-popup").hide();
  });

  //Thêm 1 coupon mới
  $(".addCouponbtn").click(function () {
    var code = $("#code").val();
    var percent = $("#percent").val();
    var begin = $("#begin").val();
    var end = $("#end").val();
    console.log(code, percent, begin, end);

    $.ajax({
      url: "http://localhost:3030/api/v1/coupon/create",
      type: "POST",
      data: {
        code: code,
        percent: percent,
        begin: begin,
        end: end,
      },
      success: function (response) {
        renderPage();

        console.log("Coupon created successfully:", response);
        $(".coupon-popup-overlay").hide();
        $(".coupon-popup").hide();
      },
      error: function (xhr, status, error) {
        console.error("Error creating coupon:", error);
      },
    });
  });

  $("#close-update-coupon").click(function () {
    $(".popup-overlay-update").hide();
    $(".popup-update").hide();
  });
  //Sửa 1 coupon

  $(document).on("click", ".deleteCoupon", function () {
    var id = $(this).val();
    localStorage.setItem("couponId", id);
    $(".popup-overlay-delete").show();
    $(".popup-delete").show();
  });

  $(".cancel-delete").click(function () {
    $(".popup-overlay-delete").hide();
    $(".popup-delete").hide();
  });
  $(".confirm-delete-coupon").click(function () {
    let id = localStorage.getItem("couponId");
    $.ajax({
      url: `http://localhost:3030/api/v1/coupon/deleteCoupon/${id}`,
      method: "DELETE",
      success: function (data) {
        // Xử lý thành công
        $(".popup-overlay-delete").hide();
        $(".popup-delete").hide();
        renderPage();
      },
      error: function (error) {
        // Xử lý lỗi
        console.log("Đã xảy ra lỗi khi xóa coupon", error);
      },
    });
  });
});
