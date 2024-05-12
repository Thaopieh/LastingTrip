const registerUser = (event) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

  const name = $("#name").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#re-password").val();
  const numberPhone = $("#numberPhone").val();
  const type = localStorage.getItem("type") || "client";
  console.log(type);

  const confirmPasswordInput = $("#re-password");
  const confirmPasswordError = $("#re-password-error");

  if (!name || !email || !password || !confirmPassword || !numberPhone) {
    confirmPasswordInput.addClass("error");
    confirmPasswordError.text("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (password !== confirmPassword) {
    confirmPasswordInput.addClass("error");
    confirmPasswordError.text("Mật khẩu và xác nhận mật khẩu không khớp");
    return;
  }

  console.log("Sending registration request...");

  confirmPasswordInput.removeClass("error");
  confirmPasswordError.text("");

  // Gửi yêu cầu đăng ký người dùng
  fetch("http://localhost:3030/api/v1/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, numberPhone, type }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Email hoặc số điện thoại đã tồn tại trong hệ thống");
      }
      return response.json();
    })
    .then((result) => {
      localStorage.removeItem("type");
      console.log("Đăng ký:", result);
      // Chuyển hướng trang sau khi đăng ký thành công
      window.location.href = "http://localhost:3030/signin";
    })
    .catch((error) => {
      console.error("Đăng ký thất bại:", error);
      confirmPasswordInput.addClass("error");
      confirmPasswordError.text(error.message);
    });
};

$(document).ready(function () {
  console.log("Document ready");
  $("#registerButton").click(registerUser);
});
