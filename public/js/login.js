// Lấy tham chiếu đến các phần tử HTML
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessageModal = document.getElementById("errorMessageModal");

const typpp = localStorage.getItem("type");
if (typpp == "owner") {
  $(".google-login-btn").hide();
}

// Set timeout to clear localStorage after inactivity (2 minutes)
const timeoutId = setTimeout(() => {
  localStorage.removeItem("type");
}, 120000);

// Sự kiện submit form
/* global $ */
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định
  clearTimeout(timeoutId); // Clear the inactivity timeout

  // Lấy giá trị từ các trường đầu vào
  const email = emailInput.value;
  const password = passwordInput.value;

  // Tạo một object chứa dữ liệu đăng nhập
  const data = {
    email,
    password,
  };

  // Gửi yêu cầu POST đến URL xử lý dữ liệu đăng nhập
  $.ajax({
    url: "http://localhost:3030/api/v1/users/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success(result) {
      if (result.message === "successful") {
        const token = result.accessToken; // Đảm bảo rằng trường đúng cho access token
        const refreshToken = result.refreshToken; // Lưu refresh token

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken); // Lưu refresh token

        const name = result.user.name; // Giả sử dữ liệu người dùng ở trong 'result.user'
        localStorage.setItem("userName", name);

        const id = result.user.id; // Giả sử id ở trong 'result.user'
        localStorage.setItem("id", id);

        const type = result.user.type; // Giả sử type ở trong 'result.user'
        localStorage.setItem("type", type);

        // Chuyển hướng dựa trên loại người dùng
        if (type === "admin") {
          window.location.href = "/dashboard";
        } else if (type === "owner") {
          window.location.href = "/agentInfo";
        } else {
          window.location.href = "/";
        }
      } else if (result.message === "email_not_found") {
        errorMessageModal.textContent = "Email không tồn tại. Vui lòng kiểm tra lại.";
        $("#errorModal").modal("show");
      } else if (result.message === "incorrect_password") {
        errorMessageModal.textContent = "Mật khẩu không chính xác. Vui lòng thử lại.";
        $("#errorModal").modal("show");
      } else {
        errorMessageModal.textContent = "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.";
        $("#errorModal").modal("show");
      }
    },
    error(xhr, status, error) {
      console.error("Error:", error);
      errorMessageModal.textContent = "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.";
      $("#errorModal").modal("show");
    },
  });
});
