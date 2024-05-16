// Redirect.js

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("type");

  if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    window.location.href = "/signin";
  }

  if (window.location.pathname === "/dashboard" && userType !== "admin") {
    // Nếu cố gắng truy cập vào trang dashboard mà không phải là admin
    window.location.href = "/";
  } else if (
    window.location.pathname === "/agentInfo" &&
    userType !== "owner"
  ) {
    // Nếu cố gắng truy cập vào trang agentInfo mà không phải là owner
    window.location.href = "/";
  }
});
