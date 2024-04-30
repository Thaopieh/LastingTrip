document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra giá trị của token
  const token = getToken(); // Thay 'getToken()' bằng hàm lấy giá trị token của bạn

  if (token !== null && token !== undefined) {
    // Nếu token có giá trị khác null, thay đổi HTML của phần tử li
    const signInSignUpLi = document.querySelector("#nav-login"); // Chọn phần tử li cần thay đổi

    // HTML mới cho phần tử li nếu có token
    signInSignUpLi.innerHTML = `
            <div class="btn-group1">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    data-bs-auto-close="false" aria-expanded="false" id="filte-dropdown">
                    <i class="fa-regular fa-user"></i>
                    User
                </button>
                <ul class="dropdown-menu" id="dropdownshown">
                    <li><a class="dropdown-item" href="/userInfor">Thông tin cá nhân</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li id="logout"><a class="dropdown-item" href="/">Đăng xuất</a></li>
                </ul>
            </div>
        `;
    document.getElementById("logout").addEventListener("click", function () {
      // Xóa token khỏi local storage
      localStorage.removeItem("token");
      // Thực hiện các hành động khác sau khi đăng xuất (nếu cần)
      // Ví dụ: Chuyển hướng đến trang đăng nhập
      window.location.href = "http://localhost:3000/";
    });
  }
});

// Hàm để lấy giá trị token, bạn cần thay đổi hàm này để phù hợp với cách lấy token của bạn
function getToken() {
  // Đoạn mã để lấy token từ localStorage hoặc sessionStorage hoặc bất kỳ cách lưu trữ nào
  return localStorage.getItem("token"); // Thay 'token' bằng key lưu trữ token của bạn
}

