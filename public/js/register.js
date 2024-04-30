const registerUser = (event) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

  const name = $("#name").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#re-password").val();
  const numberPhone = $("#numberPhone").val();

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

  // ("http://localhost:3000/api/v1/users/getAllUser")
  fetch("http://localhost:3000/api/v1/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, numberPhone }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Đăng ký thành công:", result);
      // Chuyển hướng trang sau khi đăng ký thành công
      window.location.href = "http://localhost:3000/signin";

      document.getElementById("beforeRes").style.display = "none";
      document.getElementById("afterRes").style.display = "block";
    })
    .catch((error) => {
      console.error("Đăng ký thất bại:", error);
    });
};

$(document).ready(function () {
  console.log("Document ready");
  $("#registerButton").click(registerUser);
});
