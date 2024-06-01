// Lấy tham chiếu đến các phần tử HTML
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessageModal = document.getElementById("errorMessageModal");

var typpp = localStorage.getItem("type");
if (typpp == "owner") {
  $(".google-login-btn").hide();
}

let timeoutId = setTimeout(() => {
  localStorage.removeItem("type");
  console.log("Type removed from localStorage due to inactivity.");
}, 120000);

// Sự kiện submit form
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định
  clearTimeout(timeoutId);
  // Lấy giá trị từ các trường đầu vào
  const email = emailInput.value;
  const password = passwordInput.value;

  // Tạo một object chứa dữ liệu đăng nhập
  const data = {
    email: email,
    password: password,
  };

  // Gửi yêu cầu POST đến URL xử lý dữ liệu đăng nhập
  $.ajax({
    url: "http://localhost:3030/api/v1/users/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (result) {
      if (result.message === "successful") {
        const token = result.token; // Giả sử token được trả về là thuộc tính 'token' của đối tượng result
        localStorage.setItem("token", token);
        const name = result.name; //trả về undefined???
        localStorage.setItem("userName", name);
        const id = result.id; // Giả sử id được trả về là thuộc tính 'id' của đối tượng result
        localStorage.setItem("id", id);
        const type = result.type;
        localStorage.setItem("type", type);
        if (result.type === "admin") {
          window.location.href = "/dashboard";
        } else if (result.type === "owner") {
          // Nếu đăng nhập thành công, chuyển hướng đến trang chủ
          window.location.href = "/agentInfo";
        } else {
          window.location.href = "/";
        }
      } else if (result.message === "email_not_found") {
        errorMessageModal.textContent =
          "Email không tồn tại. Vui lòng kiểm tra lại.";
        $("#errorModal").modal("show"); // Hiển thị modal khi email không tồn tại
      } else if (result.message === "incorrect_password") {
        errorMessageModal.textContent =
          "Mật khẩu không chính xác. Vui lòng thử lại.";
        $("#errorModal").modal("show"); // Hiển thị modal khi mật khẩu sai
      } else {
        errorMessageModal.textContent =
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.";
        $("#errorModal").modal("show"); // Hiển thị modal khi đăng nhập thất bại
      }
      // Xử lý kết quả trả về từ máy chủ
      console.log(result);
    },
    error: function (xhr, status, error) {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
      errorMessageModal.textContent =
        "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.";
      $("#errorModal").modal("show"); // Hiển thị modal khi có lỗi xảy ra
    },
  });
});
